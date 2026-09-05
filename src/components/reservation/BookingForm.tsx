import { useState } from 'react'
import { submitReservation, type SelectedDish } from '../../lib/firestore'
import MenuItemPicker from './MenuItemPicker'

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

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function BookingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [guests, setGuests] = useState('')
  const [time, setTime] = useState('')
  const [pickFood, setPickFood] = useState(false)
  const [items, setItems] = useState<SelectedDish[]>([])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')
    try {
      await submitReservation({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        guests,
        date: String(data.get('date') ?? ''),
        time,
        message: String(data.get('message') ?? ''),
        items: items.length > 0 ? items : undefined,
      })
      setStatus('success')
      form.reset()
      setGuests('')
      setTime('')
      setItems([])
      setPickFood(false)
    } catch (err) {
      console.error('Reservation submit failed:', err)
      setStatus('error')
    }
  }

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

        <form onSubmit={onSubmit} className="mt-12 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
          <input type="text" name="name" placeholder="Full Name" aria-label="Full Name" required className={fieldClass} />
          <input type="email" name="email" placeholder="Email" aria-label="Email" required className={fieldClass} />
          <input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone Number" required className={fieldClass} />

          <div className="relative">
            <select
              name="guests"
              aria-label="Number of Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
              className={`${fieldClass} appearance-none pr-10 ${guests ? 'text-ink' : 'text-neutral-400'}`}
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

          <input type="date" name="date" aria-label="Date" required className={fieldClass} />

          <div className="relative">
            <select
              name="time"
              aria-label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className={`${fieldClass} appearance-none pr-10 ${time ? 'text-ink' : 'text-neutral-400'}`}
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

          {/* Optional pre-order — picks from the live menu via MenuItemPicker */}
          <div className="sm:col-span-3">
            <button
              type="button"
              onClick={() => setPickFood((v) => !v)}
              className="flex w-full items-center justify-between border border-dashed border-gold/50 px-5 py-4 text-left text-sm font-medium text-gold-dark transition-colors hover:border-gold hover:bg-gold/5"
            >
              <span>
                Add dishes to your reservation{' '}
                <span className="text-neutral-400">(optional)</span>
                {items.length > 0 && (
                  <span className="ml-2 rounded-full bg-gold px-2 py-0.5 text-[11px] font-semibold text-white">
                    {items.reduce((n, it) => n + it.qty, 0)} selected
                  </span>
                )}
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 shrink-0 transition-transform duration-300 ${pickFood ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>

            {pickFood && (
              <div className="mt-4">
                <MenuItemPicker selected={items} onChange={setItems} />
              </div>
            )}
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-solid mx-auto mt-2 block disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Reserve a Table'}
            </button>
            {status === 'success' && (
              <p role="status" className="mt-5 text-xs text-neutral-500">
                Thanks! We&rsquo;ll confirm your reservation by phone or WhatsApp shortly.
              </p>
            )}
            {status === 'error' && (
              <p role="status" className="mt-5 text-xs text-red-600">
                Something went wrong sending your reservation — please try again, or call us directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
