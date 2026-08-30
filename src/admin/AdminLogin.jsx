import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseConfigured } from '../lib/supabaseClient'
import { useAdminSession } from './useAdminSession'

export default function AdminLogin() {
  const { session, isAdmin, loading } = useAdminSession()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (!loading && session && isAdmin) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (!supabaseConfigured) {
      setErro('Painel indisponível: Supabase não configurado.')
      return
    }
    setEnviando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    setEnviando(false)
    if (error) setErro('E-mail ou senha inválidos.')
  }

  return (
    <div className="min-h-screen bg-[#16181D] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#B91C1C] flex items-center justify-center mx-auto mb-4" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="text-white font-bold text-sm font-display">MT</span>
          </div>
          <h1 className="font-display text-3xl text-white mb-1 tracking-wide">Painel da campanha</h1>
          <p className="text-white/50 text-sm">Acesso restrito à equipe autorizada</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#22262E] border border-[#4A5568]/30 p-8" noValidate>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-white/70 mb-2">E-mail</label>
            <input id="email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C]" />
          </div>
          <div className="mb-6">
            <label htmlFor="senha" className="block text-sm font-semibold text-white/70 mb-2">Senha</label>
            <input id="senha" type="password" required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-[#16181D] border border-[#4A5568]/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/40 focus:border-[#B91C1C]" />
          </div>

          {erro && <p className="text-[#F87171] text-sm font-medium mb-4" role="alert">{erro}</p>}

          <button type="submit" disabled={enviando}
            className="w-full bg-[#B91C1C] text-white font-bold py-3.5 hover:bg-[#7F1414] transition-colors disabled:opacity-60 uppercase tracking-wide">
            {enviando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <a href="/" className="block text-center text-white/40 text-xs mt-6 hover:text-white/70">← Voltar para o site</a>
      </div>
    </div>
  )
}
