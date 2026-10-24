# ShopEasy – an Amazon-style React project (for learning)

A small e-commerce front-end built with **React 18 + Vite**. No backend, no
external images or APIs – everything runs locally.

## Run it

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

Other commands: `npm run build` (production build), `npm run preview`.

## Features

- Sticky navbar with live search, category dropdown and cart counter
- Category bar and auto-rotating hero banner
- Product grid with filters (Prime only, max price) and sorting
- Product detail modal with quantity picker and "Buy Now"
- Cart drawer: change quantity, delete, clear, subtotal
- Cart saved in `localStorage` (survives refresh)
- Checkout form with validation, order summary and success page
- Toast notifications and responsive layout

## Project structure

```
src/
├── main.jsx              entry point, wraps App in CartProvider
├── App.jsx               page state (shop / checkout / success), modal, drawer
├── index.css             all styles
├── utils.js              price formatting helpers
├── data/products.js      product + category data
├── context/CartContext   global cart (Context + useReducer)
└── components/
    ├── Navbar, CategoryBar, Hero
    ├── ProductGrid, ProductCard, ProductModal, Rating
    ├── CartDrawer, Checkout, OrderSuccess
    └── Toast, Footer
```

## React concepts you will practise

| Concept | Where to look |
| --- | --- |
| Components & props | every file in `components/` |
| `useState` | `App.jsx`, `ProductGrid.jsx`, `ProductModal.jsx` |
| `useEffect` + cleanup | `Hero.jsx` (timer), `Toast.jsx`, `ProductModal.jsx` (Esc key) |
| `useMemo` | `ProductGrid.jsx` (filter + sort) |
| `useCallback` | `App.jsx` |
| Context API + `useReducer` | `context/CartContext.jsx` |
| Custom hook | `useCart()` |
| Controlled forms & validation | `Checkout.jsx`, search in `Navbar.jsx` |
| Conditional rendering | views in `App.jsx`, empty states, stock labels |
| Lists & keys | `ProductGrid`, `CartDrawer` |
| Lifting state up | search/category live in `App`, passed to children |

## Ideas to extend it

1. Add **React Router** so each product has its own URL (`/product/5`).
2. Fetch products from a real API (e.g. `fakestoreapi.com`) using `fetch` + `useEffect`.
3. Add a wishlist, using another context.
4. Add login/sign-up and save orders.
5. Write tests with Vitest + React Testing Library.

> Educational project. Not affiliated with Amazon.
