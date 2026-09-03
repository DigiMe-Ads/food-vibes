import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { MENU_CATEGORIES, useMenuItems, type MenuItem } from '../../lib/firestore'

const CATEGORIES = ['All', ...MENU_CATEGORIES] as const

function MenuCard({ item }: { item: MenuItem }) {
  const ref = useReveal<HTMLDivElement>()
  const [imgIndex, setImgIndex] = useState(0)
  const images = item.images && item.images.length > 0 ? item.images : ['']

  return (
    <article
      ref={ref}
      className="reveal group flex flex-col overflow-hidden border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200/80">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={item.title}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              i === imgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-label shadow-sm ${
                  tag === "Chef's Pick" ? 'bg-gold text-white' : 'bg-white/90 text-ink'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show ${item.title} photo ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault()
                  setImgIndex(i)
                }}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === imgIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug text-ink">{item.title}</h3>
          <span className="shrink-0 font-serif text-lg text-gold">{item.price}</span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>
      </div>
    </article>
  )
}

export default function MenuGrid() {
  const { data: allItems, loading } = useMenuItems()
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All')

  const items = active === 'All' ? allItems : allItems.filter((item) => item.category === active)

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
              className={`px-5 py-2.5 text-xs font-medium uppercase tracking-label transition-all duration-300 ${
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
              Showing {items.length} of {allItems.length} dishes
            </p>

            <div
              key={active}
              className="mt-10 grid animate-fade-in grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
