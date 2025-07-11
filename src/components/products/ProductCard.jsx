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
    <div className="group bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden product-card-hover">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-red-500 text-white px-1 md:px-2 py-0.5 md:py-1 rounded text-xs font-medium">
            {discount}% OFF
          </div>
        )}
        <div className="absolute top-1 md:top-2 right-1 md:right-2 flex flex-col space-y-1 md:space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="p-1 md:p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
            <Eye className="w-4 h-4 text-gray-600 hover:text-emerald-500" />
          </button>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-sm md:text-base text-gray-900 line-clamp-2 flex-1 mr-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 text-sm">
            <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
            <span className="text-xs md:text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-500 mb-2">{product.vendor}</p>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm md:text-lg font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs md:text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500">
            {product.reviews} review{product.reviews !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-emerald-600 font-medium">
            Free Delivery
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors ${
            product.inStock
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-emerald-50 text-emerald-600 px-1 md:px-2 py-0.5 md:py-1 rounded"
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