import { createContext, useContext, useState, useEffect } from 'react'
import { trpc, createApiClient, queryClient, portalOrgId } from '../lib/api.js'

const OrgContext = createContext(null)

export function OrgProvider({ children }) {
  const [orgId, setOrgId] = useState(() => portalOrgId())
  const [client, setClient] = useState(() => createApiClient(orgId))

  useEffect(() => {
    const url = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

    fetch(`${url}/api/trpc/portal.getDefaultOrg`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const org = data?.result?.data
        if (org?.id && org.id !== orgId) {
          setOrgId(org.id)
          setClient(createApiClient(org.id))
        }
      })
      .catch(() => {
        // keep using the cached/default org; per-query errors surface upstream
      })
  }, [])

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