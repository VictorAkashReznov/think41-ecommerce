# E-Commerce Frontend

A modern, responsive e-commerce frontend built with React, Vite, and React Router.

## Features

- **Product List View**: Display products in both grid and list formats with toggle functionality
- **Product Detail View**: Detailed product information with image gallery and specifications
- **API Integration**: Connects to backend API at `localhost:3000/api/products` with fallback to mock data
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Search & Filter**: Search products by name, description, or category
- **Sorting**: Sort products by name, price, or rating
- **Modern UI**: Clean, professional design with smooth animations

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/product/:id` - Get specific product by ID

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ProductCard.jsx  # Individual product card component
│   ├── ProductList.jsx  # Product listing with search/filter
│   └── ProductDetail.jsx # Detailed product view
├── pages/              # Page components
│   ├── HomePage.jsx    # Home page with product list
│   └── ProductDetailPage.jsx # Product detail page
├── services/           # API and data services
│   ├── api.js         # API service with axios
│   └── mockData.js    # Mock data for testing
├── styles/            # CSS stylesheets
│   ├── ProductCard.css
│   ├── ProductList.css
│   └── ProductDetail.css
└── App.jsx           # Main app component with routing
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern CSS features

## Mock Data

When the backend API is not available, the application automatically falls back to mock data to demonstrate functionality. The mock data includes sample products with images, descriptions, pricing, and specifications.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
