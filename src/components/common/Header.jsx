import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, Heart, MapPin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = ({ onSearchChange }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount, toggleCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-emerald-600 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Delivering to Mumbai 400001</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>🎉 Free delivery on orders above ₹999</span>
              <span>📞 Support: 1800-123-4567</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-emerald-600">Grooso</h1>
              <p className="text-xs text-gray-500 -mt-1">Shop Local</p>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Button - Desktop */}
            {isAuthenticated && (
              <button className="hidden md:block relative p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            {/* Profile Menu - Desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors p-2"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                {isAuthenticated && (
                  <>
                    <span className="text-sm font-medium">
                      {user?.name?.split(' ')[0] || 'John'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Desktop Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 profile-dropdown">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 text-sm text-gray-500 border-b border-gray-100">
                        {user?.email || 'customer@grooso.com'}
                      </div>
                      <Link 
                        to="/account" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3 text-gray-400" />
                        My Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-3 text-gray-400" />
                        My Orders
                      </Link>
                      <Link 
                        to="/addresses" 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                        My Addresses
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <X className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-500 pb-2 border-b">
                    {user?.email || 'customer@grooso.com'}
                  </div>
                  <Link to="/account" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/orders" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    My Orders
                  </Link>
                  <Link to="/addresses" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    My Addresses
                  </Link>
                  <button onClick={handleLogout} className="block py-2 text-red-600 w-full text-left">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link to="/login" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;