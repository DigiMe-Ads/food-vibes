import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Venue photos (from the client's JPG.zip), resized to 1920px wide.
const SLIDES = [
  { src: '/images/home/hero/01-storefront.jpg', alt: 'Food Vibes storefront in Unawatuna' },
  { src: '/images/home/hero/02-dining-walkway.jpg', alt: 'Dining tables along the lantern-lit walkway' },
  { src: '/images/home/hero/03-courtyard.jpg', alt: 'Open courtyard with string lights' },
  { src: '/images/home/hero/04-indoor-dining.jpg', alt: 'Indoor dining room with wooden tables' },
  { src: '/images/home/hero/05-bar-counter.jpg', alt: 'The bar counter with high stools' },
  { src: '/images/home/hero/06-lounge-bar.jpg', alt: 'Lounge area beside the bar' },
  { src: '/images/home/hero/07-booth-seating.jpg', alt: 'Cushioned booth seating' },
  { src: '/images/home/hero/08-bar-stools.jpg', alt: 'Bar stools and lounge seating' },
  { src: '/images/home/hero/09-evening-walkway.jpg', alt: 'The walkway lit up in the evening' },
  { src: '/images/home/hero/10-pizza-oven-bar.jpg', alt: 'Bar with the wood-fired pizza oven' },
]
const INTERVAL_MS = 6000

export default function Hero() {
  const [index, setIndex] = useState(0)
  // Only mount images that have been reached (+ the next one), so the page
  // doesn't download all ten photos up front.
  const [loadedUpTo, setLoadedUpTo] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = (i: number) => {
    const next = (i + SLIDES.length) % SLIDES.length
    setIndex(next)
    setLoadedUpTo((n) => Math.max(n, Math.min(next + 1, SLIDES.length - 1)))
  }

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => go(index + 1), INTERVAL_MS)
    return () => window.clearTimeout(t)
  }, [index, paused])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Fallback dark food-tone gradient, sits behind the image so it only
            shows if the photo fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b2620] via-[#1a1712] to-[#0d0b08]" />
        {SLIDES.map((slide, i) =>
          i <= loadedUpTo ? (
            <img
              key={slide.src}
              src={slide.src}
              alt={i === index ? slide.alt : ''}
              aria-hidden={i !== index}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === index ? 'animate-kenburns opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : null,
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <img
          src="/images/food-vibes-logo-white.png"
          alt="Food Vibes Restaurant &amp; Bar"
          className="mx-auto h-20 w-auto animate-fade-up sm:h-24 md:h-28"
        />

        <h2 className="mx-auto mt-8 max-w-xl animate-fade-up font-serif text-2xl italic text-white/95 [animation-delay:220ms] sm:text-3xl">
          Cozy dining with live music in the Heart of Unawatuna
        </h2>

        <div className="mx-auto mt-6 h-px w-12 animate-fade-in bg-gold [animation-delay:320ms]" />

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-sm font-medium leading-relaxed text-white/90 [animation-delay:400ms]">
          Just steps from Unawatuna Beach, Food Vibes is where fresh seafood, Sri
          Lankan flavors, amazing wood-fired pizza, and international favorites
          meet good music. Whether you're here for breakfast, brunch, a long
          lunch, or cocktails with dinner we are ready to serve you!
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-4 [animation-delay:500ms] sm:flex-row">
          <Link to="/reservation" className="btn-outline text-white">
            Reserve a Table
          </Link>
          <Link to="/menu" className="btn-outline text-white">
            View Menu
          </Link>
        </div>
      </div>

      {/* Slider dots */}
      <div className="absolute bottom-8 left-8 z-10 hidden items-center gap-2 sm:flex">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show photo ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            className={`h-2 w-2 rounded-full border border-white/60 transition-colors ${
              i === index ? 'bg-white' : 'bg-transparent hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#welcome"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/50 p-1">
          <span className="h-2 w-1 animate-bounce-slow rounded-full bg-white/80" />
        </span>
      </a>

      {/* Nav arrows */}
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-6 text-white/70 sm:flex">
        <button type="button" onClick={() => go(index - 1)} aria-label="Previous photo" className="transition-colors hover:text-white">
          &larr;
        </button>
        <button type="button" onClick={() => go(index + 1)} aria-label="Next photo" className="transition-colors hover:text-white">
          &rarr;
        </button>
      </div>
    </section>
  )
}
