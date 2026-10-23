import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { MENU_CATEGORIES, useMenuItems, type MenuItem } from '../../lib/firestore'

const CATEGORIES = ['All', ...MENU_CATEGORIES] as const

function Tags({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null
  return (
    <span className="ml-2 inline-flex flex-wrap gap-1.5 align-middle">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-label ${
            tag === "Chef's Pick"
              ? 'bg-gold text-white'
              : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          {tag}
        </span>
      ))}
    </span>
  )
}

function MenuRow({ item }: { item: MenuItem }) {
  const cover = item.images && item.images[0]

  return (
    <div className="mb-7 flex break-inside-avoid gap-4">
      {cover && (
        <img
          src={cover}
          alt={item.title}
          loading="lazy"
          onError={(e) => e.currentTarget.remove()}
          className="h-16 w-16 shrink-0 rounded-lg object-cover shadow-sm"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-serif text-lg leading-snug text-ink">
            {item.title}
            <Tags tags={item.tags} />
          </h3>
          {/* dotted leader */}
          <span className="mb-1 min-w-4 flex-1 border-b border-dotted border-neutral-300" />
          <span className="shrink-0 font-serif text-base text-gold">{item.price}</span>
        </div>
        {item.description && (
          <p className="mt-1 max-w-prose text-sm leading-relaxed text-neutral-500">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}

function MenuSection({ title, items }: { title: string; items: MenuItem[] }) {
  const ref = useReveal<HTMLDivElement>()
  if (items.length === 0) return null

  return (
    <section ref={ref} className="reveal">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs font-medium uppercase tracking-label text-neutral-400">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="gap-x-12 sm:columns-2">
        {items.map((item) => (
          <MenuRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default function MenuGrid() {
  const { data: allItems, loading } = useMenuItems()
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All')

  // Which category sections to render (in menu order), each with its items.
  const sections =
    active === 'All'
      ? MENU_CATEGORIES.map((cat) => ({
          title: cat,
          items: allItems.filter((item) => item.category === cat),
        })).filter((s) => s.items.length > 0)
      : [{ title: active, items: allItems.filter((item) => item.category === active) }]

  return (
    <section id="menu-grid" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-label transition-all duration-300 ${
                active === cat
                  ? 'bg-ink text-white'
                  : 'border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-10 text-center text-sm text-neutral-400">Loading menu…</p>
        ) : allItems.length === 0 ? (
          <p className="mt-10 text-center text-sm text-neutral-400">
            The menu is being updated — check back shortly.
          </p>
        ) : (
          <>
            <p className="mt-6 text-center text-xs text-neutral-400">
              {active === 'All'
                ? `${allItems.length} dishes & drinks`
                : `${sections[0].items.length} in ${active}`}
            </p>

            <div key={active} className="mt-12 flex animate-fade-in flex-col gap-16">
              {sections.map((s) => (
                <MenuSection key={s.title} title={s.title} items={s.items} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
