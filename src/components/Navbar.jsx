import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSession, authClient, invalidateSessionCache } from '../lib/api.js'
import { COMPANY, NAV_LINKS } from '../data/company.js'

export default function Navbar({ activePath }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session, isPending } = useSession()
  const navigate = useNavigate()

  const isActive = (href) => {
    if (href === '/') return activePath === '/'
    return activePath.startsWith(href)
  }

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          invalidateSessionCache()
          navigate('/')
          setMobileOpen(false)
        },
      },
    })
  }

  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-sm">
        <nav className="flex justify-between items-center w-full px-16 max-w-[1280px] mx-auto h-16">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={COMPANY.logo} alt="AL WAHID RECRUITER Logo" className="h-9 w-auto" />
            <span className="font-headline-md text-headline-md font-bold text-primary hidden lg:block">
              {COMPANY.name}
            </span>
          </Link>
          <div className="flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`font-label-md text-label-md transition-colors duration-200 py-1 ${
                  isActive(l.href)
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-secondary hover:text-emerald-500'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {isPending ? (
              <div className="w-20 h-9 bg-surface-container rounded-lg animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/my-application"
                  className={`font-label-md text-label-md transition-colors py-1 ${
                    isActive('/my-application')
                      ? 'text-primary font-bold'
                      : 'text-secondary hover:text-emerald-500'
                  }`}
                >
                  My Application
                </Link>
                <div className="w-px h-6 bg-outline-variant" />
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm font-bold">
                    {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="font-label-sm text-label-sm text-primary max-w-[120px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="font-label-md text-label-md text-secondary hover:text-error transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-label-md text-label-md text-primary border border-outline-variant px-4 py-2 rounded-lg hover:bg-surface-container-high transition-colors"
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  className="font-label-md text-label-md bg-primary-container text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition-colors"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-4 h-14">
        <Link to="/" className="flex items-center gap-2">
          <img src={COMPANY.logo} alt="AL WAHID RECRUITER Logo" className="h-8 w-auto" />
          <span className="font-headline-md text-sm font-bold text-primary">{COMPANY.shortName}</span>
        </Link>
        <button
          className="text-primary p-2"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span className="material-symbols-outlined text-[28px]">menu</span>
        </button>
      </div>

      {/* Mobile Side Menu */}
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/40 z-[60]" onClick={() => setMobileOpen(false)} />
          <nav className="md:hidden fixed top-0 left-0 h-full w-72 z-[70] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <img src={COMPANY.logo} alt="AL WAHID RECRUITER Logo" className="h-8 w-auto" />
                <span className="font-headline-md text-sm font-bold text-primary">
                  {COMPANY.shortName}
                </span>
              </div>
              <button className="text-secondary p-1" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-4 flex-grow overflow-y-auto">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                    isActive(l.href)
                      ? 'bg-primary-container text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined" style={isActive(l.href) ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                    {l.icon}
                  </span>
                  <span className="font-label-md text-label-md">{l.label}</span>
                </Link>
              ))}

              {session && (
                <Link
                  to="/my-application"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                    isActive('/my-application')
                      ? 'bg-primary-container text-on-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined">assignment</span>
                  <span className="font-label-md text-label-md">My Application</span>
                </Link>
              )}
            </div>
            <div className="p-4 border-t border-outline-variant space-y-2">
              {session ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-sm font-bold">
                      {session.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-label-sm text-label-sm text-primary truncate">
                      {session.user?.name || session.user?.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full border border-outline-variant text-secondary font-label-md py-3 rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block text-center border border-outline-variant text-primary font-label-md py-3 rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="w-full block text-center bg-primary-container text-white font-label-md py-3 rounded-lg hover:bg-emerald-500 transition-colors"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  )
}
