import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../services/api";
import "../styles/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      setProduct(data);
      setSelectedImage(0);
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    // Try to go back to the department if the product has a departmentId
    if (product && product.departmentId) {
      navigate(`/departments/${product.departmentId}`);
    } else {
      navigate("/");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // This would typically integrate with a cart service
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchProduct} className="retry-button">
              Try Again
            </button>
            <button onClick={handleBackClick} className="back-button">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <p>Product not found.</p>
          <button onClick={handleBackClick} className="back-button">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image || "/placeholder-image.svg"];

  return (
    <div className="product-detail-container">
      <button onClick={handleBackClick} className="back-button">
        ← Back to{" "}
        {product && product.departmentId ? product.category : "Products"}
      </button>

      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img
              src={images[selectedImage]}
              alt={product.name}
              onError={(e) => {
                e.target.src = "/placeholder-image.svg";
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={selectedImage === index ? "active" : ""}
                  onClick={() => setSelectedImage(index)}
                  onError={(e) => {
                    e.target.src = "/placeholder-image.svg";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            {product.category && (
              <span className="product-category">{product.category}</span>
            )}
          </div>

          {product.rating && (
            <div className="product-rating">
              <span className="stars">
                {"★".repeat(Math.floor(product.rating))}
              </span>
              <span className="rating-value">({product.rating})</span>
              {product.reviewCount && (
                <span className="review-count">
                  {product.reviewCount} reviews
                </span>
              )}
            </div>
          )}

          <div className="product-price">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="current-price">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="discount">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.specifications && (
            <div className="product-specifications">
              <h3>Specifications</h3>
              <ul>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock || 99}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="add-to-cart-button"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>

          {product.stock && product.stock < 10 && product.stock > 0 && (
            <div className="stock-warning">
              Only {product.stock} left in stock!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
