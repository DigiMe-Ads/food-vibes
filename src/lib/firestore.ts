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
  setDoc,
  updateDoc,
  where,
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

export type DeviceBucket = 'mobile' | 'desktop'

export type ClickEvent = {
  id: string
  path: string
  /** Click position as a fraction (0–1) of the full page's scroll width/height. */
  xPct: number
  yPct: number
  device: DeviceBucket
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

// ---------------------------------------------------------------------------
// Click events — public create (fire-and-forget from the tracker), admin
// reads them per-page to render the heatmap.

export async function recordClickEvent(data: {
  path: string
  xPct: number
  yPct: number
  device: DeviceBucket
}) {
  await addDoc(collection(db, 'clickEvents'), { ...data, createdAt: serverTimestamp() })
}

/** All recorded clicks for one page, optionally narrowed to one device bucket. */
export function useClickEvents(path: string, device: DeviceBucket | 'all') {
  const [data, setData] = useState<ClickEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const clauses = [where('path', '==', path)]
    if (device !== 'all') clauses.push(where('device', '==', device))
    const q = query(collection(db, 'clickEvents'), ...clauses)
    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as ClickEvent))
        setLoading(false)
      },
      () => setLoading(false),
    )
    return unsub
  }, [path, device])

  return { data, loading }
}

export async function clearClickEvents(ids: string[]) {
  await Promise.all(ids.map((id) => deleteDoc(doc(db, 'clickEvents', id))))
}

// ---------------------------------------------------------------------------
// Site settings — a single doc holding contact info + the footer gallery,
// so both are editable from the dashboard instead of hardcoded per-component
// (which had let the footer and the contact page drift to two different
// phone numbers). Public read, admin write; components merge this over
// DEFAULT_SITE_SETTINGS so the site never looks broken before the doc
// exists or while a field is still empty.

export type SiteSettings = {
  phone: string
  email: string
  address: string
  hours: string
  socials: { facebook: string; instagram: string; x: string; youtube: string }
  galleryImages: string[]
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  phone: '+94 76 578 2468',
  email: 'hello@foodvibes.com',
  address: 'No. 216, Yaddehimulla, Unawatuna, Sri Lanka',
  hours: 'Open daily, 7:30 AM – 11:00 PM',
  socials: { facebook: '', instagram: '', x: '', youtube: '' },
  galleryImages: [
    '/images/gallery/chocolate-dessert-plate.jpg',
    '/images/gallery/bar-cocktail-lineup.jpg',
    '/images/home/sri-lankan-appetizer-platter.jpg',
    '/images/home/gourmet-burger-and-fries.jpg',
  ],
}

const SETTINGS_DOC = ['settings', 'site'] as const

export function useSiteSettings() {
  const [data, setData] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, ...SETTINGS_DOC),
      (snap) => {
        const stored = snap.data() as Partial<SiteSettings> | undefined
        setData({
          ...DEFAULT_SITE_SETTINGS,
          ...stored,
          socials: { ...DEFAULT_SITE_SETTINGS.socials, ...stored?.socials },
        })
        setLoading(false)
      },
      () => setLoading(false),
    )
    return unsub
  }, [])

  return { data, loading }
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  await setDoc(doc(db, ...SETTINGS_DOC), data, { merge: true })
}
