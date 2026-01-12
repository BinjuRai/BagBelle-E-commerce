import React, { useState, useEffect } from 'react';
import { Package, Eye, Edit, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { formatDistanceToNow } from 'date-fns';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      const { data } = await axios.get(`${API_URL}/orders/admin/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      console.log('Admin orders:', data.orders);
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setShowModal(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';
      await axios.put(
        `${API_URL}/orders/admin/${selectedOrder._id}/status`,
        { status: statusUpdate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      toast.success('Order status updated successfully');
      fetchOrders();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-800', icon: Truck },
      delivered: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle }
    };
    
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        <Icon size={14} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Shipped</p>
            <p className="text-3xl font-bold text-purple-600">
              {orders.filter(o => o.status === 'shipped').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === 'delivered').length}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here once customers place them.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.user?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{order.user?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      Rs. {order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-xs text-gray-500 uppercase">{order.paymentMethod}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
            
            <div className="relative bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-gray-600">#{selectedOrder._id.slice(-8).toUpperCase()}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Customer Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3 text-gray-900">Customer Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Name:</strong> {selectedOrder.shippingInfo?.fullName}</p>
                  <p className="text-gray-700"><strong>Email:</strong> {selectedOrder.user?.email}</p>
                  <p className="text-gray-700"><strong>Phone:</strong> {selectedOrder.shippingInfo?.phone}</p>
                  <p className="text-gray-700"><strong>Address:</strong> {selectedOrder.shippingInfo?.address}</p>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-900">Products</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg mb-2">
                    <img 
                      src={item.product?.image || '/placeholder.png'} 
                      alt={item.product?.name || 'Product'}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: Rs. {item.price}</p>
                    </div>
                    <p className="font-semibold text-gray-900">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>Rs. {selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Fee:</span>
                    <span>Rs. {selectedOrder.shippingFee?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                    <span>Total:</span>
                    <span>Rs. {selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-900">Update Order Status</label>
                <div className="flex gap-3">
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleUpdateStatus}
                    className="px-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Update Status
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;