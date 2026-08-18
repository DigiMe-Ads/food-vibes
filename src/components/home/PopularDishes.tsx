import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'

type Dish = {
  eyebrow?: string
  title: string
  body: string
  img: string
  label: string
  reverse?: boolean
}

const DISHES: Dish[] = [
  {
    eyebrow: 'Popular Dishes',
    title: 'Appetizers',
    body: 'Repudiandae dignissimos fugiat sit nam. Tempore aspernatur quae repudiandae dolorem, beatae dolorem, praesentium itaque et quam quaerat.',
    img: '/images/home/appetizers.jpg',
    label: 'Appetizers',
  },
  {
    title: 'Soups & Salads',
    body: 'Repudiandae dignissimos fugiat sit nam. Tempore aspernatur quae repudiandae dolorem, beatae dolorem, praesentium itaque et quam quaerat.',
    img: '/images/home/soups-and-salads.jpg',
    label: 'Soups & Salads',
    reverse: true,
  },
  {
    title: 'Tacos',
    body: 'Repudiandae dignissimos fugiat sit nam. Tempore aspernatur quae repudiandae dolorem, beatae dolorem, praesentium itaque et quam quaerat.',
    img: '/images/home/tacos.jpg',
    label: 'Tacos',
  },
]

function DishRow({ dish }: { dish: Dish }) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="reveal grid items-center gap-8 md:grid-cols-2 md:gap-14"
    >
      {/* Text */}
      <div className={dish.reverse ? 'md:order-2 md:pl-8' : 'md:pr-8'}>
        {dish.eyebrow && (
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-6 bg-gold" />
            {dish.eyebrow}
          </p>
        )}
        <h3 className="mt-4 font-serif text-4xl leading-tight text-ink">
          {dish.title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-500">
          {dish.body}
        </p>
        <a href="#dishes" className="btn-solid mt-7">
          View Menu
        </a>
      </div>

      {/* Image with slider dots overlay */}
      <div className={dish.reverse ? 'md:order-1' : ''}>
        <div className="group relative">
          <Placeholder
            src={dish.img}
            label={dish.label}
            alt={dish.label}
            className="aspect-[4/3] w-full shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === 1 ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PopularDishes() {
  return (
    <section id="dishes" className="bg-white py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6">
        {DISHES.map((dish) => (
          <DishRow key={dish.title} dish={dish} />
        ))}

        {/* Section pagination */}
        <div className="flex items-center justify-center gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                i === 1 ? 'border-gold' : 'border-neutral-300'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i === 1 ? 'bg-gold' : 'bg-neutral-300'
                }`}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
