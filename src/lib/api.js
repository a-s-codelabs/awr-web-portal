import { createAuthClient } from 'better-auth/react'
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import { QueryClient } from '@tanstack/react-query'

const ORG_ID_KEY = 'activeOrganizationId'

export function portalOrgId(envOrg = import.meta.env.VITE_PORTAL_ORG_ID) {
  return envOrg || 'org_awr'
}

export const PORTAL_ORG_ID = portalOrgId()

export function getActiveOrganizationId() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(ORG_ID_KEY)
}

export function setActiveOrganizationId(id) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(ORG_ID_KEY, id)
}

export function orgHeaders() {
  const orgId = getActiveOrganizationId()
  return orgId ? { 'x-organization-id': orgId } : {}
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000,
    },
  },
})

export const trpc = createTRPCReact()

function apiBaseUrl() {
  if (import.meta.env.DEV) return ''
  return (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')
}

export function createApiClient(orgId) {
  if (orgId) setActiveOrganizationId(orgId)

  const client = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${apiBaseUrl()}/api/trpc`,
        headers() {
          const headers = { 'content-type': 'application/json' }
          const id = orgId || PORTAL_ORG_ID
          if (id) headers['x-organization-id'] = id
          return headers
        },
        fetch(url, options) {
          return fetch(url, { ...options, credentials: 'include' })
        },
      }),
    ],
  })

  return client
}

export async function uploadFile({ file, bucket, path }) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('bucket', bucket)
  if (path) formData.append('path', path)

  const res = await fetch(`${apiBaseUrl()}/api/upload`, {
    method: 'POST',
    body: formData,
    headers: orgHeaders(),
    credentials: 'include',
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(typeof data?.error === 'string' ? data.error : 'Upload failed')
  }
  if (!data?.url) throw new Error('Upload failed: missing URL')
  return data.url
}

// ---------------------------------------------------------------------------
// Auth client — matches the a-s-unique-group pattern exactly.
// baseURL must end with "/api/auth" so the client sends requests to
// e.g. https://asuniquegroup.com/api/auth/sign-in/email
// ---------------------------------------------------------------------------
const configuredBaseUrl =
  (import.meta.env.DEV ? '' : (import.meta.env.VITE_API_URL || ''))

const normalizedBaseUrl = configuredBaseUrl.replace(/\/$/, '')

export const authClient = createAuthClient({
  baseURL: normalizedBaseUrl ? `${normalizedBaseUrl}/api/auth` : undefined,
})

export const { useSession, signIn, signOut, signUp, getSession } = authClient

// ---------------------------------------------------------------------------
// Session caching — avoids redundant network fetches on every navigation.
// Mirrors a-s-unique-group/src/lib/auth-client.ts
// ---------------------------------------------------------------------------
let cachedSessionPromise = null

/** Returns a cached (once-per-page) session so route guards don't hit the network on every navigation. */
export function getCachedSession() {
  if (!cachedSessionPromise) {
    cachedSessionPromise = authClient.getSession().catch(() => null)
  }
  return cachedSessionPromise
}

/** Call after any auth action (sign-in / sign-out / sign-up) to refresh the cached session. */
export function invalidateSessionCache() {
  cachedSessionPromise = null
}
