import { useReveal } from '../../hooks/useReveal'
import Placeholder from '../Placeholder'

const FEATURES = [
  {
    img: '/images/home/live-flame-cooking.jpg',
    label: 'Live Flame Cooking',
    text: 'Dramatic tableside flambe and open-flame cooking, prepared fresh right before your eyes.',
  },
  {
    img: '/images/home/live-music-night.jpg',
    label: 'Live music',
    text: 'Live Music Every Thursday, Friday, and Saturday - Good food, good drinks, and live music from 6 PM, one of Unawatuna\'s favorite weekly traditions.',
  },
  {
    img: '/images/home/restaurant-bar-shelf.jpg',
    label: 'Full bar',
    text: 'Full Bar & Handcrafted Cocktails, cold beer, and fresh juices to go with every dish.',
  },
  {
    img: '/images/home/shrimp-pasta-dish.jpg',
    label: 'International cuisine',
    text: 'International favorites made fresh, from handmade pasta to seafood classics.',
  },
]

export default function Features() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="features" className="bg-white py-20">
      <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="eyebrow">Features</p>
          <h2 className="mt-4 font-serif text-5xl text-ink">What We Offer</h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-neutral-500">
            Fresh Seafood &amp; International Flavors by Chef Ruwan, bringing in 20
            years of local and international cuisine
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.label}
              className="group flex flex-col items-center text-center [animation-delay:var(--d)]"
              style={{ ['--d' as string]: `${i * 90}ms` }}
            >
              <Placeholder
                src={f.img}
                label={f.label}
                alt={f.label}
                className="h-28 w-28 rounded-[26px] shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl"
              />
              <p className="mt-5 max-w-[15rem] text-xs leading-relaxed text-neutral-500">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
