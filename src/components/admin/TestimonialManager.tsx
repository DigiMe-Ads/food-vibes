import { useState } from 'react'
import {
  addTestimonial,
  deleteTestimonial,
  updateTestimonial,
  useTestimonials,
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
}

const EMPTY_DRAFT: Draft = {
  title: '',
  body: '',
  name: '',
  date: '',
  featured: false,
  avatar: '',
}

function toDraft(t: Testimonial): Draft {
  return {
    title: t.title,
    body: t.body,
    name: t.name,
    date: t.date,
    featured: !!t.featured,
    avatar: t.avatar ?? '',
  }
}

export default function TestimonialManager() {
  const { data: testimonials, loading } = useTestimonials()
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
      avatar: draft.avatar || undefined,
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

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    await deleteTestimonial(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Testimonials</h2>
        {!draft && (
          <button type="button" onClick={startAdd} className="btn-solid px-5 py-2.5 text-xs">
            + Add Testimonial
          </button>
        )}
      </div>

      {draft && (
        <div className="mt-6 space-y-4 border border-neutral-200 bg-white p-6">
          <input
            placeholder="Headline (e.g. The best restaurant!)"
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
              placeholder="Date (e.g. 02.02.21)"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
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
              disabled={saving || !draft.title.trim() || !draft.name.trim()}
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
        {!loading && testimonials.length === 0 && (
          <p className="text-sm text-neutral-400">
            No testimonials yet. Run the seed script, or add one above.
          </p>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="flex items-center gap-4 border border-neutral-200 bg-white p-4">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              {t.avatar && <img src={t.avatar} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg text-ink">{t.title}</p>
              <p className="text-xs text-neutral-500">
                {t.name} &middot; {t.date} {t.featured && '· Featured'}
              </p>
            </div>
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
          </div>
        ))}
      </div>
    </div>
  )
}
