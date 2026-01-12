import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Clock, Truck, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { getMyOrders } from "../services/orderService";
const IMAGE_BASE_URL = "http://localhost:5050/uploads/";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log("🚀 Fetching orders...");
      const response = await getMyOrders();
      console.log("📦 Response:", response);
      console.log("📦 Orders data:", response.data);

      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
        console.log("✅ Orders set:", response.data.orders);
      } else {
        console.log("⚠️ No orders found in response");
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      console.error("❌ Error response:", error.response);
      toast.error(error.response?.data?.message || "Failed to fetch orders");

      // If unauthorized, redirect to login
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      confirmed: "text-blue-600 bg-blue-100",
      shipped: "text-purple-600 bg-purple-100",
      delivered: "text-green-600 bg-green-100",
      cancelled: "text-red-600 bg-red-100",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle,
    };
    const Icon = icons[status] || Clock;
    return <Icon size={18} />;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#538767]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#274E36] mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your plant orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start shopping for beautiful plants!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#538767] text-white px-6 py-3 rounded-lg hover:bg-[#274E36] transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed{" "}
                      {formatDistanceToNow(new Date(order.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-[#538767] hover:text-[#274E36] transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center gap-4 mb-3">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img
                        src={
                          item.product?.imagepath
                            ? `http://localhost:5050/uploads/${item.product.imagepath}`
                            : "/placeholder.png"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}

                    {order.items.length > 3 && (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          +{order.items.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {order.items.length} item(s) •{" "}
                      {order.paymentMethod?.toUpperCase()}
                    </p>
                    <p className="text-lg font-bold text-[#274E36]">
                      Rs. {order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setShowModal(false)}
            />

            <div className="relative bg-white rounded-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#274E36]">
                    Order Details
                  </h2>
                  <p className="text-gray-600">
                    #{selectedOrder._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Order Status */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(selectedOrder.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-[#274E36]">Items</h3>
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 border rounded-lg mb-2"
                  >
                    <img
                      src={item.product?.image || "/placeholder.png"}
                      alt={item.product?.name || "Product"}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-[#274E36]">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-[#274E36]">
                  Delivery Address
                </h3>
                <p className="text-gray-700">
                  {selectedOrder.shippingInfo?.fullName}
                </p>
                <p className="text-gray-700">
                  {selectedOrder.shippingInfo?.phone}
                </p>
                <p className="text-gray-700">
                  {selectedOrder.shippingInfo?.address}
                </p>
              </div>

              {/* Payment Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2 text-[#274E36]">
                  Payment Information
                </h3>
                <div className="space-y-1">
                  <p className="text-gray-700">
                    Method:{" "}
                    <span className="font-medium">
                      {selectedOrder.paymentMethod?.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>Rs. {selectedOrder.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping Fee</span>
                    <span>Rs. {selectedOrder.shippingFee?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-[#274E36]">
                      Rs. {selectedOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
