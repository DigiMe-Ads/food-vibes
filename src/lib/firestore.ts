// Shared Firestore access — typed helpers + live-subscription hooks used by
// both the public site (menu/testimonials reads, reservation/contact writes)
// and the admin dashboard (full CRUD, reservations/messages reads).
import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import type { Timestamp } from 'firebase/firestore'
import { db } from '../firebase'

// ---------------------------------------------------------------------------
// Types

export type MenuCategory =
  | 'Starters'
  | 'Salads & Soups'
  | 'Tacos & Handhelds'
  | 'Mains'
  | 'Desserts'
  | 'Drinks & Cocktails'

export const MENU_CATEGORIES: MenuCategory[] = [
  'Starters',
  'Salads & Soups',
  'Tacos & Handhelds',
  'Mains',
  'Desserts',
  'Drinks & Cocktails',
]

export type MenuItem = {
  id: string
  title: string
  price: string
  description: string
  category: MenuCategory
  tags?: string[]
  /** First entry is the cover photo shown on the menu grid card. */
  images: string[]
  order: number
}

export type Testimonial = {
  id: string
  title: string
  body: string
  name: string
  date: string
  featured?: boolean
  avatar?: string
}

export type SelectedDish = { title: string; qty: number }

export type ReservationStatus = 'New' | 'Confirmed' | 'Cancelled'

export type Reservation = {
  id: string
  name: string
  email: string
  phone: string
  guests: string
  date: string
  time: string
  message?: string
  items?: SelectedDish[]
  status: ReservationStatus
  createdAt?: Timestamp
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  read: boolean
  createdAt?: Timestamp
}

// ---------------------------------------------------------------------------
// Live-read hooks (public + admin)

function useCollection<T>(name: string, order: [string, 'asc' | 'desc']) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, name), orderBy(order[0], order[1]))
    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T))
        setLoading(false)
      },
      () => setLoading(false),
    )
    return unsub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return { data, loading }
}

export function useMenuItems() {
  return useCollection<MenuItem>('menuItems', ['order', 'asc'])
}

export function useTestimonials() {
  return useCollection<Testimonial>('testimonials', ['date', 'desc'])
}

export function useReservations() {
  return useCollection<Reservation>('reservations', ['createdAt', 'desc'])
}

export function useContactMessages() {
  return useCollection<ContactMessage>('contactMessages', ['createdAt', 'desc'])
}

// ---------------------------------------------------------------------------
// Menu CRUD (admin)

export async function addMenuItem(item: Omit<MenuItem, 'id'>) {
  await addDoc(collection(db, 'menuItems'), item)
}

export async function updateMenuItem(id: string, item: Partial<Omit<MenuItem, 'id'>>) {
  await updateDoc(doc(db, 'menuItems', id), item)
}

export async function deleteMenuItem(id: string) {
  await deleteDoc(doc(db, 'menuItems', id))
}

// ---------------------------------------------------------------------------
// Testimonial CRUD (admin)

export async function addTestimonial(item: Omit<Testimonial, 'id'>) {
  await addDoc(collection(db, 'testimonials'), item)
}

export async function updateTestimonial(id: string, item: Partial<Omit<Testimonial, 'id'>>) {
  await updateDoc(doc(db, 'testimonials', id), item)
}

export async function deleteTestimonial(id: string) {
  await deleteDoc(doc(db, 'testimonials', id))
}

// ---------------------------------------------------------------------------
// Reservations — public create, admin manage

export async function submitReservation(data: {
  name: string
  email: string
  phone: string
  guests: string
  date: string
  time: string
  message?: string
  items?: SelectedDish[]
}) {
  await addDoc(collection(db, 'reservations'), {
    ...data,
    status: 'New' satisfies ReservationStatus,
    createdAt: serverTimestamp(),
  })
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  await updateDoc(doc(db, 'reservations', id), { status })
}

export async function deleteReservation(id: string) {
  await deleteDoc(doc(db, 'reservations', id))
}

// ---------------------------------------------------------------------------
// Contact messages — public create, admin manage

export async function submitContactMessage(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}) {
  await addDoc(collection(db, 'contactMessages'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  })
}

export async function markMessageRead(id: string, read = true) {
  await updateDoc(doc(db, 'contactMessages', id), { read })
}

export async function deleteMessage(id: string) {
  await deleteDoc(doc(db, 'contactMessages', id))
}
