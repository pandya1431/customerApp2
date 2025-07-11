export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  DELIVERY_PARTNER: 'delivery_partner',
  ADMIN: 'admin'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  ASSIGNED: 'assigned',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Ahmedabad'
];

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Automotive',
  'Health & Beauty',
  'Food & Beverages'
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';