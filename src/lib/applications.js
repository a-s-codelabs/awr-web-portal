export function toApplications(payload) {
  if (Array.isArray(payload)) return payload
  return Array.isArray(payload?.applications) ? payload.applications : []
}

export function applicationKey(app = {}) {
  const requirementId = app.requirement?.id || ''
  const position = app.candidate?.position || ''
  return `${requirementId}-${position}`
}

export function applicationStatus(app = {}) {
  return app.candidate?.status || 'SCREENED'
}
