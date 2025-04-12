# Frontend – MernEats Food Ordering App

This folder contains the frontend for the Food Ordering App. It’s a modern web client built with React, designed for both users and restaurant owners to browse, order, and manage food orders seamlessly.

## Technologies Used

    React – Frontend UI framework

    Vite – Fast development server and bundler

    TypeScript – Static typing

    shadcn/ui – Component library built on Radix UI + Tailwind CSS

    Axios – For HTTP requests

    React Router – Routing for different pages

    Auth0 – Authentication and user identity

    Stripe – Payment processing (checkout)

    Cloudinary – Image hosting for restaurants and menus

## Getting Started

To get started with the frontend locally:

    Navigate to the frontend folder
    In your terminal:

`cd frontend`

Install dependencies:

`npm install`

Start the development server:

`npm run dev`

Open your browser and go to http://localhost:5173

Environment Variables

Create a `.env` file in the frontend directory with the following variables:

    VITE_API_BASE_URL=http://localhost:7000/api
    VITE_AUTH0_DOMAIN=your-auth0-domain
    VITE_AUTH0_CLIENT_ID=your-auth0-client-id
    VITE_AUTH0_AUDIENCE=your-auth0-api-identifier

Make sure these match the values in your Auth0 and backend setup.

## Features

    ✅ User registration and login via Auth0

    ✅ Restaurant browsing by city, cuisine, or keyword

    ✅ Cart management and checkout with Stripe

    ✅ Image uploads via Cloudinary

    ✅ Restaurant owner dashboard to manage profile and orders

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
