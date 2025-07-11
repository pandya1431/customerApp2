import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  });

  // Sync formData with user data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }

    // Update user data
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || ''
      });
    }
    setIsEditing(false);
  };

  // Show loading state if user data is not available
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Mobile Header */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        </div>

      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">{formData.name || 'User'}</h2>
                <p className="text-sm md:text-base text-gray-600">{formData.email || 'No email provided'}</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base w-full sm:w-auto"
              >
                <Edit className="w-3 h-3 md:w-4 md:h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center space-x-2 bg-emerald-600 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
                >
                  <Save className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm md:text-base"
                >
                  <X className="w-3 h-3 md:w-4 md:h-4" />
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
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2 text-sm md:text-base">
                  <User className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                  <span>{formData.name || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2 text-sm md:text-base">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                  <span>{formData.email || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2 text-sm md:text-base">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                  <span>{formData.phone || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              ) : (
                <div className="flex items-center space-x-2 py-2 text-sm md:text-base">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                  <span>{formData.dateOfBirth ? new Date(formData.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Gender
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              ) : (
                <div className="py-2 text-sm md:text-base">
                  <span className="capitalize">{formData.gender || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="py-2">
                <span className="inline-flex px-2 py-1 text-xs md:text-sm font-medium rounded-full bg-emerald-100 text-emerald-800 capitalize">
                  {user?.role || 'Customer'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="border-t border-gray-200 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-sm md:text-base font-medium">Email Notifications</h4>
                <p className="text-xs md:text-sm text-gray-600">Receive order updates and promotional emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-sm md:text-base font-medium">SMS Notifications</h4>
                <p className="text-xs md:text-sm text-gray-600">Receive order updates via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-sm md:text-base font-medium">Push Notifications</h4>
                <p className="text-xs md:text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-200 p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
          <div className="space-y-3 md:space-y-4">
            <button className="text-red-600 hover:text-red-700 text-sm md:text-base font-medium block w-full text-left sm:w-auto">
              Change Password
            </button>
            <button className="text-red-600 hover:text-red-700 text-sm md:text-base font-medium block w-full text-left sm:w-auto">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ProfilePage;