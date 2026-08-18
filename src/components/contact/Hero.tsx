export default function Hero() {
  return (
    <section
      id="contact-hero"
      className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#0d0b08] sm:min-h-[70vh]"
    >
      {/* Map background */}
      <div className="absolute inset-0">
        <iframe
          title="Food Vibes on the map — Unawatuna, Sri Lanka"
          src="https://www.google.com/maps?q=Unawatuna,+Sri+Lanka&z=15&output=embed"
          className="h-full w-full invert-[0.9] hue-rotate-180 contrast-[0.85] brightness-[0.85] saturate-[1.4]"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Fade for text legibility on the left, darker overall tint to match
            the site's night palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08] via-[#0d0b08]/70 to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Decorative pin marking the restaurant */}
      <span className="absolute left-[38%] top-1/2 z-10 -translate-x-1/2 -translate-y-full">
        <svg viewBox="0 0 24 24" className="h-9 w-9 fill-gold drop-shadow-lg">
          <path d="M12 2c-4.2 0-7.5 3.3-7.5 7.4C4.5 15 12 22 12 22s7.5-7 7.5-12.6C19.5 5.3 16.2 2 12 2Zm0 10a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
        </svg>
      </span>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-white lg:px-10">
        <h1 className="animate-fade-up font-serif text-5xl uppercase leading-none tracking-wide sm:text-6xl md:text-7xl">
          Contact
        </h1>
        <p className="mt-4 animate-fade-up text-sm text-white/80 [animation-delay:120ms]">
          Unawatuna, Sri Lanka
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#contact-details"
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
