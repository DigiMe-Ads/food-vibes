# Images

Drop your real images here. The components already reference these paths — no
code changes needed once the files exist. Until then, neutral placeholders show.

Expected files:

| File                    | Used in                | Notes                          |
| ----------------------- | ---------------------- | ------------------------------ |
| `hero.jpg`              | Hero background        | Wide, dark food shot           |
| `feature-pizza.jpg`     | Features               | ~112×112 (rounded)             |
| `feature-music.jpg`     | Features               | ~112×112 (rounded)             |
| `feature-bar.jpg`       | Features               | ~112×112 (rounded)             |
| `feature-cuisine.jpg`   | Features               | ~112×112 (rounded)             |
| `dish-appetizers.jpg`   | Popular Dishes         | 4:3                            |
| `dish-salads.jpg`       | Popular Dishes         | 4:3                            |
| `dish-tacos.jpg`        | Popular Dishes         | 4:3                            |
| `reservation.jpg`       | Book Your Table banner | Wide, dim interior             |
| `gallery-1..4.jpg`      | Footer gallery         | Square                         |

A missing file simply falls back to the placeholder, so you can add them one at
a time.

| `about/head-chef-ruwan.jpg` | Meet the Chef (About page) | Portrait, ~4:5 |

Menu photos, testimonial avatars, and everything managed from `/admin` are
stored as full paths/URLs in Firestore, not filenames dropped into this
folder — the admin dashboard's image picker reads from whatever is already
here, or accepts a pasted URL.
