import { Link } from 'react-router-dom'

export default function CallToAction() {
  return (
    <section className="bg-ink py-20 text-center text-white">
      <div className="mx-auto max-w-xl px-6">
        <p className="eyebrow flex items-center justify-center gap-3 text-gold-light">
          <span className="h-px w-6 bg-gold-light" />
          Hungry Already?
          <span className="h-px w-6 bg-gold-light" />
        </p>
        <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
          Reserve Your Table Today
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-white/70">
          Prices and dishes shown are subject to seasonal availability. Ask
          your server about today's specials.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/reservation" className="btn-solid">
            Make a Reservation
          </Link>
          <Link
            to="/contact"
            className="text-xs font-medium uppercase tracking-label text-white/90 underline-offset-4 transition-colors hover:text-gold-light hover:underline"
          >
            Get Directions
          </Link>
        </div>
      </div>
    </section>
  )
}
