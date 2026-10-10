/* Images live in public/assets, so they are plain paths (no imports). */
const A = (file: string) => `/assets/${file}`;

export const recipes = [
  {
    id: 7,
    title: "Green goddess pasta with tomatoes",
    category: "Lunch",
    time: "25 min",
    image: A("pesto-fusilli.jpeg"),
    description:
      "A bright, herby pasta with juicy tomatoes, greens and a shower of parmesan.",
    ingredients: [
      "Fusilli pasta",
      "Cherry tomatoes",
      "Baby spinach",
      "Fresh basil",
      "Parmesan",
      "Olive oil",
      "Garlic",
    ],
    method:
      "Cook the pasta in salted water until al dente, saving a mug of the cooking water. Sizzle garlic in olive oil, then toss in the tomatoes until softened. Add the spinach, basil and pasta with a splash of cooking water, and finish with grated parmesan.",
  },
  {
    id: 8,
    title: "Chimichurri steak & parmesan fries",
    category: "Dinner",
    time: "45 min",
    image: A("steak-fries.jpeg"),
    description:
      "Seared steak, golden fries and a punchy green herb sauce for a proper dinner.",
    ingredients: [
      "Steak",
      "Potatoes",
      "Parmesan",
      "Flat-leaf parsley",
      "Garlic",
      "Red wine vinegar",
      "Olive oil",
    ],
    method:
      "Cut the potatoes into fries, toss with oil and roast at 220°C until crisp, then scatter over parmesan. Finely chop the parsley and garlic and mix with vinegar and olive oil for the chimichurri. Season and sear the steak to your liking, rest it, then slice and serve with the fries and sauce.",
  },
  {
    id: 9,
    title: "Glazed chicken with sweet potato mash",
    category: "Dinner",
    time: "40 min",
    image: A("roasted-chicken.jpeg"),
    description:
      "Juicy roasted chicken with silky sweet potato mash and tender green vegetables.",
    ingredients: [
      "Chicken thighs",
      "Sweet potatoes",
      "Carrots",
      "Green beans",
      "Honey",
      "Butter",
      "Smoked paprika",
    ],
    method:
      "Rub the chicken with paprika and a little oil, then roast at 200°C until cooked through, brushing with honey near the end. Boil the sweet potatoes until tender and mash with butter. Roast the carrots and briefly steam the green beans, then serve everything together with the pan juices.",
  },
  {
    id: 10,
    title: "Crispy potatoes with herby dressing",
    category: "Lunch",
    time: "40 min",
    image: A("spiced-potatoes.jpeg"),
    description:
      "Golden-edged potatoes tossed in a lively, garlicky herb dressing.",
    ingredients: [
      "Baby potatoes",
      "Flat-leaf parsley",
      "Garlic",
      "Olive oil",
      "Lemon",
      "Chilli flakes",
    ],
    method:
      "Parboil the potatoes until just tender, drain well and rough up their edges. Roast with olive oil at 220°C until golden and crisp. Mix chopped parsley, garlic, lemon juice and chilli flakes, then spoon over the hot potatoes.",
  },
  {
    id: 11,
    title: "Sticky beef & peppers rice bowl",
    category: "Dinner",
    time: "30 min",
    image: A("sesame-beef-stirfry.jpeg"),
    description:
      "Tender beef, colourful peppers and sesame over fluffy rice.",
    ingredients: [
      "Beef strips",
      "Rice",
      "Red peppers",
      "Green beans",
      "Soy sauce",
      "Honey",
      "Sesame seeds",
    ],
    method:
      "Cook the rice according to the packet. Sear the beef quickly in a hot pan and set aside, then stir-fry the peppers and green beans. Return the beef with soy sauce and honey, toss until glossy and serve over rice with sesame seeds.",
  },
  {
    id: 12,
    title: "Warm date pudding with vanilla ice cream",
    category: "Dessert",
    time: "55 min",
    image: A("sticky-toffee-pudding.jpeg"),
    description:
      "A soft, sticky little pudding with melting vanilla ice cream on top.",
    ingredients: [
      "Pitted dates",
      "Plain flour",
      "Brown sugar",
      "Butter",
      "Eggs",
      "Baking soda",
      "Vanilla ice cream",
    ],
    method:
      "Soak chopped dates in hot water with baking soda until soft. Cream butter and sugar, beat in the eggs, then fold in flour and the dates. Bake in greased ramekins at 180°C until a skewer comes out clean, and serve warm with vanilla ice cream.",
  },
  {
    id: 13,
    title: "Creamy chicken with asparagus",
    category: "Dinner",
    time: "35 min",
    image: A("seared-chicken-breast.jpeg"),
    description:
      "Golden chicken in a savoury cream sauce with asparagus and buttery mash.",
    ingredients: [
      "Chicken breasts",
      "Asparagus",
      "Potatoes",
      "Cream",
      "Shallot",
      "Smoked paprika",
      "Butter",
    ],
    method:
      "Boil the potatoes and mash with butter. Season the chicken with paprika and sear until golden and cooked through. Soften the shallot, add cream and simmer briefly; steam the asparagus and serve everything with the sauce.",
  },
  {
    id: 14,
    title: "Creamy mushroom tagliatelle",
    category: "Dinner",
    time: "30 min",
    image: A("mushroom.jpeg"),
    description:
      "Silky ribbons of pasta with golden mushrooms and plenty of parmesan.",
    ingredients: [
      "Tagliatelle",
      "Mushrooms",
      "Garlic",
      "Cream",
      "Parmesan",
      "Fresh thyme",
    ],
    method:
      "Cook the tagliatelle until al dente, reserving some pasta water. Brown the mushrooms in a wide pan, then stir in garlic and thyme. Add cream and a splash of pasta water, toss with the pasta and finish with parmesan.",
  },
  {
    id: 1,
    title: "The really good homemade burger",
    category: "Dinner",
    time: "35 min",
    image: A("hero-burger.jpg"),
    description:
      "A juicy, feel-good burger with all the little things that make it unforgettable.",
    ingredients: [
      "Brioche buns",
      "Ground beef",
      "Cheddar",
      "Lettuce & tomato",
      "Red onion",
      "Burger sauce",
    ],
    method:
      "Season and sear the patties until golden. Melt the cheddar on top, toast the buns, then layer with sauce and fresh vegetables.",
  },
  {
    id: 2,
    title: "Creamy tomato & basil pasta",
    category: "Dinner",
    time: "25 min",
    image: A("spaghetti.jpeg"),
    description:
      "A weeknight bowl of comfort, finished with parmesan and plenty of basil.",
    ingredients: [
      "Penne pasta",
      "Cherry tomatoes",
      "Cream",
      "Garlic",
      "Fresh basil",
      "Parmesan",
    ],
    method:
      "Cook the pasta until al dente. Simmer garlic and tomatoes, stir in cream, then toss everything together with basil and parmesan.",
  },
  {
    id: 3,
    title: "Strawberry cloud cake",
    category: "Dessert",
    time: "1 hr 15 min",
    image: A("recipe-cake.jpg"),
    description:
      "Soft vanilla sponge, strawberry cream, and a little celebration in every slice.",
    ingredients: [
      "Vanilla sponge",
      "Fresh strawberries",
      "Whipping cream",
      "Sugar",
      "Vanilla",
    ],
    method:
      "Layer cooled sponge with whipped strawberry cream and sliced berries. Chill before slicing and top with more fresh strawberries.",
  },
  {
    id: 4,
    title: "Green goddess chicken bowl",
    category: "Salad",
    time: "30 min",
    image: A("recipe-bowl.jpg"),
    description:
      "Fresh, filling, colorful, and generously drizzled with herby dressing.",
    ingredients: [
      "Chicken breast",
      "Grains",
      "Avocado",
      "Roasted vegetables",
      "Mixed greens",
      "Herb dressing",
    ],
    method:
      "Roast the vegetables and cook the chicken. Assemble with warm grains, greens and avocado, then spoon over the herb dressing.",
  },
  {
    id: 5,
    title: "Slow Sunday burger",
    category: "Lunch",
    time: "40 min",
    image: A("hero-burger.jpg"),
    description:
      "The kind of laid-back lunch worth making a whole afternoon of.",
    ingredients: [
      "Brioche buns",
      "Beef patties",
      "Cheese",
      "Tomatoes",
      "Lettuce",
    ],
    method:
      "Sear patties, toast the buns and stack generously with your favorite toppings.",
  },
  {
    id: 6,
    title: "Sunday tomato pasta",
    category: "Dinner",
    time: "30 min",
    image: A("recipe-pasta.jpg"),
    description:
      "A simple table-sharing favorite with a sunny tomato sauce.",
    ingredients: ["Pasta", "Tomatoes", "Garlic", "Basil", "Parmesan"],
    method:
      "Cook pasta and simmer tomatoes with garlic. Toss together and finish with basil and parmesan.",
  },
  {
    id: 15,
    title: "Fresh fruit salad bowl",
    category: "Breakfast",
    time: "10 min",
    image: A("fuit-salad.jpeg"),
    description:
      "A colourful bowl of seasonal fruit with a squeeze of lime and a little honey.",
    ingredients: [
      "Mixed seasonal fruit",
      "Lime",
      "Honey",
      "Fresh mint",
      "Natural yoghurt",
    ],
    method:
      "Chop the fruit into bite-sized pieces and toss gently with lime juice and honey. Scatter with mint and serve with a spoonful of yoghurt.",
  },
  {
    id: 16,
    title: "Spicy arrabbiata risotto",
    category: "Dinner",
    time: "40 min",
    image: A("risotto.jpeg"),
    description:
      "Creamy rice in a fiery tomato sauce, finished with parmesan, lemon zest and herbs.",
    ingredients: [
      "Arborio rice",
      "Passata",
      "Onion",
      "Garlic",
      "Chilli flakes",
      "Vegetable stock",
      "Parmesan",
      "Lemon",
      "Fresh parsley",
    ],
    method:
      "Soften the onion and garlic with chilli flakes, then stir in the rice for a minute. Add the passata, then ladle in hot stock a little at a time, stirring until the rice is creamy and tender. Finish with parmesan, lemon zest and parsley.",
  },
  {
    id: 17,
    title: "Mango swiss roll",
    category: "Dessert",
    time: "50 min",
    image: A("mango-swiss-roll.jpeg"),
    description:
      "A feather-light sponge rolled around soft cream and a ribbon of fresh mango.",
    ingredients: [
      "Eggs",
      "Caster sugar",
      "Plain flour",
      "Whipping cream",
      "Ripe mango",
      "Icing sugar",
    ],
    method:
      "Whisk the eggs and sugar until thick and pale, fold in the flour and bake in a lined tray at 190°C for about 10 minutes. Roll the warm sponge in baking paper and cool. Unroll, spread with whipped cream, lay mango along one edge, re-roll and dust with icing sugar.",
  },
  {
    id: 18,
    title: "Lamb chops in spicy tomato sauce with naan",
    category: "Dinner",
    time: "50 min",
    image: A("lamb-chops.jpeg"),
    description:
      "Tender lamb simmered in a rich, spicy tomato gravy, served with warm flatbread.",
    ingredients: [
      "Lamb chops",
      "Tomatoes",
      "Onion",
      "Garlic",
      "Ginger",
      "Garam masala",
      "Chilli powder",
      "Fresh coriander",
      "Naan",
    ],
    method:
      "Brown the lamb chops and set aside. Fry the onion, garlic and ginger, add the spices and chopped tomatoes and cook down into a sauce. Return the lamb and simmer gently until tender. Scatter with coriander and serve with warm naan.",
  },
  {
    id: 19,
    title: "Baked chicken with sweet potato mash and green beans",
    category: "Dinner",
    time: "45 min",
    image: A("baked-chicken.jpeg"),
    description:
      "Roasted chicken over silky sweet potato mash with sautéed green beans and carrots.",
    ingredients: [
      "Chicken portions",
      "Sweet potatoes",
      "Green beans",
      "Carrots",
      "Butter",
      "Olive oil",
      "Garlic powder",
    ],
    method:
      "Rub the chicken with oil and garlic powder and bake at 200°C until golden and cooked through. Boil the sweet potatoes and mash with butter. Sauté the green beans and carrots until tender and serve alongside the chicken.",
  },
  {
    id: 20,
    title: "Chicken burrito bowl",
    category: "Lunch",
    time: "35 min",
    image: A("chicken-burrito-bowl.jpeg"),
    description:
      "Seasoned chicken, black beans, rice and avocado with a creamy drizzle.",
    ingredients: [
      "Chicken breast",
      "White rice",
      "Black beans",
      "Avocado",
      "Tomatoes",
      "Red onion",
      "Lime",
      "Tortilla chips",
      "Sour cream",
    ],
    method:
      "Cook the rice and warm the black beans. Season the chicken with taco spices, sear until cooked and slice. Mix the tomatoes, red onion and lime into a quick pico de gallo. Build the bowls with rice, beans, chicken, avocado and chips, and finish with sour cream.",
  },
{
  id: 21,
  title: "Pan-seared fish with caramelized onion sauce",
  category: "Dinner",
  time: "30 min",
  image: A("caramelized-onion.jpeg"),
  description:
    "Golden pan-seared white fish served with rich, sweet caramelized onions and tender green beans on the side.",
  ingredients: [
    "White fish fillets",
    "Yellow onions",
    "Garlic",
    "Green beans",
    "Butter",
    "Olive oil",
    "Fresh thyme",
    "Salt",
    "Black pepper",
  ],

    method:
      "Pat the fish dry, season and sear skin-side down until crisp, then flip briefly. Caramelize the onions in butter with garlic and thyme, add the cream and simmer. Steam the green beans and serve everything together.",
  },
  {
    id: 22,
    title: "Rainbow crunch salad with peanut dressing",
    category: "Salad",
    time: "20 min",
    image: A("rainbow-crunch.jpeg"),
    description:
      "Shredded cabbage, carrot and cucumber with cashews and a creamy peanut dressing.",
    ingredients: [
      "Red cabbage",
      "Carrots",
      "Cucumber",
      "Fresh coriander",
      "Cashews",
      "Sesame seeds",
      "Peanut butter",
      "Soy sauce",
      "Lime",
    ],
    method:
      "Shred the cabbage, carrots and cucumber and toss with coriander. Whisk the peanut butter, soy sauce and lime juice with a splash of warm water until pourable. Dress the salad and top with cashews and sesame seeds.",
  },
  {
    id: 23,
    title: "Burnt Basque cheesecake",
    category: "Dessert",
    time: "1 hr 10 min",
    image: A("burnt-basque-cheesecake.jpeg"),
    description:
      "A crustless cheesecake with a deeply caramelised top and a creamy, custardy centre.",
    ingredients: [
      "Cream cheese",
      "Caster sugar",
      "Eggs",
      "Double cream",
      "Plain flour",
      "Vanilla extract",
    ],
    method:
      "Beat the cream cheese and sugar until smooth, then mix in the eggs one at a time. Stir in the cream, flour and vanilla. Pour into a paper-lined tin and bake at 220°C until deeply browned on top but still wobbly in the middle. Cool before slicing.",
  },
  {
    id: 24,
    title: "Tiramisu",
    category: "Dessert",
    time: "40 min",
    image: A("tiramisu.jpeg"),
    description:
      "Coffee-soaked ladyfingers layered with whipped mascarpone and dusted with cocoa.",
    ingredients: [
      "Ladyfingers",
      "Mascarpone",
      "Eggs",
      "Caster sugar",
      "Strong coffee",
      "Cocoa powder",
    ],
    method:
      "Whisk the egg yolks with sugar, fold in the mascarpone, then fold in the whisked whites. Dip the ladyfingers briefly in coffee and layer with the cream in a dish. Chill for at least four hours and dust with cocoa before serving.",
  },
  {
    id: 25,
    title: "Teriyaki salmon rice bowl",
    category: "Dinner",
    time: "30 min",
    image: A("teriyaki-salmon.jpeg"),
    description:
      "Sweet and savoury glazed salmon over steamed rice with broccoli.",
    ingredients: [
      "Salmon fillets",
      "Sushi rice",
      "Broccoli",
      "Soy sauce",
      "Honey",
      "Rice vinegar",
      "Ginger",
      "Sesame seeds",
    ],
    method:
      "Cook the rice and steam the broccoli. Mix the soy sauce, honey, vinegar and ginger for the teriyaki glaze. Sear the salmon, pour in the glaze and let it bubble until sticky. Serve over rice with broccoli and sesame seeds.",
  },
  {
    id: 26,
    title: "Passionfruit loaf cake",
    category: "Dessert",
    time: "1 hr",
    image: A("passionfruit-loaf-cake.jpeg"),
    description:
      "A moist, tangy loaf topped with a passionfruit glaze and fresh seeds.",
    ingredients: [
      "Plain flour",
      "Caster sugar",
      "Butter",
      "Eggs",
      "Passion fruit",
      "Natural yoghurt",
      "Baking powder",
      "Icing sugar",
    ],
    method:
      "Cream the butter and sugar, beat in the eggs, then fold in flour, baking powder, yoghurt and most of the passion fruit pulp. Bake in a lined loaf tin at 170°C until a skewer comes out clean. Mix the icing sugar with a little pulp and drizzle over the cooled cake.",
  },
  {
    id: 27,
    title: "Kenyan pilau",
    category: "Dinner",
    time: "1 hr 15 min",
    image: A("kenyan-beef-pilau.jpeg"),
    description:
      "Fragrant spiced rice with tender beef and potatoes, served with fresh kachumbari.",
    ingredients: [
      "Basmati rice",
      "Beef",
      "Potatoes",
      "Onions",
      "Garlic",
      "Pilau masala",
      "Tomatoes",
      "Kachumbari",
    ],
    method:
      "Brown the onions deeply, add garlic, pilau masala and the beef and simmer until tender. Add the potatoes and rinsed rice with enough water to cover, then cook covered on low heat until the rice is fluffy. Serve with kachumbari on the side.",
  },
 {
  id: 28,
  title: "Githeri with avocado and feta",
  category: "Salad",
  time: "25 min",
  image: A("githeri.jpeg"),
  description:
    "A hearty Kenyan githeri salad tossed with creamy avocado, crumbled feta, fresh tomatoes and red onion.",
  ingredients: [
    "Githeri (maize and beans)",
    "Avocado",
    "Cherry tomatoes",
    "Red onion",
    "Feta",
    "Mixed greens",
    "Olive oil",
    "Lemon",
  ],
  method:
    "Combine the cooked githeri with chopped tomatoes and thinly sliced red onion. Drizzle with olive oil and fresh lemon juice, then toss gently. Add sliced avocado, crumbled feta and mixed greens before serving.",
},
  {
    id: 29,
    title: "Creamy mushroom soup with ciabatta",
    category: "Lunch",
    time: "35 min",
    image: A("creamy-mushroom-soup.jpeg"),
    description:
      "A velvety blended mushroom soup with a slice of toasted ciabatta.",
    ingredients: [
      "Mushrooms",
      "Onion",
      "Garlic",
      "Vegetable stock",
      "Cream",
      "Fresh thyme",
      "Ciabatta",
      "Butter",
    ],
    method:
      "Soften the onion in butter, add the mushrooms, garlic and thyme and cook until golden. Pour in the stock, simmer, then blend until smooth and stir in the cream. Serve with toasted ciabatta.",
  },
  {
    id: 30,
    title: "Mango sticky rice",
    category: "Dessert",
    time: "45 min",
    image: A("mango-sticky-rice.jpeg"),
    description:
      "Sweet coconut sticky rice with fresh mango and toasted sesame.",
    ingredients: [
      "Glutinous rice",
      "Coconut milk",
      "Sugar",
      "Salt",
      "Ripe mangoes",
      "Toasted sesame seeds",
    ],
    method:
      "Soak and steam the rice until tender. Warm the coconut milk with sugar and salt, then stir most of it into the hot rice and let it absorb. Serve with sliced mango, a drizzle of the remaining coconut milk and sesame seeds.",
  },
  {
    id: 31,
    title: "Ugali with goat fry and creamed greens",
    category: "Dinner",
    time: "1 hr 15 min",
    image: A("dry-goat-fry.jpeg"),
    description:
      "Soft ugali with fried goat meat and a side of creamy sautéed greens.",
    ingredients: [
      "Maize flour",
      "Goat meat",
      "Onions",
      "Tomatoes",
      "Spinach or kale",
      "Cream",
      "Garlic",
      "Cooking oil",
    ],
    method:
      "Simmer the goat until tender, then fry with onions and tomatoes until browned. Sauté the greens with garlic and stir in the cream. Boil water, beat in the maize flour until stiff and smooth, and serve the ugali with the goat and greens.",
  },
  {
  id: 32,
  title: "Kenyan kaimati",
  category: "Breakfast",
  time: "45 min",
  image: A("kaimati.jpeg"),
  description:
    "Golden, crispy Swahili kaimati with soft, fluffy centres, coated in a sweet, sticky sugar syrup for a delicious coastal treat.",
  ingredients: [
    "All-purpose flour",
    "Plain yoghurt",
    "Instant yeast",
    "Sugar",
    "Warm water",
    "Cooking oil",
    "Cardamom",
    "Water for syrup",
  ],
  method:
    "Mix the flour, yeast, sugar and cardamom in a bowl. Add yoghurt and enough warm water to make a thick, smooth batter. Cover and leave to rise for 30–45 minutes. Heat oil in a deep pan, then carefully drop small portions of batter into the hot oil. Fry until puffed up and golden brown, turning occasionally for even cooking. In a separate saucepan, simmer sugar and a little water until syrupy. Toss the fried kaimati in the warm syrup until coated, then serve.",
},
  {
    id: 33,
    title: "Flan (crème caramel)",
    category: "Dessert",
    time: "1 hr 10 min",
    image: A("flan.jpeg"),
    description:
      "A silky custard crowned with a layer of soft caramel.",
    ingredients: [
      "Caster sugar",
      "Eggs",
      "Condensed milk",
      "Evaporated milk",
      "Whole milk",
      "Vanilla extract",
    ],
    method:
      "Melt the sugar into a golden caramel and pour into the base of a mould. Blend the eggs, milks and vanilla, strain over the caramel and bake in a water bath at 160°C until just set. Chill well, then turn out to serve.",
  },
  {
  id: 34,
  title: "Kenyan githeri with caramelized onions",
  category: "Lunch",
  time: "45 min",
  image: A("githeri.jpeg"),
  description:
    "A hearty Kenyan classic of maize and beans simmered with tomatoes, onions and aromatic spices, finished with sweet caramelized onions and fresh coriander.",
  ingredients: [
    "Boiled maize",
    "Boiled beans",
    "Red onions",
    "Tomatoes",
    "Garlic",
    "Cooking oil",
    "Curry powder",
    "Paprika",
    "Salt",
    "Black pepper",
    "Fresh coriander",
  ],
  method:
    "Heat oil in a pan and cook the sliced onions until golden and caramelized. Add garlic, chopped tomatoes and spices, then cook until the tomatoes soften into a rich sauce. Stir in the boiled maize and beans, season with salt and black pepper, and simmer for 15–20 minutes. Garnish with fresh coriander and serve warm.",
},
 
  {
    id: 36,
    title: "Carrot and apple spice cake",
    category: "Dessert",
    time: "1 hr 10 min",
    image: A("carrot-and-apple-spice.jpeg"),
    description:
      "A moist, spiced loaf with grated carrot and apple under thick cream cheese frosting.",
    ingredients: [
      "Carrots",
      "Apples",
      "Plain flour",
      "Brown sugar",
      "Eggs",
      "Vegetable oil",
      "Mixed spice",
      "Cream cheese",
      "Icing sugar",
    ],
    method:
      "Whisk the sugar, eggs and oil, then fold in the flour, spice, grated carrots and apples. Bake in a lined loaf tin at 175°C until a skewer comes out clean. Cool, then beat the cream cheese with icing sugar and spread over the top.",
  },
  {
    id: 37,
    title: "Pumpkin bread with cinnamon streusel",
    category: "Dessert",
    time: "1 hr 15 min",
    image: A("pumpkin-bread.jpeg"),
    description:
      "Moist pumpkin bread with a buttery streusel and a sweet vanilla glaze.",
    ingredients: [
      "Pumpkin purée",
      "Plain flour",
      "Brown sugar",
      "Eggs",
      "Vegetable oil",
      "Cinnamon",
      "Butter",
      "Icing sugar",
    ],
    method:
      "Mix the pumpkin, sugar, eggs and oil, then fold in the flour and half the cinnamon. Rub the butter with a little flour, sugar and the remaining cinnamon for the streusel. Pour the batter into a loaf tin, top with streusel and bake at 175°C until set. Drizzle with icing sugar glaze.",
  },
  {
    id: 38,
    title: "Chili con carne with rice and tortilla chips",
    category: "Dinner",
    time: "1 hr",
    image: A("chili-con-carne.jpeg"),
    description:
      "A hearty spiced beef and bean stew with rice, chips and sour cream.",
    ingredients: [
      "Ground beef",
      "Kidney beans",
      "Onions",
      "Garlic",
      "Chopped tomatoes",
      "Chilli powder",
      "Rice",
      "Tortilla chips",
      "Sour cream",
    ],
    method:
      "Brown the beef with the onions and garlic, stir in the chilli powder, tomatoes and beans and simmer until thick and rich. Cook the rice and serve the chili alongside with tortilla chips and sour cream.",
  },
  {
    id: 39,
    title: "Red velvet cake with cream cheese frosting",
    category: "Dessert",
    time: "1 hr 30 min",
    image: A("red-velvet-cake.jpeg"),
    description:
      "A deep red layered cake with a gentle cocoa flavour and tangy frosting.",
    ingredients: [
      "Plain flour",
      "Caster sugar",
      "Butter",
      "Eggs",
      "Buttermilk",
      "Cocoa powder",
      "Red food colouring",
      "Cream cheese",
      "Icing sugar",
    ],
    method:
      "Cream the butter and sugar, beat in the eggs, then alternate the flour and cocoa with buttermilk and colouring. Bake in two tins at 175°C and cool completely. Beat the cream cheese with icing sugar, sandwich and cover the cake.",
  },
  {
    id: 40,
    title: "Lemon posset in lemon shells",
    category: "Dessert",
    time: "20 min",
    image: A("lemon-posset.jpeg"),
    description:
      "A three-ingredient creamy lemon dessert served in hollowed-out lemon halves.",
    ingredients: ["Double cream", "Caster sugar", "Lemons"],
    method:
      "Heat the cream and sugar, boil for three minutes, then stir in the lemon juice. Pour into hollowed lemon halves and chill until set, at least three hours.",
  },
  {
    id: 41,
    title: "Mandazi",
    category: "Breakfast",
    time: "45 min",
    image: A("mandazi.jpeg"),
    description:
      "Sweet, cardamom-scented fried dough triangles, perfect with a cup of tea.",
    ingredients: [
      "Plain flour",
      "Sugar",
      "Coconut milk",
      "Ground cardamom",
      "Baking powder",
      "Egg",
      "Vegetable oil",
    ],
    method:
      "Mix the flour, sugar, cardamom and baking powder, then work in the egg and coconut milk to a soft dough. Rest for 20 minutes, roll out and cut into triangles. Fry in hot oil until puffed and golden and drain.",
  },
  {
    id: 42,
    title: "Salmon alla vodka",
    category: "Dinner",
    time: "35 min",
    image: A("salmon-alla-vodka.jpeg"),
    description:
      "Seared salmon over a creamy tomato vodka sauce with mash and broccoli.",
    ingredients: [
      "Salmon fillets",
      "Passata",
      "Vodka",
      "Cream",
      "Garlic",
      "Broccoli",
      "Potatoes",
      "Butter",
    ],
    method:
      "Boil the potatoes and mash with butter, and steam the broccoli. Soften the garlic, add the vodka and let it reduce, then stir in the passata and cream. Sear the salmon and serve over the sauce with mash and broccoli.",
  },
  {
    id: 43,
    title: "Blueberry muffins",
    category: "Breakfast",
    time: "35 min",
    image: A("blueberry-muffins.jpeg"),
    description:
      "Soft, tender muffins studded with blueberries and a crunchy sugar top.",
    ingredients: [
      "Plain flour",
      "Blueberries",
      "Caster sugar",
      "Butter",
      "Eggs",
      "Milk",
      "Baking powder",
      "Coarse sugar",
    ],
    method:
      "Mix the dry ingredients. Whisk the melted butter, eggs and milk, then fold into the flour with the blueberries until just combined. Spoon into a muffin tin, sprinkle with coarse sugar and bake at 190°C until golden.",
  },
  {
    id: 44,
    title: "Tom yum gai",
    category: "Lunch",
    time: "35 min",
    image: A("tom-yum-gai.jpeg"),
    description:
      "A hot and sour Thai chicken soup with lemongrass, galangal and lime.",
    ingredients: [
      "Chicken breast",
      "Lemongrass",
      "Galangal",
      "Kaffir lime leaves",
      "Mushrooms",
      "Fish sauce",
      "Limes",
      "Chillies",
      "Chicken stock",
      "Fresh coriander",
    ],
    method:
      "Simmer the stock with the lemongrass, galangal, lime leaves and chillies for 10 minutes. Add the sliced chicken and mushrooms and cook until tender. Season with fish sauce and lime juice and finish with coriander.",
  },
  {
    id: 45,
    title: "Beet-pickled deviled eggs",
    category: "Lunch",
    time: "40 min",
    image: A("beet-pickled-deviled-eggs.jpeg"),
    description:
      "Vibrant pink pickled eggs with a creamy, seasoned yolk filling.",
    ingredients: [
      "Eggs",
      "Beetroot juice",
      "White vinegar",
      "Mayonnaise",
      "Dijon mustard",
      "Crispy fried onions",
      "Paprika",
    ],
    method:
      "Hard-boil and peel the eggs, then steep in warm beetroot juice and vinegar for a few hours until pink. Halve them and mash the yolks with mayonnaise and mustard. Pipe the filling back in and top with crispy onions and paprika.",
  },
  {
    id: 46,
    title: "Mango cream swiss roll",
    category: "Dessert",
    time: "50 min",
    image: A("mango-swiss.jpeg"),
    description:
      "A light rolled sponge filled with soft cream and a piece of fresh mango at the centre.",
    ingredients: [
      "Eggs",
      "Caster sugar",
      "Plain flour",
      "Whipping cream",
      "Ripe mango",
      "Icing sugar",
    ],
    method:
      "Whisk the eggs and sugar until thick and pale, fold in the flour and bake in a lined tray at 190°C for about 10 minutes. Roll the warm sponge in baking paper and cool. Unroll, spread with whipped cream, lay a strip of mango along one edge, re-roll and chill before slicing.",
  },
] as const;

