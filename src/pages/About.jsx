import { ABOUT_BG, MD_PHOTO, COMPANY } from '../data/company.js'

const LEADERS = [
  {
    name: 'Mr. Abdulsamad Bhavikatti',
    role: 'Proprietor & MD',
    desc: 'Leading the strategic vision and ensuring compliance across all operations.',
    photo: MD_PHOTO,
  },
  {
    name: 'Mr. Mohammad Furqan',
    role: 'Operations Head',
    desc: 'Overseeing daily operations and ensuring seamless candidate processing.',
    photo: null,
  },
  {
    name: 'Mr. Mohamed Bin Maliq',
    role: 'Business Development',
    desc: 'Expanding client partnerships and managing international relations.',
    photo: null,
  },
]

const STRENGTHS = [
  { icon: 'verified', title: 'Stringent Vetting', desc: 'Rigorous screening processes ensuring only the most qualified candidates.' },
  { icon: 'handshake', title: 'Ethical Practices', desc: 'Unwavering commitment to fair and transparent recruitment methodologies.' },
  { icon: 'speed', title: 'Rapid Deployment', desc: 'Streamlined processes to minimize turnaround time from selection to deployment.' },
  { icon: 'support_agent', title: 'End-to-End Support', desc: 'Comprehensive assistance for both employers and candidates throughout.' },
]

const FOUNDATION = [
  { icon: 'visibility', title: 'Vision', desc: 'To be the universally trusted nexus for global talent mobility, setting the benchmark for ethical recruitment practices across the Middle East and beyond.' },
  { icon: 'flag', title: 'Mission', desc: 'To seamlessly connect top-tier global enterprises with exceptional talent, ensuring rigorous compliance, absolute transparency, and enduring partnerships.' },
  { icon: 'verified_user', title: 'Purpose', desc: 'To empower individuals through life-changing global opportunities while safeguarding their rights and dignity throughout the deployment lifecycle.' },
]

const CREDENTIALS = [
  { label: 'Registration Authority No.', value: 'RA-XXXXX-XXXX (Active)', status: 'ok' },
  { label: 'License Status', value: 'Valid & Active', status: 'ok' },
  { label: 'Entity Structure', value: 'Sole Proprietorship', status: 'info' },
  { label: 'Affiliation', value: COMPANY.parentGroup, status: 'info' },
]

const GCC = ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain']

