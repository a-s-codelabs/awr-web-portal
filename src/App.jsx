import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
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
import Profile from './pages/Profile.jsx'
import PrivacyPolicy from './pages/policies/PrivacyPolicy.jsx'
import TermsOfService from './pages/policies/TermsOfService.jsx'
import RecruitmentCompliance from './pages/policies/RecruitmentCompliance.jsx'
import CandidateFeePolicy from './pages/policies/CandidateFeePolicy.jsx'
import AntiFraudPolicy from './pages/policies/AntiFraudPolicy.jsx'
import ComplaintsPolicy from './pages/policies/ComplaintsPolicy.jsx'
import RecruitmentDisclaimer from './pages/policies/RecruitmentDisclaimer.jsx'
import CookiePolicy from './pages/policies/CookiePolicy.jsx'

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
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="compliance" element={<RecruitmentCompliance />} />
          <Route path="fees" element={<CandidateFeePolicy />} />
          <Route path="anti-fraud" element={<AntiFraudPolicy />} />
          <Route path="complaints" element={<ComplaintsPolicy />} />
          <Route path="disclaimer" element={<RecruitmentDisclaimer />} />
          <Route path="cookies" element={<CookiePolicy />} />
          <Route
            path="apply"
            element={
              <ProtectedRoute>
                <Apply />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-application"
            element={
              <ProtectedRoute>
                <MyApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}
