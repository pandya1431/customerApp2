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
  Package,
  RotateCcw,
  UserCheck,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  Home,
  Briefcase,
  MapIcon,
  Plus,
  Trash2,
  X,
  Eye,
  Calendar,
  Phone,
  Mail,
  Save,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { formatCurrency, formatDate } from './utils/helpers';
import toast from 'react-hot-toast';

const AccountPage = () => {
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });

  // Mock data for different sections
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'home',
      name: 'John Doe',
      phone: '+919876543210',
      street: '123 Main Street',
      area: 'Apartment 2B',
      city: 'Springfield',
      state: 'IL',
      pincode: '62701',
      landmark: 'Near Metro Station',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      name: 'John Doe',
      phone: '+919876543210',
      street: '456 Business Park',
      area: 'Tower B, 5th Floor',
      city: 'Springfield',
      state: 'IL',
      pincode: '62702',
      landmark: 'Next to Coffee Shop',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    type: 'home',
    name: '',
    phone: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  const [notifications] = useState([
    {
      id: 1,
      title: 'Order Delivered',
      message: 'Your order #GRO-12345 has been delivered successfully',
      time: '2 hours ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Special Offer',
      message: 'Get 20% off on your next order. Use code SAVE20',
      time: '1 day ago',
      type: 'info',
      read: true
    },
    {
      id: 3,
      title: 'Payment Reminder',
      message: 'Your payment for order #GRO-12344 is pending',
      time: '2 days ago',
      type: 'warning',
      read: false
    }
  ]);

  const [orders] = useState([
    {
      id: 'GRO-12345',
      orderNumber: 'Order #12345',
      status: 'delivered',
      total: 1548,
      orderType: 'express',
      createdAt: '2024-04-15T11:31:00Z',
      vendor: 'The Fashion Hub',
      items: [
        { name: 'Green Bottle', image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Headphones', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    },
    {
      id: 'GRO-12344',
      orderNumber: 'Order #12344',
      status: 'pending',
      total: 750,
      orderType: 'citymart',
      createdAt: '2024-04-12T09:20:00Z',
      vendor: 'City Mart',
      items: [
        { name: 'Apple', image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Banana', image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ]
    }
  ]);

  const [orderFilter, setOrderFilter] = useState('all');

  // Update profile form data when user changes
  useEffect(() => {
    setProfileFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || ''
    });
  }, [user]);

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

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleSaveProfile = () => {
    if (!profileData.name || !profileData.email || !profileData.phone) {
      toast.error('Please fill all required fields');
      return;
    }
    updateUser(profileData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || ''
    });
    setIsEditing(false);
  };

  const handleProfileSave = () => {
    // Validate form
    if (!profileFormData.name || !profileFormData.email || !profileFormData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    // Update user data
    updateUser(profileFormData);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleProfileCancel = () => {
    setProfileFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || ''
    });
    setIsEditingProfile(false);
  };

  const handleProfileChange = (field, value) => {
    setProfileFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.street || !newAddress.pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    const address = {
      ...newAddress,
      id: Date.now(),
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, address]);
    setShowAddressForm(false);
    setNewAddress({
      type: 'home',
      name: '',
      phone: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    });
    toast.success('Address added successfully');
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== addressId));
      toast.success('Address deleted successfully');
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapIcon className="w-5 h-5" />;
    }
  };

  const getAddressColor = (type) => {
    switch (type) {
      case 'home':
        return 'text-blue-600 bg-blue-100';
      case 'work':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      confirmed: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(order => order.status === orderFilter);

  const sidebarItems = [
    { id: 'dashboard', label: 'My Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart },
    { id: 'addresses', label: 'My Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
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
                    onClick={() => setActiveSection('orders')}
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
                      onClick={() => setActiveSection('addresses')}
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
                  onClick={() => setActiveSection('orders')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-900">Reorder</span>
                </button>

                <button
                  onClick={() => setActiveSection('dashboard')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">Update Info</span>
                </button>

                <button
                  onClick={() => setActiveSection('help')}
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
        );

      case 'profile':
        return (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your personal information</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                      <p className="text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  {!isEditingProfile ? (
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleProfileSave}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleProfileCancel}
                        className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileFormData.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 py-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{user?.name || 'Not provided'}</span>
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
                        value={profileFormData.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 py-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{user?.email || 'Not provided'}</span>
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
                        value={profileFormData.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 py-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{user?.phone || 'Not provided'}</span>
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
                        value={profileFormData.dateOfBirth}
                        onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2 py-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{user?.dateOfBirth || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    {isEditingProfile ? (
                      <select
                        value={profileFormData.gender}
                        onChange={(e) => handleProfileChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    ) : (
                      <div className="py-2">
                        <span>{user?.gender || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
              <p className="text-gray-600">Track and manage your orders</p>
            </div>

            {/* Tab Filters */}
            <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-hidden">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'all', label: 'All', count: orders.length },
                  { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
                  { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
                  { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setOrderFilter(tab.id)}
                    className={`flex-1 min-w-0 px-4 py-4 text-sm font-medium transition-all duration-200 ${
                      orderFilter === tab.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="block">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`text-xs mt-1 block ${
                        orderFilter === tab.id ? 'text-emerald-100' : 'text-gray-400'
                      }`}>
                        {tab.count} order{tab.count !== 1 ? 's' : ''}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{order.orderNumber}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Vendor Info */}
                    <div className="flex items-center space-x-2 mb-4">
                      <Package className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium text-gray-900">{order.vendor}</span>
                    </div>

                    {/* Product Images */}
                    <div className="flex items-center space-x-3 mb-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <img
                          key={index}
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>

                    {/* Order Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
                      <div className="mb-3 sm:mb-0">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                      <button
                        onClick={() => toast.success(`Opening details for ${order.orderNumber}`)}
                        className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {orderFilter === 'all' ? 'No orders found' : `No ${orderFilter} orders`}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {orderFilter === 'all' 
                      ? "You haven't placed any orders yet" 
                      : `You don't have any ${orderFilter} orders`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Addresses</h1>
                <p className="text-gray-600">Manage your delivery addresses</p>
              </div>
              <button
                onClick={() => setShowAddressForm(true)}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Form */}
            {showAddressForm && (
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Add New Address</h2>
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="House/Flat/Office No, Building Name, Street Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                    <input
                      type="text"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleAddAddress}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Save Address
                  </button>
                  <button
                    onClick={() => setShowAddressForm(false)}
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Address List */}
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${getAddressColor(address.type)}`}>
                          {getAddressIcon(address.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{address.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full capitalize ${getAddressColor(address.type)}`}>
                              {address.type}
                            </span>
                            {address.isDefault && (
                              <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                        </div>
                      </div>

                      <div className="text-gray-700 mb-3">
                        <p>{address.street}</p>
                        <p>{address.area}, {address.city}, {address.state} - {address.pincode}</p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500">Landmark: {address.landmark}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toast.success('Edit address functionality')}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                        >
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

      case 'notifications':
        return (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications & Alerts</h1>
              <p className="text-gray-600">Stay updated with your orders and offers</p>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`bg-white rounded-lg shadow-sm border p-6 ${!notification.read ? 'border-l-4 border-l-emerald-500' : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-sm text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
              <p className="text-gray-600">Manage your account preferences and security</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-gray-600">Receive order updates and promotional emails</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-gray-600">Receive order updates via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => toast.success('Change password functionality')}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Change Password
                </button>
                <button 
                  onClick={() => toast.error('Delete account functionality')}
                  className="text-red-600 hover:text-red-700 text-sm font-medium block"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="max-w-4xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
              <p className="text-gray-600">Get help with your orders and account</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">How do I track my order?</h4>
                    <p className="text-sm text-gray-600">You can track your order from the 'My Orders' section or click on the tracking link in your email.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">What is your return policy?</h4>
                    <p className="text-sm text-gray-600">We offer a 30-day return policy for most items. Please check the product page for specific return conditions.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">How do I cancel my order?</h4>
                    <p className="text-sm text-gray-600">You can cancel your order within 1 hour of placing it from the 'My Orders' section.</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+91 1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@grooso.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => toast.success('Starting live chat...')}
                  className="w-full mt-4 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                    activeSection === item.id ? 'bg-emerald-50 border-r-4 border-emerald-600 text-emerald-600' : 'text-gray-700'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-6 py-4 text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header with Back Arrow */}
        {activeSection !== 'dashboard' && (
          <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center space-x-3">
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  setActiveSection('dashboard');
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {sidebarItems.find(item => item.id === activeSection)?.label || 'Account'}
            </h1>
          </div>
        )}

        {/* Mobile Content */}
        <div className="p-4">
          {activeSection === 'dashboard' ? (
            <>
              {/* Mobile Profile Header */}
              <div className="bg-white shadow-sm rounded-lg mb-4">
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
                    <button
                      onClick={() => setActiveSection('profile')}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              <div className="bg-white rounded-lg shadow-sm mb-4">
                <div className="py-2">
                  {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.id === 'dashboard' ? 'bg-emerald-100' :
                            item.id === 'orders' ? 'bg-blue-100' :
                            item.id === 'addresses' ? 'bg-green-100' :
                            item.id === 'notifications' ? 'bg-yellow-100' :
                            item.id === 'settings' ? 'bg-purple-100' :
                            item.id === 'help' ? 'bg-indigo-100' : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              item.id === 'dashboard' ? 'text-emerald-600' :
                              item.id === 'orders' ? 'text-blue-600' :
                              item.id === 'addresses' ? 'text-green-600' :
                              item.id === 'notifications' ? 'text-yellow-600' :
                              item.id === 'settings' ? 'text-purple-600' :
                              item.id === 'help' ? 'text-indigo-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <span className="font-medium text-gray-900">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    );
                  })}
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

              {/* Mobile Quick Cards */}
              <div className="grid grid-cols-1 gap-4">
                {/* Recent Orders Card */}
                <div className="bg-white rounded-lg shadow-sm p-4">
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
                      onClick={() => setActiveSection('orders')}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Track Now
                    </button>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveSection('orders')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-2">
                        <RotateCcw className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Reorder</span>
                    </button>

                    <button
                      onClick={() => setActiveSection('profile')}
                      className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Update Info</span>
                    </button>

                    <button
                      onClick={() => setActiveSection('help')}
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
            </>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;