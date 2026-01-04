import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "/src/assets/images/luxury-bag-hero.jpg"; // Replace with your hero image

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] bg-black/50 flex items-center justify-center">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl text-center px-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
          Elevate Your Style <br /> With BagBelle
        </h1>
        <p className="text-white/80 text-lg sm:text-xl mb-8">
          Discover handcrafted luxury bags, designed for the modern fashion connoisseur.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-3 bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition shadow-lg"
        >
          Shop the Collection
          <span className="bg-black text-gold rounded-full px-2 py-1 flex items-center justify-center">
            ➜
          </span>
        </Link>
      </motion.div>

      {/* Optional Decorative Elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-gold/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 left-10 w-16 h-16 bg-gold/20 rounded-full blur-2xl animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;
