// -----------------------------------------------------------------------------
// Food Vibes — real menu (single source of truth)
//
// Transcribed from the restaurant's printed Food Menu & Drinks Menu (prices in
// LKR). This plain-data module is the ONE place the menu is defined. It is
// consumed by:
//   • src/data/menu.ts        -> typed DEFAULT_MENU_ITEMS (app fallback)
//   • scripts/seedFirestore.mjs / scripts/reseedMenu.mjs -> writes to Firestore
//
// `images` paths point at /public/images/* and are only set where we actually
// have a matching photo; everything else renders as a clean text menu row.
// Categories must stay in sync with MENU_CATEGORIES in src/lib/firestore.ts.
// -----------------------------------------------------------------------------

export const MENU_ITEMS = [
  // ----- Appetizers -----
  { title: 'Corn Ribs', price: 'LKR. 1,200', description: 'Togarashi spice, tzatziki sauce, coriander.', category: 'Appetizers' },
  { title: 'Tuna Tartare', price: 'LKR. 2,600', description: 'Spicy mayo, avocado salsa, lime and coriander.', category: 'Appetizers' },
  { title: 'Crispy Fried Calamari', price: 'LKR. 2,100', description: 'Coriander and micro herbs, cherry tomatoes, green mayo.', category: 'Appetizers' },
  { title: 'Grilled Prawns Skewers', price: 'LKR. 2,200', description: 'Togarashi butter, corn salsa, garlic aioli cream.', category: 'Appetizers' },
  { title: 'Keftedes', price: 'LKR. 2,600', description: 'Minced beef, hummus, salsa, burnt butter, paratha bread.', category: 'Appetizers', images: ['/images/home/sri-lankan-appetizer-platter.jpg'] },

  // ----- Salads & Soups -----
  { title: 'Crunchy Corn Salad', price: 'LKR. 2,800', description: 'Sweet corn on the cob, mix lettuce, green sauce, pomegranate, tortilla chips.', category: 'Salads & Soups', tags: ['Vegetarian'] },
  { title: 'Mango Avocado Shrimp Salad', price: 'LKR. 3,200', description: 'Mix lettuce, mango, prawns, avocado, citrus dressing.', category: 'Salads & Soups', images: ['/images/menu/chilled-shrimp-salad.jpg'] },
  { title: 'Caesar Salad (Chicken or Prawn)', price: 'LKR. 3,200', description: 'Croutons, anchovies, parmesan cheese.', category: 'Salads & Soups' },
  { title: 'Burrata Watermelon Special Salad', price: 'LKR. 3,600', description: 'Burrata cheese, watermelon, heirloom tomato, basil leaves, honey dressing.', category: 'Salads & Soups' },
  { title: 'Cream of Tomato Soup', price: 'LKR. 1,600', description: 'Served with crispy bread.', category: 'Salads & Soups' },
  { title: 'Thai Tom Yum Soup with Shrimp', price: 'LKR. 1,800', description: 'Lemongrass, galangal, Thai chilli paste, prawns, mushrooms.', category: 'Salads & Soups', tags: ['Spicy'] },

  // ----- Tacos & Sandwiches -----
  { title: 'Food Vibes Nachos', price: 'LKR. 1,800', description: 'Tortilla chips, guacamole.', category: 'Tacos & Sandwiches' },
  { title: 'Prawn Tacos (2 Pieces)', price: 'LKR. 2,200', description: 'Prawns, spicy mango, guacamole.', category: 'Tacos & Sandwiches', images: ['/images/home/seafood-tacos-plate.jpg', '/images/home/seafood-tacos-close-up.jpg'] },
  { title: 'Food Vibes Club Sandwich', price: 'LKR. 2,800', description: 'Ham, cheese, egg, lettuce, pickles, cucumber, bacon.', category: 'Tacos & Sandwiches' },
  { title: 'Reuben Sandwich', price: 'LKR. 2,500', description: 'Cheese & beef.', category: 'Tacos & Sandwiches' },

  // ----- Manakish & Saj -----
  { title: 'Zaatar Manakish', price: 'LKR. 1,400', description: '', category: 'Manakish & Saj', tags: ['Vegetarian'] },
  { title: 'Feta Cheese Manakish', price: 'LKR. 1,400', description: '', category: 'Manakish & Saj', tags: ['Vegetarian'] },
  { title: 'Meat Manakish', price: 'LKR. 1,800', description: 'Minced beef.', category: 'Manakish & Saj' },
  { title: 'Zaatar & Cheese Saj', price: 'LKR. 1,800', description: '', category: 'Manakish & Saj', tags: ['Vegetarian'] },
  { title: 'Kraft Cheese & Honey Saj', price: 'LKR. 1,800', description: '', category: 'Manakish & Saj', tags: ['Vegetarian'] },
  { title: 'Nutella Saj', price: 'LKR. 2,000', description: '', category: 'Manakish & Saj', tags: ['Sweet'] },

  // ----- Pizza (12 inch) -----
  { title: 'Neapolitan Pizza', price: 'LKR. 2,900', description: '12 inch. Cherry tomato, fresh mozzarella, olive oil, basil.', category: 'Pizza', tags: ['Vegetarian'] },
  { title: 'Prawn, Roasted Capsicum & Pesto Pizza', price: 'LKR. 3,500', description: '12 inch. Succulent prawns, basil pesto sauce, roasted capsicum.', category: 'Pizza' },
  { title: 'Tandoori Chicken Pizza with Mint Chutney', price: 'LKR. 3,800', description: '12 inch. Chicken, mint chutney.', category: 'Pizza' },
  { title: 'Cheesy Pepperoni Pizza with Crispy Crust', price: 'LKR. 3,900', description: '12 inch. Neapolitan sauce, mozzarella, beef pepperoni & olives.', category: 'Pizza' },

  // ----- Pasta (From Italy) -----
  { title: 'Creamy Sun-Dried Tomato Spinach Spaghetti', price: 'LKR. 2,800', description: '', category: 'Pasta', tags: ['Vegetarian'] },
  { title: 'Pasta con Bistecca e Funghi', price: 'LKR. 2,800', description: 'Beef and mushroom pasta.', category: 'Pasta' },
  { title: 'Tuna Pesto Pasta', price: 'LKR. 2,900', description: '', category: 'Pasta' },
  { title: 'Frutti di Mare', price: 'LKR. 3,000', description: 'Mixed seafood pasta.', category: 'Pasta' },
  { title: 'Prawn Linguine', price: 'LKR. 3,000', description: 'Pink creamy sauce, roasted cherry tomatoes, parmesan cheese.', category: 'Pasta', images: ['/images/home/shrimp-pasta-plate.jpg', '/images/home/shrimp-pasta-garnished.jpg'] },
  { title: 'Carbonara from La Pergoletta', price: 'LKR. 3,200', description: 'Creamy sauce, chicken, pork bacon, parmesan cheese.', category: 'Pasta' },
  { title: 'Spaghetti Bolognese', price: 'LKR. 3,600', description: 'Minced beef, parmesan cheese & chopped parsley.', category: 'Pasta' },

  // ----- From the Sea -----
  { title: 'Fish & Chips', price: 'LKR. 3,200', description: 'Battered white fish, tartare sauce, thick-cut fries.', category: 'From the Sea' },
  { title: 'Seared Yellow Fin Tuna Steak (200g)', price: 'LKR. 3,200', description: 'Served with French ratatouille and chimichurri sauce.', category: 'From the Sea', images: ['/images/menu/herb-crusted-fish-starter.jpg'] },
  { title: 'Mediterranean White Fish', price: 'LKR. 4,000', description: 'Mahi-Mahi fish, served with rice & coconut cream sauce.', category: 'From the Sea', images: ['/images/menu/pan-seared-fish.jpg'] },
  { title: 'Cioppino (White Fish, Prawns, Calamari)', price: 'LKR. 4,800', description: 'Italian fishermen stew with vegetables.', category: 'From the Sea' },
  { title: 'Grilled Lagoon Prawns', price: 'LKR. 3,800', description: 'Served with French ratatouille and citrus creamy sauce.', category: 'From the Sea' },
  { title: "Chef's Special Grilled Calamari (200g)", price: 'LKR. 3,200', description: 'Citrus creamy sauce, calamari with homemade skinny fries.', category: 'From the Sea' },
  { title: 'Seafood Platter for Two', price: 'LKR. 15,000', description: 'Full fish 400g, jumbo prawn 200g, calamari 150g, crab 150g, lagoon prawn 200g, served with confit potato, classic coleslaw & citrus creamy sauce.', category: 'From the Sea', tags: ['Serves 2'], images: ['/images/menu/chefs-sharing-platter.jpg'] },

  // ----- Grilled & Steaks -----
  { title: 'Tenderloin Steak (200g)', price: 'LKR. 6,500', description: 'Local beef served with French ratatouille and creamy pepper sauce.', category: 'Grilled & Steaks' },
  { title: 'Pork Chop with Balsamic Maple Glaze', price: 'LKR. 4,800', description: 'Local pork chop, French ratatouille, glazed pineapple & creamy pepper sauce.', category: 'Grilled & Steaks' },
  { title: 'Herb Infused Grilled Chicken Breast', price: 'LKR. 3,800', description: 'Served with French ratatouille & creamy pepper sauce.', category: 'Grilled & Steaks' },
  { title: 'Australian Striploin Steak', price: 'LKR. 9,900', description: 'Australian beef served with truffle mashed potatoes.', category: 'Grilled & Steaks' },
  { title: 'Salmon Fish', price: 'LKR. 6,500', description: 'Norwegian salmon fish served with mashed potatoes and a fresh lemon-dill rice or green salad.', category: 'Grilled & Steaks' },
  { title: 'Lamb Rack', price: 'LKR. 5,800', description: 'Served with mashed potatoes and herb infused grilled vegetables.', category: 'Grilled & Steaks' },

  // ----- Sri Lankan -----
  { title: 'Sri Lankan Style Tofu Curry with Rice', price: 'LKR. 2,500', description: '', category: 'Sri Lankan', tags: ['Vegetarian'] },
  { title: 'Rich and Aromatic Butter Chicken Curry', price: 'LKR. 2,800', description: 'Served with rice.', category: 'Sri Lankan' },
  { title: 'Authentic Sri Lankan Prawn Curry with Rice', price: 'LKR. 2,500', description: '', category: 'Sri Lankan' },
  { title: 'Coconut Milk Chilli Mud Crab with Rice or Bread', price: 'LKR. 3,200', description: '', category: 'Sri Lankan', tags: ['Spicy'] },

  // ----- Burgers -----
  { title: 'Halloumi Cheese Burger', price: 'LKR. 2,800', description: 'Brioche bun, halloumi cheese, guacamole.', category: 'Burgers', tags: ['Vegetarian'] },
  { title: 'Crispy Chicken Burger (120g)', price: 'LKR. 3,500', description: 'Brioche bun, cheese slice, garden green, red onion, tomato, pickle cucumber, jalapeño, rich sauce.', category: 'Burgers' },
  { title: 'Hamburger', price: 'LKR. 3,500', description: 'Local minced beef, brioche bun, cheese slice, garden green, red onion, tomato, pickle cucumber, jalapeño, secret sauce.', category: 'Burgers', images: ['/images/home/gourmet-burger-and-fries.jpg', '/images/home/burger-basket-close-up.jpg'] },
  { title: 'Tuna Burger with Green Mayo', price: 'LKR. 3,200', description: 'Local minced tuna, brioche bun, cheese slice, garden green, red onion, tomato, pickle cucumber, jalapeño, green sauce.', category: 'Burgers' },

  // ----- Kids (Young Travellers) -----
  { title: 'Spaghetti with Parmesan Cheese', price: 'LKR. 1,000', description: '', category: 'Kids', tags: ['Vegetarian'] },
  { title: 'Spaghetti with Pomodoro Sauce', price: 'LKR. 1,000', description: '', category: 'Kids', tags: ['Vegetarian'] },
  { title: 'Fish Fingers with Fries', price: 'LKR. 1,400', description: '', category: 'Kids' },
  { title: 'Chicken Nuggets with Fries', price: 'LKR. 2,000', description: '', category: 'Kids' },
  { title: 'French Fries', price: 'LKR. 1,800', description: '', category: 'Kids', tags: ['Vegetarian'] },

  // ----- Desserts -----
  { title: 'Buffalo Curd', price: 'LKR. 800', description: 'Served with kithul honey.', category: 'Desserts' },
  { title: 'Chocolate Brownie', price: 'LKR. 1,800', description: 'Warm chocolate brownie served with ice cream.', category: 'Desserts', images: ['/images/home/chocolate-brownie-dessert.jpg', '/images/home/brownie-ice-cream-dessert.jpg'] },
  { title: 'Cream Brûlée', price: 'LKR. 1,800', description: '', category: 'Desserts' },
  { title: 'Choice of Ice Cream', price: 'LKR. 1,200', description: 'Chocolate, vanilla, strawberry.', category: 'Desserts' },
  { title: 'Tropical Fruit Bowl with Ice Cream', price: 'LKR. 1,200', description: 'Assorted tropical fruit.', category: 'Desserts' },

  // ----- Soft Drinks -----
  { title: 'Fanta', price: 'LKR. 450', description: '', category: 'Soft Drinks' },
  { title: 'Coca Cola', price: 'LKR. 450', description: '', category: 'Soft Drinks' },
  { title: 'Cola Zero', price: 'LKR. 500', description: '', category: 'Soft Drinks' },
  { title: 'Sprite', price: 'LKR. 450', description: '', category: 'Soft Drinks' },
  { title: 'Ginger Beer', price: 'LKR. 450', description: '', category: 'Soft Drinks' },
  { title: 'Pepsi', price: 'LKR. 400', description: '', category: 'Soft Drinks' },
  { title: 'Soda', price: 'LKR. 400', description: '', category: 'Soft Drinks' },
  { title: 'Tonic', price: 'LKR. 400', description: '', category: 'Soft Drinks' },
  { title: 'Water', price: 'LKR. 150', description: '', category: 'Soft Drinks' },
  { title: 'Sparkling Water', price: 'LKR. 500', description: '', category: 'Soft Drinks' },
  { title: 'King Coconut', price: 'LKR. 400', description: '', category: 'Soft Drinks' },
  { title: 'Spinner', price: 'LKR. 1,000', description: '', category: 'Soft Drinks' },
  { title: 'Red Bull', price: 'LKR. 2,000', description: '', category: 'Soft Drinks' },

  // ----- Juices & Shakes -----
  { title: 'Shine On', price: 'LKR. 1,200', description: 'Carrot, ginger, green apple.', category: 'Juices & Shakes' },
  { title: 'Lime Juice', price: 'LKR. 1,000', description: '', category: 'Juices & Shakes' },
  { title: 'Lime & Soda', price: 'LKR. 1,200', description: '', category: 'Juices & Shakes' },
  { title: 'Lime & Mint', price: 'LKR. 1,200', description: '', category: 'Juices & Shakes', images: ['/images/menu/cucumber-lime-cooler.jpg'] },
  { title: 'Watermelon Juice', price: 'LKR. 1,200', description: '', category: 'Juices & Shakes', images: ['/images/menu/watermelon-mint-cooler.jpg'] },
  { title: 'Passion Fruit Juice', price: 'LKR. 1,200', description: '', category: 'Juices & Shakes' },
  { title: 'Mango Juice', price: 'LKR. 1,400', description: '', category: 'Juices & Shakes' },
  { title: 'Pineapple Juice', price: 'LKR. 1,400', description: '', category: 'Juices & Shakes' },
  { title: 'Mix Juice', price: 'LKR. 1,500', description: 'Choice of 3 fruits.', category: 'Juices & Shakes' },
  { title: 'Vanilla Shake', price: 'LKR. 1,400', description: '', category: 'Juices & Shakes' },
  { title: 'Chocolate Shake', price: 'LKR. 1,400', description: '', category: 'Juices & Shakes', images: ['/images/menu/iced-mocha-shake.jpg'] },
  { title: 'Strawberry Shake', price: 'LKR. 1,500', description: '', category: 'Juices & Shakes' },
  { title: 'Mango Shake', price: 'LKR. 1,500', description: '', category: 'Juices & Shakes' },
  { title: 'Protein Shake', price: 'LKR. 2,000', description: 'Peanut butter, dates, banana, cocoa powder, chocolate topping, milk.', category: 'Juices & Shakes' },

  // ----- Mocktails -----
  { title: 'Virgin Mojito', price: 'LKR. 1,200', description: 'Lime, sugar, mint, sprite.', category: 'Mocktails' },
  { title: 'Shirley Temple', price: 'LKR. 1,200', description: 'Lime, grenadine syrup, sprite.', category: 'Mocktails' },
  { title: 'Virgin Blue Lagoon', price: 'LKR. 1,200', description: 'Lime, blue curaçao, sprite.', category: 'Mocktails' },
  { title: 'Virgin Colada', price: 'LKR. 1,200', description: 'Pineapple, coconut cream, honey.', category: 'Mocktails' },
  { title: 'Tropical Vibes', price: 'LKR. 1,400', description: 'Passion juice, orange juice, cranberry juice.', category: 'Mocktails' },

  // ----- Cocktails (Classic, Signature & Spritz) -----
  { title: 'Mojito', price: 'LKR. 2,000', description: 'White rum, lime, fresh mint leaves, sugar, soda.', category: 'Cocktails' },
  { title: 'Cuba Libre', price: 'LKR. 2,000', description: 'Dark rum, lime juice, cola.', category: 'Cocktails' },
  { title: 'Pina Colada', price: 'LKR. 2,200', description: 'White rum, coconut milk, pineapple juice, honey.', category: 'Cocktails' },
  { title: 'Moscow Mule', price: 'LKR. 2,000', description: 'Vodka, lime juice, ginger beer.', category: 'Cocktails' },
  { title: 'Arrack Attack', price: 'LKR. 1,800', description: 'Arrack, lime juice, ginger beer.', category: 'Cocktails' },
  { title: 'Arrack Sour', price: 'LKR. 1,800', description: 'Arrack, fresh lime, sugar.', category: 'Cocktails' },
  { title: 'Pink Lady', price: 'LKR. 2,800', description: 'Gin, egg white, lime juice, grenadine syrup.', category: 'Cocktails' },
  { title: 'Blue Lady', price: 'LKR. 2,800', description: 'Gin, egg white, lime juice, blue curaçao.', category: 'Cocktails' },
  { title: 'Tequila Sunrise', price: 'LKR. 2,500', description: 'Tequila, orange juice, grenadine syrup.', category: 'Cocktails', images: ['/images/menu/signature-sunset-cocktail.jpg'] },
  { title: 'Margarita', price: 'LKR. 2,400', description: 'Tequila, triple sec, lime, sugar syrup.', category: 'Cocktails' },
  { title: 'Spicy Passion Margarita', price: 'LKR. 2,500', description: 'Tequila, triple sec, lime, passion, tabasco.', category: 'Cocktails', tags: ['Spicy'] },
  { title: 'Tamarind Whiskey Sour', price: 'LKR. 2,500', description: 'Whiskey, tamarind, lime, sugar.', category: 'Cocktails' },
  { title: 'Sex on the Beach', price: 'LKR. 2,500', description: 'Vodka, orange juice, cranberry juice.', category: 'Cocktails' },
  { title: 'Cosmopolitan', price: 'LKR. 2,200', description: 'Vodka, triple sec, lime juice, cranberry juice.', category: 'Cocktails' },
  { title: 'Espresso Martini', price: 'LKR. 2,500', description: 'Vodka, espresso, homemade Kahlúa.', category: 'Cocktails' },
  { title: 'Classic Daiquiri', price: 'LKR. 2,200', description: 'White rum, lime juice, sugar syrup.', category: 'Cocktails' },
  { title: 'Long Island Iced Tea', price: 'LKR. 3,800', description: 'Tequila, vodka, gin, white rum, triple sec, lime juice, cola.', category: 'Cocktails' },
  { title: 'Passion Mojito', price: 'LKR. 2,200', description: 'White rum, passion, mint leaves, lime, sugar, sprite.', category: 'Cocktails', images: ['/images/menu/smoked-pineapple-mojito.jpg'] },
  { title: 'Mango Passion Mojito', price: 'LKR. 2,200', description: 'White rum, mango, passion, mint leaves, lime, sugar, sprite.', category: 'Cocktails' },
  { title: 'Aperol Passion Martini', price: 'LKR. 2,500', description: 'Vodka, aperol, passion juice, lime, sugar syrup.', category: 'Cocktails' },
  { title: 'Lychee Margarita', price: 'LKR. 2,500', description: 'Tequila, lime juice, triple sec, lychee.', category: 'Cocktails' },
  { title: 'Sangria', price: 'LKR. 3,000', description: 'Red wine, orange, apple, grapes, sprite.', category: 'Cocktails' },
  { title: 'Gin Basil Smash', price: 'LKR. 2,500', description: 'Gin, fresh basil, lime, sugar syrup.', category: 'Cocktails' },
  { title: 'White Linen', price: 'LKR. 2,500', description: 'Gin, cucumber, lime, sugar syrup.', category: 'Cocktails' },
  { title: 'Frozen Daiquiri', price: 'LKR. 3,000', description: 'Strawberry, mango or passion. White rum, lime, sugar syrup.', category: 'Cocktails' },
  { title: 'Food Vibe Special Frozen Blue Coco', price: 'LKR. 2,800', description: 'White rum, lime juice, pineapple, coconut milk, blue curaçao.', category: 'Cocktails', tags: ["Chef's Pick"] },
  { title: 'Aperol Spritz', price: 'LKR. 3,000', description: 'Aperol, sparkling wine, soda.', category: 'Cocktails' },
  { title: 'Campari Spritz', price: 'LKR. 3,000', description: 'Campari, sparkling wine, soda.', category: 'Cocktails' },

  // ----- Beer, Wine & Spirits -----
  { title: 'Lion Lager Can (500ml)', price: 'LKR. 800', description: '', category: 'Beer, Wine & Spirits' },
  { title: 'Carlsberg Can (500ml)', price: 'LKR. 1,200', description: '', category: 'Beer, Wine & Spirits' },
  { title: 'Heineken Can (500ml)', price: 'LKR. 1,500', description: '', category: 'Beer, Wine & Spirits' },
  { title: 'Somersby Can (500ml)', price: 'LKR. 1,500', description: 'Apple, blackberry, mango & lime.', category: 'Beer, Wine & Spirits' },
  { title: 'Lion Bottle (625ml)', price: 'LKR. 1,200', description: '', category: 'Beer, Wine & Spirits' },
  { title: 'Lion Beer Tower', price: 'LKR. 4,500', description: 'One tower + 6 glasses.', category: 'Beer, Wine & Spirits', tags: ['Sharing'] },
  { title: 'Beer Bucket (5 Beers)', price: 'LKR. 3,750', description: 'Lion lager 500ml.', category: 'Beer, Wine & Spirits', tags: ['Sharing'] },
  { title: 'Wine Glass (150ml)', price: 'LKR. 2,100', description: '', category: 'Beer, Wine & Spirits' },
  { title: 'Wine Bottle', price: 'LKR. 9,500', description: 'White or red Saltbush — wine of Australia.', category: 'Beer, Wine & Spirits' },
  { title: 'Arrack Shot (50ml)', price: 'LKR. 1,600', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },
  { title: 'Gin Shot (50ml)', price: 'LKR. 2,000', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },
  { title: 'Vodka Shot (50ml)', price: 'LKR. 2,000', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },
  { title: 'Rum Shot (50ml)', price: 'LKR. 2,000', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },
  { title: 'Whiskey Shot (50ml)', price: 'LKR. 2,200', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },
  { title: 'Tequila Shot (50ml)', price: 'LKR. 2,500', description: 'Comes with 1 bottle of mixer.', category: 'Beer, Wine & Spirits' },

  // ----- Coffee -----
  { title: 'Cappuccino', price: 'LKR. 1,600', description: '', category: 'Coffee' },
  { title: 'Latte (Hot / Cold)', price: 'LKR. 2,000', description: '', category: 'Coffee' },
  { title: 'Flat White', price: 'LKR. 2,000', description: '', category: 'Coffee' },
  { title: 'Espresso', price: 'LKR. 2,000', description: '', category: 'Coffee' },
  { title: 'Double Espresso', price: 'LKR. 2,200', description: '', category: 'Coffee' },
  { title: 'Americano', price: 'LKR. 2,500', description: '', category: 'Coffee' },
  { title: 'Ice Americano', price: 'LKR. 2,500', description: '', category: 'Coffee' },
  { title: 'Affogato', price: 'LKR. 2,500', description: 'Espresso over vanilla ice cream.', category: 'Coffee' },

  // ===========================================================================
  // BREAKFAST MENU — served daily 8:00 AM – 1:00 PM (its own tab on the site).
  // These carry `menu: 'breakfast'`; everything above is the all-day menu.
  // ===========================================================================

  // ----- Freshly Cooked -----
  { title: 'Deluxe Breakfast', price: 'LKR. 2,600', description: 'Two fried eggs or scrambled, sausage, hash brown potato, grilled tomato, herb infused mushroom and multigrain bread.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Rise & Shine', price: 'LKR. 2,300', description: 'Triple egg cheese omelette accompanied by grilled tomato, sausage and multigrain bread.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Egg Benedict', price: 'LKR. 2,800', description: 'Spinach, crispy bacon, English muffin, hollandaise sauce.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Avocado Toast with Poached Egg', price: 'LKR. 2,400', description: 'Smashed avocado, cherry tomatoes, multigrain bread.', category: 'Freshly Cooked', menu: 'breakfast', tags: ['Vegetarian'] },
  { title: 'Mango Banana Smoothie Bowl', price: 'LKR. 1,800', description: 'Mango and banana with local yogurt.', category: 'Freshly Cooked', menu: 'breakfast', tags: ['Vegetarian'] },
  { title: 'Shakshuka', price: 'LKR. 2,200', description: 'Rich tomato and bell pepper sauce, coriander, multigrain bread.', category: 'Freshly Cooked', menu: 'breakfast', tags: ['Vegetarian'] },
  { title: 'Croissant Breakfast Sandwich', price: 'LKR. 2,200', description: 'Spinach, crispy bacon, English muffin, hollandaise sauce.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Egg and Ham Breakfast', price: 'LKR. 2,200', description: 'Egg, cheese, ham.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Asian Combination', price: 'LKR. 2,600', description: 'String hopper or milk rice, choice of chicken or fish curry, served with dhal curry.', category: 'Freshly Cooked', menu: 'breakfast' },
  { title: 'Classic French Toast', price: 'LKR. 1,600', description: 'Rich brioche bread served with chocolate or strawberry topping.', category: 'Freshly Cooked', menu: 'breakfast', tags: ['Vegetarian'] },

  // ----- Fresh Juices (breakfast) -----
  { title: 'Shine On', price: 'LKR. 1,200', description: 'Carrot, ginger, green apple.', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Lime Juice', price: 'LKR. 1,000', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Lime & Soda', price: 'LKR. 1,200', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Lime & Mint', price: 'LKR. 1,200', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Watermelon', price: 'LKR. 1,200', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Passion Fruit', price: 'LKR. 1,200', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Mango', price: 'LKR. 1,400', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Pineapple', price: 'LKR. 1,400', description: '', category: 'Fresh Juices', menu: 'breakfast' },
  { title: 'Mix Juice', price: 'LKR. 1,500', description: 'Choice of 3 fruits.', category: 'Fresh Juices', menu: 'breakfast' },

  // ----- Coffee (breakfast pricing) -----
  { title: 'Cappuccino', price: 'LKR. 1,200', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Latte (Hot / Cold)', price: 'LKR. 1,100', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Flat White', price: 'LKR. 1,100', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Espresso', price: 'LKR. 700', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Double Espresso', price: 'LKR. 900', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Americano', price: 'LKR. 1,000', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Iced Americano', price: 'LKR. 1,100', description: '', category: 'Coffee', menu: 'breakfast' },
  { title: 'Affogato', price: 'LKR. 1,300', description: '', category: 'Coffee', menu: 'breakfast' },
]
