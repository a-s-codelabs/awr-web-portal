import { useEffect } from 'react'
import { COMPANY } from '../data/company.js'

const SITE_URL = 'https://awrjobs.com'
const DEFAULT_IMAGE = COMPANY.logo

const SEO_CONFIG = {
  '/': {
    title: `${COMPANY.name} - MEA-Approved Overseas Recruitment Agency | GCC Jobs`,
    description: `Premier MEA-approved overseas recruitment agency connecting global talent with top opportunities in UAE, Saudi Arabia, Qatar & Oman. Licensed by Govt. of India. Part of ${COMPANY.parentGroup}.`,
    keywords: 'overseas recruitment, GCC jobs, Middle East hiring, manpower agency India, Dubai recruitment, Saudi Arabia jobs, Qatar employment, MEA approved agency',
  },
  '/careers': {
    title: `Browse Jobs - ${COMPANY.name} | Work in GCC Countries`,
    description: `Find overseas job opportunities in UAE, Saudi Arabia, Qatar & Oman. Browse nursing, engineering, construction, logistics & more positions through ${COMPANY.name}.`,
    keywords: 'overseas jobs, GCC careers, nursing jobs abroad, engineer jobs Dubai, construction jobs Saudi, logistics jobs Qatar',
  },
  '/services': {
    title: `Recruitment Services - ${COMPANY.name} | Manpower Solutions`,
    description: `End-to-end recruitment services: talent sourcing, screening, visa processing & deployment. Specialized in healthcare, construction, oil & gas across GCC.`,
    keywords: 'recruitment services, manpower solutions, overseas hiring, talent sourcing, visa processing, staffing agency',
  },
  '/about': {
    title: `About Us - ${COMPANY.name} | Our Legacy Since ${COMPANY.established}`,
    description: `Learn about ${COMPANY.name}, a MEA-approved recruitment agency established in ${COMPANY.established}. Part of ${COMPANY.parentGroup}, serving 13+ industries across GCC.`,
    keywords: 'about al wahid recruiter, recruitment agency history, MEA approved, manpower agency India, overseas recruitment experience',
  },
  '/contact': {
    title: `Contact Us - ${COMPANY.name} | Get in Touch`,
    description: `Contact ${COMPANY.name} for recruitment inquiries. Offices in Dharwad, Karnataka & Dubai, UAE. Phone, email & office address available.`,
    keywords: 'contact recruitment agency, overseas job inquiry, recruitment agency India, Dubai HR office',
  },
}

export default function SEO({ path }) {
  const config = SEO_CONFIG[path] || SEO_CONFIG['/']
  const canonicalUrl = `${SITE_URL}${path}`

  useEffect(() => {
    document.title = config.title

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', config.description)
    setMeta('keywords', config.keywords)
    setMeta('robots', 'index, follow')
    setMeta('author', COMPANY.name)

    // Open Graph
    setMeta('og:title', config.title, 'property')
    setMeta('og:description', config.description, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', canonicalUrl, 'property')
    setMeta('og:image', DEFAULT_IMAGE, 'property')
    setMeta('og:site_name', COMPANY.name, 'property')
    setMeta('og:locale', 'en_US', 'property')

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', config.title)
    setMeta('twitter:description', config.description)
    setMeta('twitter:image', DEFAULT_IMAGE)

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)

    // Structured Data - Organization
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: COMPANY.name,
      url: SITE_URL,
      logo: DEFAULT_IMAGE,
      description: config.description,
      foundingDate: String(COMPANY.established),
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.offices.india.address,
        addressLocality: 'Dharwad',
        addressRegion: 'Karnataka',
        postalCode: '580001',
        addressCountry: 'IN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: COMPANY.offices.india.phone,
          contactType: 'customer service',
          areaServed: 'IN',
        },
        {
          '@type': 'ContactPoint',
          telephone: COMPANY.offices.uae.phone,
          contactType: 'customer service',
          areaServed: ['AE', 'SA', 'QA', 'OM'],
        },
      ],
    }

    const existingSchema = document.getElementById('org-schema')
    if (existingSchema) existingSchema.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'org-schema'
    script.textContent = JSON.stringify(orgSchema)
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [path])

  return null
}
