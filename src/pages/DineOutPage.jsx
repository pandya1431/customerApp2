import React, { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Filter, Search } from 'lucide-react';
import { productsApi } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DineOutPage = ({ searchQuery }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    deliveryTime: '',
    priceRange: ''
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [restaurants, filters, searchQuery]);

  const fetchRestaurants = async () => {
    try {
      const response = await productsApi.getProducts();
      // Filter for express/dineout products
      const expressProducts = response.data.filter(product => 
        product.category === 'Food & Beverages' || product.vendor.includes('Restaurant')
      );
      setRestaurants(expressProducts);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...restaurants];

    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(restaurant => restaurant.rating >= parseFloat(filters.rating));
    }

    setFilteredRestaurants(filtered);
  };

  const cuisines = ['All', 'Indian', 'Chinese', 'Italian', 'Mexican', 'Thai', 'Continental'];
  const deliveryTimes = ['All', '15-30 min', '30-45 min', '45-60 min'];
  const priceRanges = ['All', '₹0-₹200', '₹200-₹500', '₹500+'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading restaurants..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Dine Out - Express Delivery
            </h1>
            <p className="text-xl mb-8 text-orange-100">
              Get your favorite meals delivered in 30 minutes or less
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>30 min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>500+ restaurants</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Hot & Fresh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <select
              value={filters.cuisine}
              onChange={(e) => setFilters({...filters, cuisine: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine === 'All' ? '' : cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>

            <select
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>

            <select
              value={filters.deliveryTime}
              onChange={(e) => setFilters({...filters, deliveryTime: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {deliveryTimes.map(time => (
                <option key={time} value={time === 'All' ? '' : time}>
                  {time}
                </option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              {priceRanges.map(range => (
                <option key={range} value={range === 'All' ? '' : range}>
                  {range}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : 'Restaurants near you'}
          </h2>
          <p className="text-gray-600">{filteredRestaurants.length} restaurants found</p>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    30 min
                  </div>
                  <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.vendor}</p>
                  <p className="text-gray-500 text-sm mb-3">Indian, Chinese, Continental</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">25-30 min</span>
                    </div>
                    <div className="text-lg font-bold text-orange-600">
                      ₹{restaurant.price} for two
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DineOutPage;