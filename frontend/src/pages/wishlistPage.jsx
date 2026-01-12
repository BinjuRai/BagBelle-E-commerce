// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart, Trash2 } from "lucide-react";
// import { getWishlist, removeFromWishlist } from "../services/wishlistService";
// import { useAuth } from "../auth/authProvider";
// import { toast } from "react-toastify";

// const WishlistPage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     fetchWishlist();
//   }, [user, navigate]);

  
 
//   const fetchWishlist = async () => {
//   try {
//     setLoading(true);
//     const data = await getWishlist();
  
//     console.log("Wishlist API:", data); // debug structure
//     setWishlist({ products: data.wishlist?.products || data.products || [] });
//   } catch (err) {
//     console.error("Failed to fetch wishlist:", err);
//     toast.error("Failed to load wishlist");
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleRemove = async (productId, productName) => {
//     try {
//       await removeFromWishlist(productId);
//       toast.success(`Removed ${productName} from wishlist`);
//       fetchWishlist(); // Refresh list
//     } catch (err) {
//       console.error("Remove error:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   const handleAddToCart = (product) => {
//     // TODO: Implement add to cart functionality
//     toast.success(`${product.name} added to cart! 🛒`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-700"></div>
//       </div>
//     );
//   }

//   const products = wishlist?.products || [];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-2">
//             <Heart className="w-8 h-8 text-red-500 fill-red-500" />
//             <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
//               My Wishlist
//             </h1>
//           </div>
//           <p className="text-gray-600 dark:text-gray-400">
//             {products.length} {products.length === 1 ? "item" : "items"} saved for later
//           </p>
//         </div>

//         {/* Empty State */}
//         {products.length === 0 ? (
//           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
//             <div className="text-6xl mb-4">💔</div>
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//               Your wishlist is empty
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Start adding your favorite plants!
//             </p>
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition"
//             >
//               Browse Products
//             </button>
//           </div>
//         ) : (
//           /* Wishlist Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
//               >
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   {product.imagepath ? (
//                     <img
//                       src={`http://localhost:5050/uploads/${product.imagepath}`}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
//                       <span className="text-6xl">🌿</span>
//                     </div>
//                   )}

//                   {/* Remove Button */}
//                   <button
//                     onClick={() => handleRemove(product._id, product.name)}
//                     className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>

//                   {/* Stock Badge */}
//                   {product.stock === 0 && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
//                         Out of Stock
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Details */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
//                     {product.name}
//                   </h3>

//                   {product.description && (
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
//                       {product.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-2xl font-bold text-green-700 dark:text-green-400">
//                       Rs. {product.price.toFixed(2)}
//                     </span>
//                     {product.stock > 0 && (
//                       <span className="text-sm text-gray-600 dark:text-gray-400">
//                         {product.stock} in stock
//                       </span>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={product.stock === 0}
//                       className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart size={18} />
//                       Add to Cart
//                     </button>
//                     <button
//                       onClick={() => navigate(`/products/${product._id}`)}
//                       className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-4 py-2.5 rounded-lg font-semibold transition"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Summary */}
//         {products.length > 0 && (
//           <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
//                   Total Value
//                 </h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Combined value of all items
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-3xl font-bold text-green-700 dark:text-green-400">
//                   Rs. {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => navigate("/products")}
//                   className="text-sm text-green-700 dark:text-green-400 hover:underline mt-1"
//                 >
//                   Continue Shopping →
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart, Trash2 } from "lucide-react";
// import { getWishlist, removeFromWishlist } from "../services/wishlistService";
// import { useAuth } from "../auth/authProvider";
// import { toast } from "react-toastify";

// const WishlistPage = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     fetchWishlist();
//   }, [user, navigate]);

//   const fetchWishlist = async () => {
//     try {
//       setLoading(true);
//       const data = await getWishlist();
//       setWishlist({ products: data.wishlist?.products || data.products || [] });
//     } catch (err) {
//       console.error("Failed to fetch wishlist:", err);
//       toast.error("Failed to load wishlist");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (productId, productName) => {
//     try {
//       await removeFromWishlist(productId);
//       toast.success(`Removed ${productName} from wishlist`);
//       fetchWishlist();
//     } catch (err) {
//       console.error("Remove error:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   const handleAddToCart = (product) => {
//     toast.success(`${product.name} added to cart! 👜`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--color-primary)]"></div>
//       </div>
//     );
//   }

//   const products = wishlist?.products || [];

//   return (
//     <div className="min-h-screen bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="mb-8 flex items-center gap-3">
//           <Heart className="w-8 h-8 text-[var(--color-primary)] fill-[var(--color-primary)]" />
//           <h1 className="text-4xl font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
//             My Wishlist
//           </h1>
//         </div>
//         <p className="text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] mb-10">
//           {products.length} {products.length === 1 ? "item" : "items"} saved for later
//         </p>

//         {/* Empty State */}
//         {products.length === 0 ? (
//           <div className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg p-12 text-center">
//             <div className="text-6xl mb-4">💔</div>
//             <h2 className="text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-2">
//               Your wishlist is empty
//             </h2>
//             <p className="text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] mb-6">
//               Start adding your favorite luxury bags!
//             </p>
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-accent)] px-8 py-3 rounded-lg font-semibold transition"
//             >
//               Browse Products
//             </button>
//           </div>
//         ) : (
//           /* Wishlist Grid */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {products.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
//               >
//                 {/* Image */}
//                 <div className="relative h-64 overflow-hidden">
//                   {product.imagepath ? (
//                     <img
//                       src={`http://localhost:5050/uploads/${product.imagepath}`}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-[var(--color-accent)] flex items-center justify-center">
//                       <span className="text-6xl">👜</span>
//                     </div>
//                   )}

