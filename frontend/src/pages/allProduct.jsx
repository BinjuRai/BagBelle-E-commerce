// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { getAllProductApi } from "../services/productService";
// import { getAllCategoriesApi } from "../services/categoryService";
// import PlantCard from "../components/card/ProductCard";
// import CategoryTabs from "../components/common/CategoryTabs";
// import { toast } from "react-toastify";

// const AllProductsPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedCategory, setSelectedCategory] = useState(
//     searchParams.get("category") || "all"
//   );
//   const [selectedPlantType, setSelectedPlantType] = useState(
//     searchParams.get("type") || "all"
//   );
//   const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
//   const [searchQuery, setSearchQuery] = useState(
//     searchParams.get("search") || ""
//   );
//   const [priceRange, setPriceRange] = useState({
//     min: searchParams.get("minPrice") || "",
//     max: searchParams.get("maxPrice") || "",
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const params = {};
//     if (selectedCategory !== "all") params.category = selectedCategory;
//     if (selectedPlantType !== "all") params.type = selectedPlantType;
//     if (sortBy !== "newest") params.sort = sortBy;
//     if (searchQuery) params.search = searchQuery;
//     if (priceRange.min) params.minPrice = priceRange.min;
//     if (priceRange.max) params.maxPrice = priceRange.max;
//     setSearchParams(params);
//   }, [selectedCategory, sortBy,selectedPlantType, searchQuery, priceRange, setSearchParams]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const [productsData, categoriesData] = await Promise.all([
//         getAllProductApi(),
//         getAllCategoriesApi(),
//       ]);
//       setProducts(productsData);
//       setCategories(categoriesData);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredProducts = products
//     .filter((product) => {
//       if (selectedCategory !== "all" && product.categoryId?._id !== selectedCategory)
//         return false;
//       if (selectedPlantType !== "all" && product.plantType !== selectedPlantType)
//         return false;
//       if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()))
//         return false;
//       if (priceRange.min && product.price < Number(priceRange.min)) return false;
//       if (priceRange.max && product.price > Number(priceRange.max)) return false;
//       return true;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "price-low":
//           return a.price - b.price;
//         case "price-high":
//           return b.price - a.price;
//         case "name-asc":
//           return a.name.localeCompare(b.name);
//         case "name-desc":
//           return b.name.localeCompare(a.name);
//         default:
//           return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//     });

//   const clearFilters = () => {
//     setSelectedCategory("all");
//     setSelectedPlantType("all");
//     setSortBy("newest");
//     setSearchQuery("");
//     setPriceRange({ min: "", max: "" });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="h-14 w-14 rounded-full border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-[var(--color-background-dark)]">
//       {/* HERO */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
//         <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
//           <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-wide">
//             Our Collections
//           </h1>
//           <p className="text-xl text-white max-w-2xl mx-auto">
//             Thoughtfully curated luxury plants for calm, elevated living spaces
//           </p>
//         </div>
//       </div>

//       {/* CATEGORY TABS */}
//       <div className="bg-[var(--color-background-light)] border-b border-[var(--color-primary)]/20">
//         <CategoryTabs
//           categories={categories}
//           active={selectedCategory}
//           onChange={(id) => setSelectedCategory(id)}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* FILTERS */}
//           <aside className="lg:w-72">
//             <div className="bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] rounded-3xl shadow-xl p-6 sticky top-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-serif font-semibold tracking-wide text-[var(--color-primary)]">
//                   Filters
//                 </h2>
//                 <button onClick={clearFilters} className="text-sm text-[var(--color-primary)] hover:underline">
//                   Clear
//                 </button>
//               </div>

//               {/* SEARCH */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Search</label>
//                 <input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search plants..."
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70 focus:ring-2 focus:ring-[var(--color-primary)]/30"
//                 />
//               </div>

//               {/* CATEGORY */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Category</label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* PLANT TYPE */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Plant Type</label>
//                 <select
//                   value={selectedPlantType}
//                   onChange={(e) => setSelectedPlantType(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="all">All Types</option>
//                   <option value="indoor">Indoor</option>
//                   <option value="outdoor">Outdoor</option>
//                   <option value="hanging">Hanging</option>
//                   <option value="succulent">Succulent</option>
//                   <option value="flowering">Flowering</option>
//                 </select>
//               </div>

