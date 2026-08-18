const INFO_ITEMS = [
  'Open daily, 7:30 AM – 11:00 PM',
  "Live music every Thursday, Friday & Saturday from 6 PM — book early for a good seat",
  "We'll confirm your reservation by phone/WhatsApp",
  'For large groups (10+) or private events, please call us directly at +94 76 578 2468',
]

export default function ReservationInfo() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-serif text-3xl text-ink">Reservation Info</h2>

        <ul className="mt-8 space-y-4 text-sm leading-relaxed text-neutral-500">
          {INFO_ITEMS.map((item) => (
            <li key={item} className="flex items-start justify-center gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
