export type MenuCategory =
  | "Small plates"
  | "Rice & stew"
  | "Grill"
  | "Burgers"
  | "Pasta & pizza"
  | "Drinks"
  | "Sweets";

export type MenuTag =
  | "spicy"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "contains dairy"
  | "contains fish"
  | "signature"
  | "new";

export type MenuOption = {
  id: string;
  label: string;
  required?: boolean;
  choices: { label: string; price: number }[];
};

export type MenuItem = {
  id: string;
  name: string;
  blurb: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  art?: "zobo" | "chapman" | "coconut" | "tonic" | "cheesecake" | "tart";
  tags: MenuTag[];
  prep: number;
  popular?: boolean;
  options?: MenuOption[];
};

export const restaurant = {
  name: "Ember & Rice",
  short: "Ember",
  tagline: "A modern Nigerian kitchen, cooked over fire.",
  address: "14 Admiralty Way, Lekki Phase 1, Lagos",
  hours: "Tue to Sun, 12:00 to 23:00",
  phone: "+234 801 234 5678",
  wifi: "emberguest",
  serviceCharge: 0.075,
  vat: 0.075,
  currency: "NGN",
  tableCount: 18,
};

export const categories: { label: MenuCategory; note: string }[] = [
  { label: "Small plates", note: "To start, to share" },
  { label: "Rice & stew", note: "The centre of the table" },
  { label: "Grill", note: "Over open fire" },
  { label: "Burgers", note: "Ground fresh daily" },
  { label: "Pasta & pizza", note: "From the wood oven" },
  { label: "Drinks", note: "Cold, bright, house made" },
  { label: "Sweets", note: "One more reason to stay" },
];

const portion = (base: string, extra: number, extraLabel: string): MenuOption => ({
  id: "portion",
  label: "Portion",
  required: true,
  choices: [
    { label: base, price: 0 },
    { label: extraLabel, price: extra },
  ],
});

const spice: MenuOption = {
  id: "heat",
  label: "Heat",
  choices: [
    { label: "Mild", price: 0 },
    { label: "Medium", price: 0 },
    { label: "Naija hot", price: 0 },
  ],
};

