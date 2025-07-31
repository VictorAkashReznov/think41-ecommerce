import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DepartmentHeader.css';

const DepartmentHeader = ({ 
  department, 
  productCount, 
  showBackButton = true,
  title,
  subtitle 
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  // Use provided title/subtitle or department info
  const displayTitle = title || (department ? department.name : 'Products');
  const displaySubtitle = subtitle || (department ? department.description : '');
  const displayIcon = department ? department.icon : '🛍️';

  return (
    <div className="department-header">
      <div className="department-header-content">
        {showBackButton && (
          <button onClick={handleBackClick} className="back-to-all-button">
            ← Back to All Products
          </button>
        )}
        
        <div className="department-title-section">
          <div className="department-title-main">
            <span className="department-title-icon">{displayIcon}</span>
            <h1 className="department-title">{displayTitle}</h1>
          </div>
          
          {displaySubtitle && (
            <p className="department-subtitle">{displaySubtitle}</p>
          )}
          
          <div className="department-stats">
            <span className="product-count">
              {productCount !== undefined ? (
                <>
                  {productCount} product{productCount !== 1 ? 's' : ''} available
                </>
              ) : (
                'Loading products...'
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentHeader;
