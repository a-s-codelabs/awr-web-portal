import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BottomNav from './BottomNav.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import CookieConsent from 'react-cookie-consent'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-background">
      <Navbar activePath={pathname} />
      <main className="flex-grow pt-14 md:pt-16 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav activePath={pathname} />
      <WhatsAppButton />
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="awr-cookie-consent"
        expires={365}
        containerClasses="bg-navy-900 text-white px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg"
        contentClasses="text-gray-300 font-body-sm text-sm flex-1"
        buttonClasses="bg-primary text-white px-6 py-2 rounded-lg font-label-sm hover:bg-emerald-500 transition-colors whitespace-nowrap"
        declineButtonClasses="bg-transparent border border-gray-500 text-gray-300 px-6 py-2 rounded-lg font-label-sm hover:bg-white/10 transition-colors whitespace-nowrap"
        style={{ borderRadius: '0' }}
      >
        <span>
          We use cookies to enhance your experience, analyze site traffic, and improve our services.{' '}
          <a href="/cookies" className="text-emerald-400 underline hover:text-emerald-300">
            Learn more
          </a>
        </span>
      </CookieConsent>
    </div>
  )
}