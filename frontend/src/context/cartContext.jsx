import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/authProvider";
import { getCart, addToCart as addToCartAPI, updateCartQuantity, removeFromCart as removeFromCartAPI } from "../services/cartService";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
      setCartCount(0);
    }
  }, [user]);

  // Update cart count when cart changes
  useEffect(() => {
    if (cart?.items) {
      const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data.cart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      const data = await addToCartAPI(productId, quantity);
      setCart(data.cart);
      toast.success("Added to cart!");
      return data;
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.response?.data?.message || "Failed to add to cart");
      throw err;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await updateCartQuantity(productId, quantity);
      setCart(data.cart);
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Failed to update quantity");
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await removeFromCartAPI(productId);
      setCart(data.cart);
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Remove from cart error:", err);
      toast.error("Failed to remove item");
      throw err;
    }
  };

  const getCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  };
  const loadCart = async () => {
  try {
    const data = await fetchCart();
    setCart(data);
  } catch (err) {
    console.error("Failed to fetch cart:", err);
  }
};

  const value = {
    cart,
    cartCount,
    loading,
    loadCart,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

