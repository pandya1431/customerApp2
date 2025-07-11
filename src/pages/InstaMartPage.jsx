import React, { useState, useEffect } from 'react';
import { Package, Truck, Star, Filter, Search, Globe } from 'lucide-react';
import { productsApi } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';

const InstaMartPage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters, searchQuery, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getProducts();
      // All products are available for nationwide delivery
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product =>
        product.price >= min && product.price <= max
      );
    }

    // Rating filter
    if (filters.rating) {
      filtered = filtered.filter(product =>
        product.rating >= filters.rating
      );
    }

    // Stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Keep original order for newest
        break;
      default:
        // Keep original order for featured
        break;
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              InstaMart - Nationwide Shopping
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Shop from premium brands and get nationwide delivery in 2-5 days
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Nationwide delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Premium brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>2-5 days delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Banner */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-600' },
              { name: 'Fashion', icon: '👕', color: 'bg-pink-100 text-pink-600' },
              { name: 'Home', icon: '🏠', color: 'bg-green-100 text-green-600' },
              { name: 'Books', icon: '📚', color: 'bg-yellow-100 text-yellow-600' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-600' },
              { name: 'Beauty', icon: '💄', color: 'bg-purple-100 text-purple-600' },
              { name: 'Automotive', icon: '🚗', color: 'bg-red-100 text-red-600' },
              { name: 'More', icon: '➕', color: 'bg-gray-100 text-gray-600' }
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setFilters({...filters, categories: [category.name]})}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-xs">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-xl font-semibold">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredProducts.length} products found • Nationwide delivery available
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Delivery Info Banner */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-purple-600" />
                <div>
                  <h3 className="font-medium text-purple-900">Nationwide Delivery</h3>
                  <p className="text-sm text-purple-700">
                    Free delivery on orders above ₹999 • 2-5 days delivery • Cash on delivery available
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setFilters({});
                      setSortBy('featured');
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaMartPage;