import {
  deleteReservation,
  updateReservationStatus,
  useReservations,
  type ReservationStatus,
} from '../../lib/firestore'

const STATUS_STYLES: Record<ReservationStatus, string> = {
  New: 'bg-gold/15 text-gold-dark',
  Confirmed: 'bg-green-100 text-green-700',
  Cancelled: 'bg-neutral-200 text-neutral-500',
}

export default function ReservationsPanel() {
  const { data: reservations, loading } = useReservations()

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Reservations</h2>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-neutral-400">Loading…</p>}
        {!loading && reservations.length === 0 && (
          <p className="text-sm text-neutral-400">No reservations yet.</p>
        )}
        {reservations.map((r) => (
          <div key={r.id} className="border border-neutral-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-ink">{r.name}</p>
                <p className="text-xs text-neutral-500">
                  {r.email} &middot; {r.phone}
                </p>
              </div>
              <span
                className={`shrink-0 rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-label ${STATUS_STYLES[r.status]}`}
              >
                {r.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
              <span>
                <strong className="text-ink">Date:</strong> {r.date}
              </span>
              <span>
                <strong className="text-ink">Time:</strong> {r.time}
              </span>
              <span>
                <strong className="text-ink">Guests:</strong> {r.guests}
              </span>
            </div>

            {r.message && <p className="mt-3 text-sm italic text-neutral-500">"{r.message}"</p>}

            {r.items && r.items.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-label text-neutral-500">
                  Requested Dishes
                </p>
                <ul className="mt-1 text-sm text-neutral-600">
                  {r.items.map((it, i) => (
                    <li key={i}>
                      {it.qty}&times; {it.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {(['New', 'Confirmed', 'Cancelled'] as ReservationStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => updateReservationStatus(r.id, s)}
                  disabled={r.status === s}
                  className="border border-neutral-300 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-label text-neutral-600 transition-colors hover:border-gold hover:text-gold-dark disabled:cursor-default disabled:border-gold disabled:text-gold-dark"
                >
                  Mark {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this reservation?')) deleteReservation(r.id)
                }}
                className="ml-auto text-[11px] font-semibold uppercase tracking-label text-neutral-400 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
