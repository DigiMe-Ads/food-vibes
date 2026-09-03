import { useState } from 'react'
import { MENU_CATEGORIES, useMenuItems, type MenuCategory, type SelectedDish } from '../../lib/firestore'

type Props = {
  selected: SelectedDish[]
  onChange: (items: SelectedDish[]) => void
}

/**
 * Lets a guest optionally pick dishes to attach to their reservation.
 * Descends from the old /menu-concept page's category-tabs browsing pattern
 * (ActualInteractiveMenu), redesigned as horizontal category pills over a
 * scrollable item list — this widget always lives inside the narrower
 * reservation-form column, not a full page, so a sidebar layout doesn't fit;
 * pills + a capped-height list is the realistic shape for a compact,
 * embedded "add dishes" picker (think a food-delivery app's menu browser).
 */
export default function MenuItemPicker({ selected, onChange }: Props) {
  const { data: items, loading } = useMenuItems()
  const [active, setActive] = useState<MenuCategory>(MENU_CATEGORIES[0])

  const qtyFor = (title: string) => selected.find((s) => s.title === title)?.qty ?? 0

  const setQty = (title: string, qty: number) => {
    if (qty <= 0) {
      onChange(selected.filter((s) => s.title !== title))
    } else if (selected.some((s) => s.title === title)) {
      onChange(selected.map((s) => (s.title === title ? { ...s, qty } : s)))
    } else {
      onChange([...selected, { title, qty }])
    }
  }

  const categoryItems = items.filter((item) => item.category === active)

  return (
    <div className="border border-gold/30 bg-white/70 p-1 shadow-md shadow-black/5">
      <div className="border border-gold/20 p-5 sm:p-6">
        {loading && <p className="text-sm text-neutral-400">Loading menu…</p>}

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-3.5 py-2 text-[11px] font-semibold uppercase tracking-label transition-colors ${
                active === cat
                  ? 'bg-ink text-white'
                  : 'border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div key={active} className="mt-6 animate-fade-in">
          <h3 className="font-serif text-xl italic text-ink">{active}</h3>
          <div className="mb-1 mt-1.5">
            <span className="block h-px w-10 bg-gold" />
          </div>

          <div className="max-h-80 divide-y divide-neutral-200/80 overflow-y-auto pr-1">
            {categoryItems.length === 0 && !loading && (
              <p className="py-6 text-sm text-neutral-400">No dishes in this category yet.</p>
            )}

            {categoryItems.map((item) => {
              const qty = qtyFor(item.title)
              return (
                <div key={item.id} className="flex flex-wrap items-center gap-x-4 gap-y-3 py-4">
                  <div className="min-w-[160px] flex-1 pr-2">
                    <p className="font-serif text-base leading-snug text-ink sm:text-lg">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                      {item.description}
                    </p>
                  </div>

                  <div className="ml-auto flex shrink-0 items-center gap-3">
                    <span className="font-serif text-sm text-gold sm:text-base">{item.price}</span>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => setQty(item.title, 1)}
                        className="border border-gold px-3 py-1.5 text-[11px] font-semibold uppercase tracking-label text-gold-dark transition-colors hover:bg-gold hover:text-white"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Remove one ${item.title}`}
                          onClick={() => setQty(item.title, qty - 1)}
                          className="flex h-6 w-6 items-center justify-center border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold-dark"
                        >
                          &minus;
                        </button>
                        <span className="w-4 text-center text-sm text-ink">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Add one more ${item.title}`}
                          onClick={() => setQty(item.title, qty + 1)}
                          className="flex h-6 w-6 items-center justify-center border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold-dark"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
