export const todayStats = {
  revenue: 1_842_500,
  covers: 146,
  openTables: 6,
  averageTicket: 12_620,
  paidOrders: 38,
  serviceRequests: 3,
};

export const weekRevenue = [
  { day: "Mon", value: 1_180_000, covers: 121 },
  { day: "Tue", value: 1_042_000, covers: 108 },
  { day: "Wed", value: 1_364_000, covers: 132 },
  { day: "Thu", value: 1_620_000, covers: 148 },
  { day: "Fri", value: 2_140_000, covers: 184 },
  { day: "Sat", value: 2_486_000, covers: 206 },
  { day: "Sun", value: 1_864_000, covers: 158 },
];

export const coversByHour = [
  { hour: "12", covers: 8 },
  { hour: "13", covers: 14 },
  { hour: "14", covers: 18 },
  { hour: "15", covers: 9 },
  { hour: "16", covers: 6 },
  { hour: "17", covers: 15 },
  { hour: "18", covers: 22 },
  { hour: "19", covers: 28 },
  { hour: "20", covers: 26 },
  { hour: "21", covers: 19 },
  { hour: "22", covers: 12 },
  { hour: "23", covers: 6 },
];

export const revenueByCategory = [
  { label: "Rice & stew", value: 34, amount: 626_450 },
  { label: "Burgers", value: 24, amount: 442_200 },
  { label: "Pasta & pizza", value: 18, amount: 331_650 },
  { label: "Grill", value: 14, amount: 257_950 },
  { label: "Drinks", value: 7, amount: 128_975 },
  { label: "Sweets", value: 3, amount: 55_275 },
];

export const topDishes = [
  { name: "Jollof & Peppered Plantain", sold: 42, revenue: 441_000, trend: 12 },
  { name: "Double Smash", sold: 31, revenue: 418_500, trend: 8 },
  { name: "Tandoori Chicken Pizza", sold: 27, revenue: 391_500, trend: 4 },
  { name: "Glazed Chicken & Mash", sold: 22, revenue: 341_000, trend: -3 },
  { name: "Beef Shawarma", sold: 19, revenue: 142_500, trend: 6 },
];

export const demandForecast = [
  { label: "19:00", forecast: 28, lastWeek: 22 },
  { label: "19:30", forecast: 34, lastWeek: 28 },
  { label: "20:00", forecast: 36, lastWeek: 31 },
  { label: "20:30", forecast: 31, lastWeek: 27 },
  { label: "21:00", forecast: 24, lastWeek: 21 },
  { label: "21:30", forecast: 18, lastWeek: 16 },
];

export const prepTimes = [
  { station: "Grill", average: 18, target: 16, orders: 24 },
  { station: "Rice", average: 14, target: 15, orders: 38 },
  { station: "Fryer", average: 11, target: 12, orders: 29 },
  { station: "Cold", average: 6, target: 8, orders: 17 },
];

export const sentiment = {
  score: 4.7,
  reviews: 184,
  positive: 86,
  neutral: 9,
  negative: 5,
  themes: [
    { label: "Jollof", mentions: 41, tone: "positive" as const },
    { label: "Service", mentions: 36, tone: "positive" as const },
    { label: "Terrace", mentions: 23, tone: "positive" as const },
    { label: "Wait on Fridays", mentions: 12, tone: "negative" as const },
    { label: "Music volume", mentions: 8, tone: "negative" as const },
  ],
};

export const inventoryWatch = [
  { item: "Beef mince", left: "12 kg", note: "Covers tonight, reorder by 14:00", level: 22 },
  { item: "Jollof rice base", left: "34 portions", note: "Enough for the forecast", level: 68 },
  { item: "Fresh basil", left: "1.2 kg", note: "Low for pizza station", level: 18 },
  { item: "Palm oil", left: "8 L", note: "Enough for 3 services", level: 54 },
];

