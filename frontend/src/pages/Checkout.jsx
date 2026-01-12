// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/authProvider";
// import { useCart } from "../context/cartContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { cart, getCartTotal, fetchCart } = useCart();

//   const [isGift, setIsGift] = useState(false);

//   const [giftInfo, setGiftInfo] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     message: "",
//   });

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: user?.name || "",
//     phone: user?.phone || "",
//     address: "",
//     city: "",
//     zipCode: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [loading, setLoading] = useState(false);

//   if (!cart || !cart.items || cart.items.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h2>Your cart is empty. Add items to checkout.</h2>
//       </div>
//     );
//   }

//   const handleInputChange = (e) => {
//     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   };

//   const handleGiftChange = (e) => {
//     setGiftInfo({ ...giftInfo, [e.target.name]: e.target.value });
//   };

//   // const validateForm = () => {
//   //   if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
//   //     toast.error("Please fill all required fields");
//   //     return false;
//   //   }
//   //   return true;
//   // };
//   // const validateForm = () => {
//   //   if (
//   //     !shippingInfo.fullName ||
//   //     !shippingInfo.phone ||
//   //     !shippingInfo.address ||
//   //     !shippingInfo.city
//   //   ) {
//   //     toast.error("Please fill all required fields");
//   //     return false;
//   //   }

//   //   if (isGift && (!giftInfo.name || !giftInfo.phone || !giftInfo.address)) {
//   //     toast.error("Please fill gift recipient details");
//   //     return false;
//   //   }

//   //   return true;
//   // };
//   const validateForm = () => {
//     // 🧾 If NOT a gift → normal address required
//     if (!isGift) {
//       if (
//         !shippingInfo.fullName ||
//         !shippingInfo.phone ||
//         !shippingInfo.address ||
//         !shippingInfo.city
//       ) {
//         toast.error("Please fill shipping address details");
//         return false;
//       }
//     }

//     // 🎁 If gift → gift address required
//     if (isGift) {
//       if (!giftInfo.name || !giftInfo.phone || !giftInfo.address) {
//         toast.error("Please fill gift recipient details");
//         return false;
//       }
//     }

//     return true;
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // Construct payload for backend
//       // const orderData = {
//       //   shippingInfo: {
//       //     address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
//       //     fullName: shippingInfo.fullName,
//       //     phone: shippingInfo.phone,
//       //   },
//       //   paymentMethod,
//       // };
//       // const orderData = {
//       //   shippingInfo: {
//       //     address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
//       //     fullName: shippingInfo.fullName,
//       //     phone: shippingInfo.phone,
//       //   },
//       //   paymentMethod,
//       //   isGift,
//       //   giftInfo: isGift
//       //     ? {
//       //         name: giftInfo.name,
//       //         phone: giftInfo.phone,
//       //         address: giftInfo.address,
//       //         message: giftInfo.message,
//       //       }
//       //     : null,
//       // };
//       //      const orderData = {
//       //   shippingInfo: isGift
//       //     ? {
//       //         // 🎁 Deliver to gift recipient
//       //         fullName: giftInfo.name,
//       //         phone: giftInfo.phone,
//       //         address: giftInfo.address,
//       //       }
//       //     : {
//       //         // 📦 Normal delivery
//       //         fullName: shippingInfo.fullName,
//       //         phone: shippingInfo.phone,
//       //         address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
//       //       },

//       //   paymentMethod,
//       //   isGift,

//       //   giftInfo: isGift
//       //     ? {
//       //         name: giftInfo.name,
//       //         phone: giftInfo.phone,
//       //         address: giftInfo.address,
//       //         message: giftInfo.message,
//       //       }
//       //     : null,
//       // };
//       const orderData = {
//         shippingInfo: isGift
//           ? {
//               // 🎁 Delivery goes to recipient
//               fullName: giftInfo.name,
//               phone: giftInfo.phone,
//               address: giftInfo.address,
//             }
//           : {
//               // 📦 Normal delivery
//               fullName: shippingInfo.fullName,
//               phone: shippingInfo.phone,
//               address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
//             },

//         paymentMethod,
//         isGift,

//         giftInfo: isGift
//           ? {
//               name: giftInfo.name,
//               phone: giftInfo.phone,
//               address: giftInfo.address,
//               message: giftInfo.message,
//             }
//           : null,
//       };

//       const token = localStorage.getItem("token");

//       // Call backend API
//       const res = await axios.post(
//         "http://localhost:5050/api/orders",
//         orderData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Success toast
//       toast.success("Order placed successfully! 🎉");

//       // Clear cart in frontend
//       await fetchCart(); // refresh cart after order

