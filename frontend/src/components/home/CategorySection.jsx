import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../card/CategoryCard";



const CategorySection = ({ categories }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  if (!categories || categories.length === 0) return null;

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((cat) => cat._id === activeCategory);

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
              onClick={() => navigate("/products")}
            className="inline-flex items-center gap-4 bg-background-light text-black font-semibold px-8 py-3 rounded-full  hover:bg-accent-hover transition shadow-lg"
            >
              View All
              <span className="bg-black text-white rounded-full px-2 py-1 font-semibold">
                ➜
              </span>
            </button>
          )}
        </div>

      
         <div className="overflow-x-auto flex gap-6 py-8">
          {filteredCategories.map((category) => (
            <div key={category._id} className="flex-shrink-0 w-72">
              <CategoryCard
                category={category}
                onClick={() => navigate(`/products?category=${category._id}`)}
              />
            </div>
          ))}
        </div>
     
      </div>
    </section>
  );
};

export default CategorySection;
