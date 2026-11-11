import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'
import { useSiteSettings, useTestimonials } from '../../lib/firestore'

const PAGE_SIZE = 3

// ISO dates (2025-12-24) display as "Dec 2025"; anything else as typed.
function formatDate(date: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)
  if (!m) return date
  return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

// Long reviews start clamped with a "Read more" toggle so one big review
// doesn't stretch every card on the row. Keeps the reviewer's line breaks.
function ReviewText({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  const long = text.length > 280
  return (
    <div className="mt-4 flex-1">
      <p
        className={`whitespace-pre-line text-sm leading-relaxed text-neutral-500 ${
          long && !open ? 'line-clamp-6' : ''
        }`}
      >
        {text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-2 text-[11px] font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
        >
          {open ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className={`h-4 w-4 ${n <= rating ? 'fill-current' : 'fill-neutral-200'}`} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

export default function Welcome() {
  const ref = useReveal<HTMLDivElement>()
  const { data: testimonials, loading } = useTestimonials()
  const { data: settings } = useSiteSettings()
  const [page, setPage] = useState(0)

  const ratings = [
    { label: 'Google', rating: settings.googleRating, count: settings.googleReviewCount, url: settings.googleUrl },
    { label: 'TripAdvisor', rating: settings.tripadvisorRating, count: settings.tripadvisorReviewCount, url: settings.tripadvisorUrl },
  ].filter((r) => r.rating.trim())

  const pageCount = Math.max(1, Math.ceil(testimonials.length / PAGE_SIZE))
  const goTo = (p: number) => setPage((p + pageCount) % pageCount)

  return (
    <section id="welcome" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-serif text-5xl text-ink">Welcome</h2>
          {ratings.length > 0 && (
            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-neutral-500">
              {ratings.map((r, i) => (
                <span key={r.label} className="flex items-center gap-3">
                  {i > 0 && <span className="text-neutral-300">|</span>}
                  <a
                    href={r.url || undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Rated <span className="font-semibold text-ink">{r.rating}&#9733;</span> on {r.label}
                    {r.count.trim() ? ` (${r.count} reviews)` : ''}
                  </a>
                </span>
              ))}
            </p>
          )}
        </div>

        {loading ? (
          <p className="mt-16 text-center text-sm text-neutral-400">Loading reviews…</p>
        ) : testimonials.length === 0 ? (
          <p className="mt-16 text-center text-sm text-neutral-400">
            Guest reviews are on their way — check back soon.
          </p>
        ) : (
          <>
            {/* Slider */}
            <div className="relative mt-16">
              {/* Decorative quote mark */}
              <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 font-serif text-7xl leading-none text-gold">
                &rdquo;
              </span>

              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${page * 100}%)` }}
                >
                  {Array.from({ length: pageCount }).map((_, p) => (
                    <div key={p} className="grid w-full shrink-0 gap-6 px-1 md:grid-cols-3">
                      {testimonials.slice(p * PAGE_SIZE, p * PAGE_SIZE + PAGE_SIZE).map((t) => (
                        <article
                          key={t.id}
                          className={`group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                            t.featured
                              ? 'bg-cream shadow-xl shadow-black/5'
                              : 'border border-neutral-200 hover:shadow-lg hover:shadow-black/5'
                          }`}
                        >
                          {t.rating && <Stars rating={t.rating} />}
                          {t.title && <h3 className="mt-3 font-serif text-2xl text-ink first:mt-0">{t.title}</h3>}
                          <ReviewText text={t.body} />
                          <div className="mt-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Placeholder
                                src={t.avatar}
                                label=""
                                className="h-9 w-9 shrink-0 rounded-full"
                              />
                              {t.url ? (
                                <a
                                  href={t.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-semibold uppercase tracking-wide text-ink transition-colors hover:text-gold"
                                >
                                  {t.name}
                                </a>
                              ) : (
                                <span className="text-xs font-semibold uppercase tracking-wide text-ink">
                                  {t.name}
                                </span>
                              )}
                            </div>
                            <span className="shrink-0 rounded bg-neutral-100 px-2 py-1 text-[11px] text-neutral-400">
                              {[t.source, formatDate(t.date)].filter(Boolean).join(' · ')}
                            </span>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-14 flex flex-col items-center justify-between gap-8 sm:flex-row">
              <Link to="/about" className="btn-solid">
                More About Us
              </Link>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonials page ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === page ? 'w-6 bg-gold' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[11px] font-semibold uppercase tracking-label text-ink">
                  Slider Navigation
                </span>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => goTo(page - 1)}
                  className="text-lg text-ink transition-colors hover:text-gold"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => goTo(page + 1)}
                  className="text-lg text-ink transition-colors hover:text-gold"
                >
                  &rarr;
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
