import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Fallback dark food-tone gradient, sits behind the image so it only
            shows if the photo fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b2620] via-[#1a1712] to-[#0d0b08]" />
        <img
          src="/images/home/unawatuna-restaurant-dining-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
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

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-sm font-medium uppercase leading-relaxed tracking-wide text-white/80 [animation-delay:400ms]">
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

      {/* Slider dots (decorative — carousel can be wired up later) */}
      <div className="absolute bottom-8 left-8 z-10 hidden items-center gap-2 sm:flex">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full border border-white/60 transition-colors ${
              i === 0 ? 'bg-white' : 'bg-transparent'
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

      {/* Nav arrows (decorative) */}
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-6 text-white/70 sm:flex">
        <button aria-label="Previous" className="transition-colors hover:text-white">
          &larr;
        </button>
        <button aria-label="Next" className="transition-colors hover:text-white">
          &rarr;
        </button>
      </div>
    </section>
  )
}
