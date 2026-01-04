import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategorySection = ({ categories }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  if (!categories || categories.length === 0) return null;

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter(cat => cat._id === activeCategory);

  return (
    <section className="py-20 px-6 bg-white dark:bg-black/90">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black dark:text-white">
            Explore Our Collections
          </h2>

          {categories.length > 4 && (
            <button
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-lg"
            >
              View All
              <span className="bg-gold text-black rounded-full px-2 py-1 font-semibold">
                ➜
              </span>
            </button>
          )}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category._id}
              category={category}
              onClick={() => navigate(`/shop?category=${category._id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
