// Mock data for testing when API is not available
export const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    stock: 15,
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Color": "Black"
    }
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitoring, GPS, and waterproof design. Track your workouts and health metrics.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Wearables",
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    stock: 8,
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Water Resistance": "50m",
      "Sensors": "Heart Rate, GPS, Accelerometer"
    }
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Ideal for long work sessions.",
    price: 449.99,
    category: "Furniture",
    rating: 4.3,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    stock: 12,
    specifications: {
      "Material": "Mesh and Fabric",
      "Weight Capacity": "300 lbs",
      "Adjustable Height": "Yes",
      "Warranty": "5 years"
    }
  },
  {
    id: 4,
    name: "4K Webcam",
    description: "Ultra HD 4K webcam with auto-focus and built-in microphone. Perfect for video conferencing and content creation.",
    price: 129.99,
    originalPrice: 159.99,
    category: "Electronics",
    rating: 4.2,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=300&fit=crop",
    stock: 25,
    specifications: {
      "Resolution": "4K @ 30fps",
      "Field of View": "90 degrees",
      "Microphone": "Built-in stereo",
      "Compatibility": "Windows, Mac, Linux"
    }
  },
  {
    id: 5,
    name: "Organic Coffee Beans",
    description: "Premium organic coffee beans sourced from sustainable farms. Rich, full-bodied flavor with notes of chocolate and caramel.",
    price: 24.99,
    category: "Food & Beverage",
    rating: 4.8,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    stock: 50,
    specifications: {
      "Origin": "Colombia",
      "Roast Level": "Medium",
      "Weight": "1 lb",
      "Certification": "Organic, Fair Trade"
    }
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
    price: 39.99,
    originalPrice: 49.99,
    category: "Electronics",
    rating: 4.1,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1609592806596-4d8b5b5e7e0a?w=400&h=300&fit=crop",
    stock: 30,
    specifications: {
      "Charging Speed": "10W Fast Charge",
      "Compatibility": "Qi-enabled devices",
      "Material": "Aluminum",
      "Safety Features": "Overcharge protection"
    }
  }
];

export const getMockProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500); // Simulate network delay
  });
};

export const getMockProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 300); // Simulate network delay
  });
};
