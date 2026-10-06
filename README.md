# 🛍️ ShopNest

A modern e-commerce storefront built with **React 19**, **TypeScript** and **Vite**. Browse products, search and filter, view details, and manage a persistent shopping cart.

Product data comes from the free [DummyJSON](https://dummyjson.com/products) API.

## ✨ Features

**Shopping**
- Product grid with images, ratings, discount badges, old/new price and low-stock warnings
- Product details modal with image gallery, brand, stock status and description
- Skeleton loading states, plus friendly error and empty states with retry

**Search, filter and sort**
- Live search by product name
- Category sidebar and dual-handle price range slider
- Sort by price (low/high) or name (A–Z / Z–A)
- Pagination with selectable page size (8 / 12 / 24)

**Cart**
- Add, increment, decrement, remove and clear cart
- Quantity is capped at available stock, and duplicate items are merged
- Item is removed automatically when quantity reaches zero
- Cart is saved to `localStorage` and survives page refresh
- Order summary with totals (free shipping)

**UI/UX**
- Responsive layout (desktop, tablet and mobile)
- Hero banner, perks strip, sticky header and multi-column footer
- Toast notifications via SweetAlert2
- Keyboard accessible (Esc closes the modal, focus styles, ARIA labels)

## 🧰 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, React Router 7 |
| Language | TypeScript |
| Build tool | Vite (with React Compiler) |
| State | Context API + `useReducer` |
| HTTP | Axios |
| Alerts | SweetAlert2 |
| Linting | Oxlint |
| Styling | Plain CSS with design tokens (no UI library) |

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Aritra1523/ShopNest.git
cd ShopNest




```

## 🙌 Acknowledgements

- Product data by [DummyJSON](https://dummyjson.com)
- Alerts by [SweetAlert2](https://sweetalert2.github.io)

## 📄 License

This project is for learning and portfolio purposes. Add a license of your choice (for example MIT) before reusing it commercially.