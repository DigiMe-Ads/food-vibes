import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'

type Testimonial = {
  title: string
  body: string
  name: string
  date: string
  featured?: boolean
}

const TESTIMONIALS: Testimonial[] = [
  {
    title: 'The best restaurant!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Oscar Oldman',
    date: '02.02.21',
  },
  {
    title: 'It was very delicious!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Emma Newman',
    date: '02.02.21',
    featured: true,
  },
  {
    title: "I'm delighted!",
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Viktoria Freeman',
    date: '02.02.21',
  },
  {
    title: 'A hidden gem!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Daniel Cross',
    date: '15.01.22',
  },
  {
    title: 'Unforgettable evening!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Sophie Bennett',
    date: '22.03.22',
    featured: true,
  },
  {
    title: 'Worth every visit!',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.',
    name: 'Liam Carter',
    date: '09.06.22',
  },
]

const PAGE_SIZE = 3
const PAGE_COUNT = Math.ceil(TESTIMONIALS.length / PAGE_SIZE)

export default function Welcome() {
  const ref = useReveal<HTMLDivElement>()
  const [page, setPage] = useState(0)

  const goTo = (p: number) => setPage((p + PAGE_COUNT) % PAGE_COUNT)

  return (
    <section id="welcome" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-serif text-5xl text-ink">Welcome</h2>
          <p className="mt-4 text-sm text-neutral-500">Rated 4.8&#9733; on TripAdvisor</p>
        </div>

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
              {Array.from({ length: PAGE_COUNT }).map((_, p) => (
                <div
                  key={p}
                  className="grid w-full shrink-0 gap-6 px-1 md:grid-cols-3"
                >
                  {TESTIMONIALS.slice(p * PAGE_SIZE, p * PAGE_SIZE + PAGE_SIZE).map(
                    (t) => (
                      <article
                        key={t.name}
                        className={`group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 ${
                          t.featured
                            ? 'bg-cream shadow-xl shadow-black/5'
                            : 'border border-neutral-200 hover:shadow-lg hover:shadow-black/5'
                        }`}
                      >
                        <h3 className="font-serif text-2xl text-ink">
                          {t.title}
                        </h3>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
                          {t.body}
                        </p>
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Placeholder
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
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-14 flex flex-col items-center justify-between gap-8 sm:flex-row">
          <a href="#about" className="btn-solid">
            More About Us
          </a>

          <div className="flex items-center gap-2">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
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
      </div>
    </section>
  )
}