//               {/* PRICE */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Price Range</label>
//                 <div className="flex gap-3 mt-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={priceRange.min}
//                     onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
//                     className="w-1/2 px-3 py-2 rounded-2xl border border-[var(--color-primary)]/30"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={priceRange.max}
//                     onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
//                     className="w-1/2 px-3 py-2 rounded-2xl border border-[var(--color-primary)]/30"
//                   />
//                 </div>
//               </div>

//               {/* SORT */}
//               <div>
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="name-asc">Name A–Z</option>
//                   <option value="name-desc">Name Z–A</option>
//                 </select>
//               </div>
//             </div>
//           </aside>

//           {/* PRODUCTS */}
//           <main className="flex-1 fade-in">
//             <div className="flex justify-between items-center mb-8">
//               <p className="text-sm tracking-wide text-[var(--color-muted-light)]">
//                 Showing <span className="font-semibold text-[var(--color-primary)]">{filteredProducts.length}</span> plants
//               </p>
//             </div>

//             {filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//                 {filteredProducts.map((plant) => (
//                   <PlantCard key={plant._id} plant={plant} />
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] rounded-3xl shadow-xl p-16 text-center">
//                 <div className="text-5xl mb-6"> 👜 </div>
//                 <h3 className="text-2xl font-serif font-semibold mb-2 text-[var(--color-primary)]">
//                   No Bags found
//                 </h3>
//                 <p className="text-[var(--color-muted-light)] mb-8">
//                   Try adjusting your filters or explore another category
//                 </p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-accent)] hover:bg-[var(--color-primary-dark)] transition"
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProductsPage;

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProductApi } from "../services/productService";
import { getAllCategoriesApi } from "../services/categoryService";
import ProductCard from "../components/card/ProductCard";

import CategoryTabs from "../components/common/CategoryTabs";
import { toast } from "react-toastify";

const AllProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedBagType, setSelectedBagType] = useState(
    searchParams.get("type") || "all"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const params = {};
    if (selectedCategory !== "all") params.category = selectedCategory;
    if (selectedBagType !== "all") params.type = selectedBagType;
    if (sortBy !== "newest") params.sort = sortBy;
    if (searchQuery) params.search = searchQuery;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    setSearchParams(params);
  }, [selectedCategory, sortBy, selectedBagType, searchQuery, priceRange, setSearchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getAllProductApi(),
        getAllCategoriesApi(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory !== "all" && product.categoryId?._id !== selectedCategory)
        return false;
      if (selectedBagType !== "all" && product.bagType !== selectedBagType)
        return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;
      if (priceRange.min && product.price < Number(priceRange.min)) return false;
      if (priceRange.max && product.price > Number(priceRange.max)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBagType("all");
    setSortBy("newest");
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-14 w-14 rounded-full border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] animate-spin" />
      </div>
    );
  }

//   return (
//     <div className="min-h-screen bg-white dark:bg-[var(--color-background-dark)]">
//       {/* HERO */}
//       <div className="relative overflow-hidden bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
//         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_white,_transparent_60%)]" />
//         <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">
//           <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-wide">
//             Our Collections
//           </h1>
//           <p className="text-xl text-white max-w-2xl mx-auto">
//             Thoughtfully curated luxury bags for style and everyday elegance
//           </p>
//         </div>
//       </div>

//       {/* CATEGORY TABS */}
//       <div className="bg-[var(--color-background-light)] border-b border-[var(--color-primary)]/20">
//         <CategoryTabs
//           categories={categories}
//           active={selectedCategory}
//           onChange={(id) => setSelectedCategory(id)}
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex flex-col lg:flex-row gap-12">
//           {/* FILTERS */}
//           <aside className="lg:w-72">
//             <div className="bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] rounded-3xl shadow-xl p-6 sticky top-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-lg font-serif font-semibold tracking-wide text-[var(--color-primary)]">
//                   Filters
//                 </h2>
//                 <button onClick={clearFilters} className="text-sm text-[var(--color-primary)] hover:underline">
//                   Clear
//                 </button>
//               </div>