//                   {/* Remove Button */}
//                   <button
//                     onClick={() => handleRemove(product._id, product.name)}
//                     className="absolute top-3 right-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-accent)] p-2 rounded-full shadow-lg transition"
//                   >
//                     <Trash2 size={18} />
//                   </button>

//                   {/* Stock Badge */}
//                   {product.stock === 0 && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                       <span className="bg-[var(--color-primary)] text-[var(--color-accent)] px-4 py-2 rounded-lg font-bold">
//                         Out of Stock
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Details */}
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-2 line-clamp-1">
//                     {product.name}
//                   </h3>

//                   {product.description && (
//                     <p className="text-sm text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] mb-3 line-clamp-2">
//                       {product.description}
//                     </p>
//                   )}

//                   <div className="flex items-center justify-between mb-4">
//                     <span className="text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
//                       Rs. {product.price.toFixed(2)}
//                     </span>
//                     {product.stock > 0 && (
//                       <span className="text-sm text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">
//                         {product.stock} in stock
//                       </span>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={product.stock === 0}
//                       className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-accent)] py-2.5 rounded-lg font-semibold disabled:bg-[var(--color-muted-light)] disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
//                     >
//                       <ShoppingCart size={18} />
//                       Add to Cart
//                     </button>
//                     <button
//                       onClick={() => navigate(`/products/${product._id}`)}
//                       className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-primary)] px-4 py-2.5 rounded-lg font-semibold transition"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Summary */}
//         {products.length > 0 && (
//           <div className="mt-8 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">
//             <div>
//               <h3 className="text-lg font-semibold text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-1">
//                 Total Value
//               </h3>
//               <p className="text-sm text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">
//                 Combined value of all items
//               </p>
//             </div>
//             <div className="text-right mt-4 md:mt-0">
//               <p className="text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
//                 Rs. {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
//               </p>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="text-sm text-[var(--color-primary)] dark:text-[var(--color-accent)] hover:underline mt-1"
//               >
//                 Continue Shopping →
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default WishlistPage;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { useAuth } from "../auth/authProvider";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await getWishlist();
      setWishlist({ products: data.wishlist?.products || data.products || [] });
    } catch {
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId, productName) => {
    try {
      await removeFromWishlist(productId);
      toast.success(`Removed ${productName} from wishlist`);
      fetchWishlist();
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart! 👜`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-800" />
      </div>
    );
  }

  const products = wishlist?.products || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-12">
          <Heart className="w-10 h-10 text-primary fill-accent" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            My Wishlist
          </h1>
        </div>
        <p className="text-gray-500 mb-16">
          {products.length} {products.length === 1 ? "item" : "items"} saved for later
        </p>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl p-16 gap-6">
            <span className="text-7xl">💔</span>
            <h2 className="text-3xl font-bold text-gray-900">Nothing here yet</h2>
            <p className="text-gray-500 text-center max-w-md">
              Start exploring our luxury bags and add your favorites to your wishlist.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition transform"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* PREMIUM GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-transform duration-500 group transform hover:-translate-y-2"
                >
                  {/* IMAGE */}
                  <div className="relative h-96 overflow-hidden">
                    {product.imagepath ? (
                      <img
                        src={`http://localhost:5050/uploads/${product.imagepath}`}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-7xl">
                        👜
                      </div>
                    )}

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => handleRemove(product._id, product.name)}
                      className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition z-10"
                    >
                      <Trash2 size={20} className="text-gray-900" />
                    </button>

                    {/* STOCK BADGE */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-2 rounded-2xl font-bold text-sm shadow-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* PRICE TAG */}
                    <div className="absolute bottom-5 left-5 bg-white/90 px-4 py-2 rounded-2xl font-semibold text-lg shadow-lg">
                      Rs. {product.price.toFixed(2)}
                    </div>
                  </div>

                  {/* DETAILS PANEL */}
                  <div className="p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-500 text-sm line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="flex-1 py-3 rounded-2xl bg-accent  text-black font-semibold shadow-lg hover:scale-105 transition transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="flex-1 py-3 rounded-2xl border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-16 bg-white rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Total Value</h3>
                <p className="text-gray-500 text-sm">Combined value of all wishlist items</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  Rs. {products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="text-sm text-gray-900 hover:underline mt-1"
                >
                  Continue Shopping →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;


