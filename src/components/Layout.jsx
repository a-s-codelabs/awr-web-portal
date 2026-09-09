import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import BottomNav from './BottomNav.jsx'
import { Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-background">
      <Navbar activePath={pathname} />
      <main className="flex-grow pt-14 md:pt-0 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav activePath={pathname} />
    </div>
  )
}