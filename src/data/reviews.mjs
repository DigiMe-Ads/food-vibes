// -----------------------------------------------------------------------------
// Food Vibes — real guest reviews (bundled defaults)
//
// Real reviews, copied word for word:
//   • TripAdvisor — full text, from screenshots of the listing (Nov 2026)
//   • Google — the opening lines only (via Wanderlog, Nov 2026); the "…"
//     marks where the review continues on Google.
// Kept newest first, which is also how the home page orders them.
// Dates where TripAdvisor only shows the visit month use the 1st (only the
// month and year are displayed).
//
// Shown on the home page whenever the Firestore `testimonials` collection is
// empty. Admin → Testimonials can load these into Firestore ("Replace with
// Google reviews") and then edit/add/remove them freely.
// Shared with scripts/seedFirestore.mjs, so it's plain JS.
// -----------------------------------------------------------------------------

const TRIPADVISOR_URL = 'https://www.tripadvisor.com/--d26769019.html'

export const DEFAULT_REVIEWS = [
  {
    title: 'Divine food experience at Food Vibes Unawatuna',
    body: "The food here takes you literally to the heaven: every bite is really delicious and divine. The menu is so attractive that you would want them to bring all the dishes in the row😋 The customer service is really quick and caring, very friendly staff. And if you'll add some beautiful cocktails, cool atmosphere and very good playlist, then yes - here you are in the food heaven!😇 😝 😍 Thank you so much for a wonderful experience!❤️ 🌸",
    name: 'Kadri',
    date: '2026-03-14',
    rating: 5,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
  },
  {
    title: 'Amazing spot in Unawatuna, Srí Lanka',
    body: `I had an absolutely fantastic dining experience here. From the moment we arrived, the entire team made us feel genuinely welcome with their warm and friendly hospitality. Location and value is superb!

The food was outstanding - every dish was beautifully prepared, full of fresh flavors, and clearly made with great care. The chef is incredibly talented, and it shows in every bite. The drinks were just as impressive: creative, perfectly balanced, and absolutely delicious.

It's rare to find a place that excels in every aspect, but this restaurant truly does. Amazing food, exceptional drinks, outstanding service, and a wonderful atmosphere made this one of the highlights of our trip to Unawatuna. I can't recommend it highly enough and will definitely return the next time I'm in Sri Lanka!`,
    name: 'tourguidewithredhead',
    date: '2026-01-01',
    rating: 5,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
    featured: true,
  },
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
  },
  {
    title: 'Seafood specialties',
    body: 'Great place, delicious, fresh seafood, nice staff, friendly owners. I can recommend it to everyone who loves sophisticated cuisine.',
    name: 'Gyula K',
    date: '2025-11-16',
    rating: 5,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
    featured: true,
  },
  {
    title: 'Great food, great service',
    body: `This restaurant took 4 of us arriving at 10pm and served terrific food and drinks with great attentive service.
The seafood and the curries were great. Highly recommend supporting this venue.`,
    name: 'mareew',
    date: '2025-09-12',
    rating: 5,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
  },
  {
    title: 'Rooftop stop for lunch near the beach',
    body: 'Great prawn skewers and detox smoothie. Tacos nice and full, ground beef in it was bolognese sauce. Beer was nice and chilled. Decor very nice and plenty of fans . A great lunch.',
    name: 'Colin L',
    date: '2025-04-29',
    rating: 4,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
  },
  {
    title: '',
    body: 'We loved our dinner at food vibes, the rooftop dining experience is amazing …',
    name: 'Hannah R.',
    date: '2025-03-13',
    rating: 5,
    source: 'Google',
    featured: true,
  },
  {
    title: 'Wonderful restaurant',
    body: `Very good food and friendly service. Thank you to our Hungarian hosts for a wonderful evening.this is the best restaurant in Unawatuna
Be sure to try it!5*`,
    name: 'Zoli',
    date: '2025-03-01',
    rating: 5,
    source: 'TripAdvisor',
    url: TRIPADVISOR_URL,
  },
  {
    title: '',
    body: "Wonderful place with SUCH a nice atmosphere & interior! Delicious food - doesn't matter, what you order! …",
    name: 'Diandra V.',
    date: '2025-02-08',
    rating: 5,
    source: 'Google',
  },
  {
    title: '',
    body: 'We visited the restaurant on the recommendation of a dear friend. We were not disappointed …',
    name: 'Balázs D.',
    date: '2024-12-29',
    rating: 5,
    source: 'Google',
    featured: true,
  },
]
