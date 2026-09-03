import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'
import { useTestimonials } from '../../lib/firestore'

const PAGE_SIZE = 3

export default function Welcome() {
  const ref = useReveal<HTMLDivElement>()
  const { data: testimonials, loading } = useTestimonials()
  const [page, setPage] = useState(0)

  const pageCount = Math.max(1, Math.ceil(testimonials.length / PAGE_SIZE))
  const goTo = (p: number) => setPage((p + pageCount) % pageCount)

  return (
    <section id="welcome" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-serif text-5xl text-ink">Welcome</h2>
          <p className="mt-4 text-sm text-neutral-500">Rated 4.8&#9733; on TripAdvisor</p>
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
                          <h3 className="font-serif text-2xl text-ink">{t.title}</h3>
                          <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
                            {t.body}
                          </p>
                          <div className="mt-8 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Placeholder
                                src={t.avatar}
                                label=""
                                className="h-9 w-9 shrink-0 rounded-full"
                              />
                              <span className="text-xs font-semibold uppercase tracking-wide text-ink">
                                {t.name}
                              </span>
                            </div>
                            <span className="rounded bg-neutral-100 px-2 py-1 text-[11px] text-neutral-400">
                              {t.date}
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
