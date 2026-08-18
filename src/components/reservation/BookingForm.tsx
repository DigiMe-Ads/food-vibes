import { useState } from 'react'

const GUEST_OPTIONS = [
  '1 Guest',
  '2 Guests',
  '3 Guests',
  '4 Guests',
  '5 Guests',
  '6 Guests',
  '7 Guests',
  '8+ Guests',
]

const TIME_OPTIONS = [
  '7:30 AM',
  '8:30 AM',
  '9:30 AM',
  '10:30 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
]

const fieldClass =
  'w-full border border-neutral-200 bg-neutral-50/60 px-5 py-4 text-sm text-ink placeholder:text-neutral-400 transition-colors focus:border-gold focus:bg-white focus:outline-none'

function SelectChevron() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  )
}

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false)
  const [guests, setGuests] = useState('')
  const [time, setTime] = useState('')

  return (
    <section id="book-a-table" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="mx-auto block h-px w-8 bg-gold" />
        <p className="eyebrow mt-3">Reservation</p>
        <h2 className="mt-4 font-serif text-5xl text-ink">Book Your Table</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-500">
          Reserve your spot for breakfast, lunch, dinner, or our Thursday
          live music night. We recommend booking ahead, especially for
          rooftop seating and weekends.
        </p>

        <form
          className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            aria-label="Full Name"
            required
            className={fieldClass}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            required
            className={fieldClass}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            aria-label="Phone Number"
            required
            className={fieldClass}
          />

          <div className="relative">
            <select
              name="guests"
              aria-label="Number of Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              className={`${fieldClass} appearance-none pr-10 ${
                guests ? 'text-ink' : 'text-neutral-400'
              }`}
            >
              <option value="" disabled>
                Number of Guests
              </option>
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>

          <input
            type="date"
            name="date"
            aria-label="Date"
            required
            className={fieldClass}
          />

          <div className="relative">
            <select
              name="time"
              aria-label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={`${fieldClass} appearance-none pr-10 ${
                time ? 'text-ink' : 'text-neutral-400'
              }`}
            >
              <option value="" disabled>
                Time
              </option>
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            aria-label="Message"
            rows={5}
            className={`${fieldClass} resize-none sm:col-span-3`}
          />

          <div className="sm:col-span-3">
            <button type="submit" className="btn-solid mx-auto mt-2 block">
              Reserve a Table
            </button>
            <p
              role="status"
              className={`mt-5 text-xs text-neutral-500 transition-opacity ${
                submitted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Thanks! We&rsquo;ll confirm your reservation by phone or
              WhatsApp shortly.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
