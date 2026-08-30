// Edge Function: send-broadcast
// Envia um e-mail de novidade para todos os apoiadores cadastrados.
// Só pode ser chamada por um usuário autenticado que esteja na tabela `admins`.
//
// Segredos necessários (configurar em Project Settings > Edge Functions > Secrets):
//   RESEND_API_KEY       - API key da conta Resend
//   BROADCAST_FROM_EMAIL - remetente verificado no Resend, ex: "Marcos Teixeira <campanha@seudominio.com>"
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já ficam disponíveis automaticamente.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL = Deno.env.get('BROADCAST_FROM_EMAIL') ?? 'onboarding@resend.dev'
const CHUNK_SIZE = 90

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c))
}

function bodyToHtml(text) {
  return text.split(/\n{2,}/).map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br/>')}</p>`).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Método não permitido.' }, 405)

  try {
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '')
    if (!token) return json({ error: 'Não autenticado.' }, 401)

    const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

    const { data: userData, error: userError } = await adminClient.auth.getUser(token)
    if (userError || !userData?.user) return json({ error: 'Sessão inválida ou expirada.' }, 401)

    const { data: adminRow } = await adminClient.from('admins').select('user_id').eq('user_id', userData.user.id).maybeSingle()
    if (!adminRow) return json({ error: 'Apenas administradores podem enviar novidades.' }, 403)

    const { subject, body } = await req.json()
    if (!subject?.trim() || !body?.trim()) return json({ error: 'Preencha assunto e mensagem.' }, 400)

    const { data: supporters, error: supportersError } = await adminClient.from('supporters').select('email, nome')
    if (supportersError) throw supportersError

    const recipients = (supporters ?? []).filter((s) => s.email)
    if (recipients.length === 0) return json({ error: 'Nenhum apoiador cadastrado ainda.' }, 400)

    let sentCount = 0
    for (let i = 0; i < recipients.length; i += CHUNK_SIZE) {
      const chunk = recipients.slice(i, i + CHUNK_SIZE)
      const payload = chunk.map((r) => ({
        from: FROM_EMAIL,
        to: [r.email],
        subject,
        html: `<p>Olá, ${escapeHtml((r.nome || '').split(' ')[0] || 'apoiador')}!</p>${bodyToHtml(body)}`,
      }))

      const res = await fetch('https://api.resend.com/emails/batch', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`Falha ao enviar via Resend (${res.status}): ${errText}`)
      }
      sentCount += chunk.length
    }

    await adminClient.from('broadcasts').insert({ subject, body, sent_by: userData.user.id, recipient_count: sentCount })

    return json({ success: true, recipientCount: sentCount })
  } catch (err) {
    console.error(err)
    return json({ error: err instanceof Error ? err.message : 'Erro inesperado.' }, 500)
  }
})
