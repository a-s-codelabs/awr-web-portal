import { describe, it, expect } from 'vitest'
import { portalOrgId } from './api.js'

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