export default function About() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-surface-container-lowest border-b border-surface-variant overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 z-0">
          <div className="bg-cover bg-center w-full h-full opacity-25" style={{ backgroundImage: `url('${ABOUT_BG}')` }} />
        </div>
        <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-24">
          <h1 className="font-headline-lg-mobile md:font-display text-headline-lg-mobile md:text-[48px] text-primary mb-3">
            Company Profile
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            Building global bridges through ethical recruitment. MEA Approved and part of the
            esteemed {COMPANY.parentGroup}.
          </p>
        </div>
      </section>

      {/* Executive Summary + Quote */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Exec Summary */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-outline-variant shadow-sm p-6 md:p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-primary-container/5 rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  corporate_fare
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-primary">Executive Summary</h2>
            </div>
            <p className="font-body-md text-body-md text-secondary mb-4 relative z-10 leading-relaxed">
              AL WAHID RECRUITER stands at the forefront of ethical overseas manpower deployment.
              Operating as a premier sole proprietorship, we are a proud constituent of the highly
              respected{' '}
              <strong className="text-primary">{COMPANY.parentGroup}</strong>.
            </p>
            <p className="font-body-md text-body-md text-secondary relative z-10 leading-relaxed">
              Our operational framework is meticulously aligned with the Ministry of External
              Affairs (MEA) standards, ensuring that every deployment represents a seamless blend of
              compliance, competence, and international labor standards.
            </p>
          </div>

          {/* Leadership Quote */}
          <div className="lg:col-span-5 bg-primary-container rounded-xl shadow-md p-6 md:p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-tertiary-fixed" />
            <div className="relative z-10 mb-6">
              <span className="material-symbols-outlined text-emerald-500/20 text-7xl absolute -top-3 -left-1" style={{ fontSize: 72 }}>
                format_quote
              </span>
              <p className="font-headline-md text-headline-md text-on-primary-container relative z-10 pt-6 italic leading-relaxed">
                "Trust is not granted; it is meticulously engineered through unwavering ethical
                standards, transparent processes, and a relentless commitment to the prosperity of
                both our candidates and our global partners."
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10 border-t border-on-primary-container/20 pt-5">
              <img
                src={MD_PHOTO}
                alt="Mr. Abdulsamad Bhavikatti"
                className="w-14 h-14 rounded-full border-2 border-emerald-500 object-cover bg-surface-container-low"
              />
              <div>
                <h3 className="font-label-md text-label-md text-white">Mr. Abdulsamad Bhavikatti</h3>
                <p className="font-body-sm text-body-sm text-on-primary-container opacity-90">
                  Proprietor & Managing Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16 border-t border-surface-variant">
        <div className="text-center mb-10">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
            Leadership & Team
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-3 max-w-2xl mx-auto">
            Guided by experienced professionals dedicated to ethical recruitment and operational excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {LEADERS.map((l) => (
            <div
              key={l.name}
              className="bg-white rounded-xl border border-outline-variant p-6 flex flex-col items-center text-center shadow-sm card-hover"
            >
              {l.photo ? (
                <img
                  src={l.photo}
                  alt={l.name}
                  className="w-28 h-28 rounded-full border-4 border-primary-container object-cover mb-4"
                />
              ) : (
                <div className="w-28 h-28 rounded-full border-4 border-primary-container bg-surface-container flex items-center justify-center mb-4 text-primary opacity-50">
                  <span className="material-symbols-outlined text-5xl">person</span>
                </div>
              )}
              <h3 className="font-headline-md text-headline-md text-primary mb-1">{l.name}</h3>
              <p className="font-label-md text-label-md text-emerald-500 mb-3 uppercase tracking-wider text-xs">
                {l.role}
              </p>
              <p className="font-body-sm text-body-sm text-secondary">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitive Strengths */}
      <section className="bg-surface-container-low py-12 md:py-16 border-y border-surface-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Competitive Strengths
            </h2>
            <p className="font-body-md text-body-md text-secondary mt-3 max-w-2xl mx-auto">
              Why leading organizations trust us for their manpower needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="bg-white p-5 rounded-xl border border-outline-variant shadow-sm card-hover">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <h3 className="font-label-md text-label-md text-primary mb-1.5">{s.title}</h3>
                <p className="font-body-sm text-body-sm text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Purpose */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
              Strategic Foundation
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FOUNDATION.map((f) => (
              <div
                key={f.title}
                className="bg-surface-container p-6 rounded-xl border border-outline-variant shadow-sm hover:border-emerald-500 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-4 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {f.icon}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">{f.title}</h3>
                <p className="font-body-sm text-body-sm text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Table */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-12 md:py-16 border-t border-surface-variant">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/3">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
              Legal & Regulatory Compliance
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-6">
              Operating strictly within the legal frameworks established by the Government of India.
            </p>
            <div className="p-4 bg-surface-container border-l-4 border-emerald-500 rounded-r-lg">
              <div className="flex items-center gap-2 text-primary mb-1">
                <span className="material-symbols-outlined text-emerald-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                  gavel
                </span>
                <span className="font-label-md text-label-md">MEA Approved Agency</span>
              </div>
              <p className="font-body-sm text-body-sm text-secondary">
                Authorized by the Ministry of External Affairs.
              </p>
            </div>
          </div>
          <div className="lg:w-2/3">
            <div className="rounded-xl border border-outline-variant overflow-hidden shadow-sm bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-navy-900 text-white">
                      <th className="font-label-md text-label-md py-3 px-5">Credential Type</th>
                      <th className="font-label-md text-label-md py-3 px-5">Detail / Status</th>
                      <th className="font-label-md text-label-md py-3 px-5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm">
                    {CREDENTIALS.map((c, i) => (
                      <tr key={c.label} className={i % 2 ? 'bg-surface-container-low' : 'bg-white'} >
                        <td className="py-3 px-5 border-b border-surface-variant font-medium text-primary">
                          {c.label}
                        </td>
                        <td className="py-3 px-5 border-b border-surface-variant text-secondary">
                          {c.value}
                        </td>
                        <td className="py-3 px-5 border-b border-surface-variant text-center">
                          <span
                            className={`material-symbols-outlined ${
                              c.status === 'ok' ? 'text-emerald-500' : 'text-secondary'
                            }`}
                          >
                            {c.status === 'ok' ? 'check_circle' : 'info'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Footprint */}
      <section className="bg-navy-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #10b981 0%, transparent 40%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-3 text-white">
              Geographic Footprint
            </h2>
            <p className="font-body-md text-body-md text-gray-400 max-w-2xl mx-auto">
              Bridging the talent landscape of India with the dynamic economies of the GCC region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Sourcing */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white">Sourcing Market</h3>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-emerald-400 mb-2">India</h4>
              <p className="font-body-sm text-body-sm text-gray-400 mb-5">
                Comprehensive pan-India sourcing network tapping into diverse skill pools.
              </p>
              <ul className="space-y-2">
                {[
                  'Pre-screening & Trade Testing',
                  'Medical & Background Verification',
                  'Emigration Clearance Assistance',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 font-body-sm text-body-sm text-white">
                    <span className="material-symbols-outlined text-emerald-400 text-sm">arrow_forward</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Destination */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-premium-gold/20 text-premium-gold flex items-center justify-center">
                  <span className="material-symbols-outlined">flight_land</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-white">Destination Markets</h3>
              </div>
              <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-premium-gold mb-2">GCC Region</h4>
              <p className="font-body-sm text-body-sm text-gray-400 mb-5">
                Serving top-tier employers across the Gulf Cooperation Council.
              </p>
              <div className="flex flex-wrap gap-2">
                {GCC.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded bg-white/10 border border-white/20 font-label-sm text-label-sm text-white"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}