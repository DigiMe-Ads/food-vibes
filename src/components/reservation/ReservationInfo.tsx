import { useReveal } from '../../hooks/useReveal'

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-7 w-7',
}

const INFO_ITEMS = [
  {
    text: 'Open daily, 7:30 AM – 11:00 PM',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    ),
  },
  {
    text: 'Live music every Thursday, Friday & Saturday from 6 PM — book early for a good seat',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 18V6l10-2v12" />
        <circle cx="7" cy="18" r="2.2" />
        <circle cx="17" cy="16" r="2.2" />
      </svg>
    ),
  },
  {
    text: "We'll confirm your reservation by phone/WhatsApp",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8.5 3.5C6 5 4.5 6.7 4 8.7c-1 4 2.3 9 6.8 11.3 4.4 2.3 7.6 1.3 9-1.3.4-.8.2-1.7-.5-2.2l-2.7-2c-.6-.4-1.4-.4-1.9.1l-1 1c-1.6-.8-3.1-2.3-4-4l1-1c.5-.5.5-1.3.1-1.9l-2-2.7c-.4-.6-1.2-.8-1.9-.5Z" />
      </svg>
    ),
  },
  {
    text: 'For large groups (10+) or private events, please call us directly at +94 76 578 2468',
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="8.5" cy="8" r="2.7" />
        <circle cx="16" cy="9" r="2.2" />
        <path d="M3.5 19c.5-3 2.2-4.7 5-4.7s4.5 1.7 5 4.7" />
        <path d="M14.2 14.6c2.2.2 3.6 1.8 4 4.4" />
      </svg>
    ),
  },
]

export default function ReservationInfo() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="bg-cream py-20 sm:py-24">
      <div ref={ref} className="reveal mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* Photo */}
        <div className="group relative order-2 mx-auto w-full max-w-md overflow-hidden shadow-xl shadow-black/10 md:order-1">
          <img
            src="/images/reservations/reserved-dining-table-wine.jpg"
            alt="A reserved table set for dinner at Food Vibes"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 border-4 border-white/20" />
        </div>

        {/* Info cards */}
        <div className="order-1 md:order-2">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-6 bg-gold" />
            Good to Know
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Reservation Info</h2>

          <div className="mt-9 space-y-4">
            {INFO_ITEMS.map((item, i) => (
              <div
                key={item.text}
                className="group flex items-start gap-4 border border-transparent bg-white/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white hover:shadow-lg hover:shadow-black/5 [animation-delay:var(--d)]"
                style={{ ['--d' as string]: `${i * 80}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  {item.icon}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
