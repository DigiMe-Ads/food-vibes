import { useState } from 'react'
import {
  addTestimonial,
  deleteTestimonial,
  replaceTestimonialsWithDefaults,
  updateTestimonial,
  useStoredTestimonials,
  type Testimonial,
} from '../../lib/firestore'
import ImagePicker from './ImagePicker'

type Draft = {
  title: string
  body: string
  name: string
  date: string
  featured: boolean
  avatar: string
  rating: number
  source: '' | 'Google' | 'TripAdvisor'
  url: string
}

const EMPTY_DRAFT: Draft = {
  title: '',
  body: '',
  name: '',
  date: '',
  featured: false,
  avatar: '',
  rating: 5,
  source: 'Google',
  url: '',
}

function toDraft(t: Testimonial): Draft {
  return {
    title: t.title,
    body: t.body,
    name: t.name,
    date: t.date,
    featured: !!t.featured,
    avatar: t.avatar ?? '',
    rating: t.rating ?? 0,
    source: t.source ?? '',
    url: t.url ?? '',
  }
}

export default function TestimonialManager() {
  const { data: testimonials, loading } = useStoredTestimonials()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  const startAdd = () => {
    setEditingId('new')
    setDraft(EMPTY_DRAFT)
  }

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id)
    setDraft(toDraft(t))
  }

  const cancel = () => {
    setEditingId(null)
    setDraft(null)
  }

  const save = async () => {
    if (!draft) return
    setSaving(true)
    const payload = {
      title: draft.title.trim(),
      body: draft.body.trim(),
      name: draft.name.trim(),
      date: draft.date.trim(),
      featured: draft.featured,
      // Firestore rejects `undefined`, so optional fields are only included when set.
      ...(draft.avatar ? { avatar: draft.avatar } : {}),
      ...(draft.rating ? { rating: draft.rating } : {}),
      ...(draft.source ? { source: draft.source } : {}),
      ...(draft.url.trim() ? { url: draft.url.trim() } : {}),
    }
    try {
      if (editingId === 'new') {
        await addTestimonial(payload)
      } else if (editingId) {
        await updateTestimonial(editingId, payload)
      }
      cancel()
    } finally {
      setSaving(false)
    }
  }

  // Testimonials currently stored in Firestore (the bundled defaults that
  // show when the collection is empty have ids starting with "default-").
  const storedIds = testimonials.filter((t) => !t.id.startsWith('default-')).map((t) => t.id)
  const [replacing, setReplacing] = useState(false)

  const loadGoogleReviews = async () => {
    const msg = storedIds.length
      ? `Delete all ${storedIds.length} current testimonials and replace them with the 11 real Google & TripAdvisor reviews?`
      : 'Save the 11 real Google & TripAdvisor reviews here so you can edit them?'
    if (!confirm(msg)) return
    setReplacing(true)
    try {
      await replaceTestimonialsWithDefaults(storedIds)
    } finally {
      setReplacing(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Testimonials</h2>
        {!draft && (
          <div className="flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={loadGoogleReviews}
              disabled={replacing}
              className="border border-neutral-300 px-5 py-2.5 text-xs font-semibold uppercase tracking-label text-neutral-600 transition-colors hover:border-gold hover:text-gold disabled:opacity-60"
            >
              {replacing ? 'Loading…' : 'Load real reviews'}
            </button>
            <button type="button" onClick={startAdd} className="btn-solid px-5 py-2.5 text-xs">
              + Add Testimonial
            </button>
          </div>
        )}
      </div>

      {draft && (
        <div className="mt-6 space-y-4 border border-neutral-200 bg-white p-6">
          <input
            placeholder="Headline (optional, e.g. The best restaurant!)"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />
          <textarea
            placeholder="Review text"
            rows={4}
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            className="w-full resize-none border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              placeholder="Guest name"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
            <input
              placeholder="Date (YYYY-MM-DD, e.g. 2025-12-24)"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_auto_1fr]">
            <select
              value={draft.rating}
              onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              <option value={0}>No stars</option>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {'★'.repeat(n)} ({n})
                </option>
              ))}
            </select>
            <select
              value={draft.source}
              onChange={(e) => setDraft({ ...draft, source: e.target.value as Draft['source'] })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              <option value="">No source</option>
              <option value="Google">Google</option>
              <option value="TripAdvisor">TripAdvisor</option>
            </select>
            <input
              placeholder="Link to the review (optional)"
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <ImagePicker
            label="Avatar (optional)"
            value={draft.avatar}
            onChange={(src) => setDraft({ ...draft, avatar: src })}
          />

          <label className="flex items-center gap-2 text-sm text-neutral-600">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
            />
            Featured (highlighted card)
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving || !draft.body.trim() || !draft.name.trim()}
              className="btn-solid px-6 py-2.5 text-xs disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="px-6 py-2.5 text-xs font-medium uppercase tracking-label text-neutral-500 hover:text-ink"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 space-y-2">
        {loading && <p className="text-sm text-neutral-400">Loading…</p>}
        {!loading && storedIds.length === 0 && (
          <p className="text-sm text-neutral-400">
            Nothing saved yet — the site is showing the built-in Google &amp;
            TripAdvisor reviews. Click &ldquo;Load real reviews&rdquo; to save
            them here so you can edit them.
          </p>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-center gap-4 border border-neutral-200 bg-white p-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              {t.avatar && <img src={t.avatar} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg text-ink">{t.title || t.body}</p>
              <p className="text-xs text-neutral-500">
                {t.rating ? `${'★'.repeat(t.rating)} · ` : ''}
                {t.name} &middot; {t.date}
                {t.source && ` · ${t.source}`} {t.featured && '· Featured'}
              </p>
            </div>
            {!t.id.startsWith('default-') && (<>
            <button
              type="button"
              onClick={() => startEdit(t)}
              className="text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="text-xs font-semibold uppercase tracking-label text-neutral-400 hover:text-red-600"
            >
              Delete
            </button>
            </>)}
          </div>
        ))}
      </div>
    </div>
  )
}
