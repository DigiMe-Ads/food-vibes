// Replace the live menu in Firestore with the real Food Vibes menu.
//
// Unlike seedFirestore.mjs (which only ADDS and also seeds testimonials +
// settings), this script ONLY touches the `menuItems` collection and REPLACES
// it: it deletes every existing menu doc, then writes the current menu from
// src/data/menuItems.mjs. Use this whenever the menu changes.
//
// Usage (from the project root):
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword node scripts/reseedMenu.mjs
//
// It signs in as that admin so it passes the Firestore security rules (only the
// admin may write to menuItems), then clears + rewrites the collection.
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
import { MENU_ITEMS as MENU_SOURCE } from '../src/data/menuItems.mjs'

const firebaseConfig = {
  apiKey: 'AIzaSyCiso7WQXk_4TL7avP4ELtDgdcWfiXEML4',
  authDomain: 'food-vibes-38fae.firebaseapp.com',
  projectId: 'food-vibes-38fae',
  storageBucket: 'food-vibes-38fae.firebasestorage.app',
  messagingSenderId: '740073824031',
  appId: '1:740073824031:web:cd71408e5eee90bcf09a2a',
}

const MENU_ITEMS = MENU_SOURCE.map((item, i) => ({
  ...item,
  description: item.description ?? '',
  images: item.images ?? [],
  order: i,
}))

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.error(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD env vars (the admin user you created in the Firebase Console) before running this script.',
    )
    process.exit(1)
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  console.log(`Signing in as ${email}...`)
  await signInWithEmailAndPassword(auth, email, password)

  console.log('Clearing existing menu items...')
  const existing = await getDocs(collection(db, 'menuItems'))
  console.log(`  found ${existing.size} existing items, deleting...`)
  for (const d of existing.docs) {
    await deleteDoc(d.ref)
  }

  console.log(`Writing ${MENU_ITEMS.length} real menu items...`)
  for (const item of MENU_ITEMS) {
    await addDoc(collection(db, 'menuItems'), item)
  }

  console.log('Done. The site now shows the real menu.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
