import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { trpc, useSession } from '../lib/api.js'
import { profileToForm, toProfilePayload } from '../lib/profile.js'
import { UrlFileUpload, MultiUrlFileUpload } from '../components/UrlFileUpload.jsx'

const GENDERS = ['Male', 'Female', 'Other']

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block font-label-sm text-label-sm text-on-surface-variant">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:bg-surface-container disabled:text-secondary disabled:cursor-not-allowed'

export default function Profile() {
  const { data: session } = useSession()

  const { data: profile, isLoading: profilePending } = trpc.portal.getMyProfile.useQuery(
    undefined,
    { enabled: !!session },
  )

  const initial = useMemo(() => profileToForm(profile), [profile])
  const [form, setForm] = useState(initial)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setForm(profileToForm(profile))
  }, [profile])

  const utils = trpc.useUtils()
  const save = trpc.portal.updateMyProfile.useMutation({
    onSuccess: async () => {
      setShowSaved(true)
      setIsEditing(false)
      await utils.portal.getMyProfile.invalidate()
    },
    onError: (err) => setError(err.message),
  })

  const hasSavedData = useMemo(
    () =>
      Boolean(
        profile &&
          (profile.firstName ||
            profile.passportNumber ||
            profile.resumeUrl ||
            profile.updatedAt),
      ),
    [profile],
  )

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const docs = {
    resumeUrl: form.resumeUrl,
    profilePhoto: form.profilePhoto,
    passportFront: form.passportFront,
    passportBack: form.passportBack,
    otherDocs: form.otherDocs,
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    save.mutate(toProfilePayload(form, session?.user, docs))
  }

  if (profilePending && !profile) {
    return (
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="h-8 w-64 bg-surface-container rounded animate-pulse mb-6" />
        <div className="h-72 bg-surface-container rounded-xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <div>
          <p className="font-label-md text-label-md text-emerald-600 font-semibold">
            My Profile
          </p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-1">
            Your candidate profile
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            Save your details once and they will auto-fill every job application
            you submit.
          </p>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => {
              setError(null)
              setIsEditing(true)
            }}
            className="flex items-center gap-2 bg-primary text-white font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
            Edit profile
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm text-sm">
            {error}
          </div>
        )}
        {!isEditing && (
          <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-sm text-sm text-secondary">
            <span className="material-symbols-outlined text-lg">visibility</span>
            Your profile is saved and used to auto-fill applications. Click
            &ldquo;Edit profile&rdquo; to change your details.
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First name">
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Last name">
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Passport number">
              <input
                type="text"
                value={form.passportNumber}
                onChange={(e) => set('passportNumber', e.target.value)}
                placeholder="e.g. Z1234567"
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+92 3XX XXXXXXX"
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Nationality">
              <input
                type="text"
                value={form.nationality}
                onChange={(e) => set('nationality', e.target.value)}
                placeholder="e.g. Pakistani, Indian"
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Gender">
              <select
                value={form.gender}
                onChange={(e) => set('gender', e.target.value)}
                disabled={!isEditing}
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </Field>
            <Field label="Date of birth">
              <input
                type="date"
                value={form.dateOfBirth}
                onChange={(e) => set('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className={inputClass}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={session?.user?.email || ''}
                readOnly
                className={`${inputClass} bg-surface-container disabled:cursor-not-allowed`}
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Additional notes">
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Any extra information you'd like included in your applications..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary font-bold mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined">upload_file</span>
            Documents
          </h2>
          <p className="font-body-sm text-sm text-secondary mb-4">
            Upload once here so they are attached to your applications. Up to
            25MB per file.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UrlFileUpload
              label="Resume / CV"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={form.resumeUrl}
              onUpload={(url) => set('resumeUrl', url)}
              onRemove={() => set('resumeUrl', '')}
              disabled={!isEditing}
              hint={isEditing ? 'PDF, Word, or image up to 25MB' : undefined}
            />
            <UrlFileUpload
              label="Profile photo"
              accept=".jpg,.jpeg,.png"
              value={form.profilePhoto}
              onUpload={(url) => set('profilePhoto', url)}
              onRemove={() => set('profilePhoto', '')}
              disabled={!isEditing}
            />
            <UrlFileUpload
              label="Passport (front)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={form.passportFront}
              onUpload={(url) => set('passportFront', url)}
              onRemove={() => set('passportFront', '')}
              disabled={!isEditing}
            />
            <UrlFileUpload
              label="Passport (back)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={form.passportBack}
              onUpload={(url) => set('passportBack', url)}
              onRemove={() => set('passportBack', '')}
              disabled={!isEditing}
            />
            <div className="md:col-span-2">
              <MultiUrlFileUpload
                label="Other documents (optional)"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                values={form.otherDocs}
                onUpload={(urls) => set('otherDocs', urls)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="flex flex-col-reverse sm:flex-row gap-3 items-center pt-2">
            <button
              type="button"
              onClick={() => {
                setError(null)
                setForm(initial)
                setIsEditing(false)
              }}
              disabled={save.isPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 border-2 border-outline-variant text-secondary rounded-lg font-label-md hover:bg-surface-container-high transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">close</span>
              Cancel
            </button>
            <button
              type="submit"
              disabled={save.isPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-label-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {save.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">save</span>
                  {hasSavedData ? 'Update profile' : 'Save profile'}
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="pt-2">
            <Link
              to="/careers"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-lg font-label-md hover:bg-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-lg">work</span>
              Browse Jobs
            </Link>
          </div>
        )}
      </form>

      {/* Saved confirmation */}
      {showSaved && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Profile saved"
        >
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl">
            <div className="flex flex-col items-center px-8 py-10 text-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-5xl text-emerald-500">
                  check_circle
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary font-bold">
                Profile saved
              </h3>
              <p className="font-body-md text-body-md text-secondary mt-2">
                It will be used to auto-fill your future applications.
              </p>
            </div>
            <div className="border-t border-outline-variant p-4">
              <button
                type="button"
                onClick={() => setShowSaved(false)}
                className="w-full py-3 bg-primary text-white rounded-lg font-label-md hover:bg-emerald-500 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}