export const menu: MenuItem[] = [
  {
    id: "street-tacos",
    name: "Street Tacos",
    blurb: "Three corn tortillas, spiced beef, chipotle crema.",
    description:
      "Corn tortillas warmed on the plancha, filled with peppered beef, pickled onion, tomato and a smoky chipotle crema. Comes as three, or five for the table.",
    price: 8500,
    category: "Small plates",
    image: "/menu/street-tacos.jpg",
    tags: ["spicy", "contains dairy"],
    prep: 12,
    options: [portion("Three tacos", 3500, "Five tacos"), spice],
  },
  {
    id: "beef-shawarma",
    name: "Beef Shawarma",
    blurb: "Charred beef, pickled onion, garlic toum, warm flatbread.",
    description:
      "Thin slices of beef off the spit, rolled with pickled onion, cucumber, tomato and a generous spoon of garlic toum. Wrapped warm, cut in half.",
    price: 7500,
    category: "Small plates",
    image: "/menu/shawarma.jpg",
    tags: ["contains dairy"],
    prep: 10,
    popular: true,
    options: [
      {
        id: "extras",
        label: "Add to the wrap",
        choices: [
          { label: "Extra toum", price: 500 },
          { label: "Extra beef", price: 2000 },
          { label: "Hot sauce", price: 0 },
        ],
      },
    ],
  },
  {
    id: "beef-stew",
    name: "Smoked Beef Stew & Rice",
    blurb: "Slow beef, pepper stew, steamed rice.",
    description:
      "Beef cooked down with roasted pepper, onion and a little smoke, spooned over steamed rice. The kind of plate that arrives quiet and leaves empty.",
    price: 12000,
    category: "Rice & stew",
    image: "/menu/beef-stew.jpg",
    tags: ["spicy", "gluten-free"],
    prep: 18,
    options: [spice],
  },
  {
    id: "jollof-platter",
    name: "Jollof & Peppered Plantain",
    blurb: "Smoky jollof, stewed chicken, plantain, coleslaw.",
    description:
      "Our house jollof cooked over firewood, with stewed chicken, sweet fried plantain and a small bowl of coleslaw. The plate regulars order without looking.",
    price: 10500,
    category: "Rice & stew",
    image: "/menu/jollof-platter.jpg",
    tags: ["spicy", "signature"],
    prep: 15,
    popular: true,
    options: [spice],
  },
  {
    id: "efo-pounded-yam",
    name: "Efo & Pounded Yam",
    blurb: "Spinach stew, assorted meat, smooth pounded yam.",
    description:
      "Efo riro with assorted meat and stockfish, cooked with roasted pepper and palm oil, served with a soft, smooth pounded yam.",
    price: 11500,
    category: "Rice & stew",
    image: "/menu/efo-pounded-yam.jpg",
    tags: ["contains fish", "spicy"],
    prep: 16,
  },
  {
    id: "arroz-con-pollo",
    name: "Arroz con Pollo",
    blurb: "Saffron rice, chicken, sweet peppers, green peas.",
    description:
      "Saffron rice cooked with chicken stock, sweet peppers and peas, topped with roasted chicken legs. Finished with coriander and a little lemon.",
    price: 13000,
    category: "Rice & stew",
    image: "/menu/arroz-con-pollo.jpg",
    tags: ["gluten-free"],
    prep: 22,
  },
  {
    id: "glazed-chicken",
    name: "Glazed Chicken & Mash",
    blurb: "Chilli honey chicken, buttered mash, cranberry jus.",
    description:
      "Chicken breast glazed with chilli honey, roasted potatoes, buttered mash and a tart cranberry jus on the side. A little sweet, a little hot.",
    price: 15500,
    category: "Grill",
    image: "/menu/glazed-chicken.jpg",
    tags: ["gluten-free", "signature"],
    prep: 24,
    options: [
      {
        id: "sides",
        label: "Swap the side",
        choices: [
          { label: "Buttered mash", price: 0 },
          { label: "Extra roast potatoes", price: 500 },
          { label: "Seasonal greens", price: 700 },
        ],
      },
    ],
  },
  {
    id: "house-burger",
    name: "The House Burger",
    blurb: "Beef patty, cheddar, lettuce, tomato, house sauce.",
    description:
      "A 160g beef patty, aged cheddar, crisp lettuce, tomato, pickles and our house sauce in a toasted sesame bun. Served with skin-on fries.",
    price: 9500,
    category: "Burgers",
    image: "/menu/house-burger.jpg",
    tags: ["contains dairy"],
    prep: 14,
    options: [
      {
        id: "cook",
        label: "Cooked",
        choices: [
          { label: "Medium", price: 0 },
          { label: "Well done", price: 0 },
        ],
      },
      {
        id: "extras",
        label: "Add",
        choices: [
          { label: "Extra cheddar", price: 800 },
          { label: "Bacon", price: 1200 },
          { label: "Extra patty", price: 2500 },
        ],
      },
    ],
  },
  {
    id: "double-smash",
    name: "Double Smash",
    blurb: "Two smashed patties, aged cheddar, pickles, onion jam.",
    description:
      "Two thin patties smashed hard on the griddle, layered with aged cheddar, pickles and sweet onion jam. Rich, messy, exactly the point.",
    price: 13500,
    category: "Burgers",
    image: "/menu/double-smash.jpg",
    tags: ["contains dairy"],
    prep: 16,
    popular: true,
  },
  {
    id: "tandoori-pizza",
    name: "Tandoori Chicken Pizza",
    blurb: "Tandoori chicken, red onion, mozzarella, coriander.",
    description:
      "A thin, blistered base with tandoori chicken, red onion, mozzarella and fresh coriander. Cut into eight and made for the middle of the table.",
    price: 14500,
    category: "Pasta & pizza",
    image: "/menu/tandoori-pizza.jpg",
    tags: ["spicy", "contains dairy"],
    prep: 18,
    options: [
      {
        id: "heat",
        label: "Heat",
        choices: [
          { label: "Mild", price: 0 },
          { label: "Medium", price: 0 },
          { label: "Naija hot", price: 0 },
        ],
      },
      {
        id: "extras",
        label: "Add",
        choices: [
          { label: "Extra mozzarella", price: 1000 },
          { label: "Chilli oil", price: 300 },
        ],
      },
    ],
  },
  {
    id: "creamy-pasta",
    name: "Creamy Chicken Pasta",
    blurb: "Fettuccine, crisp chicken, parmesan cream, chives.",
    description:
      "Fettuccine tossed in a parmesan cream, topped with crisp chicken cutlets and chives. Comforting without being heavy.",
    price: 12500,
    category: "Pasta & pizza",
    image: "/menu/creamy-pasta.jpg",
    tags: ["contains dairy"],
    prep: 17,
    options: [
      {
        id: "extras",
        label: "Add",
        choices: [
          { label: "Extra chicken", price: 2500 },
          { label: "Chilli flakes", price: 0 },
          { label: "Parmesan", price: 500 },
        ],
      },
    ],
  },
  {
    id: "zobo",
    name: "Zobo Fizz",
    blurb: "Hibiscus, ginger, lime, soda.",
    description:
      "Our house zobo steeped with ginger and cloves, chilled and topped with soda and a squeeze of lime. Bright, tart and not too sweet.",
    price: 2800,
    category: "Drinks",
    art: "zobo",
    tags: ["vegan", "gluten-free"],
    prep: 3,
  },
  {
    id: "chapman",
    name: "Chapman",
    blurb: "Blackcurrant, citrus, cucumber, bitters.",
    description:
      "The Lagos classic, made properly: blackcurrant, orange, lemon, cucumber and a dash of bitters over plenty of ice.",
    price: 3200,
    category: "Drinks",
    art: "chapman",
    tags: ["vegan", "gluten-free"],
    prep: 4,
  },
  {
    id: "coconut-water",
    name: "Fresh Coconut",
    blurb: "Chilled, straight from the nut.",
    description:
      "A whole chilled coconut, opened at the bar and served with a straw. Nothing added.",
    price: 2500,
    category: "Drinks",
    art: "coconut",
    tags: ["vegan", "gluten-free"],
    prep: 2,
  },
  {
    id: "espresso-tonic",
    name: "Espresso Tonic",
    blurb: "Double espresso, tonic, orange.",
    description:
      "A double shot poured over tonic and ice with a wide strip of orange peel. Bitter, fizzy, a good way to end a meal.",
    price: 3500,
    category: "Drinks",
    art: "tonic",
    tags: ["vegan", "gluten-free"],
    prep: 5,
  },
  {
    id: "honey-cheesecake",
    name: "Burnt Honey Cheesecake",
    blurb: "Burnt honey, vanilla, sea salt.",
    description:
      "A baked cheesecake with burnt honey, vanilla and a pinch of sea salt. One slice, two forks.",
    price: 5500,
    category: "Sweets",
    art: "cheesecake",
    tags: ["vegetarian", "contains dairy"],
    prep: 3,
  },
  {
    id: "chocolate-tart",
    name: "Dark Chocolate Tart",
    blurb: "70% chocolate, cocoa crust, cream.",
    description:
      "A dark chocolate ganache tart in a cocoa crust, with a spoon of lightly whipped cream and a little orange zest.",
    price: 5000,
    category: "Sweets",
    art: "tart",
    tags: ["vegetarian", "contains dairy"],
    prep: 3,
  },
];

export const tagLabels: Record<MenuTag, string> = {
  spicy: "Spicy",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten free",
  "contains dairy": "Dairy",
  "contains fish": "Fish",
  signature: "House signature",
  new: "New",
};

export function findItem(id: string) {
  return menu.find((item) => item.id === id);
}

export function itemsByCategory(category: MenuCategory) {
  return menu.filter((item) => item.category === category);
}

export const popularItems = menu.filter((item) => item.popular);
