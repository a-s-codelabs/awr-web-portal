import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { trpc, useSession } from '../lib/api.js'

const STAGES = [
  { key: 'SCREENED', label: 'Screened', icon: 'fact_check' },
  { key: 'INTERVIEW', label: 'Interview', icon: 'groups' },
  { key: 'SELECTED_BY_VENDOR', label: 'Selected', icon: 'thumb_up' },
  { key: 'DOCUMENT_APPROVED', label: 'Docs Approved', icon: 'verified_documents' },
  { key: 'VISA_APPLIED', label: 'Visa Applied', icon: 'flight' },
  { key: 'VISA_ISSUED', label: 'Visa Issued', icon: 'badge' },
  { key: 'DEPLOYED', label: 'Deployed', icon: 'location_on' },
]

function getStageIndex(status) {
  return STAGES.findIndex((s) => s.key === status)
}

function StageStepper({ currentStatus }) {
  const currentIdx = getStageIndex(currentStatus)
  const isRejected = currentStatus === 'REJECTED'
  const isHired = currentStatus === 'HIRED'

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {STAGES.map((stage, i) => {
        const isActive = i <= currentIdx && !isRejected
        const isCurrent = stage.key === currentStatus

        return (
          <div key={stage.key} className="flex items-center gap-1 shrink-0">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                isCurrent
                  ? 'bg-primary text-white'
                  : isActive
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-surface-container text-secondary'
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {stage.icon}
              </span>
              <span className="hidden sm:inline">{stage.label}</span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`w-4 h-0.5 ${i < currentIdx ? 'bg-emerald-500' : 'bg-outline-variant'}`} />
            )}
          </div>
        )
      })}
      {(isRejected || isHired) && (
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isRejected ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isRejected ? 'cancel' : 'celebration'}
          </span>
          {currentStatus}
        </div>
      )}
    </div>
  )
}

function ApplicationCard({ app }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left hover:bg-surface-container-low/50 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-headline-md text-headline-md text-primary font-bold truncate">
                {app.requirement?.requirementTitle || 'Job Application'}
              </h3>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                  app.currentStatus === 'DEPLOYED'
                    ? 'bg-blue-50 text-blue-600'
                    : app.currentStatus === 'REJECTED'
                      ? 'bg-red-50 text-red-600'
                      : 'bg-emerald-500/10 text-emerald-600'
                }`}
              >
                {app.currentStatus?.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="font-body-sm text-secondary mb-3">
              {app.requirement?.vendor?.companyName || 'Unknown Company'}
              {app.position && ` — ${app.position}`}
            </p>
            <StageStepper currentStatus={app.currentStatus} />
          </div>
          <span
            className={`material-symbols-outlined text-secondary transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-outline-variant p-5 space-y-4">
          {/* Stage History */}
          {app.candidateStages?.length > 0 && (
            <div>
              <h4 className="font-label-md text-label-md text-primary mb-3">Timeline</h4>
              <div className="space-y-3">
                {[...app.candidateStages].reverse().map((stage, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1" />
                      {i < app.candidateStages.length - 1 && (
                        <div className="w-0.5 flex-grow bg-outline-variant" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="font-label-sm text-label-sm font-medium text-primary">
                        {stage.status?.replace(/_/g, ' ')}
                      </p>
                      {stage.notes && (
                        <p className="font-body-sm text-secondary mt-0.5">{stage.notes}</p>
                      )}
                      {stage.createdAt && (
                        <p className="font-body-xs text-secondary/70 mt-1">
                          {new Date(stage.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {app.candidateDocuments?.length > 0 && (
            <div>
              <h4 className="font-label-md text-label-md text-primary mb-2">Documents</h4>
              <div className="flex flex-wrap gap-2">
                {app.candidateDocuments.map((doc, i) => (
                  <a
                    key={i}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-surface-container rounded-lg font-body-sm text-sm text-primary hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">description</span>
                    {doc.documentType || doc.fileName || `Document ${i + 1}`}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function MyApplication() {
  const { data: session, isPending: authPending } = useSession()
  const navigate = useNavigate()

  const { data: applications, isLoading } = useQuery({
    ...trpc.portal.getApplicationStatus.queryOptions(),
    enabled: !!session,
  })

  if (authPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    navigate('/login', { replace: true })
    return null
  }

  const apps = applications || []

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-3">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-1">
            My Applications
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            Track the status of your job applications
          </p>
        </div>
        <Link
          to="/careers"
          className="font-label-md text-label-md bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-emerald-500 transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Browse Jobs
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 animate-pulse">
              <div className="h-5 bg-surface-container rounded w-1/3 mb-3" />
              <div className="h-4 bg-surface-container rounded w-1/4 mb-4" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-7 w-20 bg-surface-container rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-symbols-outlined text-6xl text-secondary/40 mb-4 block">
            inbox
          </span>
          <h2 className="font-headline-md text-headline-md text-primary mb-2">No Applications Yet</h2>
          <p className="font-body-md text-secondary mb-6">
            Start by browsing available positions and submitting your first application.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 bg-primary text-white font-label-md px-6 py-3 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">work</span>
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  )
}
