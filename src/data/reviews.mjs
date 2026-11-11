// -----------------------------------------------------------------------------
// Food Vibes — real guest reviews (bundled defaults)
//
// Collected from the restaurant's public Google listing (via Wanderlog,
// Nov 2026). These are the opening lines of each review as published; the
// "…" marks where the review continues on Google.
//
// Shown on the home page whenever the Firestore `testimonials` collection is
// empty. Admin → Testimonials can load these into Firestore ("Replace with
// Google reviews") and then edit/add/remove them freely.
// Shared with scripts/seedFirestore.mjs, so it's plain JS.
// -----------------------------------------------------------------------------

export const DEFAULT_REVIEWS = [
  {
    title: '',
    body: 'It was a really amazing dining experience. Literally the place is for food vibes. …',
    name: 'Wap D.',
    date: '2025-12-24',
    rating: 5,
    source: 'Google',
  },
  {
    title: '',
    body: 'Excellent. For the first time in Sri Lanka, our food came quick to the table, we were a group of 7 …',
    name: 'Ailén L.',
    date: '2025-12-03',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    title: '',
    body: 'We loved our dinner at food vibes, the rooftop dining experience is amazing …',
    name: 'Hannah R.',
    date: '2025-03-13',
    rating: 5,
    source: 'Google',
  },
  {
    title: '',
    body: "Wonderful place with SUCH a nice atmosphere & interior! Delicious food - doesn't matter, what you order! …",
    name: 'Diandra V.',
    date: '2025-02-08',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    title: '',
    body: 'We visited the restaurant on the recommendation of a dear friend. We were not disappointed …',
    name: 'Balázs D.',
    date: '2024-12-29',
    rating: 5,
    source: 'Google',
  },
]
