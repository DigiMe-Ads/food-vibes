// One-time migration: writes the site's original hardcoded menu items and
// testimonials into Firestore. Run this once, after you've:
//   1. Enabled Firestore (Native mode) in the Firebase Console
//   2. Enabled Email/Password sign-in under Authentication
//   3. Created one admin user (Authentication → Users → Add user)
//   4. Pasted firestore.rules into Firestore → Rules → Publish
//
// Usage (from the project root):
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword node scripts/seedFirestore.mjs
//
// It signs in as that admin (so it passes the security rules — only the
// admin can write to menuItems/testimonials), then writes the docs. Safe to
// re-run: it only adds documents, it doesn't check for existing ones, so
// only run it once (or clear the collections first if you re-run it).
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCiso7WQXk_4TL7avP4ELtDgdcWfiXEML4',
  authDomain: 'food-vibes-38fae.firebaseapp.com',
  projectId: 'food-vibes-38fae',
  storageBucket: 'food-vibes-38fae.firebasestorage.app',
  messagingSenderId: '740073824031',
  appId: '1:740073824031:web:cd71408e5eee90bcf09a2a',
}

const MENU_ITEMS = [
  { title: 'Hummus & Falafel Flatbread', price: '$7.00', description: 'Warm flatbread topped with crispy falafel, whipped hummus, and a scatter of pomegranate seeds.', category: 'Starters', tags: ['Vegetarian'], images: ['/images/home/sri-lankan-appetizer-platter.jpg'] },
  { title: 'Herb-Crusted Catch Stack', price: '$9.50', description: 'Pan-seared catch of the day layered over spiced eggplant and lentil ragu, finished with fresh herbs.', category: 'Starters', tags: ["Chef's Pick"], images: ['/images/menu/herb-crusted-fish-starter.jpg'] },
  { title: "Chef's Sharing Platter", price: '$15.00', description: 'A little bit of everything — soup, spiced shrimp, crispy bites, and our signature dips. Perfect for the table.', category: 'Starters', tags: ['Serves 2+'], images: ['/images/menu/chefs-sharing-platter.jpg'] },
  { title: 'Tropical Papaya Salad', price: '$9.00', description: 'Fresh papaya, mango, and crisp vegetables tossed in a bright citrus dressing.', category: 'Salads & Soups', tags: ['Vegetarian', 'Gluten-Free'], images: ['/images/menu/tropical-papaya-salad.jpg'] },
  { title: 'Chilled Shrimp Salad', price: '$11.50', description: 'Poached shrimp over garden greens with pomegranate, citrus, and fresh herbs.', category: 'Salads & Soups', tags: ['Gluten-Free'], images: ['/images/menu/chilled-shrimp-salad.jpg'] },
  { title: 'Roasted Pumpkin Soup', price: '$6.50', description: 'Silky pumpkin soup finished with cream and fresh herbs, served with warm bread on the side.', category: 'Salads & Soups', tags: ['Vegetarian'], images: ['/images/home/pumpkin-soup-with-bread.jpg'] },
  { title: 'Seafood Tacos', price: '$12.00', description: 'Soft tortillas piled with fresh catch, crisp slaw, and a bright lime crema.', category: 'Tacos & Handhelds', tags: ['Spicy'], images: ['/images/home/seafood-tacos-plate.jpg', '/images/home/seafood-tacos-close-up.jpg'] },
  { title: 'Food Vibes Burger', price: '$13.50', description: 'Juicy house-made patty, melted cheese, and all the fixings, served with golden fries.', category: 'Tacos & Handhelds', tags: ["Chef's Pick"], images: ['/images/home/gourmet-burger-and-fries.jpg', '/images/home/burger-basket-close-up.jpg'] },
  { title: 'Shrimp Pasta Rose', price: '$16.00', description: 'Handmade pasta tossed with shrimp in a rich tomato-cream sauce.', category: 'Mains', images: ['/images/home/shrimp-pasta-plate.jpg', '/images/home/shrimp-pasta-garnished.jpg'] },
  { title: 'Pan-Seared Catch of the Day', price: '$18.50', description: "Today's catch, seared to order and finished with a squeeze of lime.", category: 'Mains', tags: ['Gluten-Free'], images: ['/images/menu/pan-seared-fish.jpg'] },
  { title: 'Sizzling Wok Special', price: '$15.00', description: 'Fresh vegetables and your choice of protein, flame-tossed tableside for maximum flavor.', category: 'Mains', tags: ["Chef's Pick", 'Spicy'], images: ['/images/menu/sizzling-wok-flambe.jpg'] },
  { title: 'Molten Chocolate Brownie', price: '$7.50', description: 'Warm chocolate brownie with a scoop of vanilla ice cream and a dark chocolate drizzle.', category: 'Desserts', tags: ['Vegetarian'], images: ['/images/home/chocolate-brownie-dessert.jpg', '/images/home/brownie-ice-cream-dessert.jpg'] },
  { title: 'Watermelon Mint Cooler', price: '$5.00', description: 'Fresh watermelon juice with mint and a hint of lime.', category: 'Drinks & Cocktails', images: ['/images/menu/watermelon-mint-cooler.jpg'] },
  { title: 'Cucumber Lime Cooler', price: '$5.50', description: 'Refreshing cucumber and lime soda, served over ice.', category: 'Drinks & Cocktails', images: ['/images/menu/cucumber-lime-cooler.jpg'] },
  { title: 'Iced Mocha Shake', price: '$5.50', description: 'Cold brew coffee blended with chocolate and cream, served over ice.', category: 'Drinks & Cocktails', images: ['/images/menu/iced-mocha-shake.jpg'] },
  { title: 'Signature Sunset', price: '$8.50', description: 'Our house frozen margarita, layered with a berry reduction and a salted rim.', category: 'Drinks & Cocktails', tags: ["Chef's Pick"], images: ['/images/menu/signature-sunset-cocktail.jpg'] },
  { title: 'Smoked Pineapple Mojito', price: '$9.00', description: 'A frozen mint mojito finished with charred pineapple and a wisp of smoke.', category: 'Drinks & Cocktails', images: ['/images/menu/smoked-pineapple-mojito.jpg'] },
].map((item, i) => ({ ...item, order: i }))

const TESTIMONIALS = [
  { title: 'The best restaurant!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Oscar Oldman', date: '2021-02-02' },
  { title: 'It was very delicious!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Emma Newman', date: '2021-02-02', featured: true },
  { title: "I'm delighted!", body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Viktoria Freeman', date: '2022-01-15' },
  { title: 'A hidden gem!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Daniel Cross', date: '2022-01-15' },
  { title: 'Unforgettable evening!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Sophie Bennett', date: '2022-03-22', featured: true },
  { title: 'Worth every visit!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Liam Carter', date: '2022-06-09' },
]

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars (the admin user you created in the Firebase Console) before running this script.')
    process.exit(1)
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  console.log(`Signing in as ${email}...`)
  await signInWithEmailAndPassword(auth, email, password)

  console.log(`Seeding ${MENU_ITEMS.length} menu items...`)
  for (const item of MENU_ITEMS) {
    await addDoc(collection(db, 'menuItems'), item)
  }

  console.log(`Seeding ${TESTIMONIALS.length} testimonials...`)
  for (const t of TESTIMONIALS) {
    await addDoc(collection(db, 'testimonials'), t)
  }

  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
