import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Bell,
  MapPin,
  ChevronDown,
  Package,
  Settings,
  LogOut,
  ShoppingBag,
  Phone,
  Mail
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import toast from 'react-hot-toast';

const Header = ({ searchQuery, setSearchQuery, setIsWishlistOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemsCount, toggleCart } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  
  const profileDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleLocationChange = (city) => {
    setSelectedLocation(city);
    setIsLocationDropdownOpen(false);
    toast.success(`Location changed to ${city}`);
  };

  const cartItemsCount = getCartItemsCount();
  const wishlistCount = getWishlistCount();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Location */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">Grooso</span>
            </Link>
            
            {/* Location Selector - Hidden on mobile */}
            <div className="hidden md:block relative" ref={locationDropdownRef}>
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{selectedLocation}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLocationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleLocationChange(city)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        selectedLocation === city ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <Link
              to="/search"
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Search className="w-6 h-6" />
            </Link>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </span>
              )}
            </button>

            {/* Profile/Login */}
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.name}</span>
                  <ChevronDown className="hidden md:block w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 profile-dropdown">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>
                      
                      <Link
                        to="/addresses"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>My Addresses</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          toast.success('Opening settings...');
                        }}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
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
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Location */}
            <div className="mb-4">
              <div className="relative" ref={locationDropdownRef}>
                <button
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedLocation}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isLocationDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    {cities.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleLocationChange(city)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          selectedLocation === city ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/categories' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/dineout"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/dineout' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Dine Out
              </Link>
              <Link
                to="/food-delivery"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/food-delivery' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Food Delivery
              </Link>
              <Link
                to="/instamart"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/instamart' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                InstaMart
              </Link>
            </div>

            {/* Mobile Contact Info */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>support@grooso.com</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;