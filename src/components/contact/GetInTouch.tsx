import { useReveal } from '../../hooks/useReveal'
import { useSiteSettings } from '../../lib/firestore'

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-8 w-8',
}

const ICONS = {
  email: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
      <circle cx="18.5" cy="16.5" r="3.2" />
      <path d="m17 16.5 1 1 2-2" />
    </svg>
  ),
  phone: (
    <svg {...ICON_PROPS}>
      <path d="M8.5 3.5C6 5 4.5 6.7 4 8.7c-1 4 2.3 9 6.8 11.3 4.4 2.3 7.6 1.3 9-1.3.4-.8.2-1.7-.5-2.2l-2.7-2c-.6-.4-1.4-.4-1.9.1l-1 1c-1.6-.8-3.1-2.3-4-4l1-1c.5-.5.5-1.3.1-1.9l-2-2.7c-.4-.6-1.2-.8-1.9-.5Z" />
      <path d="M15 3c1.7.3 3 1.6 3.3 3.3M15 6.3c.9.2 1.5.8 1.7 1.7" />
    </svg>
  ),
  address: (
    <svg {...ICON_PROPS}>
      <path d="M9 4 3 6.5v14L9 18l6 2.5 6-2.5v-14L15 6.5 9 4Z" />
      <path d="M9 4v14M15 6.5V20.5" />
      <circle cx="12" cy="11" r="1.5" />
    </svg>
  ),
}

export default function GetInTouch() {
  const ref = useReveal<HTMLDivElement>()
  const { data: settings } = useSiteSettings()

  const CONTACT_ITEMS = [
    { label: 'Email Us', value: settings.email, href: `mailto:${settings.email}`, icon: ICONS.email },
    {
      label: 'Call Us',
      value: settings.phone,
      href: `tel:${settings.phone.replace(/[^+\d]/g, '')}`,
      icon: ICONS.phone,
    },
    { label: 'Find Us', value: settings.address, href: undefined, icon: ICONS.address },
  ]

  return (
    <section id="get-in-touch" className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Warm decorative band behind the heading, echoing the dark banded
          sections elsewhere on the site without needing another photo. */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream to-white" />

      <div ref={ref} className="reveal relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-gold" />
          Say Hello
        </p>
        <h2 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Get In Touch</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
          We&rsquo;d love to hear from you — drop by, give us a call, or send
          a message and our team will get back to you shortly.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {CONTACT_ITEMS.map((item, i) => {
            const cardClass =
              'group flex flex-col items-center gap-4 border border-neutral-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl hover:shadow-black/5 [animation-delay:var(--d)]'
            const cardStyle = { ['--d' as string]: `${i * 90}ms` }
            const content = (
              <>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-label text-ink">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm text-neutral-500">{item.value}</p>
                </div>
              </>
            )

            return item.href ? (
              <a key={item.label} href={item.href} className={cardClass} style={cardStyle}>
                {content}
              </a>
            ) : (
              <div key={item.label} className={cardClass} style={cardStyle}>
                {content}
              </div>
            )
          })}
        </div>

        <p className="mt-14 text-sm text-neutral-500">{settings.hours}</p>
      </div>
    </section>
  )
}
