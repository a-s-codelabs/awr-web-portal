import { describe, it, expect } from 'vitest'
import { profileToForm, toProfilePayload } from './profile.js'

describe('profileToForm', () => {
  it('maps personal fields verbatim', () => {
    const form = profileToForm({
      firstName: 'Ahmed',
      lastName: 'Khan',
      phone: '+92 300 1234567',
      passportNumber: 'Z1234567',
      nationality: 'Pakistani',
      gender: 'Male',
      notes: 'Available immediately',
    })

    expect(form).toMatchObject({
      firstName: 'Ahmed',
      lastName: 'Khan',
      phone: '+92 300 1234567',
      passportNumber: 'Z1234567',
      nationality: 'Pakistani',
      gender: 'Male',
      notes: 'Available immediately',
    })
  })

  it('converts a full ISO dateOfBirth to YYYY-MM-DD without timezone drift', () => {
    const form = profileToForm({ dateOfBirth: '1992-05-14T18:30:00.000Z' })
    expect(form.dateOfBirth).toBe('1992-05-14')
  })

  it('keeps an already-local date string as-is', () => {
    const form = profileToForm({ dateOfBirth: '1992-05-14' })
    expect(form.dateOfBirth).toBe('1992-05-14')
  })

  it('returns empty strings for a null/undefined profile', () => {
    const form = profileToForm(null)
    expect(form.firstName).toBe('')
    expect(form.dateOfBirth).toBe('')
    expect(form.notes).toBe('')
  })

  it('maps document URL strings and the otherDocs array', () => {
    const form = profileToForm({
      resumeUrl: 'https://cdn/r.pdf',
      profilePhoto: 'https://cdn/p.jpg',
      passportFront: 'https://cdn/f.jpg',
      passportBack: 'https://cdn/b.jpg',
      otherDocs: ['https://cdn/o1.pdf', 'https://cdn/o2.pdf'],
    })

    expect(form.resumeUrl).toBe('https://cdn/r.pdf')
    expect(form.profilePhoto).toBe('https://cdn/p.jpg')
    expect(form.passportFront).toBe('https://cdn/f.jpg')
    expect(form.passportBack).toBe('https://cdn/b.jpg')
    expect(form.otherDocs).toEqual(['https://cdn/o1.pdf', 'https://cdn/o2.pdf'])
  })

  it('defaults otherDocs to an empty array', () => {
    expect(profileToForm({}).otherDocs).toEqual([])
  })
})

describe('toProfilePayload', () => {
  const form = {
    firstName: 'Ahmed',
    lastName: '',
    phone: '',
    passportNumber: 'Z1234567',
    nationality: '',
    gender: '',
    dateOfBirth: '',
    notes: '',
  }

  it('drops empty/blank fields and passes email through', () => {
    const payload = toProfilePayload(form, { email: 'ahmed@example.com' })

    expect(payload).toEqual({
      firstName: 'Ahmed',
      email: 'ahmed@example.com',
      passportNumber: 'Z1234567',
    })
  })

  it('includes document URLs only when present and omits empty otherDocs', () => {
    const docs = {
      resumeUrl: 'https://cdn/r.pdf',
      profilePhoto: '',
      passportFront: '',
      passportBack: '',
      otherDocs: [],
    }

    const payload = toProfilePayload(form, { email: 'x@y.z' }, docs)

    expect(payload.resumeUrl).toBe('https://cdn/r.pdf')
    expect(payload.profilePhoto).toBeUndefined()
    expect(payload.passportFront).toBeUndefined()
    expect(payload.passportBack).toBeUndefined()
    expect(payload.otherDocs).toBeUndefined()
  })

  it('includes otherDocs when non-empty', () => {
    const payload = toProfilePayload(form, {}, { otherDocs: ['https://cdn/o.pdf'] })
    expect(payload.otherDocs).toEqual(['https://cdn/o.pdf'])
  })
})