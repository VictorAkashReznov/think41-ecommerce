import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product, viewMode }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className={`product-card ${viewMode}`} onClick={handleProductClick}>
      <div className="product-image">
        <img
          src={product.image || "/placeholder-image.svg"}
          alt={product.name}
          onError={(e) => {
            e.target.src = "/placeholder-image.svg";
          }}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description && product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>
        <div className="product-price">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="current-price">{formatPrice(product.price)}</span>
        </div>

        {product.category && (
          <span className="product-category">{product.category}</span>
        )}

        {product.rating && (
          <div className="product-rating">
            <span className="stars">
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span className="rating-value">({product.rating})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
