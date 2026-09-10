import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SEO from './components/SEO.jsx'
import Home from './pages/Home.jsx'
import Careers from './pages/Careers.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Apply from './pages/Apply.jsx'
import MyApplication from './pages/MyApplication.jsx'

export default function App() {
  return (
    <>
      <SEO path={window.location.pathname} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portals" element={<Careers />} />
          <Route path="careers" element={<Careers />} />
          <Route path="jobs" element={<Careers />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="company" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="register" element={<Signup />} />
          <Route path="apply" element={<Apply />} />
          <Route path="my-application" element={<MyApplication />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}
