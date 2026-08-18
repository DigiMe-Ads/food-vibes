import { useReveal } from '../../hooks/useReveal'

type Award = {
  label: string
  icon: JSX.Element
}

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const AWARDS: Award[] = [
  {
    label: 'HTFG 2020',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="6" />
        <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
      </svg>
    ),
  },
  {
    label: 'HTF 2019',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4 8l4 3 4-6 4 6 4-3-1.5 10h-13L4 8Z" />
        <path d="M6.5 18h11" />
      </svg>
    ),
  },
  {
    label: 'GFA 2019',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="6" />
        <path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
        <path d="M9.5 8h5M12 5.5v5" />
      </svg>
    ),
  },
  {
    label: 'LUA 2021',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5l1.4 2.9 3.2.5-2.3 2.2.5 3.2-2.8-1.5-2.8 1.5.5-3.2-2.3-2.2 3.2-.5L12 7.5Z" />
      </svg>
    ),
  },
]

export default function OurStory() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="story" className="bg-white py-20 sm:py-24">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-4xl text-ink sm:text-5xl">Our Story</h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Food Vibes Unawatuna opened its doors in October 2023, right in the
          heart of Unawatuna — a stone&rsquo;s throw from the beach and the
          buzz of Beach Street. What started as a small idea has grown into
          one of Unawatuna&rsquo;s most-loved dining spots, earning a
          4.8-star rating and a loyal following of travelers and locals
          alike. We believe good food should bring people together. So we
          built a menu that blends the best of both worlds: comforting Sri
          Lankan classics like rice &amp; curry, and international favorites
          spanning seafood, barbecue, and Asian-inspired dishes. Every plate
          is made fresh, every cocktail hand-crafted, and every guest
          treated like they just walked into a friend&rsquo;s home.
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Our vibe is filled with greenery, ceiling fans, and ocean air —
          it&rsquo;s the heart of the restaurant. It&rsquo;s where sunset
          dinners turn into long evenings, where our live music sessions
          fill the space from 6 PM onward, and where first-time visitors
          quickly become regulars.
        </p>

        {/* Awards */}
        <div className="mt-10 flex flex-wrap items-start justify-center gap-x-14 gap-y-6">
          {AWARDS.map((award) => (
            <div
              key={award.label}
              className="flex flex-col items-center gap-2 text-neutral-300 transition-colors duration-300 hover:text-gold"
            >
              <span className="h-9 w-9">{award.icon}</span>
              <span className="text-[10px] font-semibold uppercase tracking-label text-neutral-400">
                {award.label}
              </span>
            </div>
          ))}
        </div>

        {/* Interior photo */}
        <div className="relative mt-16 -mx-6 sm:mx-0">
          <div className="group relative mx-auto max-w-5xl overflow-hidden shadow-xl shadow-black/10">
            <img
              src="/images/about/our-story.jpg"
              alt="Inside the Food Vibes dining room"
              loading="lazy"
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Decorative — this is a static photo, not a video */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center bg-gold/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-0.5 h-5 w-5 fill-white"
                >
                  <path d="M7 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
