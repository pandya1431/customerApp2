import React from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden product-card-hover w-full">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-28 sm:h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-medium">
            {discount}% OFF
          </div>
        )}
        <div className="absolute top-1 right-1 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
          <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="w-3 h-3 text-gray-600 hover:text-red-500" />
          </button>
          <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Eye className="w-3 h-3 text-gray-600 hover:text-emerald-500" />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 sm:p-3 md:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-xs sm:text-sm md:text-base text-gray-900 line-clamp-2 flex-1 mr-1">
            {product.name}
          </h3>
          <div className="flex items-center space-x-0.5 text-xs">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600 hidden sm:inline">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-1 sm:mb-2 truncate">{product.vendor}</p>

        <div className="flex items-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
          <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs">
          <div className="text-xs text-gray-500">
            <span className="hidden sm:inline">{product.reviews} review{product.reviews !== 1 ? 's' : ''}</span>
            <span className="sm:hidden">{product.reviews}</span>
          </div>
          <div className="text-xs text-emerald-600 font-medium hidden sm:block">
            Free Delivery
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium transition-colors ${
            product.inStock
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-3 h-3" />
          <span className="hidden sm:inline">{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          <span className="sm:hidden">{product.inStock ? 'Add' : 'N/A'}</span>
        </button>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-2 pt-2 border-t hidden sm:block">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;