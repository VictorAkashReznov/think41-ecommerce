import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { departmentService } from '../services/api';
import '../styles/DepartmentList.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departmentService.getAllDepartments();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch departments.');
      console.error('Error fetching departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentClick = (departmentId) => {
    navigate(`/departments/${departmentId}`);
  };

  const handleAllProductsClick = () => {
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  if (loading) {
    return (
      <div className="department-list">
        <div className="department-list-header">
          <h3>Departments</h3>
        </div>
        <div className="department-loading">
          <div className="loading-spinner-small"></div>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="department-list">
        <div className="department-list-header">
          <h3>Departments</h3>
        </div>
        <div className="department-error">
          <p>{error}</p>
          <button onClick={fetchDepartments} className="retry-button-small">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="department-list">
      <div className="department-list-header">
        <h3>Departments</h3>
      </div>
      
      <nav className="department-nav">
        <button
          onClick={handleAllProductsClick}
          className={`department-item all-products ${isActive('/') ? 'active' : ''}`}
        >
          <span className="department-icon">🛍️</span>
          <div className="department-info">
            <span className="department-name">All Products</span>
            <span className="department-description">Browse everything</span>
          </div>
        </button>

        {departments.map((department) => (
          <button
            key={department.id}
            onClick={() => handleDepartmentClick(department.id)}
            className={`department-item ${isActive(`/departments/${department.id}`) ? 'active' : ''}`}
          >
            <span className="department-icon">{department.icon}</span>
            <div className="department-info">
              <span className="department-name">{department.name}</span>
              <span className="department-description">
                {department.productCount} product{department.productCount !== 1 ? 's' : ''}
              </span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DepartmentList;