//       // Navigate to orders page or success page
//       navigate("/orders");
//     } catch (err) {
//       console.error("Order error:", err);
//       toast.error(err.response?.data?.message || "Failed to place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
//         {/* Order Summary */}
//         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
//           <div className="space-y-4 max-h-96 overflow-y-auto">
//             {cart.items.map((item) => (
//               <div
//                 key={item._id}
//                 className="flex gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg"
//               >
//                 <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-lg">
//                   🌱
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold">{item.product.name}</h3>
//                   <p>Qty: {item.quantity}</p>
//                   <p>Rs. {(item.product.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {isGift && (
//             <div className="mt-4 p-4 border rounded-lg bg-green-50 dark:bg-gray-700">
//               <h3 className="font-bold text-lg mb-2">🎁 Gift Details</h3>

//               <p>
//                 <strong>Recipient:</strong> {giftInfo.name}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {giftInfo.phone}
//               </p>
//               <p>
//                 <strong>Address:</strong> {giftInfo.address}
//               </p>

//               {giftInfo.message && (
//                 <p className="mt-2 italic">💌 “{giftInfo.message}”</p>
//               )}
//             </div>
//           )}

//           <div className="pt-4 border-t mt-4">
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>Rs. {getCartTotal().toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Shipping & Payment */}
//         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
//           <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
//           <form onSubmit={handlePlaceOrder} className="space-y-4">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={shippingInfo.fullName}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded border"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={shippingInfo.phone}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded border"
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={shippingInfo.address}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded border"
//               required
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={shippingInfo.city}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded border"
//               required
//             />
//             <input
//               type="text"
//               name="zipCode"
//               placeholder="ZIP Code"
//               value={shippingInfo.zipCode}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded border"
//             />
//             {/* 🎁 Gift Option */}
//             <div className="mt-4">
//               <label className="flex items-center gap-2 font-semibold">
//                 <input
//                   type="checkbox"
//                   checked={isGift}
//                   onChange={(e) => setIsGift(e.target.checked)}
//                 />
//                 This order is a gift 🎁
//               </label>
//             </div>

//             {/* 🎁 Gift Details */}
//             {isGift && (
//               <div className="mt-4 space-y-3 p-4 border rounded-lg bg-white dark:bg-gray-700">
//                 <h3 className="font-bold text-lg">Gift Recipient Details</h3>

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Recipient Name"
//                   value={giftInfo.name}
//                   onChange={handleGiftChange}
//                   className="w-full p-2 rounded border"
//                   required
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Recipient Phone"
//                   value={giftInfo.phone}
//                   onChange={handleGiftChange}
//                   className="w-full p-2 rounded border"
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="address"
//                   placeholder="Recipient Address"
//                   value={giftInfo.address}
//                   onChange={handleGiftChange}
//                   className="w-full p-2 rounded border"
//                   required
//                 />

//                 <textarea
//                   name="message"
//                   placeholder="Gift Message (optional)"
//                   value={giftInfo.message}
//                   onChange={handleGiftChange}
//                   className="w-full p-2 rounded border"
//                   rows={3}
//                 />
//               </div>
//             )}

