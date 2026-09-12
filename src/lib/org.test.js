import { describe, it, expect } from 'vitest'
import { portalOrgId } from './api.js'
import { createOrgScope } from '../contexts/OrgContext.jsx'

describe('portalOrgId', () => {
  it('defaults to org_awr when no env override is set', () => {
    expect(portalOrgId(undefined)).toBe('org_awr')
  })

  it('honors the VITE_PORTAL_ORG_ID env override', () => {
    expect(portalOrgId('org_custom')).toBe('org_custom')
  })

  it('ignores an empty env override', () => {
    expect(portalOrgId('')).toBe('org_awr')
  })
})

describe('org scope state shape', () => {
  it('wraps the client (a function Proxy) in a plain object so setState never runs it as an updater', () => {
    const scope = createOrgScope('org_awr')
    expect(typeof scope).toBe('object')
    expect(scope.orgId).toBe('org_awr')
    expect(typeof scope.client).toBe('function')
  })
})