import { useState } from 'react'
import { useReveal } from '../../hooks/useReveal'

type MenuItem = {
  title: string
  price: string
  description: string
  image: string
  category: string
  tags?: string[]
}

const CATEGORIES = [
  'Starters',
  'Salads & Soups',
  'Tacos & Handhelds',
  'Mains',
  'Desserts',
  'Drinks & Cocktails',
] as const

const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Hummus & Falafel Flatbread',
    price: '$7.00',
    description:
      'Warm flatbread topped with crispy falafel, whipped hummus, and a scatter of pomegranate seeds.',
    image: '/images/home/sri-lankan-appetizer-platter.jpg',
    category: 'Starters',
    tags: ['Vegetarian'],
  },
  {
    title: 'Herb-Crusted Catch Stack',
    price: '$9.50',
    description:
      'Pan-seared catch of the day layered over spiced eggplant and lentil ragu, finished with fresh herbs.',
    image: '/images/menu/herb-crusted-fish-starter.jpg',
    category: 'Starters',
    tags: ["Chef's Pick"],
  },
  {
    title: "Chef's Sharing Platter",
    price: '$15.00',
    description:
      'A little bit of everything — soup, spiced shrimp, crispy bites, and our signature dips. Perfect for the table.',
    image: '/images/menu/chefs-sharing-platter.jpg',
    category: 'Starters',
    tags: ['Serves 2+'],
  },
  {
    title: 'Tropical Papaya Salad',
    price: '$9.00',
    description:
      'Fresh papaya, mango, and crisp vegetables tossed in a bright citrus dressing.',
    image: '/images/menu/tropical-papaya-salad.jpg',
    category: 'Salads & Soups',
    tags: ['Vegetarian', 'Gluten-Free'],
  },
  {
    title: 'Chilled Shrimp Salad',
    price: '$11.50',
    description:
      'Poached shrimp over garden greens with pomegranate, citrus, and fresh herbs.',
    image: '/images/menu/chilled-shrimp-salad.jpg',
    category: 'Salads & Soups',
    tags: ['Gluten-Free'],
  },
  {
    title: 'Roasted Pumpkin Soup',
    price: '$6.50',
    description:
      'Silky pumpkin soup finished with cream and fresh herbs, served with warm bread on the side.',
    image: '/images/home/pumpkin-soup-with-bread.jpg',
    category: 'Salads & Soups',
    tags: ['Vegetarian'],
  },
  {
    title: 'Seafood Tacos',
    price: '$12.00',
    description:
      'Soft tortillas piled with fresh catch, crisp slaw, and a bright lime crema.',
    image: '/images/home/seafood-tacos-plate.jpg',
    category: 'Tacos & Handhelds',
    tags: ['Spicy'],
  },
  {
    title: 'Food Vibes Burger',
    price: '$13.50',
    description:
      'Juicy house-made patty, melted cheese, and all the fixings, served with golden fries.',
    image: '/images/home/gourmet-burger-and-fries.jpg',
    category: 'Tacos & Handhelds',
    tags: ["Chef's Pick"],
  },
  {
    title: 'Shrimp Pasta Rose',
    price: '$16.00',
    description:
      'Handmade pasta tossed with shrimp in a rich tomato-cream sauce.',
    image: '/images/home/shrimp-pasta-plate.jpg',
    category: 'Mains',
  },
  {
    title: 'Pan-Seared Catch of the Day',
    price: '$18.50',
    description:
      "Today's catch, seared to order and finished with a squeeze of lime.",
    image: '/images/menu/pan-seared-fish.jpg',
    category: 'Mains',
    tags: ['Gluten-Free'],
  },
  {
    title: 'Sizzling Wok Special',
    price: '$15.00',
    description:
      'Fresh vegetables and your choice of protein, flame-tossed tableside for maximum flavor.',
    image: '/images/menu/sizzling-wok-flambe.jpg',
    category: 'Mains',
    tags: ["Chef's Pick", 'Spicy'],
  },
  {
    title: 'Molten Chocolate Brownie',
    price: '$7.50',
    description:
      'Warm chocolate brownie with a scoop of vanilla ice cream and a dark chocolate drizzle.',
    image: '/images/home/chocolate-brownie-dessert.jpg',
    category: 'Desserts',
    tags: ['Vegetarian'],
  },
  {
    title: 'Watermelon Mint Cooler',
    price: '$5.00',
    description: 'Fresh watermelon juice with mint and a hint of lime.',
    image: '/images/menu/watermelon-mint-cooler.jpg',
    category: 'Drinks & Cocktails',
  },
  {
    title: 'Cucumber Lime Cooler',
    price: '$5.50',
    description: 'Refreshing cucumber and lime soda, served over ice.',
    image: '/images/menu/cucumber-lime-cooler.jpg',
    category: 'Drinks & Cocktails',
  },
  {
    title: 'Iced Mocha Shake',
    price: '$5.50',
    description:
      'Cold brew coffee blended with chocolate and cream, served over ice.',
    image: '/images/menu/iced-mocha-shake.jpg',
    category: 'Drinks & Cocktails',
  },
  {
    title: 'Signature Sunset',
    price: '$8.50',
    description:
      'Our house frozen margarita, layered with a berry reduction and a salted rim.',
    image: '/images/menu/signature-sunset-cocktail.jpg',
    category: 'Drinks & Cocktails',
    tags: ["Chef's Pick"],
  },
  {
    title: 'Smoked Pineapple Mojito',
    price: '$9.00',
    description:
      'A frozen mint mojito finished with charred pineapple and a wisp of smoke.',
    image: '/images/menu/smoked-pineapple-mojito.jpg',
    category: 'Drinks & Cocktails',
  },
]

