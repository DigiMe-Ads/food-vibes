// Hardcoded manifest of every image already shipped in /public/images.
// The admin dashboard's ImagePicker shows this as a "choose existing photo"
// grid — there's no Firebase Storage upload wired up yet (see plan notes),
// so admins pick from what's already on the site or paste an external URL.
export type LibraryImage = {
  src: string
  label: string
}

export type LibraryGroup = {
  group: string
  images: LibraryImage[]
}

function fromFile(src: string): LibraryImage {
  const file = src.split('/').pop() ?? src
  const label = file
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
  return { src, label }
}

const HOME_FILES = [
  'brownie-ice-cream-dessert.jpg',
  'burger-basket-close-up.jpg',
  'candlelit-dining-table.jpg',
  'chilled-mango-shrimp-salad.jpg',
  'chocolate-brownie-dessert.jpg',
  'flatbread-hummus-appetizer.jpg',
  'gourmet-burger-and-fries.jpg',
  'live-flame-cooking.jpg',
  'live-music-night.jpg',
  'pumpkin-soup-with-bread.jpg',
  'restaurant-bar-shelf.jpg',
  'seafood-tacos-close-up.jpg',
  'seafood-tacos-plate.jpg',
  'shrimp-pasta-dish.jpg',
  'shrimp-pasta-garnished.jpg',
  'shrimp-pasta-plate.jpg',
  'soup-of-the-day-bowl.jpg',
  'sri-lankan-appetizer-platter.jpg',
  'unawatuna-restaurant-dining-hero.jpg',
]

const MENU_FILES = [
  'chefs-sharing-platter.jpg',
  'chilled-shrimp-salad.jpg',
  'cucumber-lime-cooler.jpg',
  'herb-crusted-fish-starter.jpg',
  'iced-mocha-shake.jpg',
  'pan-seared-fish.jpg',
  'signature-sunset-cocktail.jpg',
  'sizzling-wok-flambe.jpg',
  'smoked-pineapple-mojito.jpg',
  'tropical-papaya-salad.jpg',
  'watermelon-mint-cooler.jpg',
]

const ABOUT_FILES = [
  'food-vibes-restaurant-interior.jpg',
  'reserved-table-sign.png',
  'restaurant-dining-area-seating.jpg',
]

const GALLERY_FILES = [
  'bar-cocktail-lineup.jpg',
  'bar-shelf-bottles.jpg',
  'chocolate-dessert-plate.jpg',
  'food-vibes-signage.jpg',
]

const CONTACT_FILES = ['food-vibes-chef-mascot.png']

const RESERVATION_FILES = ['reserved-dining-table-wine.jpg']

export const IMAGE_LIBRARY: LibraryGroup[] = [
  { group: 'Menu', images: MENU_FILES.map((f) => fromFile(`/images/menu/${f}`)) },
  { group: 'Home', images: HOME_FILES.map((f) => fromFile(`/images/home/${f}`)) },
  { group: 'About', images: ABOUT_FILES.map((f) => fromFile(`/images/about/${f}`)) },
  { group: 'Gallery', images: GALLERY_FILES.map((f) => fromFile(`/images/gallery/${f}`)) },
  { group: 'Reservations', images: RESERVATION_FILES.map((f) => fromFile(`/images/reservations/${f}`)) },
  { group: 'Contact', images: CONTACT_FILES.map((f) => fromFile(`/images/contact/${f}`)) },
]
