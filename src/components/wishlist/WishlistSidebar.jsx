import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/helpers';

const WishlistSidebar = ({ isOpen, setIsOpen }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">My Wishlist</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Heart className="w-16 h-16 mb-4" />
                <p className="text-lg font-medium">Your wishlist is empty</p>
                <p className="text-sm">Save items you love for later</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-gray-600 text-xs">{item.vendor}</p>
                      <p className="font-semibold text-emerald-600">
                        {formatCurrency(item.price)}
                      </p>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <p className="text-xs text-gray-500 line-through">
                          {formatCurrency(item.originalPrice)}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">
                  {wishlist.length} item{wishlist.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View All Wishlist</span>
                </Link>
                <button
                  onClick={clearWishlist}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear Wishlist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;