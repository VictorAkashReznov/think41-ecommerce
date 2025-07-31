# E-Commerce Frontend

A modern, responsive e-commerce frontend built with React, Vite, and React Router.

## Features

- **Department Navigation**: Browse products by department with dedicated sidebar navigation
- **Department Pages**: Dedicated pages for each department with filtered product listings
- **Product List View**: Display products in both grid and list formats with toggle functionality
- **Product Detail View**: Detailed product information with image gallery and specifications
- **API Integration**: Connects to backend API with fallback to mock data
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Search & Filter**: Search products by name, description, or category within departments
- **Sorting**: Sort products by name, price, or rating
- **Smart Navigation**: Context-aware back navigation from product details
- **Modern UI**: Clean, professional design with smooth animations

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product by ID
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get specific department by ID
- `GET /api/departments/:id/products` - Get products in a specific department

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
│   ├── ProductDetail.jsx # Detailed product view
│   ├── DepartmentList.jsx # Department sidebar navigation
│   └── DepartmentHeader.jsx # Department page header
├── pages/              # Page components
│   ├── HomePage.jsx    # Home page with product list
│   ├── ProductDetailPage.jsx # Product detail page
│   └── DepartmentPage.jsx # Department-specific product listing
├── services/           # API and data services
│   ├── api.js         # API service with axios
│   └── mockData.js    # Mock data for testing
├── styles/            # CSS stylesheets
│   ├── ProductCard.css
│   ├── ProductList.css
│   ├── ProductDetail.css
│   ├── DepartmentList.css
│   ├── DepartmentHeader.css
│   └── DepartmentPage.css
└── App.jsx           # Main app component with routing
```

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with modern CSS features

## Mock Data

When the backend API is not available, the application automatically falls back to mock data to demonstrate functionality. The mock data includes:

- **Sample Products**: 6 products across different categories with realistic data
- **Department Structure**: 4 departments (Electronics, Wearables, Furniture, Food & Beverage)
- **Product Details**: Images, descriptions, pricing, specifications, and ratings
- **Department Relationships**: Products are properly categorized by department

## URL Structure

- `/` - Home page with all products
- `/departments/:departmentId` - Department-specific product listing
- `/product/:id` - Individual product detail page

## Department Features

- **Sidebar Navigation**: Always-visible department list with product counts
- **Department Pages**: Filtered product views with department-specific headers
- **Smart Navigation**: Context-aware back buttons that return to the appropriate department
- **Responsive Design**: Sidebar collapses to horizontal navigation on mobile devices

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
