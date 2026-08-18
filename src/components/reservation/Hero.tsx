export default function Hero() {
  return (
    <section
      id="reservation-hero"
      className="relative flex min-h-[65vh] items-center justify-center overflow-hidden sm:min-h-[70vh]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Fallback dark tone, sits behind the image so it only shows if the
            photo fails to load */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b2620] via-[#1a1712] to-[#0d0b08]" />
        <img
          src="/images/reservations/reservations-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto px-6 text-center text-white">
        <h1 className="animate-fade-up font-serif text-5xl uppercase leading-none tracking-wide sm:text-6xl md:text-7xl">
          Reservation
        </h1>
      </div>

      {/* Scroll indicator */}
      <a
        href="#book-a-table"
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
