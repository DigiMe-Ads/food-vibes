// Firebase app setup — shared by the public site (menu/testimonials reads,
// reservation/contact writes) and the admin dashboard (auth + full CRUD).
//
// This is the standard Firebase *web* config: it identifies the project, it
// is not a secret, and is safe to ship in client code. Access control lives
// in firestore.rules (see that file + README notes), not in hiding this
// object.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCiso7WQXk_4TL7avP4ELtDgdcWfiXEML4',
  authDomain: 'food-vibes-38fae.firebaseapp.com',
  projectId: 'food-vibes-38fae',
  storageBucket: 'food-vibes-38fae.firebasestorage.app',
  messagingSenderId: '740073824031',
  appId: '1:740073824031:web:cd71408e5eee90bcf09a2a',
  measurementId: 'G-1E5QK072VE',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
