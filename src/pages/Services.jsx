import { Link } from 'react-router-dom'

const EMPLOYER_SERVICES = [
  { title: 'Sourcing & Headhunting', desc: 'Targeted candidate identification across specialized sectors.' },
  { title: 'Technical Screening', desc: 'Rigorous trade tests and technical capability assessments.' },
  { title: 'Bulk Recruitment Campaigns', desc: 'Efficient management of large-scale hiring drives.' },
  { title: 'Executive Search', desc: 'Discreet placement for C-level and senior management roles.' },
  { title: 'Documentation Coordination', desc: 'End-to-end visa, medical, and MEA compliance handling.' },
]

const CANDIDATE_SERVICES = [
  { title: 'Global Job Placement', desc: 'Access to verified, high-quality opportunities across the Middle East.' },
  { title: 'Career Guidance', desc: 'Expert counseling on CV optimization and interview preparation.' },
  { title: 'Pre-Departure Orientation', desc: 'Cultural assimilation, legal rights, and workplace expectations training.' },
]

const PROCESS_STEPS = [
  { title: 'Demand Letter & POA', desc: 'Receiving formal requirements and legal authorization from the client.' },
  { title: 'Advertisement & Sourcing', desc: 'Targeted campaigns across databases, media, and networks.' },
  { title: 'Screening & Shortlisting', desc: 'Initial interviews and preliminary evaluation by our experts.' },
  { title: 'Trade Test & Interview', desc: 'Final selection via client interviews and practical assessments.' },
  { title: 'Medical Checkup', desc: 'Health screening at GCC/GAMCA approved centers.' },
  { title: 'Visa Processing', desc: 'End-to-end documentation and visa stamping formalities.' },
  { title: 'Emigration Clearance', desc: 'Securing necessary MEA/Protector of Emigrants approvals.' },
  { title: 'Orientation Program', desc: 'Pre-departure briefing on culture, laws, and safety.' },
  { title: 'Flight Ticketing', desc: 'Managing travel itineraries and booking air tickets.' },
  { title: 'Deployment & Arrival', desc: 'Ensuring safe transit and successful reporting to the employer.' },
]

function ServiceItem({ title, desc }) {
  return (
    <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-emerald-500 mt-0.5 text-lg">check_circle</span>
      <div>
        <strong className="font-label-md text-label-md text-on-surface">{title}</strong>
        <p className="font-body-sm text-body-sm text-secondary">{desc}</p>
      </div>
    </li>
  )
}

export default function Services() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-white border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-10 md:py-14 text-center">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
            Recruitment Services
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl mx-auto">
            Connecting global enterprises with top-tier talent through rigorous, MEA-approved
            processes and ethical recruitment practices.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employers */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 md:p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-5">
              <div className="bg-primary-container p-2.5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  business
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">For Employers</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-5">
              Strategic talent acquisition solutions tailored for complex, large-scale global operations.
            </p>
            <ul className="space-y-3.5 flex-grow">
              {EMPLOYER_SERVICES.map((s) => (
                <ServiceItem key={s.title} {...s} />
              ))}
            </ul>
          </div>

          {/* Candidates */}
          <div className="bg-white rounded-xl border border-outline-variant p-6 md:p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-5">
              <div className="bg-primary-container p-2.5 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                  person
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">For Candidates</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-5">
              Empowering professionals with legitimate overseas opportunities and comprehensive support.
            </p>
            <ul className="space-y-3.5 flex-grow">
              {CANDIDATE_SERVICES.map((s) => (
                <ServiceItem key={s.title} {...s} />
              ))}
            </ul>
            <div className="mt-5 pt-5 border-t border-outline-variant">
              <Link
                to="/careers"
                className="block w-full bg-primary-container text-white font-label-md text-label-md py-3 rounded-lg hover:bg-emerald-500 transition-colors text-center"
              >
                View Open Positions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Step Process */}
      <section className="bg-surface-container-low py-12 md:py-16 border-t border-surface-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
              Our Recruitment Process
            </h2>
            <p className="font-body-md text-body-md text-secondary max-w-3xl mx-auto">
              A rigorous 10-step methodology ensuring seamless sourcing, screening, and deployment
              of top talent.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="bg-white border border-outline-variant rounded-xl p-5 relative shadow-sm card-hover">
                <div className="w-9 h-9 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm absolute -top-4 left-5 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-label-md text-label-md text-primary mt-4 mb-1.5 text-sm">{step.title}</h3>
                <p className="font-body-sm text-body-sm text-secondary text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}