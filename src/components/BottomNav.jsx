import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../data/company.js'

export default function BottomNav({ activePath }) {
  // Mobile bottom nav: Home, Jobs, Services, Contact
  const tabs = NAV_LINKS.filter((l) => ['/', '/careers', '/services', '/contact'].includes(l.href))

  const isActive = (href) => {
    if (href === '/') return activePath === '/'
    return activePath.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-outline-variant shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((t) => {
          const active = isActive(t.href)
          return (
            <Link
              key={t.href}
              to={t.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                active ? 'text-primary bg-primary-container/10' : 'text-secondary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {t.icon}
              </span>
              <span className="font-label-sm text-label-sm leading-none">{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}