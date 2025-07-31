import axios from "axios";
import {
  getMockProducts,
  getMockProductById,
  getMockDepartments,
  getMockProductsByDepartment,
  getMockDepartmentById,
} from "./mockData";

const API_BASE_URL = "http://localhost:3000/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response) {
      // Server responded with error status
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

// API service functions
export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching products from API, falling back to mock data:",
        error
      );
      // Fall back to mock data if API is not available
      return await getMockProducts();
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching product with ID ${id} from API, falling back to mock data:`,
        error
      );
      // Fall back to mock data if API is not available
      return await getMockProductById(id);
    }
  },
};

// Department service functions
export const departmentService = {
  // Get all departments
  getAllDepartments: async () => {
    try {
      const response = await api.get("/departments");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching departments from API, falling back to mock data:",
        error
      );
      // Fall back to mock data if API is not available
      return await getMockDepartments();
    }
  },

  // Get single department by ID
  getDepartmentById: async (id) => {
    try {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching department with ID ${id} from API, falling back to mock data:`,
        error
      );
      // Fall back to mock data if API is not available
      return await getMockDepartmentById(id);
    }
  },

  // Get products by department
  getProductsByDepartment: async (departmentId) => {
    try {
      const response = await api.get(`/departments/${departmentId}/products`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching products for department ${departmentId} from API, falling back to mock data:`,
        error
      );
      // Fall back to mock data if API is not available
      return await getMockProductsByDepartment(departmentId);
    }
  },
};

export default api;
