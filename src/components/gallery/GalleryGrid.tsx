import { useCallback, useEffect, useState } from 'react'
import { useReveal } from '../../hooks/useReveal'

type Category = 'space' | 'food'

type GalleryImage = {
  src: string
  alt: string
  category: Category
}

// Curated set of all real Food Vibes photography on the site: the venue
// ("The Space") plus the food & drink shots. Add/reorder freely — the grid and
// lightbox adapt to any length.
const IMAGES: GalleryImage[] = [
  // --- The Space ---
  { src: '/images/gallery/food-vibes-signage.jpg', alt: 'Food Vibes storefront on Yaddehimulla', category: 'space' },
  { src: '/images/home/unawatuna-restaurant-dining-hero.jpg', alt: 'String-lit courtyard dining area', category: 'space' },
  { src: '/images/about/food-vibes-restaurant-interior.jpg', alt: 'Dining hall with the wood-fired oven', category: 'space' },
  { src: '/images/gallery/restaurant-interior-corridor.jpg', alt: 'Interior dining corridor', category: 'space' },
  { src: '/images/home/candlelit-dining-table.jpg', alt: 'Candlelit dining nook', category: 'space' },
  { src: '/images/about/restaurant-dining-area-seating.jpg', alt: 'Dining seating with placemats', category: 'space' },
  { src: '/images/gallery/lounge-seating-area.jpg', alt: 'Lounge seating area', category: 'space' },
  { src: '/images/gallery/wood-fired-pizza-oven.jpg', alt: 'Wood-fired pizza oven', category: 'space' },
  { src: '/images/home/restaurant-bar-shelf.jpg', alt: 'The bar', category: 'space' },
  { src: '/images/gallery/bar-shelf-bottles.jpg', alt: 'Bar with stools and drinks fridge', category: 'space' },

  // --- Food & Drink ---
  { src: '/images/menu/pan-seared-fish.jpg', alt: 'Pan-seared fish', category: 'food' },
  { src: '/images/menu/herb-crusted-fish-starter.jpg', alt: 'Herb-crusted fish starter', category: 'food' },
  { src: '/images/home/seafood-tacos-plate.jpg', alt: 'Seafood tacos', category: 'food' },
  { src: '/images/home/gourmet-burger-and-fries.jpg', alt: 'Gourmet burger and fries', category: 'food' },
  { src: '/images/home/shrimp-pasta-plate.jpg', alt: 'Shrimp pasta', category: 'food' },
  { src: '/images/menu/chefs-sharing-platter.jpg', alt: "Chef's sharing platter", category: 'food' },
  { src: '/images/home/sri-lankan-appetizer-platter.jpg', alt: 'Sri Lankan appetizer platter', category: 'food' },
  { src: '/images/menu/tropical-papaya-salad.jpg', alt: 'Tropical papaya salad', category: 'food' },
  { src: '/images/home/chocolate-brownie-dessert.jpg', alt: 'Chocolate brownie dessert', category: 'food' },
  { src: '/images/menu/signature-sunset-cocktail.jpg', alt: 'Signature sunset cocktail', category: 'food' },
  { src: '/images/menu/smoked-pineapple-mojito.jpg', alt: 'Smoked pineapple mojito', category: 'food' },
  { src: '/images/menu/watermelon-mint-cooler.jpg', alt: 'Watermelon mint cooler', category: 'food' },
  { src: '/images/gallery/bar-cocktail-lineup.jpg', alt: 'Handcrafted cocktail lineup', category: 'food' },
]

const FILTERS: { label: string; value: 'all' | Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'The Space', value: 'space' },
  { label: 'Food & Drink', value: 'food' },
]

export default function GalleryGrid() {
  const ref = useReveal<HTMLDivElement>()
  const [filter, setFilter] = useState<'all' | Category>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const visible = IMAGES.filter((img) => filter === 'all' || img.category === filter)

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  )

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox, close, step])

  const active = lightbox === null ? null : visible[lightbox]

  return (
    <section id="gallery-grid" className="bg-white py-16 sm:py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => {
                setFilter(f.value)
                setLightbox(null)
              }}
              className={`border px-5 py-2 text-xs font-medium uppercase tracking-label transition-all duration-300 ${
                filter === f.value
                  ? 'border-gold bg-gold text-white'
                  : 'border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {visible.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${img.alt}`}
              className="group relative block w-full overflow-hidden rounded-lg bg-neutral-200/80 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.closest('button')?.style.setProperty('display', 'none')
                }}
                className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Hover caption */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.alt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white"
          >
            &times;
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            aria-label="Previous image"
            className="absolute left-4 flex h-12 w-12 items-center justify-center text-4xl text-white/70 transition-colors hover:text-white sm:left-8"
          >
            &#8249;
          </button>

          {/* Image */}
          <figure
            className="max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {active.alt}
              <span className="ml-3 text-white/40">
                {(lightbox ?? 0) + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            aria-label="Next image"
            className="absolute right-4 flex h-12 w-12 items-center justify-center text-4xl text-white/70 transition-colors hover:text-white sm:right-8"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  )
}
