import { createContext, useContext, useState, useEffect } from 'react'
import { trpc, createApiClient, queryClient } from '../lib/api.js'

const OrgContext = createContext(null)

export function OrgProvider({ children }) {
  const [orgId, setOrgId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [client, setClient] = useState(null)

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'

    fetch(`${baseUrl}/api/trpc/portal.getDefaultOrg`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const org = data?.result?.data
        if (org?.id) {
          setOrgId(org.id)
          setClient(createApiClient(org.id))
        } else {
          setError('Organization not found')
        }
      })
      .catch((err) => {
        console.error('Failed to fetch default org:', err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body-md text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center max-w-md px-6">
          <span className="material-symbols-outlined text-5xl text-error mb-4 block">error</span>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Connection Error</h2>
          <p className="font-body-md text-secondary mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-label-md text-label-md bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <OrgContext.Provider value={{ orgId, client }}>
      <trpc.Provider client={client} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </OrgContext.Provider>
  )
}

export function useOrg() {
  const ctx = useContext(OrgContext)
  if (!ctx) throw new Error('useOrg must be used within OrgProvider')
  return ctx
}
