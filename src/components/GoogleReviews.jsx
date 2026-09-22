import { GOOGLE, COMPANY } from '../data/company.js'

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </span>
  )
}

export default function GoogleReviews() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-16 bg-white border-t border-outline-variant/30">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="text-[#4285F4]">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
              Rated on Google
            </h2>
          </div>
          <p className="font-body-md text-body-md text-secondary">
            See what candidates and partners say about {COMPANY.name} on Google.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Rating summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-outline-variant p-6 md:p-8 shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">{GOOGLE.placeName}</p>
                  <p className="font-body-sm text-body-sm text-secondary">Google Business Profile</p>
                </div>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div className="font-display text-[56px] leading-none text-primary font-bold">{GOOGLE.rating.toFixed(1)}</div>
                <div className="pb-1">
                  <Stars rating={GOOGLE.rating} />
                  <p className="font-body-sm text-body-sm text-secondary mt-1">{GOOGLE.reviewCount} reviews</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-5">
                <a
                  href={GOOGLE.reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#4285F4] text-white font-label-md font-bold py-3 rounded-lg hover:bg-[#3367d6] transition-colors"
                >
                  <span className="material-symbols-outlined text-base">rate_review</span>
                  Read All Reviews on Google
                </a>
                <a
                  href={GOOGLE.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-outline-variant text-primary font-label-md font-bold py-3 rounded-lg hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-base">map</span>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Live Google card embed */}
          <div className="lg:col-span-8">
            <div className="rounded-xl overflow-hidden border border-outline-variant shadow-sm bg-surface-container">
              <iframe
                src={GOOGLE.embedUrl}
                title={`${GOOGLE.placeName} on Google Maps`}
                width="100%"
                height="520"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}