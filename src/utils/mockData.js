export const mockProducts = [
  // Recommended Products for Home Page (moved to top)
  {
    id: '13',
    name: 'Lotion',
    category: 'Health & Beauty',
    price: 260,
    originalPrice: 320,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 2.660,
    reviews: 45,
    inStock: true,
    vendor: 'Beauty Store',
    description: 'Moisturizing body lotion for daily use',
    features: ['Moisturizing', 'Natural Ingredients', 'All Skin Types'],
    orderType: 'nationwide'
  },
  {
    id: '14',
    name: 'Wireless',
    category: 'Electronics',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.941,
    reviews: 203,
    inStock: true,
    vendor: 'TechWorld Electronics',
    description: 'Premium wireless headphones with noise cancellation',
    features: ['Noise Cancellation', '20h Battery', 'Quick Charge'],
    orderType: 'nationwide'
  },
  {
    id: '15',
    name: 'T-shirt',
    category: 'Clothing',
    price: 350,
    originalPrice: 450,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 5.0,
    reviews: 156,
    inStock: true,
    vendor: 'Fashion Hub',
    description: 'Comfortable cotton t-shirt for everyday wear',
    features: ['100% Cotton', 'Machine Washable', 'Multiple Colors'],
    orderType: 'nationwide'
  },
  {
    id: '16',
    name: 'Laptop',
    category: 'Electronics',
    price: 44990,
    originalPrice: 54990,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    vendor: 'Tech Store',
    description: 'High-performance laptop for work and gaming',
    features: ['Intel i5', '8GB RAM', '512GB SSD'],
    orderType: 'nationwide'
  },

  // Dine Out / Express Products
  {
    id: '1',
    name: 'Chicken Biryani',
    category: 'Food & Beverages',
    price: 299,
    originalPrice: 349,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    vendor: 'Biryani House Restaurant',
    description: 'Authentic Hyderabadi chicken biryani with aromatic spices',
    features: ['30 min delivery', 'Hot & Fresh', 'Authentic Recipe'],
    orderType: 'express'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    category: 'Food & Beverages',
    price: 249,
    originalPrice: 299,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.3,
    reviews: 89,
    inStock: true,
    vendor: 'Pizza Corner Restaurant',
    description: 'Classic margherita pizza with fresh mozzarella and basil',
    features: ['Wood Fired', 'Fresh Ingredients', 'Italian Style'],
    orderType: 'express'
  },

  // City Mart / Food Delivery Products
  {
    id: '3',
    name: 'Fresh Vegetables Bundle',
    category: 'Food & Beverages',
    price: 199,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    reviews: 45,
    inStock: true,
    vendor: 'Fresh Mart Store',
    description: 'Daily fresh vegetables bundle with seasonal produce',
    features: ['Farm Fresh', 'Organic', 'Same Day Delivery'],
    orderType: 'citymart'
  },
  {
    id: '4',
    name: 'Dairy Products Combo',
    category: 'Food & Beverages',
    price: 159,
    originalPrice: 189,
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    reviews: 67,
    inStock: true,
    vendor: 'Daily Needs Store',
    description: 'Fresh milk, yogurt, and cheese combo pack',
    features: ['Fresh Daily', 'Local Dairy', 'Quality Assured'],
    orderType: 'citymart'
  },

  // InstaMart / Nationwide Products
  {
    id: '5',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 2999,
    originalPrice: 3999,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.5,
    reviews: 203,
    inStock: true,
    vendor: 'TechWorld Electronics',
    description: 'Premium wireless headphones with noise cancellation',
    features: ['Noise Cancellation', '20h Battery', 'Quick Charge'],
    orderType: 'nationwide'
  },
  {
    id: '6',
    name: 'Cotton Casual T-Shirt',
    category: 'Clothing',
    price: 599,
    originalPrice: 899,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    vendor: 'Fashion Hub',
    description: 'Comfortable cotton t-shirt for everyday wear',
    features: ['100% Cotton', 'Machine Washable', 'Multiple Colors'],
    orderType: 'nationwide'
  },
  {
    id: '7',
    name: 'LED Desk Lamp',
    category: 'Home & Garden',
    price: 1299,
    originalPrice: 1699,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    vendor: 'Home Essentials',
    description: 'Adjustable LED desk lamp with touch control',
    features: ['Touch Control', 'Adjustable', 'Energy Efficient'],
    orderType: 'nationwide'
  },
  {
    id: '8',
    name: 'Fitness Tracker Watch',
    category: 'Sports',
    price: 4999,
    originalPrice: 6999,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.3,
    reviews: 234,
    inStock: false,
    vendor: 'SportsTech',
    description: 'Advanced fitness tracker with heart rate monitoring',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant'],
    orderType: 'nationwide'
  },
  {
    id: '9',
    name: 'Organic Green Tea',
    category: 'Food & Beverages',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    reviews: 78,
    inStock: true,
    vendor: 'Organic Valley',
    description: 'Premium organic green tea leaves',
    features: ['Organic Certified', 'Antioxidant Rich', '100g Pack'],
    orderType: 'citymart'
  },
  {
    id: '10',
    name: 'Smartphone Stand',
    category: 'Electronics',
    price: 799,
    originalPrice: 1099,
    image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.1,
    reviews: 45,
    inStock: true,
    vendor: 'Gadget Store',
    description: 'Adjustable smartphone stand for desk',
    features: ['Adjustable Angle', 'Stable Base', 'Universal Fit'],
    orderType: 'nationwide'
  },

  // New Recommended Products for Home Page
  {
    id: '13',
    name: 'Lotion',
    category: 'Health & Beauty',
    price: 260,
    originalPrice: 320,
    image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 2.660,
    reviews: 45,
    inStock: true,
    vendor: 'Beauty Store',
    description: 'Moisturizing body lotion for daily use',
    features: ['Moisturizing', 'Natural Ingredients', 'All Skin Types'],
    orderType: 'nationwide'
  },
  {
    id: '14',
    name: 'Wireless',
    category: 'Electronics',
    price: 999,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.941,
    reviews: 203,
    inStock: true,
    vendor: 'TechWorld Electronics',
    description: 'Premium wireless headphones with noise cancellation',
    features: ['Noise Cancellation', '20h Battery', 'Quick Charge'],
    orderType: 'nationwide'
  },
  {
    id: '15',
    name: 'T-shirt',
    category: 'Clothing',
    price: 350,
    originalPrice: 450,
    image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 5.0,
    reviews: 156,
    inStock: true,
    vendor: 'Fashion Hub',
    description: 'Comfortable cotton t-shirt for everyday wear',
    features: ['100% Cotton', 'Machine Washable', 'Multiple Colors'],
    orderType: 'nationwide'
  },
  {
    id: '16',
    name: 'Laptop',
    category: 'Electronics',
    price: 44990,
    originalPrice: 54990,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.4,
    reviews: 89,
    inStock: true,
    vendor: 'Tech Store',
    description: 'High-performance laptop for work and gaming',
    features: ['Intel i5', '8GB RAM', '512GB SSD'],
    orderType: 'nationwide'
  },

  // More Food Items for Dine Out
  {
    id: '11',
    name: 'Butter Chicken',
    category: 'Food & Beverages',
    price: 329,
    originalPrice: 379,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.6,
    reviews: 156,
    inStock: true,
    vendor: 'Punjabi Dhaba Restaurant',
    description: 'Creamy butter chicken with naan bread',
    features: ['Authentic Recipe', 'Creamy Gravy', 'Served Hot'],
    orderType: 'express'
  },
  {
    id: '12',
    name: 'Veg Hakka Noodles',
    category: 'Food & Beverages',
    price: 189,
    originalPrice: 229,
    image: 'https://images.pexels.com/photos/1907244/pexels-photo-1907244.jpeg?auto=compress&cs=tinysrgb&w=500',
    rating: 4.2,
    reviews: 92,
    inStock: true,
    vendor: 'Chinese Corner Restaurant',
    description: 'Stir-fried noodles with fresh vegetables',
    features: ['Fresh Vegetables', 'Indo-Chinese', 'Spicy'],
    orderType: 'express'
  }
];

