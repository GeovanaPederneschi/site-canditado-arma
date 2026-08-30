import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAdminSession } from './useAdminSession'

export default function ProtectedRoute({ children }) {
  const { session, isAdmin, loading } = useAdminSession()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#16181D]">
        <p className="text-white/60 text-sm">Carregando...</p>
      </div>
    )
  }

  if (!session) return <Navigate to="/admin/login" replace />

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#16181D] px-6 text-center gap-4">
        <p className="text-white text-lg font-semibold">Sua conta não tem acesso ao painel administrativo.</p>
        <button onClick={() => supabase.auth.signOut()} className="text-[#B91C1C] text-sm font-medium underline underline-offset-4">
          Sair
        </button>
      </div>
    )
  }

  return children
}
