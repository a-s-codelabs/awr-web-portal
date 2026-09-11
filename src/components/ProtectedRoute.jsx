import { Navigate, useLocation } from 'react-router-dom'
import { useSession, getCachedSession } from '../lib/api.js'
import { useState, useEffect } from 'react'

/**
 * Wraps routes that require authentication.
 * Uses getCachedSession() for the initial check to avoid flicker,
 * then falls back to the live useSession() hook.
 */
export default function ProtectedRoute({ children }) {
  const { data: session, isPending } = useSession()
  const [initialCheck, setInitialCheck] = useState(true)
  const [initialSession, setInitialSession] = useState(null)
  const location = useLocation()

  useEffect(() => {
    let cancelled = false
    getCachedSession().then((res) => {
      if (!cancelled) {
        setInitialSession(res?.data?.user ?? null)
        setInitialCheck(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  // Still doing initial check — show a loading state
  if (initialCheck) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Live session has resolved — use it; otherwise fall back to cached
  const user = session?.user ?? initialSession

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}
