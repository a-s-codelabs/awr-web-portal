import { useRef, useState } from 'react'
import { COMPANY, MAP_IMG } from '../data/company.js'

function OfficeCard({ office, icon }) {
  return (
    <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden card-hover">
      <div className="bg-surface-container-low p-5 border-b border-outline-variant flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md text-primary">{office.label}</h2>
        <span className="material-symbols-outlined text-primary-container text-2xl">{icon}</span>
      </div>
      <div className="p-5 space-y-3">
        {office.entity && (
          <p className="font-label-md text-label-md text-on-surface-variant">{office.entity}</p>
        )}
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary mt-0.5">location_on</span>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant">{office.city}</p>
            <p className="font-body-sm text-body-sm text-secondary">{office.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">phone</span>
          <p className="font-body-md text-body-md text-on-surface">{office.phone}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">mail</span>
          <p className="font-body-md text-body-md text-on-surface">{office.email}</p>
        </div>
        <div className="pt-3 border-t border-surface-variant">
          <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-2">
            {office.label.includes('India') ? 'Leadership' : 'HR Contact'}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-bold">
              {office.contact.initials}
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">{office.contact.name}</p>
              <p className="font-body-sm text-body-sm text-secondary">{office.contact.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    subject: '',
    message: '',
    website: '',
  })

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

    try {
      const res = await fetch(`${baseUrl}/api/sales/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || data.message || 'Failed to send message')
      }

      setSent(true)
      formRef.current?.reset()
      setFormData({ name: '', email: '', phone: '', company: '', service: '', subject: '', message: '', website: '' })
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-white border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 py-10 md:py-14 text-center">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
            Get in Touch
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">
            Connect with our global recruitment experts. We bridge the gap between premier
            international employers and top-tier talent.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 md:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Office Cards */}
          <div className="lg:col-span-5 space-y-5">
            <OfficeCard office={COMPANY.offices.india} icon="corporate_fare" />
            <OfficeCard office={COMPANY.offices.uae} icon="domain" />
          </div>

          {/* Form & Map */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white border border-outline-variant rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="font-headline-md text-headline-md text-primary mb-5">Professional Inquiry</h3>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-body-sm text-sm">
                  {error}
                </div>
              )}

              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot - hidden from humans */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                      I am a...
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => updateField('service', e.target.value)}
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                    >
                      <option value="">Select...</option>
                      <option value="employer">Employer looking to hire</option>
                      <option value="candidate">Candidate looking for jobs</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                      Full Name
                    </label>
                    <input
                      required
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                      placeholder="John Doe"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                      Email Address
                    </label>
                    <input
                      required
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                      placeholder="john@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                      Phone Number
                    </label>
                    <input
                      required
                      className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                      placeholder="+971 50 000 0000"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                    Company Name
                  </label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                    placeholder="Your company (optional)"
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                    Subject
                  </label>
                  <input
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors"
                    placeholder="How can we assist you?"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-2.5 font-body-md text-body-md transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    rows="4"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>
                {sent && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 rounded-lg px-4 py-3 font-label-sm text-label-sm">
                    Thank you! Your inquiry has been received. Our team will contact you shortly.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-container text-white font-label-md text-label-md py-3.5 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <span className="material-symbols-outlined text-lg">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="h-52 md:h-64 rounded-xl overflow-hidden border border-outline-variant shadow-sm relative bg-surface-container">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${MAP_IMG}')` }} />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-outline-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-base">public</span>
                <span className="font-label-sm text-label-sm text-on-surface">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
