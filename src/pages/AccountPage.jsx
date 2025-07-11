import React, { useState } from 'react';
import { 
  User, 
  ShoppingCart, 
  MapPin, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Package,
  Home,
  Edit,
  RotateCcw,
  UserCheck,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const AccountPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleTrackOrder = () => {
    toast.success('Redirecting to order tracking...');
    navigate('/orders');
  };

  const handleEditAddress = () => {
    toast.success('Opening address editor...');
    navigate('/addresses');
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your account</p>
          <Link
            to="/login"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User, active: activeSection === 'profile' },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart, active: activeSection === 'orders' },
    { id: 'addresses', label: 'My Addresses', icon: MapPin, active: activeSection === 'addresses' },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell, active: activeSection === 'notifications' },
    { id: 'settings', label: 'Account Settings', icon: Settings, active: activeSection === 'settings' },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, active: activeSection === 'help' },
    { id: 'logout', label: 'Logout', icon: LogOut, isLogout: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-7xl mx-auto">
        {/* Left Sidebar */}
        <div className="w-80 bg-white shadow-sm min-h-screen">
          {/* Profile Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user?.name || 'John Doe'}</h2>
                <p className="text-sm text-gray-600">{user?.email || 'customer@grooso.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="py-4">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') {
                      handleLogout();
                    } else {
                      setActiveSection(item.id);
                      handleQuickAction(item.label);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                    item.active ? 'bg-emerald-50 border-r-4 border-emerald-600 text-emerald-600' : 
                    item.isLogout ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
              <p className="text-gray-600">Manage your personal info., orders, and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">The Fashion Hub</h3>
                      <p className="text-sm text-gray-600">Nationwide</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      Packed
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">2 items • Packed</p>
                  <button
                    onClick={handleTrackOrder}
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Track Now
                  </button>
                </div>
              </div>

              {/* My Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">My Address</h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mt-1">
                        <Home className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Home</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          123 Main Street,<br />
                          Apartment 2B,<br />
                          Springfield, IL 62701
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleEditAddress}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleQuickAction('Reorder')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-900">Reorder</span>
                </button>

                <button
                  onClick={() => handleQuickAction('Update Info')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Update Info</span>
                </button>

                <button
                  onClick={() => handleQuickAction('Help Chat')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900">Help Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{user?.name || 'John Doe'}</h1>
                  <p className="text-sm text-gray-600">{user?.email || 'customer@grooso.com'}</p>
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
            {sidebarItems.filter(item => item.id !== 'profile').map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') {
                      handleLogout();
                    } else {
                      handleQuickAction(item.label);
                    }
                  }}
                  className={`flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors ${
                    item.isLogout ? 'hover:bg-red-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.id === 'orders' ? 'bg-blue-100' :
                      item.id === 'addresses' ? 'bg-green-100' :
                      item.id === 'notifications' ? 'bg-yellow-100' :
                      item.id === 'settings' ? 'bg-purple-100' :
                      item.id === 'help' ? 'bg-indigo-100' :
                      item.id === 'logout' ? 'bg-red-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        item.id === 'orders' ? 'text-blue-600' :
                        item.id === 'addresses' ? 'text-green-600' :
                        item.id === 'notifications' ? 'text-yellow-600' :
                        item.id === 'settings' ? 'text-purple-600' :
                        item.id === 'help' ? 'text-indigo-600' :
                        item.id === 'logout' ? 'text-red-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`font-medium ${item.isLogout ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${item.isLogout ? 'text-red-400' : 'text-gray-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="bg-white mt-4 mx-4 rounded-lg shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
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
    </div>
  );
};

export default AccountPage;