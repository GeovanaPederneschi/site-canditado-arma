import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function exportSupportersCsv(supporters) {
  const header = ['nome', 'email', 'whatsapp', 'bairro', 'cadastrado_em']
  const rows = supporters.map((s) => [
    s.nome, s.email, s.whatsapp, s.bairro ?? '', new Date(s.created_at).toLocaleString('pt-BR'),
  ])
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'apoiadores.csv'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function AdminDashboard() {
  const [supporters, setSupporters] = useState([])
  const [broadcasts, setBroadcasts] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const loadData = async () => {
    setLoadingData(true)
    const [{ data: supportersData }, { data: broadcastsData }] = await Promise.all([
      supabase.from('supporters').select('*').order('created_at', { ascending: false }),
      supabase.from('broadcasts').select('*').order('created_at', { ascending: false }),
    ])
    setSupporters(supportersData ?? [])
    setBroadcasts(broadcastsData ?? [])
    setLoadingData(false)
  }

  useEffect(() => { loadData() }, [])

  const handleSendBroadcast = async (e) => {
    e.preventDefault()
    setFeedback(null)
    setEnviando(true)
    const { data, error } = await supabase.functions.invoke('send-broadcast', {
      body: { subject: assunto, body: mensagem },
    })
    setEnviando(false)
    if (error || data?.error) {
      setFeedback({ type: 'error', text: data?.error || error.message || 'Falha ao enviar.' })
      return
    }
    setFeedback({ type: 'success', text: `Novidade enviada para ${data.recipientCount} apoiador(es)!` })
    setAssunto('')
    setMensagem('')
    loadData()
  }

  return (
    <div className="min-h-screen bg-[#0F1115]">
      <header className="bg-[#16181D] border-b border-[#4A5568]/30 px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#B91C1C] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="text-white font-bold text-xs font-display">MT</span>
          </div>
          <span className="text-white font-display text-lg tracking-wide">Painel da campanha</span>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="text-white/60 hover:text-white text-sm font-medium">Sair</button>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-10 flex flex-col gap-10">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-[#22262E] border border-[#4A5568]/30 p-6">
            <p className="text-3xl font-display text-[#B91C1C] tracking-wide">{supporters.length}</p>
            <p className="text-white/50 text-sm mt-1">Apoiadores cadastrados</p>
          </div>
          <div className="bg-[#22262E] border border-[#4A5568]/30 p-6">
            <p className="text-3xl font-display text-[#B91C1C] tracking-wide">{broadcasts.length}</p>
            <p className="text-white/50 text-sm mt-1">Novidades enviadas</p>
          </div>
          <div className="bg-[#22262E] border border-[#4A5568]/30 p-6 flex flex-col justify-between">
            <p className="text-white/50 text-sm">Exportar lista para envio manual de WhatsApp</p>
            <button onClick={() => exportSupportersCsv(supporters)} disabled={supporters.length === 0}
              className="mt-3 text-[#B91C1C] text-sm font-semibold underline underline-offset-4 disabled:opacity-40 disabled:no-underline text-left">
              Baixar CSV
            </button>
          </div>
        </div>

        <section className="bg-[#22262E] border border-[#4A5568]/30 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-white mb-1 tracking-wide">Enviar novidade</h2>
          <p className="text-white/50 text-sm mb-6">O e-mail vai para todos os apoiadores cadastrados, sem depender de algoritmo.</p>
          <form onSubmit={handleSendBroadcast} className="flex flex-col gap-4">
            <div>
              <label htmlFor="assunto" className="block text-sm font-semibold text-white/70 mb-2">Assunto</label>
              <input id="assunto" type="text" required value={assunto} onChange={(e) => setAssunto(e.target.value)}
                className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C]" />
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-sm font-semibold text-white/70 mb-2">Mensagem</label>
              <textarea id="mensagem" required rows={6} value={mensagem} onChange={(e) => setMensagem(e.target.value)}
                className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C]" />
            </div>
            {feedback && (
              <p className={`text-sm font-medium ${feedback.type === 'success' ? 'text-[#B91C1C]' : 'text-[#F87171]'}`} role="alert">
                {feedback.text}
              </p>
            )}
            <button type="submit" disabled={enviando || supporters.length === 0}
              className="self-start bg-[#B91C1C] text-white font-bold px-8 py-3.5 hover:bg-[#7F1414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide">
              {enviando ? 'Enviando...' : `Enviar para ${supporters.length} apoiador(es)`}
            </button>
          </form>
        </section>

        <section className="bg-[#22262E] border border-[#4A5568]/30 overflow-hidden">
          <div className="p-6 sm:p-8 pb-0">
            <h2 className="font-display text-2xl text-white tracking-wide">Apoiadores</h2>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 border-b border-[#4A5568]/30">
                  <th className="px-6 sm:px-8 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">E-mail</th>
                  <th className="px-4 py-3 font-medium">WhatsApp</th>
                  <th className="px-4 py-3 font-medium">Bairro</th>
                  <th className="px-4 sm:pr-8 py-3 font-medium">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {loadingData ? (
                  <tr><td className="px-8 py-6 text-white/40" colSpan={5}>Carregando...</td></tr>
                ) : supporters.length === 0 ? (
                  <tr><td className="px-8 py-6 text-white/40" colSpan={5}>Nenhum apoiador cadastrado ainda.</td></tr>
                ) : (
                  supporters.map((s) => (
                    <tr key={s.id} className="border-b border-[#4A5568]/15 last:border-0">
                      <td className="px-6 sm:px-8 py-3 text-white font-medium">{s.nome}</td>
                      <td className="px-4 py-3 text-white/70">{s.email}</td>
                      <td className="px-4 py-3 text-white/70">{s.whatsapp}</td>
                      <td className="px-4 py-3 text-white/70">{s.bairro || '—'}</td>
                      <td className="px-4 sm:pr-8 py-3 text-white/40">{new Date(s.created_at).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-[#22262E] border border-[#4A5568]/30 p-6 sm:p-8">
          <h2 className="font-display text-2xl text-white mb-4 tracking-wide">Histórico de novidades</h2>
          {broadcasts.length === 0 ? (
            <p className="text-white/40 text-sm">Nenhuma novidade enviada ainda.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {broadcasts.map((b) => (
                <li key={b.id} className="border border-[#4A5568]/30 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-white">{b.subject}</p>
                    <span className="text-xs text-white/40 whitespace-nowrap">{new Date(b.created_at).toLocaleString('pt-BR')}</span>
                  </div>
                  <p className="text-white/50 text-sm mt-1 line-clamp-2">{b.body}</p>
                  <p className="text-[#B91C1C] text-xs font-medium mt-2">Enviado para {b.recipient_count} apoiador(es)</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
