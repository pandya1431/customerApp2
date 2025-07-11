import React from 'react';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const ProductFilters = ({ filters, onFilterChange }) => {
  const priceRanges = [
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1,000', value: '500-1000' },
    { label: '₹1,000 - ₹5,000', value: '1000-5000' },
    { label: 'Above ₹5,000', value: '5000-999999' }
  ];

  const ratings = [
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 },
    { label: '1+ Stars', value: 1 }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category) || false}
                onChange={(e) => {
                  const categories = filters.categories || [];
                  if (e.target.checked) {
                    onFilterChange({ ...filters, categories: [...categories, category] });
                  } else {
                    onFilterChange({
                      ...filters,
                      categories: categories.filter(c => c !== category)
                    });
                  }
                }}
                className="mr-2 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
                className="mr-2 border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating.value} className="flex items-center">
              <input
                type="radio"
                name="rating"
                value={rating.value}
                checked={filters.rating === rating.value}
                onChange={(e) => onFilterChange({ ...filters, rating: parseInt(e.target.value) })}
                className="mr-2 border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700">{rating.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Availability</h4>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStockOnly || false}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="mr-2 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange({})}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;