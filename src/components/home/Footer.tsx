import { Link } from 'react-router-dom'
import Placeholder from '../Placeholder'
import { useSiteSettings } from '../../lib/firestore'

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-4 w-4',
}

const SOCIALS = [
  {
    label: 'Facebook',
    key: 'facebook' as const,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    key: 'instagram' as const,
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'X',
    key: 'x' as const,
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M4.5 4.5 19.5 19.5M19.5 4.5 4.5 19.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    key: 'youtube' as const,
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="6" width="18" height="12" rx="3.5" />
        <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { data: settings } = useSiteSettings()

  return (
    <footer id="contact" className="bg-cream text-ink">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">
        {/* Logo */}
        <div className="mb-14">
          <img
            src="/images/food-vibes-logo-gold.png"
            alt="Food Vibes Restaurant &amp; Bar"
            className="h-14 w-auto"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="font-serif text-2xl">About us</h3>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-600">
              Located in Yaddehimulla, just steps from the beach, Food Vibes
              Unawatuna has been a local favorite since October 2023. Proudly
              maintaining a 4.8-star rating, we serve up incredible flavors to
              travelers and locals in the heart of Unawatuna.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block text-xs font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
            >
              Read More
            </Link>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={settings.socials[s.key] || '#'}
                  target={settings.socials[s.key] ? '_blank' : undefined}
                  rel={settings.socials[s.key] ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-gold hover:text-gold"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-2xl">Contact info</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Call :
                </dt>
                <dd className="text-neutral-700">{settings.phone}</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Write :
                </dt>
                <dd className="text-neutral-700">{settings.email}</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-20 shrink-0 whitespace-nowrap text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Find us :
                </dt>
                <dd className="text-neutral-700">{settings.address}</dd>
              </div>
            </dl>
            <Link
              to="/contact"
              className="mt-6 inline-block text-xs font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
            >
              Read More
            </Link>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-serif text-2xl">Gallery</h3>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {settings.galleryImages.map((src, i) => (
                <Placeholder
                  key={i}
                  src={src}
                  label=""
                  alt={`Gallery ${i + 1}`}
                  className="aspect-square rounded transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <a
                href="#"
                className="text-xs font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
              >
                See More
              </a>
              <div className="flex items-center gap-4 text-ink">
                <button aria-label="Previous" className="transition-colors hover:text-gold">
                  &larr;
                </button>
                <button aria-label="Next" className="transition-colors hover:text-gold">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-neutral-300/70 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; Food Vibes 2026 . All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[11px] font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  )
}