export type Recipe = (typeof recipes)[number];

export const categories = [
  "All recipes",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Salad",
];

export const categoryTiles = [
  {
    label: "Breakfast",
    sub: "Start the day well",
    image: A("fuit-salad.jpeg"),
    category: "Breakfast",
  },
  {
    label: "Lunch",
    sub: "Quick and satisfying",
    image: A("pesto-fusilli.jpeg"),
    category: "Lunch",
  },
  {
    label: "Everyday dinners",
    sub: "The end-of-day favorites",
    image: A("recipe-pasta.jpg"),
    category: "Dinner",
  },
  {
    label: "Sweet things",
    sub: "A little something lovely",
    image: A("recipe-cake.jpg"),
    category: "Dessert",
  },
  {
    label: "Fresh & feel-good",
    sub: "Brighten your plate",
    image: A("recipe-bowl.jpg"),
    category: "Salad",
  },
];

export const recipeSlug = (recipe: Recipe) =>
  recipe.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const findRecipe = (slug: string) =>
  recipes.find((recipe) => recipeSlug(recipe) === slug);

export const popularIngredients = [
  "Garlic",
  "Tomatoes",
  "Basil",
  "Parmesan",
  "Chicken",
  "Avocado",
  "Strawberries",
  "Cheddar",
  "Brioche",
];

