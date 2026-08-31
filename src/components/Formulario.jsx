import { useState } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabaseClient'

const camposIniciais = { nome: '', email: '', bairro: '', whatsapp: '' }

function formatWhatsApp(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function Formulario() {
  const [form, setForm] = useState(camposIniciais)
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: name === 'whatsapp' ? formatWhatsApp(value) : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (!supabaseConfigured) {
      setErro('Cadastro indisponível no momento. Tente novamente mais tarde.')
      return
    }
    setCarregando(true)
    const { error } = await supabase.from('supporters').insert({
      nome: form.nome,
      email: form.email,
      whatsapp: form.whatsapp,
      bairro: form.bairro,
    })
    setCarregando(false)
    if (error) {
      setErro('Não foi possível enviar seu cadastro. Tente novamente em instantes.')
      return
    }
    setEnviado(true)
  }

  return (
    <section id="cadastro" className="relative py-20 lg:py-28 bg-[#16181D] overflow-hidden">
      <div className="scanlines" />
      <div className="relative max-w-3xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] text-xs font-bold uppercase tracking-widest">
              Entre na tropa
            </span>
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-5 tracking-wide">
            Quero apoiar Marcos
          </h2>
          <p className="text-white/50 leading-relaxed max-w-lg mx-auto">
            Cadastre-se e receba novidades da campanha 1911 em primeira mão.
          </p>
        </div>

        <div className="bg-[#22262E] border border-[#4A5568]/30 p-8 sm:p-12">
          {enviado ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-[#B91C1C]/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#B91C1C]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-3xl text-white mb-3 tracking-wide">Cadastro realizado!</h3>
              <p className="text-white/50 leading-relaxed mb-8">
                Obrigado, <strong className="text-white">{form.nome.split(' ')[0]}</strong>! Você agora faz
                parte do movimento. Em breve entraremos em contato pelo WhatsApp.
              </p>
              <button
                onClick={() => { setEnviado(false); setForm(camposIniciais) }}
                className="text-[#B91C1C] text-sm font-medium underline underline-offset-4 hover:text-white"
              >
                Cadastrar outro apoiador
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="sm:col-span-2">
                  <label htmlFor="nome" className="block text-sm font-semibold text-white/70 mb-2">
                    Nome completo <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input id="nome" name="nome" type="text" required value={form.nome} onChange={handleChange}
                    placeholder="Seu nome completo"
                    className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C] transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">
                    E-mail <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="seu@email.com"
                    className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C] transition-colors" />
                </div>
                <div>
                  <label htmlFor="bairro" className="block text-sm font-semibold text-white/70 mb-2">
                    Bairro <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input id="bairro" name="bairro" type="text" required value={form.bairro} onChange={handleChange}
                    placeholder="Seu bairro"
                    className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C] transition-colors" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="whatsapp" className="block text-sm font-semibold text-white/70 mb-2">
                    WhatsApp <span className="text-[#B91C1C]">*</span>
                  </label>
                  <input id="whatsapp" name="whatsapp" type="tel" required value={form.whatsapp} onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C] transition-colors" />
                </div>
              </div>

              {erro && <p className="text-[#F87171] text-sm font-medium mb-4 text-center" role="alert">{erro}</p>}

              <button
                type="submit"
                disabled={carregando}
                className="w-full bg-[#B91C1C] text-white font-bold py-4 hover:bg-[#7F1414] transition-colors duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
              >
                {carregando ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Quero fazer parte do movimento'
                )}
              </button>

              <p className="text-center text-xs text-white/30 mt-4 leading-relaxed">
                Ao se cadastrar, você concorda em receber comunicações da campanha
                por WhatsApp e e-mail. Seus dados são protegidos conforme a LGPD.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
