import { Link } from 'react-router-dom'

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant hover:border-emerald-500/40 card-hover shadow-sm p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div className="w-11 h-11 bg-surface-container rounded-lg flex items-center justify-center text-primary font-bold font-headline-md text-sm overflow-hidden">
          {job.logoUrl ? (
            <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain p-1" />
          ) : (
            <span>{job.logo || job.company.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        {job.tags?.length > 0 && (
          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded">
            {job.tags[0]}
          </span>
        )}
      </div>
      <h3 className="font-headline-md text-headline-md text-primary font-bold text-lg mb-1">
        {job.title}
      </h3>
      <p className="font-body-sm text-body-sm text-secondary mb-3">{job.company}</p>
      <div className="space-y-1.5 mb-4 flex-grow">
        <div className="flex items-center gap-2 text-sm text-secondary">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {job.location || 'Multiple Regions'}
        </div>
        {job.vacancies > 0 && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <span className="material-symbols-outlined text-sm">group</span>
            {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
          </div>
        )}
        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <span className="material-symbols-outlined text-sm">payments</span>
            {job.salary}
          </div>
        )}
        {job.experience && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <span className="material-symbols-outlined text-sm">work</span>
            {job.experience}
          </div>
        )}
        {job.type && !job.salary && (
          <div className="flex items-center gap-2 text-sm text-secondary">
            <span className="material-symbols-outlined text-sm">schedule</span>
            {job.type}
          </div>
        )}
      </div>
      <Link
        to={`/apply?requestId=${job.requestId}`}
        className="w-full py-2.5 border border-primary text-primary rounded-lg font-label-sm hover:bg-primary hover:text-white transition-colors text-center"
      >
        Apply Now
      </Link>
    </div>
  )
}