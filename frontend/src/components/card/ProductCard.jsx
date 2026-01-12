// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../../context/cartContext";
// import { useAuth } from "../../auth/authProvider";
// import { toast } from "react-toastify";
// import { toggleWishlist, getWishlist } from "../../services/wishlistService";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const [inWishlist, setInWishlist] = useState(false);

//   // Fetch wishlist status if logged in
//   const fetchWishlist = async () => {
//     if (!user) {
//       setInWishlist(false);
//       return;
//     }
//     try {
//       const response = await getWishlist();
//       const wishlistItems = response.data || response;
//       setInWishlist(Array.isArray(wishlistItems) && wishlistItems.some((item) => item._id === product._id));
//     } catch (err) {
//       console.error("Failed to fetch wishlist", err);
//       setInWishlist(false);
//     }
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, [product, user]);

//   const handleToggleWishlist = async (e) => {
//     e.stopPropagation();
//     if (!user) {
//       toast.info("Please login to add to wishlist");
//       navigate("/login");
//       return;
//     }
//     try {
//       await toggleWishlist(product._id);
//       setInWishlist((prev) => !prev);
//       toast.success(
//         !inWishlist
//           ? `${product.name} added to wishlist 💚`
//           : `${product.name} removed from wishlist`
//       );
//     } catch {
//       toast.error("Failed to update wishlist");
//     }
//   };

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();
//     if (!user) {
//       toast.info("Please login to add to cart");
//       navigate("/login");
//       return;
//     }
//     try {
//       await addToCart(product._id, 1);
//       toast.success(`${product.name} added to cart 🛒`);
//     } catch {
//       toast.error("Failed to add to cart");
//     }
//   };

//   const handleBuyNow = async (e) => {
//     e.stopPropagation();
//     if (product.stock === 0) return;
//     if (!user) {
//       toast.info("Please login to continue");
//       navigate("/login");
//       return;
//     }
//     await handleAddToCart(e);
//     setTimeout(() => navigate(`/checkout?productId=${product._id}`), 500);
//   };

//   const handleCardClick = () => {
//     navigate(`/products/${product._id}`);
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="relative rounded-lg shadow-md overflow-hidden transition cursor-pointer border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] hover:shadow-xl"
//     >
//       {/* Wishlist */}
//       <button
//         onClick={handleToggleWishlist}
//         className="absolute top-2 left-2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] shadow z-10 transition"
//       >
//         <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
//       </button>

//       {/* Image */}
//       {product.imagepath || product.filepath ? (
//         <img
//           src={
//             product.imagepath
//               ? `http://localhost:5050/uploads/${product.imagepath}`
//               : `http://localhost:5050/uploads/${product.filepath}`
//           }
//           alt={product.name}
//           className="w-full h-64 object-cover"
//         />
//       ) : (
//         <img src="/default.png" alt={product.name} className="w-full h-64 object-cover" />
//       )}

//       {/* Details */}
//       <div className="p-4">
//         <h3 className="font-bold text-lg text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
//           {product.name}
//         </h3>
//         {product.price && (
//           <p className="font-bold text-[var(--color-primary)] mt-1">Rs. {product.price}</p>
//         )}
//         {product.stock === 0 && (
//           <p className="text-red-500 text-sm mt-1">Out of Stock</p>
//         )}

//         {/* Buttons */}
//         <div className="flex gap-2 mt-3">
//           <button
//             onClick={handleAddToCart}
//             disabled={product.stock === 0}
//             className="flex-1 py-2 rounded-lg font-semibold transition border border-[var(--color-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-accent)] disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             🛒 Add to Cart
//           </button>
//           <button
//             onClick={handleBuyNow}
//             disabled={product.stock === 0}
//             className="flex-1 py-2 rounded-lg font-semibold transition border border-[var(--color-primary)] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-primary)] disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             💳 Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../auth/authProvider";
import { toast } from "react-toastify";
import { toggleWishlist, getWishlist } from "../../services/wishlistService";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);

  const fetchWishlist = async () => {
    if (!user) {
      setInWishlist(false);
      return;
    }
    try {
      const response = await getWishlist();
      const wishlistItems = response.data || response;
      setInWishlist(
        Array.isArray(wishlistItems) &&
          wishlistItems.some((item) => item._id === product._id)
      );
    } catch {
      setInWishlist(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [product, user]);

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    try {
      await toggleWishlist(product._id);
      setInWishlist((prev) => !prev);
      toast.success(
        !inWishlist
          ? `${product.name} added to wishlist`
          : `${product.name} removed from wishlist`
      );
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please login to add to cart");
      navigate("/login");
      return;
    }
    try {
      await addToCart(product._id, 1);
      toast.success(`${product.name} added to cart`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleBuyNow = async (e) => {
    e.stopPropagation();
    if (product.stock === 0) return;
    if (!user) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }
    await handleAddToCart(e);
    setTimeout(() => navigate(`/checkout?productId=${product._id}`), 500);
  };

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const imageUrl =
    product.imagepath || product.filepath
      ? `http://localhost:5050/uploads/${product.imagepath || product.filepath}`
      : "/default.png";

  return (
    <div
      onClick={handleCardClick}
      className="
        group relative overflow-hidden rounded-[2rem]
        bg-white border border-black/5
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl
        cursor-pointer
      "
    >
      {/* Wishlist */}
      <button
        onClick={handleToggleWishlist}
        className="
          absolute top-4 right-4 z-20
          w-11 h-11 rounded-full
          bg-white/90 backdrop-blur
          flex items-center justify-center
          shadow-md transition
          hover:scale-110
        "
      >
        <span className="text-xl">{inWishlist ? "❤️" : "🤍"}</span>
      </button>

      {/* Image */}
      <div className="relative h-[340px] overflow-hidden bg-[#f7f7f7]">
        <img
          src={imageUrl}
          alt={product.name}
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="px-6 py-2 rounded-full text-sm tracking-wide bg-black text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-7">
        <h3 className="font-serif text-xl font-semibold tracking-wide text-[var(--color-primary)]">
          {product.name}
        </h3>

        <p className="mt-2 text-lg font-bold text-black">Rs. {product.price}</p>

        {/* Action Bar */}
        <div
          className="
            mt-6 flex gap-3
            opacity-0 translate-y-4
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-500
          "
        >
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="
    flex-1 py-3 rounded-full text-sm font-semibold
    bg-[var(--color-primary)] text-white
    border border-[var(--color-primary)]
    transition 
    disabled:bg-gray-400 disabled:cursor-not-allowed
    hover:bg-[var(--color-primary-dark)] hover:text-black
  "
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="
              flex-1 py-3 rounded-full text-sm font-semibold
              border border-[var(--color-primary)]
              text-[var(--color-primary)]
              hover:bg-[var(--color-primary)] hover:text-white
              disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
              transition
            "
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
