import { useNavigate } from "react-router-dom";
import ProductCard from "../card/productCard";

const ProductSection = ({ products }) => {
  const navigate = useNavigate();

  // Limit to 4 products for homepage
  const displayProducts = products?.slice(0, 4) || [];

  return (
    <section className="py-12 px-4 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif font-semibold text-[var(--color-primary)] dark:text-[var(--color-accent)]">
            Our Latest Products
          </h2>

          <button
            onClick={() => navigate("/products")}
            className="inline-flex shadow-lg items-center gap-3 px-5 py-2 rounded-full transition bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-accent)]"
          >
            View More
            <span className="bg-[var(--color-accent)] text-[var(--color-primary)] secondary-font font-light rounded-full px-2 py-1 flex items-center justify-center">
              ➜
            </span>
          </button>
        </div>

        <div className="rounded-3xl p-6 bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)]">
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-xl text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">
                No products available yet
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
