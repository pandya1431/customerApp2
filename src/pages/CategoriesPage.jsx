import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../utils/constants';

const CategoriesPage = () => {
  const categoryIcons = {
    'Electronics': '📱',
    'Clothing': '👕',
    'Home & Garden': '🏠',
    'Books': '📚',
    'Sports': '⚽',
    'Automotive': '🚗',
    'Health & Beauty': '💄',
    'Food & Beverages': '🍔'
  };

  const categoryColors = {
    'Electronics': 'bg-blue-100 text-blue-600',
    'Clothing': 'bg-pink-100 text-pink-600',
    'Home & Garden': 'bg-green-100 text-green-600',
    'Books': 'bg-yellow-100 text-yellow-600',
    'Sports': 'bg-orange-100 text-orange-600',
    'Automotive': 'bg-red-100 text-red-600',
    'Health & Beauty': 'bg-purple-100 text-purple-600',
    'Food & Beverages': 'bg-emerald-100 text-emerald-600'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Browse products by category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/instamart?category=${encodeURIComponent(category)}`}
              className={`${categoryColors[category] || 'bg-gray-100 text-gray-600'} p-4 md:p-6 rounded-xl text-center hover:shadow-md transition-shadow`}
            >
              <div className="text-2xl md:text-4xl mb-2 md:mb-3">
                {categoryIcons[category] || '📦'}
              </div>
              <h3 className="font-medium text-xs md:text-sm">{category}</h3>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Link
              to="/dineout"
              className="bg-orange-50 border border-orange-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-xl md:text-2xl mb-2 md:mb-3">🍕</div>
              <h3 className="font-semibold text-sm md:text-base text-orange-800 mb-1 md:mb-2">Express Delivery</h3>
              <p className="text-xs md:text-sm text-orange-600">Get food delivered in 30 minutes</p>
            </Link>
            
            <Link
              to="/food-delivery"
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-xl md:text-2xl mb-2 md:mb-3">🏪</div>
              <h3 className="font-semibold text-sm md:text-base text-emerald-800 mb-1 md:mb-2">City Mart</h3>
              <p className="text-xs md:text-sm text-emerald-600">Shop from local stores</p>
            </Link>
            
            <Link
              to="/instamart"
              className="bg-purple-50 border border-purple-200 rounded-xl p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-xl md:text-2xl mb-2 md:mb-3">🌍</div>
              <h3 className="font-semibold text-sm md:text-base text-purple-800 mb-1 md:mb-2">Nationwide</h3>
              <p className="text-xs md:text-sm text-purple-600">Premium brands delivered anywhere</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;