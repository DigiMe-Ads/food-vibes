// One-time migration: writes the site's original hardcoded menu items,
// testimonials, and contact/gallery settings into Firestore. Run this once,
// after you've:
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
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { MENU_ITEMS as MENU_SOURCE } from '../src/data/menuItems.mjs'

const firebaseConfig = {
  apiKey: 'AIzaSyCiso7WQXk_4TL7avP4ELtDgdcWfiXEML4',
  authDomain: 'food-vibes-38fae.firebaseapp.com',
  projectId: 'food-vibes-38fae',
  storageBucket: 'food-vibes-38fae.firebasestorage.app',
  messagingSenderId: '740073824031',
  appId: '1:740073824031:web:cd71408e5eee90bcf09a2a',
}

// Real menu lives in src/data/menuItems.mjs (shared with the app). Add the
// `order` field so the site can sort items within each category.
const MENU_ITEMS = MENU_SOURCE.map((item, i) => ({
  ...item,
  description: item.description ?? '',
  images: item.images ?? [],
  order: i,
}))

const TESTIMONIALS = [
  { title: 'The best restaurant!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Oscar Oldman', date: '2021-02-02' },
  { title: 'It was very delicious!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Emma Newman', date: '2021-02-02', featured: true },
  { title: "I'm delighted!", body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Viktoria Freeman', date: '2022-01-15' },
  { title: 'A hidden gem!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Daniel Cross', date: '2022-01-15' },
  { title: 'Unforgettable evening!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Sophie Bennett', date: '2022-03-22', featured: true },
  { title: 'Worth every visit!', body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, eligendi dolorem? Voluptates rem magnam nesciunt ullam hic error sed, minus, accusantium inventore ex reprehenderit ipsam aperiam libero ut, laudantium delectus deleniti debitis quas dolore quos. Accusamus ea saepe, veniam. Nemo.', name: 'Liam Carter', date: '2022-06-09' },
]

const SITE_SETTINGS = {
  phone: '+94 771 444 956',
  email: 'info@foodvibeslk.com',
  address: 'No. 216, Yaddehimulla, Unawatuna, Sri Lanka',
  hours: 'Open daily, 8:00 AM – 11:00 PM',
  socials: { facebook: '', instagram: '', x: '', youtube: '' },
  galleryImages: [
    '/images/gallery/chocolate-dessert-plate.jpg',
    '/images/gallery/bar-cocktail-lineup.jpg',
    '/images/home/sri-lankan-appetizer-platter.jpg',
    '/images/home/gourmet-burger-and-fries.jpg',
  ],
}

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

  console.log('Seeding site settings...')
  await setDoc(doc(db, 'settings', 'site'), SITE_SETTINGS)

  console.log('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