export const baseServings = 4;

/** Quantities for baseServings, aligned with each recipe's ingredients. */
const amounts: Record<number, [number, string][]> = {
  7: [
    [400, "g"],
    [250, "g"],
    [120, "g"],
    [1, "handful"],
    [60, "g"],
    [3, "tbsp"],
    [2, "cloves"],
  ],
  8: [
    [4, "steaks"],
    [800, "g"],
    [60, "g"],
    [1, "bunch"],
    [2, "cloves"],
    [2, "tbsp"],
    [4, "tbsp"],
  ],
  9: [
    [4, ""],
    [800, "g"],
    [4, ""],
    [300, "g"],
    [2, "tbsp"],
    [40, "g"],
    [2, "tsp"],
  ],
  10: [
    [800, "g"],
    [1, "bunch"],
    [2, "cloves"],
    [4, "tbsp"],
    [1, ""],
    [1, "tsp"],
  ],
  11: [
    [500, "g"],
    [300, "g"],
    [2, ""],
    [200, "g"],
    [4, "tbsp"],
    [2, "tbsp"],
    [2, "tbsp"],
  ],
  12: [
    [200, "g"],
    [180, "g"],
    [120, "g"],
    [100, "g"],
    [2, ""],
    [1, "tsp"],
    [4, "scoops"],
  ],
  13: [
    [4, "fillets"],
    [300, "g"],
    [800, "g"],
    [200, "ml"],
    [1, ""],
    [1, ""],
    [40, "g"],
  ],
  14: [
    [400, "g"],
    [400, "g"],
    [2, "cloves"],
    [200, "ml"],
    [60, "g"],
    [4, "sprigs"],
  ],
  1: [
    [4, ""],
    [600, "g"],
    [4, "slices"],
    [1, "head / 2"],
    [1, ""],
    [120, "ml"],
  ],
  2: [
    [400, "g"],
    [300, "g"],
    [200, "ml"],
    [3, "cloves"],
    [1, "handful"],
    [60, "g"],
  ],
  3: [
    [2, "layers"],
    [400, "g"],
    [400, "ml"],
    [80, "g"],
    [2, "tsp"],
  ],
  4: [
    [4, ""],
    [250, "g"],
    [2, ""],
    [500, "g"],
    [120, "g"],
    [150, "ml"],
  ],
  5: [
    [4, ""],
    [4, ""],
    [4, "slices"],
    [2, ""],
    [1, "head"],
  ],
  6: [
    [400, "g"],
    [500, "g"],
    [3, "cloves"],
    [1, "handful"],
    [60, "g"],
  ],
  15: [
    [600, "g"],
    [1, ""],
    [2, "tbsp"],
    [1, "handful"],
    [200, "g"],
  ],
  16: [[320, "g"], [400, "ml"], [1, ""], [3, "cloves"], [1, "tsp"], [1, "l"], [60, "g"], [1, ""], [1, "handful"]],
  17: [[4, ""], [100, "g"], [100, "g"], [300, "ml"], [2, ""], [2, "tbsp"]],
  18: [[8, ""], [400, "g"], [2, ""], [4, "cloves"], [1, "tbsp"], [2, "tsp"], [1, "tsp"], [1, "handful"], [4, ""]],
  19: [[4, ""], [800, "g"], [250, "g"], [2, ""], [40, "g"], [2, "tbsp"], [1, "tsp"]],
  20: [[500, "g"], [250, "g"], [400, "g"], [2, ""], [3, ""], [1, ""], [1, ""], [1, "handful"], [4, "tbsp"]],
  21: [[4, "fillets"], [250, "g"], [150, "ml"], [2, "cloves"], [250, "g"], [30, "g"], [4, "sprigs"]],
  22: [[0.5, "head"], [3, ""], [1, ""], [1, "handful"], [60, "g"], [2, "tbsp"], [3, "tbsp"], [2, "tbsp"], [1, ""]],
  23: [[800, "g"], [200, "g"], [5, ""], [400, "ml"], [2, "tbsp"], [2, "tsp"]],
  24: [[24, ""], [500, "g"], [4, ""], [100, "g"], [300, "ml"], [2, "tbsp"]],
  25: [[4, "fillets"], [300, "g"], [300, "g"], [4, "tbsp"], [2, "tbsp"], [1, "tbsp"], [1, "tsp"], [1, "tbsp"]],
  26: [[250, "g"], [200, "g"], [150, "g"], [3, ""], [6, ""], [100, "g"], [2, "tsp"], [100, "g"]],
  27: [[400, "g"], [500, "g"], [400, "g"], [2, ""], [4, "cloves"], [2, "tbsp"], [2, ""], [1, "bowl"]],
  28: [[500, "g"], [2, ""], [200, "g"], [1, ""], [100, "g"], [150, "g"], [2, "tbsp"], [1, ""]],
  29: [[500, "g"], [1, ""], [2, "cloves"], [750, "ml"], [150, "ml"], [4, "sprigs"], [1, "loaf"], [30, "g"]],
  30: [[300, "g"], [400, "ml"], [80, "g"], [0.5, "tsp"], [2, ""], [1, "tbsp"]],
  31: [[500, "g"], [800, "g"], [2, ""], [3, ""], [500, "g"], [100, "ml"], [3, "cloves"], [3, "tbsp"]],
  32: [[8, "slices"], [200, "g"], [3, ""], [200, "g"], [50, "g"], [4, "sprigs"]],
  33: [[150, "g"], [4, ""], [400, "g"], [350, "ml"], [250, "ml"], [2, "tsp"]],
  34: [[800, "g"], [400, "g"], [4, ""], [200, "g"], [4, "cloves"], [3, "tbsp"], [1, ""], [1, "handful"]],
  35: [[250, "g"], [500, "ml"], [2, ""], [30, "g"], [2, "tsp"], [4, "tbsp"], [1, ""]],
  36: [[250, "g"], [2, ""], [250, "g"], [200, "g"], [3, ""], [150, "ml"], [2, "tsp"], [200, "g"], [100, "g"]],
  37: [[400, "g"], [300, "g"], [200, "g"], [2, ""], [100, "ml"], [2, "tsp"], [50, "g"], [100, "g"]],
  38: [[600, "g"], [400, "g"], [2, ""], [3, "cloves"], [400, "g"], [2, "tsp"], [300, "g"], [1, "handful"], [4, "tbsp"]],
  39: [[300, "g"], [300, "g"], [150, "g"], [3, ""], [250, "ml"], [2, "tbsp"], [2, "tbsp"], [400, "g"], [250, "g"]],
  40: [[600, "ml"], [150, "g"], [4, ""]],
  41: [[500, "g"], [80, "g"], [250, "ml"], [2, "tsp"], [2, "tsp"], [1, ""], [500, "ml"]],
  42: [[4, "fillets"], [400, "ml"], [60, "ml"], [150, "ml"], [3, "cloves"], [300, "g"], [800, "g"], [40, "g"]],
  43: [[300, "g"], [200, "g"], [150, "g"], [100, "g"], [2, ""], [200, "ml"], [2, "tsp"], [2, "tbsp"]],
  44: [[400, "g"], [2, "stalks"], [2, "slices"], [6, ""], [200, "g"], [2, "tbsp"], [2, ""], [2, ""], [1, "l"], [1, "handful"]],
  45: [[8, ""], [250, "ml"], [150, "ml"], [4, "tbsp"], [1, "tsp"], [2, "tbsp"], [1, "tsp"]],
  46: [[4, ""], [100, "g"], [100, "g"], [300, "ml"], [2, ""], [2, "tbsp"]],
  47: [[4, ""], [100, "g"], [100, "g"], [300, "ml"], [2, ""], [2, "tbsp"]],
  48: [[400, "g"], [500, "g"], [400, "g"], [2, ""], [4, "cloves"], [2, "tbsp"], [2, ""], [1, "bowl"], [2, "tbsp"]],
};

