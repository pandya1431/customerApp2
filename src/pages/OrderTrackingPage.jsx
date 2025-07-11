import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { formatDate } from '../utils/helpers';

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Mock order tracking data - in real app, fetch from API
    setOrderData({
      id: orderId,
      orderNumber: `GRO-${orderId}`,
      status: 'in_transit',
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
      deliveryPartner: {
        name: 'Rajesh Kumar',
        phone: '+919876543210',
        vehicle: 'Motorcycle - MH 01 AB 1234'
      },
      timeline: [
        {
          status: 'Order Placed',
          time: new Date(Date.now() - 20 * 60 * 1000),
          completed: true,
          description: 'Your order has been placed successfully'
        },
        {
          status: 'Order Confirmed',
          time: new Date(Date.now() - 15 * 60 * 1000),
          completed: true,
          description: 'Restaurant has confirmed your order'
        },
        {
          status: 'Preparing',
          time: new Date(Date.now() - 10 * 60 * 1000),
          completed: true,
          description: 'Your food is being prepared'
        },
        {
          status: 'Out for Delivery',
          time: new Date(Date.now() - 5 * 60 * 1000),
          completed: true,
          description: 'Your order is on the way'
        },
        {
          status: 'Delivered',
          time: null,
          completed: false,
          description: 'Your order will be delivered soon'
        }
      ]
    });
  }, [orderId]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const getStatusIcon = (status, completed) => {
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-emerald-600" />;
    }
    
    switch (status) {
      case 'Order Placed':
        return <Package className="w-6 h-6 text-gray-400" />;
      case 'Preparing':
        return <Clock className="w-6 h-6 text-gray-400" />;
      case 'Out for Delivery':
        return <Truck className="w-6 h-6 text-gray-400" />;
      default:
        return <Package className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
        <p className="text-gray-600 mt-1">Order #{orderData.orderNumber}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-6">Order Status</h2>
            
            <div className="space-y-6">
              {orderData.timeline.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status, step.completed)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </h3>
                      {step.time && (
                        <span className="text-sm text-gray-500">
                          {formatDate(step.time)}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Tracking Map Placeholder */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">Live Tracking</h2>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Live tracking map will appear here</p>
                <p className="text-sm text-gray-400 mt-1">Integration with Google Maps/Mapbox</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Estimated Delivery */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">Estimated Delivery</h3>
            </div>
            <p className="text-emerald-700 font-medium">
              {formatDate(orderData.estimatedDelivery)}
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              Your order will arrive soon!
            </p>
          </div>

          {/* Delivery Partner */}
          {orderData.deliveryPartner && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Delivery Partner</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium">{orderData.deliveryPartner.name}</p>
                    <p className="text-sm text-gray-600">{orderData.deliveryPartner.vehicle}</p>
                  </div>
                </div>
                <a
                  href={`tel:${orderData.deliveryPartner.phone}`}
                  className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Delivery Partner</span>
                </a>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Chicken Biryani x 1</span>
                <span>₹299</span>
              </div>
              <div className="flex justify-between">
                <span>Margherita Pizza x 1</span>
                <span>₹249</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹50</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹89</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-emerald-600">₹687</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full text-left text-emerald-600 hover:text-emerald-700 text-sm">
                Report an issue with this order
              </button>
              <button className="w-full text-left text-emerald-600 hover:text-emerald-700 text-sm">
                Contact customer support
              </button>
              <button className="w-full text-left text-emerald-600 hover:text-emerald-700 text-sm">
                View order details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;