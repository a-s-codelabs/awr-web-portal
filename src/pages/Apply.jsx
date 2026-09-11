import { useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { trpc, useSession, uploadFile } from '../lib/api.js'

const GENDERS = ['Male', 'Female', 'Other']

function FileUpload({ label, accept, value, onChange, required }) {
  const inputRef = useRef(null)

  return (
    <div>
      <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-outline-variant rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-surface-container-low transition-all"
      >
        {value ? (
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-primary">description</span>
            <span className="font-body-sm text-primary truncate max-w-[200px]">{value.name}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null) }}
              className="text-secondary hover:text-error"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        ) : (
          <div>
            <span className="material-symbols-outlined text-secondary text-2xl">cloud_upload</span>
            <p className="font-body-sm text-secondary mt-1">Click to upload</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </div>
  )
}

export default function Apply() {
  const { data: session } = useSession()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedRequestId = searchParams.get('requestId')

  const [selectedRequestId, setSelectedRequestId] = useState(preselectedRequestId || '')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [nationality, setNationality] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [resume, setResume] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [passportFront, setPassportFront] = useState(null)
  const [passportBack, setPassportBack] = useState(null)
  const [otherDocs, setOtherDocs] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadingNow, setUploadingNow] = useState(false)

  const { data: requirements, isLoading: reqLoading } = trpc.portal.getPublicRequirements.useQuery()

  const { data: existingApps } = trpc.portal.getApplicationStatus.useQuery(undefined, {
    enabled: !!session,
  })

  const { data: profile } = trpc.portal.getMyProfile.useQuery(undefined, {
    enabled: !!session,
  })

  const utils = trpc.useUtils()

  const submitMutation = trpc.portal.submitApplication.useMutation({
    onSuccess: () => {
      utils.portal.getApplicationStatus.invalidate()
      saveProfileAfterSubmit()
      setSuccess(true)
      setTimeout(() => navigate('/my-application'), 2000)
    },
    onError: (err) => {
      setError(err.message || 'Failed to submit application')
    },
  })

  const saveProfileMutation = trpc.portal.updateMyProfile.useMutation()

  function saveProfileAfterSubmit() {
    saveProfileMutation.mutate({
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      email: session.user?.email || undefined,
      phone: phone || undefined,
      passportNumber: passportNumber || undefined,
      nationality: nationality || undefined,
      gender: gender || undefined,
      dateOfBirth: dateOfBirth || undefined,
    })
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">Application Submitted!</h2>
          <p className="font-body-md text-secondary">Redirecting you to track your application...</p>
        </div>
      </div>
    )
  }

  const allRequirements = Array.isArray(requirements) ? requirements : (requirements?.data || requirements?.items || [])
  const appsList = Array.isArray(existingApps) ? existingApps : (existingApps?.data || existingApps?.items || [])
  const appliedPositions = new Set(
    appsList.map((app) => `${app.requirementId}-${app.position}`)
  )

  const selectedReq = allRequirements.find((r) => r.id === selectedRequestId)
  const positions = Array.isArray(selectedReq?.requirementItems) ? selectedReq.requirementItems : []

  function autofillProfile() {
    if (profile) {
      if (!firstName && profile.firstName) setFirstName(profile.firstName)
      if (!lastName && profile.lastName) setLastName(profile.lastName)
      if (!passportNumber && profile.passportNumber) setPassportNumber(profile.passportNumber)
      if (!phone && profile.phone) setPhone(profile.phone)
      if (!nationality && profile.nationality) setNationality(profile.nationality)
      if (!gender && profile.gender) setGender(profile.gender)
      if (!dateOfBirth && profile.dateOfBirth) setDateOfBirth(profile.dateOfBirth?.split('T')[0] || '')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!selectedRequestId) {
      setError('Please select a job position')
      return
    }

    if (!firstName || !lastName) {
      setError('Please enter your full name')
      return
    }

    setUploadingNow(true)

    try {
      const bucket = 'candidate-documents'
      const path = 'portal/applications'

      const [resumeUrl, photoUrl, passportFrontUrl, passportBackUrl, ...otherDocUrls] =
        await Promise.all([
          resume ? uploadFile({ file: resume, bucket, path }) : Promise.resolve(''),
          photo ? uploadFile({ file: photo, bucket, path }) : Promise.resolve(''),
          passportFront ? uploadFile({ file: passportFront, bucket, path }) : Promise.resolve(''),
          passportBack ? uploadFile({ file: passportBack, bucket, path }) : Promise.resolve(''),
          ...otherDocs.filter(Boolean).map((file) => uploadFile({ file, bucket, path })),
        ])

      const documents = []
      if (photoUrl) documents.push({ type: 'PHOTO', fileUrl: photoUrl, fileName: 'profile-photo' })
      if (passportFrontUrl) documents.push({ type: 'PASSPORT', fileUrl: passportFrontUrl, fileName: 'passport-front' })
      if (passportBackUrl) documents.push({ type: 'PASSPORT', fileUrl: passportBackUrl, fileName: 'passport-back' })
      if (resumeUrl) documents.push({ type: 'RESUME', fileUrl: resumeUrl, fileName: 'resume' })
      for (const url of otherDocUrls.filter(Boolean)) {
        documents.push({
          type: 'OTHER',
          fileUrl: url,
          fileName: url.split('/').pop() || 'document',
        })
      }

      submitMutation.mutate({
        requestId: selectedRequestId,
        position: selectedPosition || undefined,
        firstName,
        lastName,
        email: session.user?.email || undefined,
        passportNumber: passportNumber || undefined,
        phone: phone || undefined,
        nationality: nationality || undefined,
        gender: gender || undefined,
        dateOfBirth: dateOfBirth || undefined,
        resumeUrl: resumeUrl || undefined,
        documents: documents.length > 0 ? documents : undefined,
      })
    } catch (err) {
      setError(err.message || 'Failed to upload documents. Please try again.')
    } finally {
      setUploadingNow(false)
    }
  }

  function handleOtherDocsChange(index, file) {
    const updated = [...otherDocs]
    updated[index] = file
    setOtherDocs(updated)
  }

  function addOtherDoc() {
    if (otherDocs.length < 10) {
      setOtherDocs([...otherDocs, null])
    }
  }

  function removeOtherDoc(index) {
    setOtherDocs(otherDocs.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="text-center mb-8">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
          Apply for a Position
        </h1>
        <p className="font-body-md text-body-md text-secondary">
          Fill in your details and upload the required documents
        </p>
        {profile && (
          <button
            type="button"
            onClick={autofillProfile}
            className="mt-3 font-label-sm text-label-sm text-primary hover:text-emerald-500 transition-colors underline"
          >
            Auto-fill from saved profile
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Selection */}
        <div className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">work</span>
            Position
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Company / Requirement <span className="text-error">*</span>
              </label>
              {reqLoading ? (
                <div className="h-11 bg-surface-container rounded-lg animate-pulse" />
              ) : (
                <select
                  value={selectedRequestId}
                  onChange={(e) => { setSelectedRequestId(e.target.value); setSelectedPosition('') }}
                  required
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                >
                  <option value="">Select a company...</option>
                  {allRequirements.map((req) => (
                    <option key={req.id} value={req.id}>
                      {req.vendor?.companyName || 'Unknown Company'}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {positions.length > 0 && (
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                  Position / Role
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
                >
                  <option value="">All positions</option>
                  {positions.map((item, i) => {
                    const isApplied = appliedPositions.has(`${selectedRequestId}-${item.position || i}`)
                    return (
                      <option key={i} value={item.position || i} disabled={isApplied}>
                        {item.position} ({item.vacancies || 0} vacancies)
                        {isApplied ? ' - Already Applied' : ''}
                      </option>
                    )
                  })}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Personal Details */}
        <div className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">person</span>
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                First Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Last Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Passport Number
              </label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Nationality
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
              >
                <option value="">Select...</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-xl border border-outline-variant p-5 md:p-6 shadow-sm">
          <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">upload_file</span>
            Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FileUpload
              label="Resume / CV"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              value={resume}
              onChange={setResume}
            />
            <FileUpload
              label="Profile Photo"
              accept=".jpg,.jpeg,.png"
              value={photo}
              onChange={setPhoto}
            />
            <FileUpload
              label="Passport (Front)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={passportFront}
              onChange={setPassportFront}
            />
            <FileUpload
              label="Passport (Back)"
              accept=".pdf,.jpg,.jpeg,.png"
              value={passportBack}
              onChange={setPassportBack}
            />
          </div>

          <div className="mt-4">
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1.5">
              Other Documents (up to 10)
            </label>
            <div className="space-y-3">
              {otherDocs.map((doc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <FileUpload
                      label={`Document ${i + 1}`}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      value={doc}
                      onChange={(file) => handleOtherDocsChange(i, file)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOtherDoc(i)}
                    className="mt-5 text-secondary hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
              {otherDocs.length < 10 && (
                <button
                  type="button"
                  onClick={addOtherDoc}
                  className="flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-emerald-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add another document
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-outline-variant text-secondary rounded-lg font-label-md hover:bg-surface-container-high transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitMutation.isPending || uploadingNow}
            className="px-8 py-3 bg-primary text-white rounded-lg font-label-md hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitMutation.isPending || uploadingNow ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {uploadingNow && !submitMutation.isPending ? 'Uploading...' : 'Submitting...'}
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">send</span>
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
