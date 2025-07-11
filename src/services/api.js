import { API_BASE_URL } from '../utils/constants';
import { mockProducts, mockOrders } from '../utils/mockData';

// Mock API service - replace with real API calls
class ApiService {
  async get(endpoint) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (endpoint) {
      case '/products':
        return { data: mockProducts };
      case '/orders':
        return { data: mockOrders };
      default:
        throw new Error('Endpoint not found');
    }
  }

  async post(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (endpoint) {
      case '/auth/login':
        // Mock login
        if (data.email === 'customer@grooso.com' && data.password === 'password') {
          return {
            data: {
              id: '1',
              name: 'John Doe',
              email: data.email,
              role: 'customer',
              phone: '+919876543210'
            }
          };
        } else {
          throw new Error('Invalid credentials');
        }
      case '/auth/register':
        // Mock registration
        return {
          data: {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            role: 'customer',
            phone: data.phone
          }
        };
      case '/orders':
        // Mock order creation
        return {
          data: {
            id: `GRO-${Date.now()}`,
            orderNumber: `GRO-${Date.now()}`,
            status: 'pending',
            razorpay_order_id: `order_${Date.now()}`, // Mock Razorpay order ID
            ...data
          }
        };
      default:
        return { data: { success: true } };
    }
  }

  async put(endpoint, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { success: true, ...data } };
  }

  async delete(endpoint) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: { success: true } };
  }
}

export const apiService = new ApiService();

// Real API functions (to be implemented)
export const authApi = {
  login: (credentials) => apiService.post('/auth/login', credentials),
  register: (userData) => apiService.post('/auth/register', userData),
  getProfile: () => apiService.get('/auth/profile'),
  verifyOtp: (data) => apiService.post('/auth/verify-otp', data)
};

export const productsApi = {
  getProducts: (filters = {}) => apiService.get('/products', filters),
  getProduct: (id) => apiService.get(`/products/${id}`),
  createProduct: (data) => apiService.post('/products', data),
  updateProduct: (id, data) => apiService.put(`/products/${id}`, data)
};

export const ordersApi = {
  getOrders: () => apiService.get('/orders'),
  getOrder: (id) => apiService.get(`/orders/${id}`),
  createOrder: (data) => apiService.post('/orders', data),
  updateOrderStatus: (id, status) => apiService.put(`/orders/${id}/status`, { status })
};