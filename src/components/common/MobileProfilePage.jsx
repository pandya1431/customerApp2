import React from 'react';
import { 
  User, 
  ShoppingCart, 
  MapPin, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Edit,
  Package,
  RotateCcw,
  UserCheck,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const MobileProfilePage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleTrackOrder = () => {
    toast.success('Redirecting to order tracking...');
    navigate('/orders');
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'Reorder':
        toast.success('Finding your previous orders...');
        navigate('/orders');
        break;
      case 'Update Info':
        toast.success('Opening profile editor...');
        navigate('/profile');
        break;
      case 'Help Chat':
        toast.success('Starting help chat...');
        break;
      case 'My Orders':
        navigate('/orders');
        break;
      case 'My Addresses':
        navigate('/addresses');
        break;
      case 'Notifications & Alerts':
        toast.success('Opening notifications settings...');
        break;
      case 'Account Settings':
        toast.success('Opening account settings...');
        break;
      case 'Help & Support':
        toast.success('Opening help center...');
        break;
      default:
        toast.success(`${action} clicked`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to continue</h2>
          <p className="text-gray-600 mb-6">Access your profile, orders, and more</p>
          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{user?.name || 'User'}</h1>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <Link
              to="/profile"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white mt-4 mx-4 rounded-lg shadow-sm">
        <div className="py-2">
          <button
            onClick={() => handleQuickAction('My Orders')}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">My Orders</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleQuickAction('My Addresses')}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-medium text-gray-900">My Addresses</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleQuickAction('Notifications & Alerts')}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="font-medium text-gray-900">Notifications & Alerts</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleQuickAction('Account Settings')}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">Account Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => handleQuickAction('Help & Support')}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="font-medium text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-4 py-4 hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-medium text-red-600">Logout</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>

      {/* Recent Orders Card */}
      <div className="bg-white mt-4 mx-4 rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">The Fashion Hub</h3>
                  <p className="text-sm text-gray-600">Nationwide</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Packed
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">2 items • Packed</p>
              <button
                onClick={handleTrackOrder}
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Track Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white mt-4 mx-4 rounded-lg shadow-sm mb-6">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleQuickAction('Reorder')}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                <RotateCcw className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Reorder</span>
            </button>

            <button
              onClick={() => handleQuickAction('Update Info')}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Update Info</span>
            </button>

            <button
              onClick={() => handleQuickAction('Help Chat')}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Help Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProfilePage;