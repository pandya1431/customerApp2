import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  MapPin, 
  ChevronDown,
  Bell,
  Heart,
  Package,
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu') && !event.target.closest('.profile-button')) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">G</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Grooso</span>
          </Link>

          {/* Location - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Deliver to</span>
            <span className="font-medium text-gray-900">Current Location</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, stores..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon - Mobile only */}
            <button 
              onClick={() => navigate('/search')}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications - Hidden on mobile */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-emerald-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:block p-2 text-gray-600 hover:text-emerald-600">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </span>
              )}
            </Link>

            {/* Profile Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="profile-button flex items-center space-x-2 p-2 text-gray-600 hover:text-emerald-600"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-900">
                    {user.name || 'Account'}
                  </span>
                  <ChevronDown className="hidden sm:block w-4 h-4" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="profile-menu absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-lg border py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    
                    <Link
                      to="/account"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                    
                    <Link
                      to="/orders"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      <span>My Orders</span>
                    </Link>
                    
                    <Link
                      to="/account"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    
                    <Link
                      to="/support"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </Link>
                    
                    <div className="border-t mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Login</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, stores..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Mobile Location */}
              <div className="flex items-center space-x-2 px-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Deliver to Current Location</span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 px-2">
                <Link
                  to="/notifications"
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-emerald-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                  <span className="ml-auto w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-3 py-2 text-gray-700 hover:text-emerald-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;