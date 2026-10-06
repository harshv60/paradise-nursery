# Paradise Nursery

Paradise Nursery is an online houseplant shop built with **React**, **Vite** and **Redux Toolkit**.
Browse plants by category, add them to a shopping cart, adjust quantities, and see totals update live.

## Features

- Landing page with company name, background image, About Us section and a **Get Started** button
- Product listing: 3 categories x 6 houseplants, each with thumbnail, name, description and price
- **Add to Cart** buttons (disabled once added) and a live cart-count icon in the navbar
- Navbar with **Home**, **Plants** and **Cart** links on the product and cart pages
- Cart page: thumbnail, name, unit price, per-plant total, quantity +/- buttons, delete button,
  overall cart total, **Checkout** ("Coming Soon") and **Continue Shopping**

## Project structure

| File | Purpose |
|------|---------|
| `src/App.jsx` | Landing page |
| `src/AboutUs.jsx` | Company details |
| `src/ProductList.jsx` | Plant catalogue + navbar |
| `src/CartItem.jsx` | Shopping cart page |
| `src/CartSlice.jsx` | Redux slice (`addItem`, `removeItem`, `updateQuantity`) |
| `src/store.js` | Redux store |
| `src/App.css` | All styling, including the landing background image |

## Run locally

```bash
npm install
npm run dev
```
