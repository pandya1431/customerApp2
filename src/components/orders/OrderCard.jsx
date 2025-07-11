import React from 'react';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/helpers';

const OrderCard = ({ order }) => {
  const getStatusIcon = (status) => {
    const iconClass = "w-5 h-5";
    switch (status) {
      case 'pending':
        return <Clock className={iconClass} />;
      case 'confirmed':
        return <Package className={iconClass} />;
      case 'assigned':
      case 'in_transit':
        return <Truck className={iconClass} />;
      case 'delivered':
        return <CheckCircle className={iconClass} />;
      case 'cancelled':
        return <XCircle className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
          <p className="text-gray-600 text-sm">{formatDate(order.createdAt)}</p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status.replace('_', ' ')}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Amount:</span>
          <span className="font-bold text-lg text-emerald-600">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 mt-0.5 text-gray-400" />
          <p>
            <strong>Delivery Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.area}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
          </p>
        </div>
        {order.deliveryPartner && (
          <p><strong>Delivery Partner:</strong> {order.deliveryPartner}</p>
        )}
        {order.estimatedDelivery && (
          <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
        )}
      </div>

      <div className="flex space-x-3 mt-4">
        <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
          Track Order
        </button>
        {order.status === 'delivered' && (
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Reorder
          </button>
        )}
        {['pending', 'confirmed'].includes(order.status) && (
          <button className="flex-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors">
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;