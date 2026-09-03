import { useState } from 'react'
import {
  MENU_CATEGORIES,
  addMenuItem,
  deleteMenuItem,
  updateMenuItem,
  useMenuItems,
  type MenuCategory,
  type MenuItem,
} from '../../lib/firestore'
import ImagePicker from './ImagePicker'

type Draft = {
  title: string
  price: string
  description: string
  category: MenuCategory
  tags: string
  images: string[]
}

const EMPTY_DRAFT: Draft = {
  title: '',
  price: '',
  description: '',
  category: 'Starters',
  tags: '',
  images: [],
}

function toDraft(item: MenuItem): Draft {
  return {
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    tags: (item.tags ?? []).join(', '),
    images: item.images ?? [],
  }
}

export default function MenuManager() {
  const { data: items, loading } = useMenuItems()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [saving, setSaving] = useState(false)

  const startAdd = () => {
    setEditingId('new')
    setDraft(EMPTY_DRAFT)
  }

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id)
    setDraft(toDraft(item))
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
      price: draft.price.trim(),
      description: draft.description.trim(),
      category: draft.category,
      tags: draft.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      images: draft.images.filter(Boolean),
    }
    try {
      if (editingId === 'new') {
        await addMenuItem({ ...payload, order: items.length })
      } else if (editingId) {
        await updateMenuItem(editingId, payload)
      }
      cancel()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this menu item?')) return
    await deleteMenuItem(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Menu Items</h2>
        {!draft && (
          <button type="button" onClick={startAdd} className="btn-solid px-5 py-2.5 text-xs">
            + Add Item
          </button>
        )}
      </div>

      {draft && (
        <div className="mt-6 space-y-4 border border-neutral-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              placeholder="Title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
            <input
              placeholder="Price (e.g. $7.00)"
              value={draft.price}
              onChange={(e) => setDraft({ ...draft, price: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <textarea
            placeholder="Description"
            rows={3}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="w-full resize-none border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value as MenuCategory })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            >
              {MENU_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              placeholder="Tags, comma separated (e.g. Vegetarian, Spicy)"
              value={draft.tags}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
              className="border border-neutral-200 px-4 py-3 text-sm focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-label text-neutral-500">
              Photos (first one is the cover photo)
            </p>
            {draft.images.map((img, i) => (
              <div key={i} className="flex items-end gap-3">
                <ImagePicker
                  value={img}
                  onChange={(src) => {
                    const next = [...draft.images]
                    next[i] = src
                    setDraft({ ...draft, images: next })
                  }}
                />
                <button
                  type="button"
                  onClick={() => setDraft({ ...draft, images: draft.images.filter((_, j) => j !== i) })}
                  className="mb-1 text-xs text-neutral-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setDraft({ ...draft, images: [...draft.images, ''] })}
              className="text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
            >
              + Add Another Photo
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={saving || !draft.title.trim()}
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
        {!loading && items.length === 0 && (
          <p className="text-sm text-neutral-400">
            No menu items yet. Run the seed script, or add one above.
          </p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border border-neutral-200 bg-white p-4"
          >
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-neutral-100">
              {item.images?.[0] && (
                <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg text-ink">{item.title}</p>
              <p className="text-xs text-neutral-500">
                {item.category} &middot; {item.price}
              </p>
            </div>
            <button
              type="button"
              onClick={() => startEdit(item)}
              className="text-xs font-semibold uppercase tracking-label text-gold hover:text-gold-dark"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => remove(item.id)}
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
