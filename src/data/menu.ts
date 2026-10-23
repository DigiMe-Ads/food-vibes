import type { MenuItem } from '../lib/firestore'
import { MENU_ITEMS } from './menuItems.mjs'

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/**
 * Typed, ready-to-render version of the real menu (see menuItems.mjs).
 * Used as the app's fallback when the Firestore `menuItems` collection is
 * empty, so the real menu shows out of the box; once the admin adds items in
 * Firestore, those take over. Keep the data itself in menuItems.mjs.
 */
export const DEFAULT_MENU_ITEMS: MenuItem[] = MENU_ITEMS.map((m, i) => ({
  id: `default-${slug(m.title)}`,
  order: i,
  title: m.title,
  price: m.price,
  description: m.description ?? '',
  category: m.category as MenuItem['category'],
  tags: m.tags,
  images: m.images ?? [],
}))
