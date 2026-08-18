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
]

export default function Welcome() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="welcome" className="bg-white py-24">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="font-serif text-5xl text-ink">Welcome</h2>
          <p className="mt-4 text-sm text-neutral-500">Rated 4.8&#9733; on TripAdvisor</p>
        </div>

        {/* Cards */}
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Decorative quote mark on featured card */}
          <span className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 font-serif text-7xl leading-none text-gold">
            &rdquo;
          </span>

          {TESTIMONIALS.map((t) => (
            <article
              key={t.name}
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

        {/* Controls */}
        <div className="mt-14 flex flex-col items-center justify-between gap-8 sm:flex-row">
          <a href="#about" className="btn-solid">
            More About Us
          </a>

          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === 0 ? 'w-2 bg-gold' : 'w-2 bg-neutral-300'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-label text-ink">
              Slider Navigation
            </span>
            <button
              aria-label="Previous"
              className="text-lg text-ink transition-colors hover:text-gold"
            >
              &larr;
            </button>
            <button
              aria-label="Next"
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
