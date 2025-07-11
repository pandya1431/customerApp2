import React, { useState, useEffect } from 'react';
import { Store, MapPin, Clock, Star, Filter } from 'lucide-react';
import { productsApi } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FoodDeliveryPage = ({ searchQuery }) => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    distance: ''
  });

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [stores, filters, searchQuery]);

  const fetchStores = async () => {
    try {
      const response = await productsApi.getProducts();
      // Filter for city mart products (local stores)
      const cityMartProducts = response.data.filter(product => 
        ['Home & Garden', 'Food & Beverages', 'Health & Beauty'].includes(product.category)
      );
      setStores(cityMartProducts);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...stores];

    if (searchQuery) {
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(store => store.category === filters.category);
    }

    if (filters.rating) {
      filtered = filtered.filter(store => store.rating >= parseFloat(filters.rating));
    }

    setFilteredStores(filtered);
  };

  const categories = ['All', 'Groceries', 'Pharmacy', 'Electronics', 'Fashion', 'Home & Garden'];
  const distances = ['All', 'Within 1 km', 'Within 2 km', 'Within 5 km'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading local stores..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Food Delivery - City Mart
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Order from local stores and get fresh groceries delivered to your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Store className="w-5 h-5" />
                <span>Local stores</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Same day delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Fresh groceries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Groceries', icon: '🛒', color: 'bg-green-100 text-green-600' },
              { name: 'Pharmacy', icon: '💊', color: 'bg-red-100 text-red-600' },
              { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-600' },
              { name: 'Fashion', icon: '👕', color: 'bg-purple-100 text-purple-600' },
              { name: 'Home & Garden', icon: '🏠', color: 'bg-yellow-100 text-yellow-600' },
              { name: 'Books', icon: '📚', color: 'bg-indigo-100 text-indigo-600' }
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setFilters({...filters, category: category.name})}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-sm">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select
              value={filters.distance}
              onChange={(e) => setFilters({...filters, distance: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              {distances.map(distance => (
                <option key={distance} value={distance === 'All' ? '' : distance}>
                  {distance}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Store Sections */}
        <div className="space-y-8">
          {/* Featured Stores */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Featured Stores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Fresh Mart', category: 'Groceries', rating: 4.5, deliveryTime: '30 min', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { name: 'MedPlus Pharmacy', category: 'Pharmacy', rating: 4.7, deliveryTime: '45 min', image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400' },
                { name: 'Tech Store', category: 'Electronics', rating: 4.3, deliveryTime: '60 min', image: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=400' }
              ].map((store) => (
                <div key={store.name} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{store.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{store.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{store.deliveryTime}</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                      Shop Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {searchQuery ? `Results for "${searchQuery}"` : 'Popular Products'}
              </h2>
              <p className="text-gray-600">{filteredStores.length} products found</p>
            </div>

            {filteredStores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStores.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDeliveryPage;