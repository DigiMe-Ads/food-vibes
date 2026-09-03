import { Link } from 'react-router-dom'

export default function BookTable() {
  return (
    <section id="reservation" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/home/candlelit-dining-table.jpg"
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3a2f22] via-[#241d15]/90 to-[#1a1510]/70" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-white md:py-28">
        <p className="eyebrow flex items-center gap-3 text-gold-light">
          <span className="h-px w-6 bg-gold-light" />
          Ready to Vibe with us?
        </p>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
          Book Your Table for Breakfast, Lunch, or Dinner.
        </h2>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link to="/reservation" className="btn-solid">
            Make a Reservation
          </Link>
          <a
            href="#contact"
            className="text-xs font-medium uppercase tracking-label text-white/90 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  )
}
