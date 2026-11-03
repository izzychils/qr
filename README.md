# QR

Your website on every table. A restaurant ordering and table management demo where the QR code is the waiter, the kitchen sees every ticket at once, and the bill stays shared.

This build covers the full guest and staff experience as a frontend demo. It is deliberately honest about payments and about what is stored locally.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS v4
- Lucide icons
- Inter Tight for display type and Inter for body type, loaded with `next/font`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The demo runs without an API key, database or payment account.

Production checks:

```bash
npm run typecheck
npm run build
npm start
```

## Pages

### Marketing

- `/` landing page with the rounded hero carousel, a two image surface switcher, the service story, guest walkthrough, AI layer, payment honesty, testimonials, pricing and FAQ
- `/pricing` three plans with monthly and annual pricing, the small print and questions before setup

### Guest experience

The restaurant menu lives at a table address:

- `/order/table-1` through `/order/table-18`
- `/order/table-12` is the main demo table linked throughout the site
- `/order/table-12/status` live order status, itemised receipt, bill and table service

Guests can:

- Browse the menu by category, diet and search
- Open a dish, choose portion and heat, add a kitchen note and add it to the table
- Increase, decrease or remove a line
- Add items after the first order, on the same shared bill
- Call a waiter, open the Wi-Fi details and ask the menu assistant for a suggestion
- Confirm an order without an account and follow it from received to ready
- Settle the table with a demo receipt

The dining experience is shared by URL and table number. In this frontend demo the shared state lives in the same browser, so two tabs or windows on one device stay in step. Real cross-device table bills need the backend that comes later.

### Staff dashboard

- `/login` restaurant sign in with a one click demo account
- `/dashboard` service overview, live floor, revenue, covers, open tables and needs-attention requests
- `/dashboard/tables` floor plan by room, table detail, waiter assignment and status changes
- `/dashboard/orders` every ticket with status filters, search and order detail
- `/dashboard/kitchen` kitchen display with station filters, new tickets, tickets on the fire and ready plates
- `/dashboard/menu` menu management, prices, categories and live availability switches
- `/dashboard/qr` a printable code for every table plus copy, download and table links
- `/dashboard/insights` demand forecast, prep times, revenue mix, best sellers, sentiment, stock watch and branch comparison

The dashboard is guarded by the local session and redirects to `/login` when signed out.

## Design system

The interface follows a light editorial system: a warm off white canvas, white surfaces, near black type and a single pink accent. Display headings are set tight in Inter Tight, body copy in Inter, and controls are pill shaped. The landing hero and the two overlapping surface images both animate between two states, and the rest of the site carries the same type scale and spacing.

Scrollbars are hidden on the app screens for a quieter full screen feel. The landing page keeps its normal scrollbar. All layouts are built mobile first, with a drawer navigation on small screens, a sticky cart on the guest menu and a slide over sidebar in the dashboard.

## Demo path

1. Open `/order/table-12` and add a dish.
2. Review the bill, send the order and follow the status page.
3. Sign in at `/login` with the demo workspace button.
4. Open `/dashboard/kitchen`, start the ticket, then mark it ready.
5. Return to the guest status page to see the update.
6. Turn a dish off in `/dashboard/menu` and check that the guest menu marks it sold out.

## Local data

There is no server, database or real authentication in this build. Everything is stored in `localStorage` under the `qr.*` namespace:

- `qr.session` for the signed in staff profile
- `qr.orders` for every ticket
- `qr.tables` for the floor state
- `qr.requests` for waiter, bill and water calls
- `qr.menu.soldOut` for items hidden from the guest menu
- `qr.cart.<table>` for the shared table bill
- `qr.last-order.<table>` for the guest status page
- `qr.seed.day` to reseed a new service day

Clearing site data resets the demo. A new day reseeds the orders and tables automatically.

## Structure

```text
src/
  app/                 routes, metadata and page composition
  components/
    brand/             logo mark and wordmark
    dashboard/         workspace shell, charts and status chip
    marketing/         landing page sections
    order/             menu cards, item sheet, cart, checkout and AI assistant
    ui/                buttons, modal, QR mark and reveal primitives
  features/
    auth/              staff sign in
    dashboard/         service data, floor plan, kitchen, orders, menu, QR and insights
    marketing/         pricing table
    menu/              restaurant, menu, categories and prices
    order/             guest ordering experience and live status
  lib/                 local store, formatting and class name helpers
```

`src/lib/store.ts` is the only persistence boundary. A backend can replace its read and write helpers without rewriting the page shells.

## Payments

The payment step is a demo. In Nigeria the supported methods are presented as Paystack card, bank transfer, USSD and cash. Apple Pay and Google Pay are described as conditional, because availability depends on the provider, device, country and integration. No payment is collected and no wallet is promised.

## Notes

- Menu photography lives in `public/menu`.
- The AI menu assistant reads the local menu, sold-out list and table bill. Answers are written from those records and never invent a price, stock count or allergen.
- The print styles in `src/app/globals.css` keep the receipt usable from the browser.
