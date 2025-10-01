import axios from "axios";

// Backend API base URL - update this to match your backend server
// API service for Post Login Dashboard application
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://express-mock-server-rose.vercel.app/api/ecommerce"
    : "http://localhost:4000/api/ecommerce";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const DataService = {
  /**
   * Get items with filters, sorting, and pagination
   * @param {Object} params - Query parameters
   * @param {string} params.gender - Gender filter (men, women, boys, girls)
   * @param {string} params.category - Category filter (comma-separated)
   * @param {string} params.brand - Brand filter (comma-separated)
   * @param {string} params.color - Color filter (comma-separated)
   * @param {string} params.price_range - Price range filter (comma-separated)
   * @param {string} params.discount_range - Discount range filter
   * @param {string} params.sort - Sort option (popularity, trending, recommended, etc.)
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.pageSize - Items per page (default: 20)
   */
  getItems: (params = {}) => {
    return apiClient.get("/items", { params });
  },

  /**
   * Get filters configuration
   */
  getFilters: () => {
    return apiClient.get("/filters");
  },
};