//               {/* SEARCH */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Search</label>
//                 <input
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search bags..."
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70 focus:ring-2 focus:ring-[var(--color-primary)]/30"
//                 />
//               </div>

//               {/* CATEGORY */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Category</label>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="all">All Categories</option>
//                   {categories.map((cat) => (
//                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* BAG TYPE */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Bag Type</label>
//                 <select
//                   value={selectedBagType}
//                   onChange={(e) => setSelectedBagType(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="all">All Types</option>
//                   <option value="tote">Tote Bag</option>
//                   <option value="leather">Leather Bag</option>
//                   <option value="crossbody">Crossbody</option>
//                   <option value="backpack">Backpack</option>
//                   <option value="clutch">Clutch</option>
//                   <option value="shoulder">Shoulder Bag</option>
//                   <option value="messenger">Messenger Bag</option>
//                 </select>
//               </div>

//               {/* PRICE */}
//               <div className="mb-6">
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Price Range</label>
//                 <div className="flex gap-3 mt-2">
//                   <input
//                     type="number"
//                     placeholder="Min"
//                     value={priceRange.min}
//                     onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
//                     className="w-1/2 px-3 py-2 rounded-2xl border border-[var(--color-primary)]/30"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Max"
//                     value={priceRange.max}
//                     onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
//                     className="w-1/2 px-3 py-2 rounded-2xl border border-[var(--color-primary)]/30"
//                   />
//                 </div>
//               </div>

//               {/* SORT */}
//               <div>
//                 <label className="text-sm font-medium text-[var(--color-muted-light)]">Sort By</label>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="mt-2 w-full px-4 py-2.5 rounded-2xl border border-[var(--color-primary)]/30 bg-white/70"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                   <option value="name-asc">Name A–Z</option>
//                   <option value="name-desc">Name Z–A</option>
//                 </select>
//               </div>
//             </div>
//           </aside>

//           {/* PRODUCTS */}
//           <main className="flex-1 fade-in">
//             <div className="flex justify-between items-center mb-8">
//               <p className="text-sm tracking-wide text-[var(--color-muted-light)]">
//                 Showing <span className="font-semibold text-[var(--color-primary)]">{filteredProducts.length}</span> bags
//               </p>
//             </div>

//             {filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
//                 {filteredProducts.map((bag) => (
               
//                   <ProductCard key={bag._id} product={bag} />

//                 ))}
//               </div>
//             ) : (
//               <div className="bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] rounded-3xl shadow-xl p-16 text-center">
//                 <div className="text-5xl mb-6">👜</div>
//                 <h3 className="text-2xl font-serif font-semibold mb-2 text-[var(--color-primary)]">
//                   No Bags Found
//                 </h3>
//                 <p className="text-[var(--color-muted-light)] mb-8">
//                   Try adjusting your filters or explore another category
//                 </p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-accent)] hover:bg-[var(--color-primary-dark)] transition"
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );

// return (
//   <div className="min-h-screen bg-[var(--color-background-light)]">

//     {/* HERO */}
//     <section className="bg-[var(--color-primary)] text-white">
//       <div className="max-w-7xl mx-auto px-6 py-24">
//         <h1 className="text-5xl md:text-6xl font-serif font-semibold tracking-wide">
//           BagBelle
//         </h1>
//         <p className="mt-4 text-lg text-white/90 max-w-lg">
//           Curated luxury handbags designed for timeless elegance
//         </p>
//       </div>
//     </section>

//     {/* MAIN LAYOUT */}
//       <section className="max-w-[1400px] mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-20">

//         {/* CATEGORY SIDEBAR */}
//         <aside className="hidden lg:block">
//           <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col">

//             <div className="mb-10">
//               <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted-light)] mb-4">
//                 Categories
//               </h3>
//               <div className="h-px w-24 bg-[var(--color-primary)]/25" />
//             </div>

//             <div className="flex-1 overflow-visible">
//               <CategoryTabs
//                 categories={categories}
//                 active={selectedCategory}
//                 onChange={(id) => setSelectedCategory(id)}
//               />
//             </div>

