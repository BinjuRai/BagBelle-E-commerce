import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-32 bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url(src/assets/images/cta-bag-bg.jpg)" }}
    >
      {/* Dark overlay for luxury feel */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-3xl mx-auto px-6 z-10 text-center"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Elevate Your Style with BagBelle
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-8">
            Discover our exclusive collection of designer bags crafted for elegance and sophistication.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-4 bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-100 shadow-lg transition-all transform hover:scale-105"
          >
            Explore Collection
            <span className="bg-black text-white rounded-full px-3 py-1.5 flex items-center justify-center">
              ➜
            </span>
          </button>
        </div>
      </motion.div>

      {/* Optional subtle decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
}
