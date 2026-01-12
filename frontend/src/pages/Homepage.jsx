import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

// Services
import { getAllCategoriesApi } from "../services/categoryService";
import { getAllProductApi } from "../services/productService"; 

// Components
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ProductSection from "../components/home/ProductSection"; 
import CTASection from "../components/home/CTAsection";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

const Homepage = () => {
  // Fetch products
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductApi,
  });

  // Fetch categories
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  // Add to cart handler
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to your bag! 👜`);
    // TODO: integrate cart functionality
  };

  // Loading state
  if (productsLoading || categoriesLoading)
    return <Loading message="Loading BagBelle collections..." />;

  // Error states
  if (productsError) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message={productsError.response?.data?.message || productsError.message}
        onRetry={refetchProducts}
      />
    );
  }

  if (categoriesError) {
    console.error("Categories error:", categoriesError);
    // Optional: still show page without categories
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      {/* Featured Products Section */}
      {products && products.length > 0 && (
        <ProductSection
          products={products.slice(0, 8)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* CTA Section */}
      <CTASection
        title="Start Your Luxury Bag Journey Today"
        subtitle="Explore our exclusive collection of handcrafted bags for every occasion."
        buttonText="Shop the Collection"
        buttonLink="/products"
        backgroundImage="/src/assets/images/luxury-bag-hero.jpg"
      />
    </div>
  );
};

export default Homepage;