export const mockOrders = [
  {
    id: 'GRO-2025-001',
    orderNumber: 'GRO-2025-001',
    status: 'delivered',
    total: 3598,
    orderType: 'express',
    items: [
      { productId: '1', name: 'Chicken Biryani', quantity: 1, price: 299 },
      { productId: '2', name: 'Margherita Pizza', quantity: 1, price: 249 }
    ],
    customer: {
      name: 'John Doe',
      phone: '+919876543210',
      email: 'customer@grooso.com'
    },
    deliveryAddress: {
      street: '123 MG Road',
      area: 'Andheri West',
      city: 'Mumbai',
      pincode: '400058'
    },
    vendor: 'Biryani House Restaurant',
    deliveryPartner: 'Speed Delivery',
    createdAt: '2025-01-20T10:30:00Z',
    estimatedDelivery: '2025-01-22T18:00:00Z'
  },
  {
    id: 'GRO-2025-002',
    orderNumber: 'GRO-2025-002',
    status: 'in_transit',
    total: 1698,
    orderType: 'citymart',
    items: [
      { productId: '3', name: 'Fresh Vegetables Bundle', quantity: 1, price: 199 },
      { productId: '4', name: 'Dairy Products Combo', quantity: 1, price: 159 }
    ],
    customer: {
      name: 'John Doe',
      phone: '+919876543210',
      email: 'customer@grooso.com'
    },
    deliveryAddress: {
      street: '456 Brigade Road',
      area: 'Indiranagar',
      city: 'Bangalore',
      pincode: '560038'
    },
    vendor: 'Fresh Mart Store',
    deliveryPartner: 'Quick Transport',
    createdAt: '2025-01-21T14:15:00Z',
    estimatedDelivery: '2025-01-23T16:00:00Z'
  }
];