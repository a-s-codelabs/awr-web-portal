import { describe, it, expect } from 'vitest'
import { flattenRequirements, toPublicRequirements } from './requirements.js'

describe('flattenRequirements', () => {
  const vendor = { companyName: 'Gulf Hospital', logo: 'https://example.com/gulf.png' }

  it('flattens every requirementItems position into a job row', () => {
    const rows = flattenRequirements([
      {
        id: 'R1',
        vendor,
        regions: [{ name: 'Riyadh' }, { name: 'Jeddah' }],
        requirementItems: [
          { jobPosition: 'Staff Nurse', noOfPositions: 5 },
          { jobPosition: 'Heavy Driver', noOfPositions: 2 },
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

  it('falls back to a single row from requirementTitle when requirementItems is missing', () => {
    const rows = flattenRequirements([
      { id: 'R2', vendor, regions: [], requirementTitle: 'General Helper' },
    ])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ title: 'General Helper', openings: 0 })
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
        requirementItems: [{ jobPosition: 'Electrician', noOfPositions: 1 }],
      },
    ])

    expect(rows[0].tags).toEqual(['URGENT'])
    expect(rows[0]).toMatchObject({ title: 'Electrician', openings: 1 })
  })

  it('builds a salary range from min/max when present', () => {
    const rows = flattenRequirements([
      {
        id: 'R4',
        vendor: { companyName: 'Al Masaood Trading' },
        regions: [],
        requirementItems: [
          { jobPosition: 'Surgeon', noOfPositions: 1, minSalary: 1500, maxSalary: 2200 },
          { jobPosition: 'Room Attendant', noOfPositions: 2, minSalary: 800, maxSalary: 800 },
          { jobPosition: 'Cashier', noOfPositions: 1 },
        ],
      },
    ])

    expect(rows[0]).toMatchObject({ title: 'Room Attendant', salary: '800' })
    expect(rows[1]).toMatchObject({ title: 'Surgeon', salary: '1,500-2,200' })
    expect(rows[2]).toMatchObject({ title: 'Cashier', salary: '' })
  })

  it('sorts job rows by openings descending', () => {
    const rows = flattenRequirements([
      { id: 'A', vendor, regions: [], requirementItems: [{ jobPosition: 'Driver', noOfPositions: 2 }] },
      { id: 'B', vendor, regions: [], requirementItems: [{ jobPosition: 'Nurse', noOfPositions: 9 }] },
    ])

    expect(rows.map((r) => r.title)).toEqual(['Nurse', 'Driver'])
  })

  it('renders the live backend payload shape', () => {
    const rows = flattenRequirements([
      {
        id: 'c8af124e-585b-4bf9-833a-7c3fb005129d',
        requirementId: 'req-abc-001',
        companyName: 'ABC',
        requirementTitle: 'aa',
        vendor: { id: '928ddfb3', companyName: 'ABC', logo: null },
        regions: [],
        requirementItems: [
          {
            id: '8cf005fd',
            organizationId: 'org_awr',
            jobPosition: 'aa',
            noOfPositions: 1,
            minSalary: 1200,
            maxSalary: 1500,
            position: 'aa',
            vacancies: 1,
          },
        ],
      },
    ])

    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      title: 'aa',
      openings: 1,
      company: 'ABC',
      salary: '1,200-1,500',
    })
  })

  it('still works against a legacy backend that omits the aliases', () => {
    const rows = flattenRequirements([
      {
        id: 'L',
        vendor: { companyName: 'Gulf Hospital' },
        regions: [],
        requirementItems: [{ jobPosition: 'Driver', noOfPositions: 3 }],
      },
    ])

    expect(rows[0]).toMatchObject({ title: 'Driver', openings: 3 })
  })
})

describe('toPublicRequirements', () => {
  it('normalizes requirementItems into canonical positions', () => {
    const out = toPublicRequirements([
      {
        id: 'R1',
        requirementItems: [
          { jobPosition: 'Nurse', noOfPositions: 7 },
          { jobPosition: 'Raw', noOfPositions: 1, position: 'Aliased', vacancies: 2 },
        ],
      },
    ])

    expect(out[0].positions).toEqual([
      expect.objectContaining({ position: 'Nurse', vacancies: 7 }),
      expect.objectContaining({ position: 'Aliased', vacancies: 2 }),
    ])
  })

  it('falls back to a single position from requirementTitle when requirementItems is empty', () => {
    const out = toPublicRequirements([{ id: 'R2', requirementTitle: 'General Helper' }])

    expect(out[0].positions).toEqual([
      expect.objectContaining({ position: 'General Helper', vacancies: 0 }),
    ])
  })

  it('returns an empty array for non-array input', () => {
    expect(toPublicRequirements(undefined)).toEqual([])
    expect(toPublicRequirements(null)).toEqual([])
    expect(toPublicRequirements({})).toEqual([])
  })
})