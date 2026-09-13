const TEXT_FIELDS = [
  'firstName',
  'lastName',
  'phone',
  'passportNumber',
  'nationality',
  'gender',
  'notes',
]

const URL_FIELDS = ['resumeUrl', 'profilePhoto', 'passportFront', 'passportBack']

/**
 * Normalize a server profile row into editable form state. Date-of-birth keeps
 * its local YYYY-MM-DD part so saving an already-saved profile never drifts a
 * day (toISOString would shift to UTC).
 */
export function profileToForm(profile) {
  const p = profile || {}
  const out = {}
  for (const key of TEXT_FIELDS) out[key] = p[key] || ''
  out.dateOfBirth = toDateInput(p.dateOfBirth)
  for (const key of URL_FIELDS) out[key] = p[key] || ''
  out.otherDocs = Array.isArray(p.otherDocs) ? p.otherDocs : []
  return out
}

/**
 * Build the updateMyProfile payload. Blank/empty strings are dropped and the
 * session email is threaded through, mirroring the reference portal.
 */
export function toProfilePayload(form, session, docs) {
  const payload = {}
  for (const key of TEXT_FIELDS) {
    const value = clean(form?.[key])
    if (value !== undefined) payload[key] = value
  }
  const email = clean(session?.email)
  if (email !== undefined) payload.email = email
  const dateOfBirth = clean(form?.dateOfBirth)
  if (dateOfBirth !== undefined) payload.dateOfBirth = dateOfBirth

  if (docs) {
    for (const key of URL_FIELDS) {
      const value = clean(docs[key])
      if (value !== undefined) payload[key] = value
    }
    if (Array.isArray(docs.otherDocs) && docs.otherDocs.length > 0) {
      payload.otherDocs = docs.otherDocs
    }
  }
  return payload
}

function clean(value) {
  return typeof value === 'string' && value.trim() === '' ? undefined : value
}

function toDateInput(value) {
  if (!value) return ''
  const str = String(value)
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10)
  try {
    return new Date(str).toISOString().slice(0, 10)
  } catch {
    return ''
  }
}