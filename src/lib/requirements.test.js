import { describe, it, expect } from 'vitest'
import { flattenRequirements } from './requirements.js'

describe('flattenRequirements', () => {
  const vendor = { companyName: 'Gulf Hospital', logoUrl: 'https://example.com/gulf.png' }

  it('flattens every requirementItems position into a job row', () => {
    const rows = flattenRequirements([
      {
        id: 'R1',
        vendor,
        regions: [{ name: 'Riyadh' }, { name: 'Jeddah' }],
        requirementItems: [
          { position: 'Staff Nurse', vacancies: 5 },
          { position: 'Heavy Driver', vacancies: 2 },
        ],
      },
    ])

    expect(rows).toHaveLength(2)
    expect(rows[0]).toMatchObject({
      id: 'R1-0',
      requestId: 'R1',
      title: 'Staff Nurse',
      company: 'Gulf Hospital',
      location: 'Riyadh, Jeddah',
      openings: 5,
      logoUrl: 'https://example.com/gulf.png',
    })
    expect(rows[1].title).toBe('Heavy Driver')
  })

  it('falls back to a single row when requirementItems is missing', () => {
    const rows = flattenRequirements([
      { id: 'R2', vendor, regions: [], requirementTitle: 'General Helper', totalVacancies: 3 },
    ])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ title: 'General Helper', openings: 3 })
  })

  it('returns an empty array for missing or non-array input', () => {
    expect(flattenRequirements([])).toEqual([])
    expect(flattenRequirements(undefined)).toEqual([])
    expect(flattenRequirements(null)).toEqual([])
    expect(flattenRequirements({ data: [] })).toEqual([])
  })

  it('tags urgent requirements', () => {
    const rows = flattenRequirements([
      {
        id: 'R3',
        vendor,
        regions: [],
        isUrgent: true,
        requirementItems: [{ position: 'Electrician', vacancies: 1 }],
      },
    ])

    expect(rows[0].tags).toEqual(['URGENT'])
  })

  it('builds a salary range from min/max/currency when present', () => {
    const rows = flattenRequirements([
      {
        id: 'R4',
        vendor: { companyName: 'Al Masaood Trading' },
        regions: [],
        requirementItems: [
          { position: 'Surgeon', vacancies: 1, minSalary: 1500, maxSalary: 2200, currency: 'AED' },
          { position: 'Room Attendant', vacancies: 2, maxSalary: 800, currency: 'QAR' },
          { position: 'Cashier', vacancies: 1, currency: 'AED' },
        ],
      },
    ])

    expect(rows[0]).toMatchObject({ title: 'Room Attendant', salary: 'QAR 800' })
    expect(rows[1]).toMatchObject({ title: 'Surgeon', salary: 'AED 1,500-2,200' })
    expect(rows[2]).toMatchObject({ title: 'Cashier', salary: '' })
  })

  it('falls back to salaryAmount when min/max are absent', () => {
    const rows = flattenRequirements([
      {
        id: 'R5',
        vendor: { companyName: 'Gulf Hospital' },
        regions: [],
        requirementItems: [{ position: 'Accountant', vacancies: 1, salaryAmount: 3500, currency: 'AED' }],
      },
    ])

    expect(rows[0].salary).toBe('AED 3,500')
  })

  it('sorts job rows by openings descending', () => {
    const rows = flattenRequirements([
      { id: 'A', vendor, regions: [], requirementItems: [{ position: 'Driver', vacancies: 2 }] },
      { id: 'B', vendor, regions: [], requirementItems: [{ position: 'Nurse', vacancies: 9 }] },
    ])

    expect(rows.map((r) => r.title)).toEqual(['Nurse', 'Driver'])
  })
})