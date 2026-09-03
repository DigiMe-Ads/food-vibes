import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

type Dish = {
  title: string
  body: string
  images: string[]
}

const DISHES: Dish[] = [
  {
    title: 'Appetizers',
    body: 'Start things off with our hummus flatbread, topped with spiced falafel and a pop of pomegranate.',
    images: [
      '/images/home/sri-lankan-appetizer-platter.jpg',
      '/images/menu/chefs-sharing-platter.jpg',
    ],
  },
  {
    title: 'Soups & Salads',
    body: 'Comforting, spiced soups and fresh salads made daily with local produce.',
    images: [
      '/images/home/soup-of-the-day-bowl.jpg',
      '/images/home/pumpkin-soup-with-bread.jpg',
      '/images/home/chilled-mango-shrimp-salad.jpg',
    ],
  },
  {
    title: 'Tacos',
    body: 'Soft tortillas piled high with seafood, crisp slaw, and a squeeze of lime.',
    images: [
      '/images/home/seafood-tacos-plate.jpg',
      '/images/home/seafood-tacos-close-up.jpg',
    ],
  },
  {
    title: 'Burgers',
    body: 'Juicy, handmade burgers served with golden fries and house-made dips.',
    images: [
      '/images/home/gourmet-burger-and-fries.jpg',
      '/images/home/burger-basket-close-up.jpg',
    ],
  },
  {
    title: 'Pasta',
    body: 'Silky handmade pasta tossed with shrimp in a rich tomato sauce.',
    images: [
      '/images/home/shrimp-pasta-plate.jpg',
      '/images/home/shrimp-pasta-garnished.jpg',
    ],
  },
  {
    title: 'Desserts',
    body: 'Rich chocolate brownie, warm from the kitchen, topped with a scoop of ice cream.',
    images: [
      '/images/home/chocolate-brownie-dessert.jpg',
      '/images/home/brownie-ice-cream-dessert.jpg',
    ],
  },
]

const PAGE_SIZE = 3
const PAGE_COUNT = Math.ceil(DISHES.length / PAGE_SIZE)

function DishRow({ dish, reverse }: { dish: Dish; reverse?: boolean }) {
  const ref = useReveal<HTMLDivElement>()
  const [imgIndex, setImgIndex] = useState(0)

  return (
    <div
      ref={ref}
      className="reveal grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      {/* Text */}
      <div className={reverse ? 'md:order-2 md:pl-8' : 'md:pr-8'}>
        <h3 className="font-serif text-4xl leading-tight text-ink">
          {dish.title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
          {dish.body}
        </p>
        <Link to="/menu" className="btn-solid mt-7">
          View Menu
        </Link>
      </div>

      {/* Image with functional mini slider */}
      <div className={reverse ? 'md:order-1' : ''}>
        <div className="group relative aspect-[4/3] w-full overflow-hidden bg-neutral-200/80 shadow-lg">
          {dish.images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={dish.title}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                i === imgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {dish.images.length > 1 && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
              {dish.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${dish.title} photo ${i + 1}`}
                  onClick={() => setImgIndex(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === imgIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PopularDishes() {
  const [page, setPage] = useState(0)

  const goTo = (p: number) => setPage((p + PAGE_COUNT) % PAGE_COUNT)

  return (
    <section id="dishes" className="bg-white py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-gold" />
          Popular Dishes
        </p>

        <div className="overflow-hidden">
          <div
            className="flex items-start transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {Array.from({ length: PAGE_COUNT }).map((_, p) => (
              <div key={p} className="flex w-full shrink-0 flex-col gap-16 px-1">
                {DISHES.slice(p * PAGE_SIZE, p * PAGE_SIZE + PAGE_SIZE).map(
                  (dish, i) => (
                    <DishRow
                      key={dish.title}
                      dish={dish}
                      reverse={(p * PAGE_SIZE + i) % 2 === 1}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section pagination / slider controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Previous dishes"
            onClick={() => goTo(page - 1)}
            className="text-lg text-ink transition-colors hover:text-gold"
          >
            &larr;
          </button>

          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show dishes page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                  i === page ? 'border-gold' : 'border-neutral-300'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    i === page ? 'bg-gold' : 'bg-neutral-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next dishes"
            onClick={() => goTo(page + 1)}
            className="text-lg text-ink transition-colors hover:text-gold"
          >
            &rarr;
          </button>
        </div>
      </div>
    </section>
  )
}
