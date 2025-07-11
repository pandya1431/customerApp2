import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShoppingCart, 
  MapPin, 
  Bell, 
  Settings, 
  HelpCircle, 
  LogOut,
  Edit,
  Save,
  X,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Package,
  Star,
  Clock,
  Home,
  Briefcase,
  Plus,
  Trash2,
  MessageCircle,
  Shield,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const AccountPage = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });

  // Mobile navigation state
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Sync form data with user data
  useEffect(() => {
    if (user) {
      setProfileFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleProfileSave = () => {
    if (!profileFormData.name || !profileFormData.email || !profileFormData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileFormData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    updateUser(profileFormData);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleProfileCancel = () => {
    if (user) {
      setProfileFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });
    }
    setIsEditingProfile(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackToMain = () => {
    setActiveSection('dashboard');
    setShowMobileMenu(false);
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'support', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderMobileHeader = () => {
    if (activeSection === 'dashboard') return null;
    
    const currentItem = menuItems.find(item => item.id === activeSection);
    
    return (
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center space-x-3">
        <button
          onClick={handleBackToMain}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">
          {currentItem?.label || 'Account'}
        </h1>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-sm md:text-base text-gray-600">Manage your personal info, orders, and preferences.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-gray-900">4</p>
              <p className="text-xs md:text-sm text-gray-600">Total Orders</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-gray-900">2</p>
              <p className="text-xs md:text-sm text-gray-600">Delivered</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 col-span-2 md:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-gray-900">2</p>
              <p className="text-xs md:text-sm text-gray-600">Addresses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <button
            onClick={() => setActiveSection('orders')}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="border border-gray-200 rounded-lg p-3 md:p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900 text-sm md:text-base">The Fashion Hub</h3>
                <p className="text-xs md:text-sm text-gray-600">Nationwide</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Delivered
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-600 mb-3">2 items • Delivered on Jan 15</p>
            <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors text-sm">
              Reorder
            </button>
          </div>
        </div>
      </div>

      {/* My Address */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Address</h2>
          <button
            onClick={() => setActiveSection('addresses')}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm md:text-base">Home</p>
            <p className="text-xs md:text-sm text-gray-600">123 Main Street, Apartment 2B</p>
            <p className="text-xs md:text-sm text-gray-600">Springfield, IL 62701</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <button
            onClick={() => setActiveSection('orders')}
            className="flex flex-col items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
              <Package className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-900">Reorder</span>
          </button>

          <button
            onClick={() => setActiveSection('profile')}
            className="flex flex-col items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-900">Update Info</span>
          </button>

          <button
            onClick={() => setActiveSection('support')}
            className="flex flex-col items-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-900">Help Chat</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{profileFormData.name || 'User'}</h2>
                <p className="text-sm md:text-base text-gray-600">{profileFormData.email || 'No email provided'}</p>
              </div>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleProfileSave}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleProfileCancel}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              {isEditingProfile ? (
                <input
                  type="text"
                  name="name"
                  value={profileFormData.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm md:text-base">{profileFormData.name || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              {isEditingProfile ? (
                <input
                  type="email"
                  name="email"
                  value={profileFormData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm md:text-base">{profileFormData.email || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              {isEditingProfile ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileFormData.phone}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm md:text-base">{profileFormData.phone || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditingProfile ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileFormData.dateOfBirth}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm md:text-base">{profileFormData.dateOfBirth || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              {isEditingProfile ? (
                <select
                  name="gender"
                  value={profileFormData.gender}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm md:text-base"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              ) : (
                <div className="py-2">
                  <span className="text-sm md:text-base">{profileFormData.gender || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="py-2">
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                  {user?.role || 'Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {/* Tab Filters */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="flex overflow-x-auto">
          {['All', 'Pending', 'Delivered', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              className="flex-1 min-w-0 px-4 py-3 text-sm font-medium bg-emerald-600 text-white first:bg-emerald-600 first:text-white"
            >
              <span className="block">{tab}</span>
              <span className="text-xs mt-1 block text-emerald-100">
                {tab === 'All' ? '4 orders' : '0 orders'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {[1, 2].map((order) => (
          <div key={order} className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-2 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-900">Order #{12345 + order}</h3>
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>Jan {15 + order}, 2025</span>
                  </div>
                </div>
              </div>
              <span className="inline-flex px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                Delivered
              </span>
            </div>

            {/* Product Images */}
            <div className="flex items-center space-x-3 mb-4">
              {[1, 2, 3].map((item) => (
                <img
                  key={item}
                  src={`https://images.pexels.com/photos/${2529148 + item}/pexels-photo-${2529148 + item}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                  alt="Product"
                  className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-gray-100 space-y-3 md:space-y-0">
              <div>
                <span className="text-lg md:text-2xl font-bold text-gray-900">
                  {formatCurrency(1299 + order * 200)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 md:flex-none bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                  Reorder
                </button>
                <button className="flex-1 md:flex-none bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      {/* Add Address Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm">
          <Plus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Address Cards */}
      <div className="space-y-4">
        {[
          { type: 'home', label: 'Home', address: '123 Main Street, Apartment 2B, Springfield, IL 62701' },
          { type: 'work', label: 'Work', address: '456 Business Park, Tower B, 5th Floor, Mumbai, MH 400051' }
        ].map((address, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${address.type === 'home' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {address.type === 'home' ? <Home className="w-4 h-4 md:w-5 md:h-5" /> : <Briefcase className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">{user?.name || 'John Doe'}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${address.type === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {address.label}
                      </span>
                      {index === 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">{user?.phone || '+919876543210'}</p>
                  </div>
                </div>

                <div className="text-gray-700 mb-3">
                  <p className="text-sm md:text-base">{address.address}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                  {index !== 0 && (
                    <button className="text-emerald-600 hover:text-emerald-700 text-xs md:text-sm font-medium">
                      Set as Default
                    </button>
                  )}
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs md:text-sm">
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-xs md:text-sm">
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { type: 'order', title: 'Order Delivered', message: 'Your order #12345 has been delivered successfully', time: '2 hours ago', read: false },
          { type: 'promotion', title: 'Special Offer', message: 'Get 20% off on your next order. Use code SAVE20', time: '1 day ago', read: true },
          { type: 'account', title: 'Profile Updated', message: 'Your profile information has been updated successfully', time: '3 days ago', read: true }
        ].map((notification, index) => (
          <div key={index} className={`bg-white rounded-lg shadow-sm border p-4 md:p-6 ${!notification.read ? 'border-l-4 border-l-emerald-500' : ''}`}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${
                notification.type === 'order' ? 'bg-green-100' :
                notification.type === 'promotion' ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                {notification.type === 'order' ? <Package className="w-4 h-4 md:w-5 md:h-5 text-green-600" /> :
                 notification.type === 'promotion' ? <Star className="w-4 h-4 md:w-5 md:h-5 text-orange-600" /> :
                 <User className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">{notification.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  <button className="text-emerald-600 hover:text-emerald-700 text-xs font-medium">
                    Mark as read
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', description: 'Receive order updates and promotional emails' },
            { label: 'SMS Notifications', description: 'Receive order updates via SMS' },
            { label: 'Push Notifications', description: 'Receive push notifications on your device' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm md:text-base">{setting.label}</h4>
                <p className="text-xs md:text-sm text-gray-600">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Change Password
          </button>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium block">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      {/* Contact Support */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
            <Phone className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 mb-2" />
            <span className="font-medium text-sm md:text-base">Call Us</span>
            <span className="text-xs md:text-sm text-gray-600">1800-123-4567</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2" />
            <span className="font-medium text-sm md:text-base">Email Us</span>
            <span className="text-xs md:text-sm text-gray-600">support@grooso.com</span>
          </button>
          
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2" />
            <span className="font-medium text-sm md:text-base">Live Chat</span>
            <span className="text-xs md:text-sm text-gray-600">Chat with us</span>
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { question: 'How do I track my order?', answer: 'You can track your order from the My Orders section.' },
            { question: 'What is your return policy?', answer: 'We offer 30-day returns on most items.' },
            { question: 'How do I change my delivery address?', answer: 'You can update your address in the My Addresses section.' }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-sm md:text-base mb-2">{faq.question}</h4>
              <p className="text-xs md:text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'orders':
        return renderOrders();
      case 'addresses':
        return renderAddresses();
      case 'notifications':
        return renderNotifications();
      case 'settings':
        return renderSettings();
      case 'support':
        return renderSupport();
      default:
        return renderDashboard();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Mobile Menu Button */}
          <div className="md:hidden bg-white border-b px-4 py-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="flex items-center space-x-2 text-gray-700"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Account Menu</span>
            </button>
          </div>

          {/* Sidebar - Desktop */}
          <div className="w-full md:w-1/4 bg-white shadow-sm border-r md:min-h-screen">
            {/* Profile Header */}
            <div className="p-4 md:p-6 border-b">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{user?.name || 'John Doe'}</h2>
                  <p className="text-sm text-gray-600">{user?.email || 'customer@grooso.com'}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === 'dashboard'
                        ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </button>
                </li>
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeSection === item.id
                            ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Sidebar */}
          {showMobileMenu && (
            <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileMenu(false)}>
              <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                {/* Profile Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">{user?.name || 'John Doe'}</h2>
                        <p className="text-sm text-gray-600">{user?.email || 'customer@grooso.com'}</p>
                      </div>
                    </div>
                    <button onClick={() => setShowMobileMenu(false)}>
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => {
                          setActiveSection('dashboard');
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeSection === 'dashboard'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <User className="w-5 h-5" />
                        <span>Dashboard</span>
                      </button>
                    </li>
                    {menuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              setActiveSection(item.id);
                              setShowMobileMenu(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                              activeSection === item.id
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 md:w-3/4">
            {renderMobileHeader()}
            <div className="p-4 md:p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;