import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '2', label: 'Cuisines Mastered' },
  { value: '4.8', label: 'Guest Rating' },
]

export default function MeetTheChef() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="chef" className="relative overflow-hidden bg-ink py-20 sm:py-28">
      {/* Subtle paper-grain texture, echoing the menu card treatment, on a
          dark ground so this section reads as a distinct "spotlight" beat
          between the story and the booking CTA. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(#fff 0.6px, transparent 0.6px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div
        ref={ref}
        className="reveal relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[minmax(0,380px)_1fr] md:gap-16"
      >
        {/* Photo */}
        <div className="group relative mx-auto w-full max-w-sm">
          <span className="pointer-events-none absolute -inset-3 border border-gold/40 transition-transform duration-500 group-hover:-inset-2" />
          <Placeholder
            src="/images/about/head-chef-ruwan.jpg"
            label="Chef Ruwan"
            alt="Chef Ruwan, Head Chef at Food Vibes"
            className="relative aspect-[4/5] w-full shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-label text-white shadow-lg">
            Head Chef
          </span>
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <p className="eyebrow flex items-center justify-center gap-3 text-gold-light md:justify-start">
            <span className="h-px w-6 bg-gold-light" />
            Meet the Chef
          </p>
          <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl">Chef Ruwan</h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:mx-0">
            With over two decades behind the pass — split between Sri Lanka
            and kitchens abroad — Chef Ruwan built the Food Vibes menu around
            one idea: familiar comfort food, cooked with real technique. From
            slow-built curries to tableside flambe, every dish that leaves
            the kitchen carries his hand on it, right down to the sauces made
            fresh each morning.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:mx-0">
            Off the pass, he&rsquo;s usually the one picking the catch of the
            day at the market before sunrise, or tasting his way through a
            new seasonal special before it ever reaches a table.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="group text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-serif text-4xl text-gold-light transition-colors duration-300 group-hover:text-gold">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-label text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
