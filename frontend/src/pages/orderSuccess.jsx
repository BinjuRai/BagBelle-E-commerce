import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';
import axios from 'axios';
import Confetti from 'react-confetti';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      const { data } = await axios.get(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrder(data.order);
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#538767]"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Order not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-[#538767] text-white px-6 py-2 rounded-lg hover:bg-[#274E36] transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}
      
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle size={48} className="text-[#538767]" />
          </div>
          
          <h1 className="text-3xl font-bold text-[#274E36] mb-2">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for choosing PlantNest! Your order has been received and is being processed with care.
          </p>
          
          <div className="bg-green-50 rounded-lg p-4 inline-block border-2 border-[#538767]">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-2xl font-bold text-[#538767]">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#274E36] mb-6">Order Details</h2>
          
          {/* Timeline */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#538767] rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={20} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-[#274E36]">Order Placed</p>
                  <p className="text-sm text-gray-600">Your order has been received</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  order.status === 'confirmed' ? 'bg-[#538767] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Package size={20} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-[#274E36]">Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your plants with care</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  order.status === 'shipped' ? 'bg-[#538767] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <Truck size={20} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-[#274E36]">Shipped</p>
                  <p className="text-sm text-gray-600">Your plants are on their way</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  order.status === 'delivered' ? 'bg-[#538767] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  <MapPin size={20} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-[#274E36]">Delivered</p>
                  <p className="text-sm text-gray-600">Package delivered successfully</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-[#274E36] mb-4">Items Ordered</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4 p-4 bg-green-50 rounded-lg border border-green-100">
                <img 
                  src={item.product.image} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-[#274E36]">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-[#538767]">Rs. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">Rs. {order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-[#538767] font-medium">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
              <span className="text-[#274E36]">Total</span>
              <span className="text-[#538767]">Rs. {order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-[#274E36] mb-2">Delivery Address</h3>
            <p className="text-gray-600">{order.address}</p>
          </div>

          {/* Payment Info */}
          <div className="border-t pt-6 mt-6">
            <h3 className="font-semibold text-[#274E36] mb-2">Payment Information</h3>
            <p className="text-gray-600">
              Payment Method: <span className="font-medium text-[#274E36]">{order.payment.paymentMethod.toUpperCase()}</span>
            </p>
            <p className="text-gray-600">
              Payment Status: <span className={`font-medium ${
                order.payment.paymentStatus === 'paid' ? 'text-[#538767]' : 'text-yellow-600'
              }`}>
                {order.payment.paymentStatus.charAt(0).toUpperCase() + order.payment.paymentStatus.slice(1)}
              </span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 bg-[#538767] text-white py-3 rounded-lg hover:bg-[#274E36] font-semibold transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate('/products')}
            className="flex-1 bg-white border-2 border-[#538767] text-[#274E36] py-3 rounded-lg hover:bg-green-50 font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;