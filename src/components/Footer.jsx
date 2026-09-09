import { Link } from 'react-router-dom'
import { COMPANY, NAV_LINKS } from '../data/company.js'

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-primary-container w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-16 py-12 max-w-[1280px] mx-auto">
        <div className="col-span-1 md:col-span-2">
          <div className="font-headline-md text-headline-md text-white font-bold mb-3 flex items-center gap-2">
            <img src={COMPANY.logo} alt="AL WAHID Logo" className="h-7 w-auto brightness-0 invert opacity-90" />
            {COMPANY.name}
          </div>
          <p className="font-body-sm text-body-sm text-gray-400 mb-4 max-w-md">
            Professional, ethical, and MEA-approved overseas staffing solutions connecting skilled
            professionals with premier organizations across the GCC.
          </p>
          <div className="font-label-sm text-label-sm text-gray-500">
            © 2018-2024 {COMPANY.name}. Proprietorship. Part of {COMPANY.parentGroup}. MEA Approved.
          </div>
        </div>

        <div>
          <h4 className="font-label-md text-label-md text-emerald-400 font-bold mb-3 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 font-body-sm text-body-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link className="text-gray-400 hover:text-emerald-400 transition-colors" to={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-label-md text-label-md text-emerald-400 font-bold mb-3 uppercase tracking-wider">
            Legal
          </h4>
          <ul className="flex flex-col gap-2 font-body-sm text-body-sm">
            <li><a className="text-gray-400 hover:text-emerald-400 transition-colors" href="#">Terms of Service</a></li>
            <li><a className="text-gray-400 hover:text-emerald-400 transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-gray-400 hover:text-emerald-400 transition-colors" href="#">Compliance</a></li>
          </ul>
          <div className="flex gap-2 mt-5">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-md">public</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-md">mail</span>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all">
              <span className="material-symbols-outlined text-md">call</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}