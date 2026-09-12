import { createContext, useContext, useState, useEffect } from 'react'
import { trpc, createApiClient, queryClient, portalOrgId } from '../lib/api.js'

const OrgContext = createContext(null)

/**
 * Hold the org + tRPC client in a plain object. The tRPC client is a Proxy
 * that `typeof` reports as a function, so passing it to React setState as a
 * bare value would make React invoke it as an updater and lose the client —
 * always swap whole scope objects instead.
 */
export function createOrgScope(orgId) {
  return { orgId, client: createApiClient(orgId) }
}

export function OrgProvider({ children }) {
  const [scope, setScope] = useState(() => createOrgScope(portalOrgId()))
  const { orgId, client } = scope

  useEffect(() => {
    const url = import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

    fetch(`${url}/api/trpc/portal.getDefaultOrg`, {
      credentials: 'include',
      headers: { 'x-organization-id': portalOrgId() },
    })
      .then((res) => res.json())
      .then((data) => {
        const org = data?.result?.data
        if (org?.id && org.id !== scope.orgId) {
          setScope(createOrgScope(org.id))
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