const fmt = (n: number) =>
  (n >= 10 ? Math.round(n) : Math.round(n * 4) / 4)
    .toString()
    .replace(/\.25$/, "¼")
    .replace(/\.5$/, "½")
    .replace(/\.75$/, "¾")
    .replace(/^0(?=[¼½¾])/, "");

export function scaledIngredients(recipe: Recipe, servings: number) {
  const list = amounts[recipe.id] ?? [];
  return recipe.ingredients.map((name, i) => {
    const a = list[i];
    return {
      name,
      amount: a
        ? `${fmt((a[0] * servings) / baseServings)}${
            a[1] ? " " + a[1] : ""
          }`
        : "",
    };
  });
}

/** Flexible swaps: keyword -> alternatives. */
const swapTable: [string, string][] = [
  ["beef", "turkey mince, lentil patties or mushrooms"],
  ["chicken", "tofu, chickpeas or salmon"],
  ["cream", "Greek yogurt, coconut milk or cashew cream"],
  ["parmesan", "pecorino or nutritional yeast"],
  ["cheddar", "gouda, vegan cheese or halloumi"],
  ["pasta", "wholewheat, gluten-free pasta or courgette ribbons"],
  ["penne", "any short pasta or gluten-free penne"],
  ["brioche", "sourdough rolls, lettuce wraps or gluten-free buns"],
  ["grains", "quinoa, brown rice or couscous"],
  ["sugar", "honey, maple syrup or less sugar"],
  ["strawberries", "raspberries, mango or peaches"],
  ["basil", "spinach, rocket or parsley"],
  ["avocado", "hummus or edamame"],
  ["mushrooms", "courgette or aubergine"],
  ["potatoes", "sweet potatoes or cauliflower"],
  ["rice", "quinoa or cauliflower rice"],
  ["dates", "dried figs or prunes"],
  ["lamb", "goat, beef or jackfruit"],
  ["goat", "lamb, beef or jackfruit"],
  ["salmon", "trout, tofu or chickpeas"],
  ["fish", "tofu, prawns or cauliflower steaks"],
  ["feta", "halloumi or goat's cheese"],
  ["mascarpone", "cream cheese or whipped ricotta"],
  ["peanut", "almond butter or tahini"],
  ["mango", "peaches, pineapple or papaya"],
  ["milk", "oat, almond or soy milk"],
  ["mayonnaise", "Greek yogurt or hummus"],
];

export function recipeSwaps(recipe: Recipe) {
  return recipe.ingredients.flatMap((ing) => {
    const hit = swapTable.find(([k]) => ing.toLowerCase().includes(k));
    return hit ? [{ ingredient: ing, swap: hit[1] }] : [];
  });
}