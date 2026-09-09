import { createAuthClient } from 'better-auth/react'
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import { QueryClient } from '@tanstack/react-query'

const ORG_ID_KEY = 'activeOrganizationId'

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

export function createApiClient(orgId) {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'

  if (orgId) setActiveOrganizationId(orgId)

  const client = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${baseUrl}/api/trpc`,
        headers() {
          const headers = { 'content-type': 'application/json' }
          const id = orgId || getActiveOrganizationId()
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
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('bucket', bucket)
  if (path) formData.append('path', path)

  const res = await fetch(`${baseUrl}/api/upload`, {
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

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8787',
})

export const { useSession, signIn, signOut, signUp } = authClient
