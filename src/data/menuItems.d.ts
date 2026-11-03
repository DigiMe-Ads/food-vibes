// Types for the plain-data menu module (menuItems.mjs), which is shared with
// the Node seed scripts and therefore kept as JS rather than TS.
declare module '*/menuItems.mjs' {
  export const MENU_ITEMS: Array<{
    title: string
    price: string
    description?: string
    category: string
    tags?: string[]
    images?: string[]
    menu?: 'all-day' | 'breakfast'
  }>
}
