import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatCurrency, calculateDiscount } from '../utils/helpers';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    toast.success(`${product.name} moved to cart`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to buy them later.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600 mt-1">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
          <Link
            to="/"
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          const discount = calculateDiscount(product.originalPrice, product.price);
          
          return (
            <div key={product.id} className="group bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {discount}% OFF
                  </div>
                )}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-base text-gray-900 line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.vendor}</p>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
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

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      product.inStock
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{product.inStock ? 'Move to Cart' : 'Out of Stock'}</span>
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              wishlist.forEach(product => {
                if (product.inStock) {
                  addToCart(product);
                }
              });
              toast.success('All available items added to cart');
            }}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add All to Cart
          </button>
          <button
            onClick={() => {
              wishlist.forEach(product => {
                if (product.inStock) {
                  addToCart(product);
                  removeFromWishlist(product.id);
                }
              });
              toast.success('All available items moved to cart');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Move All to Cart
          </button>
          <button
            onClick={clearWishlist}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;