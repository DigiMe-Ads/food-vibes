import Placeholder from '../Placeholder'

const SOCIALS = ['Facebook', 'Instagram', 'X', 'YouTube']
const GALLERY = [
  '/images/gallery/food-vibes-signage.jpg',
  '/images/gallery/chocolate-dessert-plate.jpg',
  '/images/gallery/tropical-cocktail-drink.jpg',
  '/images/gallery/bar-shelf-bottles.jpg',
]

export default function Footer() {
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
              Located just steps from the beach on Beach Street, Food Vibes
              Unawatuna has been a local favorite since October 2023. Proudly
              maintaining a 4.8-star rating, we serve up incredible flavors to
              travelers and locals in the heart of Unawatuna.
            </p>
            <a
              href="#about"
              className="mt-6 inline-block text-xs font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
            >
              Read More
            </a>
            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="text-neutral-500 transition-colors hover:text-gold"
                >
                  <span className="text-sm font-medium">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-2xl">Contact info</h3>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex gap-6">
                <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Call :
                </dt>
                <dd className="text-neutral-700">+76 (094) 754 43 71</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Write :
                </dt>
                <dd className="text-neutral-700">hello@foodvibes.com</dd>
              </div>
              <div className="flex gap-6">
                <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-label text-neutral-500">
                  Find us :
                </dt>
                <dd className="text-neutral-700">Unawatuna, Sri Lanka</dd>
              </div>
            </dl>
            <a
              href="#contact"
              className="mt-6 inline-block text-xs font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
            >
              Read More
            </a>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-serif text-2xl">Gallery</h3>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {GALLERY.map((src, i) => (
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
          <a
            href="#home"
            className="text-[11px] font-semibold uppercase tracking-label text-gold transition-colors hover:text-gold-dark"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  )
}
