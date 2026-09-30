import { Link } from 'react-router-dom'
import SEO from '../../components/SEO.jsx'

export default function PolicyLayout({ title, lastUpdated, children }) {
  return (
    <>
      <SEO path={window.location.pathname} />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <Link to="/" className="text-primary text-sm font-medium hover:text-emerald-500 transition-colors">
            ← Back to Home
          </Link>
        </div>

        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-2">
          {title}
        </h1>
        {lastUpdated && (
          <p className="font-body-sm text-sm text-secondary mb-8">
            Last updated: {lastUpdated}
          </p>
        )}

        <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 md:p-10 prose prose-sm max-w-none
          prose-headings:font-headline-md prose-headings:text-primary
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
          prose-p:text-secondary prose-p:font-body-sm prose-p:leading-relaxed
          prose-ul:text-secondary prose-ul:font-body-sm
          prose-ol:text-secondary prose-ol:font-body-sm
          prose-li:mb-1
          prose-strong:text-on-surface">
          {children}
        </div>
      </div>
    </>
  )
}