//             <div className="mt-14 pt-8 border-t border-[var(--color-primary)]/15">
//               <p className="text-[11px] tracking-widest text-[var(--color-muted-light)]">
//                 CURATED COLLECTIONS
//               </p>
//             </div>

//           </div>
//         </aside>

//         {/* CONTENT */}
//         <main>

//           {/* FILTER BAR */}
//           <div className="bg-white/80 backdrop-blur rounded-3xl border border-black/5 px-10 py-8 mb-20">
//             <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">

//               <input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search luxury handbags"
//                 className="md:col-span-2 px-5 py-3 rounded-full border border-black/10 focus:ring-2 focus:ring-[var(--color-primary)]/30"
//               />

//               <select
//                 value={selectedBagType}
//                 onChange={(e) => setSelectedBagType(e.target.value)}
//                 className="px-4 py-3 rounded-full border border-black/10"
//               >
//                 <option value="all">All Types</option>
//                 <option value="tote">Tote</option>
//                 <option value="leather">Leather</option>
//                 <option value="crossbody">Crossbody</option>
//                 <option value="backpack">Backpack</option>
//                 <option value="clutch">Clutch</option>
//               </select>

//               <div className="flex gap-3">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   value={priceRange.min}
//                   onChange={(e) =>
//                     setPriceRange({ ...priceRange, min: e.target.value })
//                   }
//                   className="w-1/2 px-4 py-3 rounded-full border border-black/10"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   value={priceRange.max}
//                   onChange={(e) =>
//                     setPriceRange({ ...priceRange, max: e.target.value })
//                   }
//                   className="w-1/2 px-4 py-3 rounded-full border border-black/10"
//                 />
//               </div>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-3 rounded-full border border-black/10"
//               >
//                 <option value="newest">Newest</option>
//                 <option value="price-low">Price ↑</option>
//                 <option value="price-high">Price ↓</option>
//                 <option value="name-asc">A–Z</option>
//                 <option value="name-desc">Z–A</option>
//               </select>
//             </div>

//             <div className="flex justify-between items-center mt-8 text-sm">
//               <p className="text-[var(--color-muted-light)]">
//                 Showing{" "}
//                 <span className="font-semibold text-[var(--color-primary)]">
//                   {filteredProducts.length}
//                 </span>{" "}
//                 bags
//               </p>

//               <button
//                 onClick={clearFilters}
//                 className="tracking-wide text-[var(--color-primary)] hover:underline"
//               >
//                 Clear filters
//               </button>
//             </div>
//           </div>

//           {/* PRODUCTS GRID */}
//           {filteredProducts.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-24">
//               {filteredProducts.map((bag) => (
//                 <ProductCard key={bag._id} product={bag} />
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-[3rem] border border-black/5 px-24 py-28 text-center">
//               <div className="text-6xl mb-8">👜</div>
//               <h3 className="text-3xl font-serif font-semibold text-[var(--color-primary)]">
//                 No Bags Found
//               </h3>
//               <p className="text-[var(--color-muted-light)] mt-3 mb-10">
//                 Try adjusting your filters
//               </p>
//               <button
//                 onClick={clearFilters}
//                 className="px-12 py-4 rounded-full bg-[var(--color-primary)] text-white tracking-wide"
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </main>
//       </section>
//     </div>
//   );




