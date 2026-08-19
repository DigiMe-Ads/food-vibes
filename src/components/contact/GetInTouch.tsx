import { useReveal } from '../../hooks/useReveal'

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-10 w-10',
}

const CONTACT_ITEMS = [
  {
    label: 'Email Us',
    value: 'hello@foodvibes.com',
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
        <circle cx="18.5" cy="16.5" r="3.2" />
        <path d="m17 16.5 1 1 2-2" />
      </svg>
    ),
  },
  {
    label: 'Call Us',
    value: '+94 76 578 2468',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M8.5 3.5C6 5 4.5 6.7 4 8.7c-1 4 2.3 9 6.8 11.3 4.4 2.3 7.6 1.3 9-1.3.4-.8.2-1.7-.5-2.2l-2.7-2c-.6-.4-1.4-.4-1.9.1l-1 1c-1.6-.8-3.1-2.3-4-4l1-1c.5-.5.5-1.3.1-1.9l-2-2.7c-.4-.6-1.2-.8-1.9-.5Z" />
        <path d="M15 3c1.7.3 3 1.6 3.3 3.3M15 6.3c.9.2 1.5.8 1.7 1.7" />
      </svg>
    ),
  },
  {
    label: 'Find Us',
    value: 'Beach Street, Unawatuna, Sri Lanka',
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 4 3 6.5v14L9 18l6 2.5 6-2.5v-14L15 6.5 9 4Z" />
        <path d="M9 4v14M15 6.5V20.5" />
        <circle cx="12" cy="11" r="1.5" />
      </svg>
    ),
  },
]

export default function GetInTouch() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="get-in-touch" className="bg-white py-20 sm:py-24">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-serif text-4xl text-ink sm:text-5xl">
          Get In Touch
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
          We&rsquo;d love to hear from you — drop by, give us a call, or send
          a message and our team will get back to you shortly.
        </p>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-3">
          {CONTACT_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="text-ink">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-neutral-500">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 text-sm text-neutral-500">
          Open daily &middot; 7:30 AM &ndash; 11:00 PM
        </p>
      </div>
    </section>
  )
}
