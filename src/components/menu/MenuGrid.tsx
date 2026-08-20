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
  'All',
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

function MenuCard({ item }: { item: MenuItem }) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <article
      ref={ref}
      className="reveal group flex flex-col overflow-hidden border border-neutral-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200/80">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-[10px] font-semibold uppercase tracking-label shadow-sm ${
                  tag === "Chef's Pick"
                    ? 'bg-gold text-white'
                    : 'bg-white/90 text-ink'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-snug text-ink">
            {item.title}
          </h3>
          <span className="shrink-0 font-serif text-lg text-gold">
            {item.price}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-500">
          {item.description}
        </p>
      </div>
    </article>
  )
}

export default function MenuGrid() {
  const [active, setActive] =
    useState<(typeof CATEGORIES)[number]>('All')

  const items =
    active === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === active)

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

        <p className="mt-6 text-center text-xs text-neutral-400">
          Showing {items.length} of {MENU_ITEMS.length} dishes
        </p>

        {/* Grid */}
        <div
          key={active}
          className="mt-10 grid animate-fade-in grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <MenuCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
