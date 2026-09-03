import { deleteMessage, markMessageRead, useContactMessages } from '../../lib/firestore'

export default function MessagesPanel() {
  const { data: messages, loading } = useContactMessages()

  return (
    <div>
      <h2 className="font-serif text-2xl text-ink">Contact Messages</h2>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-neutral-400">Loading…</p>}
        {!loading && messages.length === 0 && (
          <p className="text-sm text-neutral-400">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`border bg-white p-5 ${m.read ? 'border-neutral-200' : 'border-gold/60'}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg text-ink">
                  {m.name} {!m.read && <span className="ml-2 text-[10px] uppercase tracking-label text-gold-dark">New</span>}
                </p>
                <p className="text-xs text-neutral-500">
                  {m.email} {m.phone && `· ${m.phone}`}
                </p>
              </div>
              {m.subject && (
                <span className="text-xs font-semibold uppercase tracking-label text-neutral-500">
                  {m.subject}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{m.message}</p>

            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => markMessageRead(m.id, !m.read)}
                className="text-[11px] font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
              >
                Mark {m.read ? 'Unread' : 'Read'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this message?')) deleteMessage(m.id)
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
