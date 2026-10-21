export default function Hero() {
  return (
    <section
      id="gallery-hero"
      className="relative flex min-h-[55vh] items-center justify-center overflow-hidden sm:min-h-[60vh]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Fallback dark tone, sits behind the image so it only shows if the
            photo fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b2620] via-[#1a1712] to-[#0d0b08]" />
        <img
          src="/images/home/unawatuna-restaurant-dining-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 text-center text-white">
        <h1 className="animate-fade-up font-serif text-5xl uppercase leading-none tracking-wide sm:text-6xl md:text-7xl">
          Gallery
        </h1>
        <p className="mx-auto mt-5 max-w-md animate-fade-up text-sm leading-relaxed text-white/80 [animation-delay:150ms]">
          A look inside Food Vibes — our space, our plates, and the Unawatuna
          evenings in between.
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#gallery-grid"
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
