# PrimePick Beauty — Cosmetics E-commerce (React + Vite + React Bootstrap)

A fully responsive luxury cosmetics storefront built with React, Vite, and React Bootstrap.
Pink / White / Gold theme, dark mode, animations, and product data from DummyJSON.

## ✨ Features

- Modern luxury beauty UI (Pink, White & Gold theme + Dark Mode)
- Responsive Navbar (search, cart, wishlist, theme toggle) and a simple Footer
- Pages: Home, Products, Product Details, Cart, Wishlist, About, Contact
- React Router DOM v6 navigation
- Products fetched from DummyJSON (`beauty`, `skin-care`, `fragrances` categories merged for a large catalog — 100+ products)
- Search, category filter, and price/rating/name sorting
- Add to Cart & Wishlist with quantity controls, powered by Context API + localStorage
- Skeleton loaders, loading spinner, and error handling with retry
- Web3Forms-powered contact form
- Toast notifications (react-toastify)
- Scroll-to-top button + auto scroll on route change
- Smooth hover effects and animations throughout

## 📁 Folder Structure

```
cosmetics-shop/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # App entry, providers, global styles
    ├── App.jsx               # Routes, layout
    ├── index.css             # Theme tokens, light/dark mode, all custom styles
    ├── context/
    │   ├── CartContext.jsx
    │   ├── WishlistContext.jsx
    │   └── ThemeContext.jsx
    ├── hooks/
    │   └── useProducts.js     # Fetches & merges DummyJSON beauty-related categories
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProductCard.jsx
    │   ├── ProductGridSkeleton.jsx
    │   ├── LoadingSpinner.jsx
    │   ├── ErrorMessage.jsx
    │   ├── ScrollToTopButton.jsx
    │   └── ScrollToTopOnRoute.jsx
    └── pages/
        ├── Home.jsx
        ├── Products.jsx
        ├── ProductDetails.jsx
        ├── Cart.jsx
        ├── Wishlist.jsx
        ├── About.jsx
        ├── Contact.jsx
        └── NotFound.jsx
```

## 🚀 Installation & Setup

1. **Create the project / unzip the provided folder**, then install dependencies:

```bash
npm install
```

2. **Run the dev server:**

```bash
npm run dev
```

3. **Build for production:**

```bash
npm run build
npm run preview
```

## 🔑 Configure Web3Forms (Contact Form)

1. Go to [https://web3forms.com](https://web3forms.com) and generate a free **Access Key** (just enter your email).
2. Open `src/pages/Contact.jsx` and replace:

```js
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'
```

with your real access key. Submissions will then be emailed to you directly.

## 🎨 Theme

Colors and design tokens live at the top of `src/index.css`:

- Ivory background `#FBF7F4`
- Deep Pink accent `#D6336C`
- Rose Gold accent `#C9A063`
- Charcoal text `#2B2424`
- Blush surface `#F7E4E8`

Dark mode overrides are defined under `[data-theme='dark']` in the same file and toggle automatically via the navbar switch (persisted to `localStorage`).

## 📦 Data Source

Products are fetched from:
- `https://dummyjson.com/products/category/beauty`
- `https://dummyjson.com/products/category/skin-care`
- `https://dummyjson.com/products/category/fragrances`

These are merged and de-duplicated in `src/hooks/useProducts.js` to provide 100+ products across the catalog (DummyJSON's `beauty` category alone only has a handful of items).

## 🛠 Tech Stack

- React 18 + Vite 5
- React Router DOM v6
- React Bootstrap 5 + Bootstrap 5 CSS
- react-icons (Feather icons)
- react-toastify
- Context API + localStorage (cart, wishlist, theme)
- Web3Forms (contact form backend)
