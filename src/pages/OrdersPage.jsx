import React, { useState, useEffect } from 'react';
import { Package, Zap, Store, Globe, Eye, Calendar, MapPin } from 'lucide-react';
import { ordersApi } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency, formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuth();

  // Mock orders data with product images
  const mockOrders = [
    {
      id: 'GRO-12345',
      orderNumber: 'Order #12345',
      status: 'delivered',
      total: 1548,
      orderType: 'express',
      createdAt: '2024-04-15T11:31:00Z',
      vendor: 'Express',
      items: [
        { name: 'Green Bottle', image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Headphones', image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'T-shirt', image: 'https://images.pexels.com/photos/1020585/pexels-photo-1020585.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      customer: { email: 'customer@grooso.com' }
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
        { name: 'Banana', image: 'https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Bread', image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      customer: { email: 'customer@grooso.com' }
    },
    {
      id: 'GRO-12343',
      orderNumber: 'Order #12343',
      status: 'delivered',
      total: 2340,
      orderType: 'nationwide',
      createdAt: '2024-04-10T16:10:00Z',
      vendor: 'Nationwide',
      items: [
        { name: 'Red Sofa', image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Watch', image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      customer: { email: 'customer@grooso.com' }
    },
    {
      id: 'GRO-12342',
      orderNumber: 'Order #12342',
      status: 'cancelled',
      total: 899,
      orderType: 'express',
      createdAt: '2024-04-08T14:25:00Z',
      vendor: 'Express',
      items: [
        { name: 'Pizza', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Burger', image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100' },
        { name: 'Fries', image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=100' }
      ],
      customer: { email: 'customer@grooso.com' }
    }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Using mock data for demonstration
      const userOrders = mockOrders.filter(order => 
        order.customer.email === user?.email
      );
      setOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    return orders.filter(order => order.status === activeTab);
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

  const getVendorIcon = (orderType) => {
    switch (orderType) {
      case 'express':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'citymart':
        return <Store className="w-4 h-4 text-emerald-600" />;
      case 'nationwide':
        return <Globe className="w-4 h-4 text-emerald-600" />;
      default:
        return <Package className="w-4 h-4 text-emerald-600" />;
    }
  };

  const handleViewDetails = (orderId) => {
    toast.success(`Opening details for ${orderId}`);
    // Navigate to order details page
  };

  const tabs = [
    { id: 'all', label: 'All', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const filteredOrders = getFilteredOrders();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner text="Loading your orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your orders</p>
        </div>

        {/* Tab Filters */}
        <div className="bg-white rounded-lg shadow-sm border mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                <span className="block">{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`text-xs mt-1 block ${
                    activeTab === tab.id ? 'text-emerald-100' : 'text-gray-400'
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
                      {getVendorIcon(order.orderType)}
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
                  {getVendorIcon(order.orderType)}
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
                    onClick={() => handleViewDetails(order.orderNumber)}
                    className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === 'all' ? 'No orders found' : `No ${activeTab} orders`}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === 'all' 
                  ? "You haven't placed any orders yet" 
                  : `You don't have any ${activeTab} orders`
                }
              </p>
              {activeTab === 'all' && (
                <a
                  href="/"
                  className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <span>Start Shopping</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;