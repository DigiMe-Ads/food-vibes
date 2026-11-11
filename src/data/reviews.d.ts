// Types for the plain-data reviews module (reviews.mjs), shared with the
// Node seed script and therefore kept as JS rather than TS.
declare module '*/reviews.mjs' {
  export const DEFAULT_REVIEWS: Array<{
    title: string
    body: string
    name: string
    date: string
    rating?: number
    source?: 'Google' | 'TripAdvisor'
    url?: string
    featured?: boolean
  }>
}
