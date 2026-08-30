import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from '../lib/supabaseClient'

/**
 * Tracks the Supabase auth session and whether the logged-in user is
 * present in the `admins` table (the only people allowed into the panel).
 */
export function useAdminSession() {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false)
      return
    }

    let active = true

    const checkAdmin = async (currentSession) => {
      if (!currentSession) {
        if (active) {
          setIsAdmin(false)
          setLoading(false)
        }
        return
      }
      const { data } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', currentSession.user.id)
        .maybeSingle()
      if (active) {
        setIsAdmin(Boolean(data))
        setLoading(false)
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      checkAdmin(data.session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(true)
      checkAdmin(newSession)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  return { session, isAdmin, loading }
}
