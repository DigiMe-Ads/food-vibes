import { Link } from 'react-router-dom'

export default function BookTable() {
  return (
    <section id="reservation" className="relative overflow-hidden bg-ink">
      {/* Photo — a transparent-edge PNG, so it blends straight into the
          dark background without needing a gradient overlay. Hidden on
          small phones: there isn't room for it to "peek" from the right
          without colliding with the heading text at that width. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 sm:block md:w-1/2 lg:w-3/5 lg:max-w-xl">
        <img
          src="/images/about/reserved-table-sign.png"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-white md:py-28">
        <div className="max-w-lg">
          <p className="eyebrow flex items-center gap-3 text-gold-light">
            <span className="h-px w-6 bg-gold-light" />
            Ready to Vibe with us?
          </p>
          <h2 className="mt-5 font-serif text-4xl uppercase leading-tight tracking-wide sm:text-5xl">
            Book Your Table for Breakfast, Lunch, Dinner.
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
      </div>
    </section>
  )
}
