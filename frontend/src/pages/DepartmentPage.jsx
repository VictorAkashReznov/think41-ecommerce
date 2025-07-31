import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import DepartmentHeader from '../components/DepartmentHeader';
import { departmentService } from '../services/api';
import '../styles/DepartmentPage.css';

const DepartmentPage = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'rating'

  useEffect(() => {
    if (departmentId) {
      fetchDepartmentData();
    }
  }, [departmentId]);

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch department info and products in parallel
      const [departmentData, productsData] = await Promise.all([
        departmentService.getDepartmentById(departmentId),
        departmentService.getProductsByDepartment(departmentId)
      ]);
      
      setDepartment(departmentData);
      setProducts(Array.isArray(productsData) ? productsData : []);
    } catch (err) {
      setError('Failed to fetch department data. Please try again later.');
      console.error('Error fetching department data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

  if (loading) {
    return (
      <div className="department-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading department...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="department-page">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchDepartmentData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="department-page">
      <DepartmentHeader 
        department={department}
        productCount={filteredAndSortedProducts.length}
      />
      
      <div className="department-content">
        <div className="department-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder={`Search in ${department?.name || 'department'}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <select value={sortBy} onChange={handleSortChange} className="sort-select">
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
          
          <button 
            onClick={handleViewModeToggle}
            className={`view-toggle ${viewMode}`}
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? '☰' : '⊞'}
          </button>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-products">
            {searchTerm ? (
              <p>No products found matching "{searchTerm}" in {department?.name}.</p>
            ) : (
              <p>No products available in {department?.name} department.</p>
            )}
          </div>
        ) : (
          <div className={`products-container ${viewMode}`}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