//             <div>
//               <h3 className="font-semibold mb-2">Payment Method</h3>
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full p-2 rounded border"
//               >
//                 <option value="cod">Cash on Delivery</option>
//                 <option value="esewa">eSewa</option>
//                 <option value="khalti">Khalti</option>
//               </select>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-2 rounded font-bold mt-4 disabled:opacity-50"
//             >
//               {loading ? "Processing..." : "Place Order 🌿"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, fetchCart } = useCart();
  const [isGift, setIsGift] = useState(false);
  const [giftInfo, setGiftInfo] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Add items to checkout
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleGiftChange = (e) => {
    setGiftInfo({ ...giftInfo, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!isGift) {
      if (
        !shippingInfo.fullName ||
        !shippingInfo.phone ||
        !shippingInfo.address ||
        !shippingInfo.city
      ) {
        toast.error("Please fill shipping address details");
        return false;
      }
    }

    if (isGift) {
      if (!giftInfo.name || !giftInfo.phone || !giftInfo.address) {
        toast.error("Please fill gift recipient details");
        return false;
      }
    }

    return true;
  };

  const initiateEsewaPayment = async (orderId, amount) => {
    try {
      // Since eSewa v2 requires signature and test environment is having issues,
      // we'll use the mock payment page which works perfectly for college demo
      console.log("Initiating eSewa payment:", { orderId, amount });

      toast.info("Opening eSewa payment page...");

      // Redirect to mock eSewa page
      window.location.href = `/esewa-mock.html?tAmt=${amount}&pid=${orderId}&su=${encodeURIComponent(
        `${window.location.origin}/payment/success`
      )}&fu=${encodeURIComponent(`${window.location.origin}/payment/failure`)}`;

      /* 
      // REAL eSewa v2 Integration (for production with proper signature):
      // This requires backend to generate HMAC-SHA256 signature
      
      const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      
      // Get signature from backend
      const signatureResponse = await axios.post(
        "http://localhost:5050/api/payment/esewa-signature",
        {
          total_amount: amount,
          transaction_uuid: orderId,
          product_code: "EPAYTEST"
        }
      );
      
      const params = {
        amount: amount,
        tax_amount: 0,
        total_amount: amount,
        transaction_uuid: orderId,
        product_code: "EPAYTEST",
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: `${window.location.origin}/payment/success`,
        failure_url: `${window.location.origin}/payment/failure`,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: signatureResponse.data.signature
      };
      
      // Create and submit form
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (const key in params) {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
      */
    } catch (error) {
      console.error("eSewa payment error:", error);
      toast.error("Opening demo payment page...");
      window.location.href = `/esewa-mock.html?tAmt=${amount}&pid=${orderId}&su=${window.location.origin}/payment/success&fu=${window.location.origin}/payment/failure`;
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const orderData = {
        shippingInfo: isGift
          ? {
              fullName: giftInfo.name,
              phone: giftInfo.phone,
              address: giftInfo.address,
            }
          : {
              fullName: shippingInfo.fullName,
              phone: shippingInfo.phone,
              address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.zipCode}`,
            },
        paymentMethod,
        isGift,
        giftInfo: isGift
          ? {
              name: giftInfo.name,
              phone: giftInfo.phone,
              address: giftInfo.address,
              message: giftInfo.message,
            }
          : null,
      };

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5050/api/orders",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = res.data.order._id;
      const totalAmount = getCartTotal();

      if (paymentMethod === "esewa") {
        toast.info("Redirecting to eSewa...");
        await initiateEsewaPayment(orderId, totalAmount);
      } else if (paymentMethod === "khalti") {
        toast.info("Khalti integration coming soon!");
        setTimeout(() => {
          toast.success("Order placed successfully! 🎉");
          fetchCart();
          navigate("/orders");
        }, 1500);
      } else {
        toast.success("Order placed successfully! 🎉");
        await fetchCart();
        navigate("/orders");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center mb-3 pb-3 border-b"
              >
                <div className="flex items-center gap-3">
                  <span>🌱</span>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold">
                  Rs. {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {isGift && (
              <div className="bg-pink-50 p-4 rounded mt-4">
                <p className="font-semibold mb-2">🎁 Gift Details</p>
                <p className="text-sm">Recipient: {giftInfo.name}</p>
                <p className="text-sm">Phone: {giftInfo.phone}</p>
                <p className="text-sm">Address: {giftInfo.address}</p>
                {giftInfo.message && (
                  <p className="text-sm mt-2 italic">💌 "{giftInfo.message}"</p>
                )}
              </div>
            )}

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>Rs. {getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>This order is a gift 🎁</span>
                </label>
              </div>

              {isGift && (
                <div className="bg-pink-50 p-4 rounded mb-4">
                  <h3 className="font-semibold mb-3">Gift Recipient Details</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Recipient Name *"
                    value={giftInfo.name}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border mb-2"
                    required={isGift}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={giftInfo.phone}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border mb-2"
                    required={isGift}
                  />
                  <textarea
                    name="address"
                    placeholder="Delivery Address *"
                    value={giftInfo.address}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border mb-2"
                    rows="2"
                    required={isGift}
                  />
                  <textarea
                    name="message"
                    placeholder="Gift Message (Optional)"
                    value={giftInfo.message}
                    onChange={handleGiftChange}
                    className="w-full p-2 rounded border"
                    rows="2"
                  />
                </div>
              )}

              {!isGift && (
                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={shippingInfo.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone *"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded border"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City *"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border"
                    />
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 rounded border"
                >
                  <option value="cod">💵 Cash on Delivery</option>
                  <option value="esewa">💳 eSewa</option>
                  <option value="khalti">🔵 Khalti</option>
                </select>

                {paymentMethod === "esewa" && (
                  <div className="mt-3 p-3 bg-green-50 rounded text-sm">
                    <p className="font-medium text-green-800">
                      ℹ️ You'll be redirected to eSewa payment gateway
                    </p>
                    <p className="text-green-700 mt-1">
                      Test credentials will be provided on the payment page
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded font-bold mt-6 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "cod"
                  ? "Place Order 🌿"
                  : `Pay with ${
                      paymentMethod === "esewa" ? "eSewa" : "Khalti"
                    } 💳`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
