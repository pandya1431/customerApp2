import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Mock order details - in real app, fetch from API
    setOrderDetails({
      id: orderId,
      orderNumber: `GRO-${orderId}`,
      total: 1299,
      estimatedDelivery: '30-45 minutes',
      items: [
        { name: 'Chicken Biryani', quantity: 1, price: 299 },
        { name: 'Margherita Pizza', quantity: 1, price: 249 }
      ]
    });
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-6">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {/* Order Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 text-left">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <span className="text-sm text-gray-500">#{orderDetails.orderNumber}</span>
          </div>

          <div className="space-y-3 mb-4">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span className="text-emerald-600">{formatCurrency(orderDetails.total)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Timeline */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Truck className="h-5 w-5 text-emerald-600" />
            <h3 className="font-semibold text-emerald-800">Estimated Delivery</h3>
          </div>
          <p className="text-emerald-700 font-medium">{orderDetails.estimatedDelivery}</p>
          <p className="text-sm text-emerald-600 mt-1">We'll notify you when your order is on the way</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to={`/track-order/${orderId}`}
            className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Your Order</span>
          </Link>

          <Link
            to="/"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Need help with your order? Contact us at{' '}
            <a href="tel:+918000000000" className="text-emerald-600 font-medium">
              +91 80000 00000
            </a>{' '}
            or{' '}
            <a href="mailto:support@grooso.com" className="text-emerald-600 font-medium">
              support@grooso.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;