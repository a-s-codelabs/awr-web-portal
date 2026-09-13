function formatSalary(item = {}) {
  const currency = item.currency || ''
  const min = item.minSalary ?? item.salaryAmount ?? 0
  const max = item.maxSalary ?? 0
  const fmt = (n) => Number(n).toLocaleString()
  const parts = []
  if (min > 0) parts.push(fmt(min))
  if (max > 0 && max !== min) parts.push(fmt(max))
  if (parts.length === 0) return ''
  return [currency, parts.join('-')].filter(Boolean).join(' ')
}

function initials(title) {
  const words = String(title || '').trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return (words[0] || '').slice(0, 2).toUpperCase()
}

export function normalizePosition(item = {}) {
  return {
    ...item,
    position: item.position || item.jobPosition || 'Open Position',
    vacancies: Number(item.vacancies ?? item.noOfPositions ?? 0) || 0,
  }
}

export function normalizeRequirement(req = {}) {
  const items = Array.isArray(req.requirementItems) ? req.requirementItems : []
  const positions = items.map(normalizePosition)
  return {
    ...req,
    positions:
      positions.length > 0
        ? positions
        : [
            normalizePosition({
              id: `${req.id}-any`,
              jobPosition: req.requirementTitle || 'Open Position',
            }),
          ],
  }
}

export function toPublicRequirements(requirements) {
  if (!Array.isArray(requirements)) return []
  return requirements.map(normalizeRequirement).filter(Boolean)
}

export function flattenRequirements(requirements) {
  const rows = []

  for (const req of toPublicRequirements(requirements)) {
    const vendor = req.vendor?.companyName || 'Unknown Company'
    const vendorLogo = req.vendor?.logo || req.vendor?.logoUrl
    const location = (req.regions || []).map((r) => r.name).filter(Boolean).join(', ')

    req.positions.forEach((item, idx) => {
      rows.push({
        id: `${req.id}-${idx}`,
        requestId: req.id,
        title: item.position || 'Open Position',
        company: vendor,
        location,
        openings: item.vacancies,
        salary: formatSalary(item),
        logo: initials(item.position),
        logoUrl: vendorLogo,
        tags: req.isUrgent ? ['URGENT'] : [],
      })
    })
  }

  return rows.sort((a, b) => b.openings - a.openings)
}