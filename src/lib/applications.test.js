import { describe, it, expect } from 'vitest'
import { toApplications, applicationKey, applicationStatus } from './applications.js'

describe('toApplications', () => {
  it('unwraps the { applications, applicantName } tRPC payload', () => {
    const app = { candidate: { id: 'c1' } }
    expect(toApplications({ applications: [app], applicantName: 'Ahmed' })).toEqual([app])
  })

  it('passes a bare array through', () => {
    const app = { candidate: { id: 'c1' } }
    expect(toApplications([app])).toEqual([app])
  })

  it('returns [] for undefined, null and legacy shapes', () => {
    expect(toApplications(undefined)).toEqual([])
    expect(toApplications(null)).toEqual([])
    expect(toApplications({ data: [{ candidate: { id: 'c1' } }] })).toEqual([])
    expect(toApplications({ items: [] })).toEqual([])
  })
})

describe('applicationKey', () => {
  it('combines requirement id and candidate position', () => {
    expect(
      applicationKey({
        requirement: { id: 'req1' },
        candidate: { position: 'Driver' },
      })
    ).toBe('req1-Driver')
  })

  it('treats a missing position as an empty string', () => {
    expect(applicationKey({ requirement: { id: 'req1' }, candidate: {} })).toBe('req1-')
  })

  it('is empty-safe for an undefined app', () => {
    expect(applicationKey()).toBe('-')
  })
})

describe('applicationStatus', () => {
  it('reads the status off candidate', () => {
    expect(applicationStatus({ candidate: { status: 'DEPLOYED' } })).toBe('DEPLOYED')
  })

  it('defaults to SCREENED when missing', () => {
    expect(applicationStatus({ candidate: {} })).toBe('SCREENED')
    expect(applicationStatus()).toBe('SCREENED')
  })
})
