import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DepartmentPage from "./pages/DepartmentPage";
import DepartmentList from "./components/DepartmentList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>E-Commerce Store</h1>
        </header>

        <div className="app-body">
          <aside className="app-sidebar">
            <DepartmentList />
          </aside>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/departments/:departmentId"
                element={<DepartmentPage />}
              />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>

        <footer className="app-footer">
          <p>&copy; 2025 E-Commerce Store. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
