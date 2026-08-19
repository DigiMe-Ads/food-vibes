export default function Hero() {
  return (
    <section
      id="menu-hero"
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden sm:min-h-[70vh]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Fallback dark tone, sits behind the image so it only shows if the
            photo fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b2620] via-[#1a1712] to-[#0d0b08]" />
        <img
          src="/images/menu/sizzling-wok-flambe.jpg"
          alt=""
          className="absolute inset-0 h-full w-full animate-kenburns object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center text-white">
        <p className="eyebrow flex items-center justify-center gap-3 text-gold-light">
          <span className="h-px w-6 bg-gold-light" />
          Food Vibes
          <span className="h-px w-6 bg-gold-light" />
        </p>
        <h1 className="mt-5 animate-fade-up font-serif text-5xl uppercase leading-none tracking-wide sm:text-6xl md:text-7xl">
          The Menu
        </h1>
        <p className="mx-auto mt-6 max-w-md animate-fade-up text-sm leading-relaxed text-white/80 [animation-delay:120ms]">
          Fresh seafood, Sri Lankan classics, and international favorites —
          tap a category below to explore.
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#menu-grid"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/50 p-1">
          <span className="h-2 w-1 animate-bounce-slow rounded-full bg-white/80" />
        </span>
      </a>
    </section>
  )
}