return (
  <div className="min-h-screen bg-[var(--color-background-light)]">

    {/* HERO */}
    <section className="relative bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-primary)] to-[var(--color-primary-dark)] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_white_10%,transparent_80%)] opacity-10" />
      <div className="max-w-7xl mx-auto px-6 py-32 text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-serif font-extrabold tracking-tight drop-shadow-lg">
          BagBelle
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto text-white/90">
          Curated luxury handbags designed for timeless elegance
        </p>
      </div>
    </section>

    {/* MAIN LAYOUT */}
    <section className="max-w-[1500px] mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-24">

      {/* CATEGORY SIDEBAR */}
      {/* <aside className="hidden lg:flex">
        <div className="sticky top-16 flex flex-col h-[calc(100vh-4rem)]">

          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted-light)] mb-4">
              Categories
            </h3>
            <div className="h-px w-24 bg-[var(--color-primary)]/25" />
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[var(--color-primary)]/30 scrollbar-track-transparent">
            <CategoryTabs
              categories={categories}
              active={selectedCategory}
              onChange={(id) => setSelectedCategory(id)}
            />
          </div>

          <div className="mt-14 pt-8 border-t border-[var(--color-primary)]/15 text-center">
            <p className="text-[11px] tracking-widest text-[var(--color-muted-light)]">
              CURATED COLLECTIONS
            </p>
          </div>
        </div>
      </aside> */}

<aside className="hidden lg:flex">
  <div className="sticky top-16 flex flex-col h-[calc(100vh-4rem)] w-64 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 overflow-hidden">

    {/* Header */}
    <div className="mb-8">
      <h3 className="text-xs uppercase tracking-[0.35em] text-[var(--color-muted-light)] mb-3">
        Categories
      </h3>
      <div className="h-px w-20 bg-[var(--color-primary)]/30 rounded-full" />
    </div>

    {/* Vertical Category Tabs */}
    <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[var(--color-primary)]/40 scrollbar-track-transparent pr-2">
      <CategoryTabs
        categories={categories}
        active={selectedCategory}
        onChange={(id) => setSelectedCategory(id)}
        vertical={true} // pass vertical prop if you handle orientation in CategoryTabs
      />
    </div>

    {/* Curated Collections Footer */}
    <div className="mt-10 pt-6 border-t border-[var(--color-primary)]/20 text-center">
      <p className="text-[11px] tracking-widest text-[var(--color-muted-light)]">
        CURATED COLLECTIONS
      </p>
    </div>
  </div>
</aside>

      {/* CONTENT */}
      <main className="flex flex-col">

        {/* FILTER BAR */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-black/10 px-10 py-8 mb-20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">

            {/* SEARCH */}
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search luxury handbags"
              className="md:col-span-2 px-5 py-3 rounded-full border border-black/10 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]/30 transition"
            />

            {/* BAG TYPE */}
            <select
              value={selectedBagType}
              onChange={(e) => setSelectedBagType(e.target.value)}
              className="px-4 py-3 rounded-full border border-black/10 shadow-sm hover:shadow-md transition"
            >
              <option value="all">All Types</option>
              <option value="tote">Tote</option>
              <option value="leather">Leather</option>
              <option value="crossbody">Crossbody</option>
              <option value="backpack">Backpack</option>
              <option value="clutch">Clutch</option>
            </select>

            {/* PRICE */}
            {/* <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-1/2 px-4 py-3 rounded-full border border-black/10 shadow-sm focus:ring-1 focus:ring-[var(--color-primary)]/20 transition"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-1/2 px-4 py-3 rounded-full border border-black/10 shadow-sm focus:ring-1 focus:ring-[var(--color-primary)]/20 transition"
              />
            </div> */}

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-full border border-black/10 shadow-sm hover:shadow-md transition"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price ↑</option>
              <option value="price-high">Price ↓</option>
              <option value="name-asc">A–Z</option>
              <option value="name-desc">Z–A</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-8 text-sm">
            <p className="text-[var(--color-muted-light)]">
              Showing{" "}
              <span className="font-semibold text-[var(--color-primary)]">
                {filteredProducts.length}
              </span>{" "}
              bags
            </p>

            <button
              onClick={clearFilters}
              className="tracking-wide text-[var(--color-primary)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-24">
            {filteredProducts.map((bag) => (
              <ProductCard key={bag._id} product={bag} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-black/10 px-24 py-28 text-center shadow-lg">
            <div className="text-7xl mb-8 animate-pulse">👜</div>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary)]">
              No Bags Found
            </h3>
            <p className="text-[var(--color-muted-light)] mt-3 mb-10">
              Try adjusting your filters
            </p>
            <button
              onClick={clearFilters}
              className="px-12 py-4 rounded-full bg-[var(--color-primary)] text-white tracking-wide hover:scale-105 transition transform shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </section>
  </div>
);


};

export default AllProductsPage;