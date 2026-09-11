import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trpc } from '../lib/api.js'

export default function Careers() {
  const [search, setSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  const { data: requirements, isLoading } = trpc.portal.getPublicRequirements.useQuery()

  const allJobs = (Array.isArray(requirements) ? requirements : (requirements?.data || requirements?.items || [])).flatMap((req) => {
    const vendor = req.vendor?.companyName || 'Unknown Company'
    const vendorLogo = req.vendor?.logoUrl
    const items = req.requirementItems?.length > 0
      ? req.requirementItems
      : [{ position: req.requirementTitle || 'Open Position', vacancies: req.totalVacancies }]

    return items.map((item, i) => ({
      id: `${req.id}-${i}`,
      requestId: req.id,
      title: item.position || 'Open Position',
      company: vendor,
      location: req.regions?.map((r) => r.name).join(', ') || '',
      vacancies: item.vacancies || 0,
      logo: vendorLogo,
      tags: req.isUrgent ? ['URGENT'] : [],
    }))
  })

  const allRegions = [...new Set(allJobs.flatMap((j) => j.location.split(', ').filter(Boolean)))]

  const filtered = allJobs.filter((job) => {
    const q = search.toLowerCase()
    const matchSearch = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q)
    const matchRegion = !selectedRegion || job.location.includes(selectedRegion)
    return matchSearch && matchRegion
  })

  return (
    <>
      {/* Search Header */}
      <section className="bg-white border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-10">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-5 text-center">
            Find Your Next Opportunity
          </h1>
          <div className="max-w-3xl mx-auto bg-surface-container-low rounded-xl p-4 border border-outline-variant shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">work</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Job title or company"
                  type="text"
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">location_on</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-outline-variant rounded-lg bg-white font-body-sm transition-all appearance-none"
                >
                  <option value="">All Regions</option>
                  {allRegions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <p className="font-body-md text-body-md text-secondary">
            Showing <strong className="text-primary">{filtered.length}</strong> available position{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-outline-variant p-5 animate-pulse flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container rounded-lg" />
                <div className="flex-grow space-y-2">
                  <div className="h-5 bg-surface-container rounded w-1/3" />
                  <div className="h-4 bg-surface-container rounded w-1/4" />
                  <div className="h-3 bg-surface-container rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-secondary/40 mb-4 block">work_off</span>
            <h2 className="font-headline-md text-headline-md text-primary mb-2">No Positions Found</h2>
            <p className="font-body-md text-secondary">
              {allJobs.length === 0
                ? 'No open positions at the moment. Check back soon!'
                : 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-outline-variant hover:border-emerald-500/40 card-hover shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                  {job.logo ? (
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-primary font-bold font-headline-md">
                      {job.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <h3 className="font-headline-md text-headline-md text-primary font-bold">{job.title}</h3>
                    {job.tags?.length > 0 && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded w-fit">
                        {job.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-body-sm text-secondary mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-secondary">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {job.location}
                      </span>
                    )}
                    {job.vacancies > 0 && (
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">group</span>
                        {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to={`/apply?requestId=${job.requestId}`}
                  className="px-6 py-2.5 border border-primary text-primary rounded-lg font-label-sm hover:bg-primary hover:text-white transition-colors shrink-0 self-start sm:self-center text-center"
                >
                  Apply
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
