import React, { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductCard = ({ product, className = '' }) => {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Find if product is already in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      updateQuantity(product.id, 0);
      toast.success(`${product.name} removed from cart`);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted 
        ? `${product.name} removed from wishlist` 
        : `${product.name} added to wishlist`
    );
  };

  const renderRating = () => {
    const rating = product.rating || 4.0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-3 h-3 xs:w-4 xs:h-4 ${
                index < fullStars
                  ? 'text-yellow-400 fill-current'
                  : index === fullStars && hasHalfStar
                  ? 'text-yellow-400 fill-current opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs xs:text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 ${className}`}>
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {!imageLoaded && (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-1.5 xs:p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Heart
            className={`w-3 h-3 xs:w-4 xs:h-4 ${
              isWishlisted
                ? 'text-red-500 fill-current'
                : 'text-gray-400 hover:text-red-400'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-1.5 py-0.5 xs:px-2 xs:py-1 rounded text-xs xs:text-sm font-medium">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 xs:p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-xs xs:text-sm sm:text-base line-clamp-2 mb-1 xs:mb-2">
          {product.name}
        </h3>

        {/* Brand/Category */}
        {product.brand && (
          <p className="text-xs text-gray-500 mb-1 xs:mb-2">
            {product.brand}
          </p>
        )}

        {/* Rating */}
        <div className="mb-2 xs:mb-3">
          {renderRating()}
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-2 xs:mb-3">
          <span className="font-bold text-gray-900 text-sm xs:text-base sm:text-lg">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs xs:text-sm text-gray-500 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Delivery Info */}
        {product.deliveryTime && (
          <p className="text-xs text-gray-600 mb-2 xs:mb-3">
            🚚 {product.deliveryTime}
          </p>
        )}

        {/* Add to Cart Section */}
        <div className="flex items-center justify-between">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center space-x-1 xs:space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 text-xs xs:text-sm flex-1"
            >
              <ShoppingCart className="w-3 h-3 xs:w-4 xs:h-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 xs:space-x-3 flex-1">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-full transition-colors duration-200"
              >
                <Minus className="w-3 h-3 xs:w-4 xs:h-4" />
              </button>
              
              <span className="font-medium text-gray-900 text-sm xs:text-base min-w-[20px] text-center">
                {quantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="flex items-center justify-center w-6 h-6 xs:w-8 xs:h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-600 rounded-full transition-colors duration-200"
              >
                <Plus className="w-3 h-3 xs:w-4 xs:h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;