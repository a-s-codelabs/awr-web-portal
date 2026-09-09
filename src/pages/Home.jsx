import { Link } from 'react-router-dom'
import { trpc } from '../lib/api.js'
import { COMPANY, HERO_BG, CTA_BG } from '../data/company.js'
import JobCard from '../components/JobCard.jsx'

export default function Home() {
  const { data: requirements } = trpc.portal.getPublicRequirements.useQuery()

  const featured = (requirements || []).slice(0, 3).flatMap((req) => {
    const vendor = req.vendor?.companyName || 'Unknown Company'
    const items = req.requirementItems?.length > 0
      ? req.requirementItems
      : [{ position: req.requirementTitle || 'Open Position', vacancies: req.totalVacancies }]

    return items.slice(0, 1).map((item, i) => ({
      id: `${req.id}-${i}`,
      requestId: req.id,
      title: item.position || 'Open Position',
      company: vendor,
      location: req.regions?.map((r) => r.name).join(', ') || '',
      type: 'Full Time',
      salary: '',
      experience: '',
      tags: req.isUrgent ? ['URGENT'] : [],
      logo: req.vendor?.logoUrl ? null : vendor.slice(0, 2).toUpperCase(),
      logoUrl: req.vendor?.logoUrl,
    }))
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-navy-900 min-h-[500px] md:min-h-[600px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="relative z-10 w-full px-4 md:px-16 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 md:py-0">
          {/* Copy */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <span className="material-symbols-outlined text-emerald-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="font-label-sm text-label-sm text-white/90 tracking-wide uppercase">
                {COMPANY.tagline}
              </span>
            </div>
            <h1 className="font-display text-[28px] md:text-[48px] leading-tight font-bold text-white md:leading-[56px]">
              Empowering Careers.
              <br />
              <span className="text-emerald-400">Connecting Talent.</span>
            </h1>
            <p className="text-[18px] leading-[28px] text-gray-300 max-w-lg">
              Premier overseas recruitment agency bridging global talent with top opportunities in
              the GCC. Part of {COMPANY.parentGroup}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/careers"
                className="font-label-md text-label-md bg-emerald-500 text-white px-8 py-3.5 rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-center"
              >
                Search for Jobs
              </Link>
              <Link
                to="/signup"
                className="font-label-md text-label-md bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-center"
              >
                Register as Candidate
              </Link>
            </div>
          </div>

          {/* Quick Search Widget */}
          <div className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-md mx-auto lg:ml-auto mt-8 lg:mt-0">
            <h3 className="font-headline-md text-headline-md text-primary mb-5">Quick Job Search</h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Keywords</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">work</span>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white transition-all font-body-sm"
                    placeholder="e.g. Engineer, Nurse"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Country</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-secondary text-lg">location_on</span>
                  <select className="w-full pl-10 pr-4 py-2.5 border border-outline-variant rounded-lg bg-white transition-all font-body-sm appearance-none">
                    <option>All GCC</option>
                    <option>Saudi Arabia</option>
                    <option>UAE</option>
                    <option>Qatar</option>
                  </select>
                </div>
              </div>
              <Link
                to="/careers"
                type="button"
                className="w-full mt-2 bg-primary text-white font-label-md py-3 rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">search</span>
                Find Opportunities
              </Link>
            </form>
          </div>
        </div>
      </section>

      {/* Trust & Metrics */}
      <section className="py-16 md:py-20 px-4 md:px-16 bg-white max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
            A Legacy of Trust & Excellence
          </h2>
          <p className="font-body-md text-body-md text-secondary">
            Delivering reliable staffing solutions across borders with uncompromising ethical standards.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Trust Banner */}
          <div className="md:col-span-3 bg-white rounded-xl border border-outline-variant p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm card-hover">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  gavel
                </span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-primary mb-1">Government Approved</h3>
                <p className="font-body-sm text-body-sm text-secondary">
                  Ministry of External Affairs (MEA), Govt. of India
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 text-right w-full md:w-auto">
              <div className="font-label-sm text-label-sm text-secondary mb-1 uppercase tracking-wide">License</div>
              <div className="font-label-md text-label-md text-primary font-mono text-xs md:text-sm">
                {COMPANY.license}
              </div>
            </div>
          </div>
          {/* Metric Cards */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 flex flex-col items-center text-center shadow-sm card-hover">
            <span className="material-symbols-outlined text-3xl text-emerald-500 mb-3">event_available</span>
            <div className="font-display text-[48px] text-primary font-bold mb-1">{COMPANY.established}</div>
            <div className="font-label-md text-label-md text-secondary uppercase tracking-wider">Established</div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant p-6 flex flex-col items-center text-center shadow-sm card-hover">
            <span className="material-symbols-outlined text-3xl text-emerald-500 mb-3">domain</span>
            <div className="font-display text-[48px] text-primary font-bold mb-1">13+</div>
            <div className="font-label-md text-label-md text-secondary uppercase tracking-wider">Core Industries</div>
          </div>
          <div className="bg-white rounded-xl border border-outline-variant p-6 flex flex-col items-center text-center shadow-sm card-hover">
            <span className="material-symbols-outlined text-3xl text-emerald-500 mb-3">public</span>
            <div className="font-headline-md text-headline-md text-primary font-bold mb-2">GCC Focus</div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['UAE', 'KSA', 'Qatar', 'Oman'].map((c) => (
                <span key={c} className="px-2 py-1 bg-surface-container rounded text-xs font-medium text-secondary">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 md:py-20 px-4 md:px-16 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-3">
            <div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
                Featured Opportunities
              </h2>
              <p className="font-body-md text-body-md text-secondary">
                Top roles actively hiring across the Middle East.
              </p>
            </div>
            <Link
              to="/careers"
              className="font-label-md text-label-md text-emerald-500 flex items-center gap-1 hover:text-primary transition-colors group"
            >
              View All Jobs
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.length > 0 ? (
              featured.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-10">
                <p className="font-body-md text-secondary">Loading featured opportunities...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-container relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-90" />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15"
          style={{ backgroundImage: `url('${CTA_BG}')` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="font-headline-lg md:font-display text-headline-lg md:text-[48px] text-white font-bold mb-4">
            Ready to Accelerate Your Hiring?
          </h2>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim mb-8 max-w-2xl mx-auto">
            Partner with an MEA-approved agency to source top-tier talent for your projects across the GCC.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="bg-emerald-500 text-white font-label-md py-3.5 px-8 rounded-lg hover:bg-white hover:text-primary transition-colors shadow-lg text-center"
            >
              Post a Job Requirement
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border border-white/40 text-white font-label-md py-3.5 px-8 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