export const aiBriefing = [
  {
    tag: "Demand",
    title: "Tonight peaks earlier than usual.",
    body: "Forecast says 36 covers between 20:00 and 20:30, 18% above last Tuesday. Prep 12 extra jollof portions and 8 burger patties before 18:30.",
    tone: "butter" as const,
  },
  {
    tag: "Kitchen",
    title: "Grill station is the bottleneck.",
    body: "Average grill time is 18 minutes against a 16 minute target. Two tickets are already over 20 minutes. Move one fryer hand to plating until 21:00.",
    tone: "tomato" as const,
  },
  {
    tag: "Menu",
    title: "The chocolate tart is slowing the pass.",
    body: "Only 6 of 18 tarts sold this week. It is your third slowest item and shares a station with cheesecake. Consider removing it from the QR menu on Friday.",
    tone: "moss" as const,
  },
];

export const testimonials = [
  {
    quote:
      "The QR menu paid for itself in the first weekend. Guests order a second drink without flagging anyone down, and the pass finally sees every ticket in one place.",
    name: "Amaka O.",
    role: "Owner, Ember & Rice",
    location: "Lekki, Lagos",
  },
  {
    quote:
      "We run three rooms and two kitchens. The table board tells me where the night is stuck before a guest has to tell me.",
    name: "Femi A.",
    role: "General manager, The Yellow Room",
    location: "Victoria Island",
  },
  {
    quote:
      "The best part is what it does not do. No app, no account for the guest, no new hardware. They scan, order, and the kitchen gets it.",
    name: "Nadia K.",
    role: "Operations lead, Cedar Kitchen",
    location: "Abuja",
  },
];

export const pricing = [
  {
    name: "Table",
    tag: "One room",
    price: "₦37,500",
    cadence: "per month",
    copy: "For an independent restaurant putting its menu on every table.",
    features: [
      "Up to 20 tables",
      "QR menus and ordering",
      "Shared table bills",
      "Live order dashboard",
      "Kitchen display, one station",
      "Weekly service report",
    ],
    muted: ["Multi-branch intelligence", "Dedicated onboarding"],
    cta: "Start with one room",
    href: "/login",
    highlight: false,
  },
  {
    name: "Service",
    tag: "Most chosen",
    price: "₦85,000",
    cadence: "per month",
    copy: "For a full-service restaurant running lunch and dinner every day.",
    features: [
      "Up to 60 tables",
      "Everything in Table",
      "Unlimited kitchen stations",
      "Waiter assignment and requests",
      "Paystack, transfer and USSD",
      "AI demand and waste briefings",
      "Menu and price management",
    ],
    muted: ["Multi-branch intelligence"],
    cta: "Run a full service",
    href: "/login",
    highlight: true,
  },
  {
    name: "Group",
    tag: "Multi-branch",
    price: "Let us talk",
    cadence: "annual agreement",
    copy: "For restaurant groups that need one view across every location.",
    features: [
      "Unlimited tables and branches",
      "Everything in Service",
      "Multi-branch intelligence",
      "Consolidated revenue and covers",
      "Staff roles and permissions",
      "Named onboarding and support",
      "Custom payment routing",
    ],
    muted: [],
    cta: "Talk to the team",
    href: "/pricing",
    highlight: false,
  },
];

export const faqs = [
  {
    question: "Does a guest need to download anything?",
    answer:
      "No. They scan the QR code or tap the NFC tag on the table, and the restaurant menu opens in their browser. No app and no account. A name is optional at checkout.",
  },
  {
    question: "Which payments can we take?",
    answer:
      "In Nigeria, the first integration is Paystack, which covers cards, bank transfer and USSD. Cash stays a valid option at the table. Apple Pay and Google Pay appear only where the provider, device and country support them, so they are never promised as universal.",
  },
  {
    question: "We already have a POS. Does this replace it?",
    answer:
      "Not necessarily. The dashboard can act as the ordering and service layer, with settled orders handed to your POS or accounting flow. The demo shows the full loop so you can judge the fit before an integration.",
  },
  {
    question: "What happens when the internet drops?",
    answer:
      "Waiters can keep taking orders at the pass, and the kitchen display reconnects when the network returns. Offline-first behaviour is part of the production build, not this frontend demo.",
  },
  {
    question: "Is the AI deciding prices?",
    answer:
      "No. It reads your sales, prep times and stock, then suggests. A manager approves every change. It never invents a dish, an ingredient or an allergen, and all guest-facing allergen data comes from the menu record you control.",
  },
];

export const brands = [
  "Ember & Rice",
  "The Yellow Room",
  "Cedar Kitchen",
  "Aunty Bisi's",
  "Mori House",
  "Palm & Coal",
];
