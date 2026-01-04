// import { Link } from "react-router-dom";

// export default function HomePage() {
//   return (

//     <div className="bg-background-light min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-surface-light py-20">
//         <div className="max-w-7xl mx-auto text-center px-6">
//           <h1 className="text-4xl md:text-6xl font-bold text-text-light mb-4">
//             Luxury Bags for Every Occasion
//           </h1>
//           <p className="text-muted-light mb-8 text-lg">
//             Handcrafted with premium leather and timeless designs.
//           </p>
//           <Link to="/products" className="bg-primary text-surface-light px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition">
//             Shop Now
//           </Link>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold text-text-light mb-10">Featured Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {/* Example Product Card */}
//             {[1,2,3,4].map((i) => (
//               <div key={i} className="bg-surface-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
//                 <img src={`/src/assets/images/product${i}.jpg`} alt={`Product ${i}`} className="w-full h-64 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-text-light">Leather Bag {i}</h3>
//                   <p className="text-accent font-bold mt-2">$249</p>
//                   <Link to="/products" className="mt-4 inline-block bg-primary text-surface-light px-4 py-2 rounded-lg font-medium hover:bg-primary-hover transition">
//                     View
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>

//   );
// }import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

// Services (replace with actual APIs)
// import { getAllBagsApi } from "../services/bagService";
import { getAllCategoriesApi } from "../services/categoryService";

// Components
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
// import BagSection from "../components/home/BagSection";
// import WhyChoose from "../components/home/WhyChoose";
import CTASection from "../components/home/CTAsection";
// import FavouriteProducts from "../components/home/FavouriteProducts";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

const Homepage = () => {
  // Fetch bags
  // const { data: bags, isLoading: bagsLoading, error: bagsError, refetch: refetchBags } = useQuery({
  //   queryKey: ["bags"],
  //   queryFn: getAllBagsApi,
  // });

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesApi,
  });

  // Add to cart handler
  const handleAddToCart = (bag) => {
    toast.success(`${bag.name} added to your bag! 👜`);
    // TODO: integrate cart functionality
  };

  // Loading state
  // if (bagsLoading || categoriesLoading) return <Loading message="Loading BagBelle collections..." />;

  // Error states
  // if (bagsError) {
  //   return (
  //     <ErrorMessage
  //       title="Failed to load bags"
  //       message={bagsError.response?.data?.message || bagsError.message}
  //       onRetry={refetchBags}
  //     />
  //   );
  // }

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

      {/* Featured Bags Section */}
      {/* {bags && bags.length > 0 && (
        <BagSection bags={bags.slice(0, 8)} onAddToCart={handleAddToCart} />
      )} */}

      {/* Why Choose BagBelle */}
      {/* <WhyChoose
        title="Why Choose BagBelle?"
        features={[
          { icon: "👜", title: "Premium Quality", description: "Handcrafted with the finest materials." },
          { icon: "✨", title: "Timeless Designs", description: "Elegant and modern for every occasion." },
          { icon: "🌿", title: "Sustainable", description: "Eco-conscious materials and practices." },
          { icon: "🚚", title: "Fast Shipping", description: "Delivered securely and quickly to your doorstep." },
        ]}
      /> */}

      {/* Favourite Products Section */}
      {/* <FavouriteProducts bags={bags?.slice(0, 6) || []} onAddToCart={handleAddToCart} /> */}

      {/* CTA Section */}
      <CTASection
        title="Start Your Luxury Bag Journey Today"
        subtitle="Explore our exclusive collection of handcrafted bags for every occasion."
        buttonText="Shop the Collection"
        buttonLink="/products"
        backgroundImage="/src/assets/images/cta-bags.jpg"
      />
    </div>
  );
};

export default Homepage;
