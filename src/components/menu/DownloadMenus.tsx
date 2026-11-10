import { useReveal } from '../../hooks/useReveal'

// The printed menus, served as static files from /public/menus.
// To update one, replace the PDF there and keep the same file name.
const MENUS = [
  { label: 'Food Menu', note: 'All day', file: '/menus/food-vibes-food-menu.pdf' },
  { label: 'Drinks Menu', note: 'Cocktails, beer & wine', file: '/menus/food-vibes-drinks-menu.pdf' },
  { label: 'Breakfast Menu', note: '8:00 AM – 1:00 PM', file: '/menus/food-vibes-breakfast-menu.pdf' },
]

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
  </svg>
)

export default function DownloadMenus() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="download-menu" className="border-t border-neutral-200 bg-cream py-20">
      <div ref={ref} className="reveal mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-gold" />
          Take It With You
          <span className="h-px w-6 bg-gold" />
        </p>
        <h2 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Download Our Menus</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
          Get the full printed menus as PDFs.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {MENUS.map((m) => (
            <a
              key={m.file}
              href={m.file}
              download
              className="group flex items-center justify-between gap-4 border border-neutral-300 bg-white px-6 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-black/5"
            >
              <span>
                <span className="block font-serif text-xl text-ink">{m.label}</span>
                <span className="mt-1 block text-[11px] font-medium uppercase tracking-label text-neutral-400">
                  {m.note} · PDF
                </span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-dark transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                <DownloadIcon />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