/** Small ornamental rule used to separate the header from the rest of the
 * card, and above each category heading. */
function Flourish() {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-14 bg-gold/40" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px w-14 bg-gold/40" />
    </div>
  )
}

const TAG_ICON: Record<string, JSX.Element> = {
  Vegetarian: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M5 20c8 0 14-6 14-14 0 0-9-1-13 3S3 20 5 20Z" />
      <path d="M5 20c0-4 2-8 6-10" />
    </svg>
  ),
  Spicy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M9 3c3 1 4 3 3 5-1.5 3-5 2-6 5-1 2.5 1 4.5 3 4-3 2-7 .5-7-3 0-4 5-3 6-7 .5-2-.5-3-1-4Z" />
      <path d="M13 4c2 .5 6 3 5 8-1 4.5-5 7-9 7" />
    </svg>
  ),
  "Chef's Pick": (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
      <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7L12 2.5Z" />
    </svg>
  ),
  'Gluten-Free': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 8l8 8" />
      <path d="M12 6c2 2 2 4 0 6M12 18c-2-2-2-4 0-6" />
    </svg>
  ),
  'Serves 2+': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <circle cx="8.5" cy="8" r="2.7" />
      <circle cx="16" cy="9" r="2.2" />
      <path d="M3.5 19c.5-3 2.2-4.7 5-4.7s4.5 1.7 5 4.7" />
      <path d="M14.2 14.6c2.2.2 3.6 1.8 4 4.4" />
    </svg>
  ),
}

function MenuRow({ item }: { item: MenuItem }) {
  const ref = useReveal<HTMLDivElement>()
  const [open, setOpen] = useState(false)

  return (
    <div ref={ref} className="reveal border-b border-neutral-200/80 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-baseline gap-3 py-5 text-left"
      >
        <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-gold-dark">
          {item.title}
        </h3>
        <span className="mb-1.5 h-px flex-1 border-b border-dotted border-neutral-300" />
        <span className="shrink-0 font-serif text-xl text-gold">
          {item.price}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 self-center text-neutral-400 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <div className="-mt-2 pb-5 pr-8">
        <p className="max-w-xl text-sm italic leading-relaxed text-neutral-500">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-label text-gold-dark"
              >
                {TAG_ICON[tag]}
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Click-to-reveal photo — smoothly animated height via the CSS
            grid-rows trick so no fixed image height is needed */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            open ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="aspect-[16/9] w-full max-w-md rounded-sm object-cover shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ActualInteractiveMenu() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>(
    CATEGORIES[0],
  )

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      {/* Subtle paper-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(28,27,25,0.08) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow text-gold">Food Vibes &middot; Unawatuna</p>
          <h1 className="mt-4 font-serif text-5xl italic text-ink sm:text-6xl">
            Our Menu
          </h1>
          <div className="mt-6">
            <Flourish />
          </div>
        </div>

        {/* Card */}
        <div className="relative mt-14 border border-gold/30 bg-white/70 p-1 shadow-xl shadow-black/5 backdrop-blur-sm">
          <div className="border border-gold/20 p-6 sm:p-10">
            <div className="grid gap-10 md:grid-cols-[200px_1fr] md:gap-14">
              {/* Category index */}
              <nav className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-px-6 px-6 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 md:sticky md:top-28 md:mx-0 md:h-fit md:flex-col md:gap-1 md:overflow-visible md:px-0 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    className={`shrink-0 snap-start whitespace-nowrap border-l-2 px-3 py-2 text-left text-xs font-semibold uppercase tracking-label transition-colors md:whitespace-normal ${
                      active === cat
                        ? 'border-gold text-gold-dark'
                        : 'border-transparent text-neutral-400 hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              {/* Items */}
              <div key={active} className="animate-fade-in">
                <h2 className="font-serif text-3xl italic text-ink">
                  {active}
                </h2>
                <div className="mt-2 mb-4">
                  <span className="block h-px w-12 bg-gold" />
                </div>

                <div>
                  {MENU_ITEMS.filter((item) => item.category === active).map(
                    (item) => (
                      <MenuRow key={item.title} item={item} />
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          Tap a dish to see a photo &middot; Prices shown in USD
        </p>
      </div>
    </section>
  )
}
