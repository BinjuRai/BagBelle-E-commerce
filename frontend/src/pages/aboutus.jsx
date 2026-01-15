// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CategoryCard from "../components/card/CategoryCard";

// export default function AboutUs({ brands }) {
//   const navigate = useNavigate();
//   const [activeBrand, setActiveBrand] = useState("all");

//   if (!brands || brands.length === 0) return null;

//   const filteredBrands =
//     activeBrand === "all"
//       ? brands
//       : brands.filter((brand) => brand.name === activeBrand);

//   return (
//     <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
//       {/* Hero / Intro */}
//       <section className="max-w-7xl mx-auto px-6 py-16 text-center">
//         <h1 className="text-5xl font-bold text-primary mb-6">
//           About BagBelle
//         </h1>
//         <p className="text-xl text-muted-light dark:text-muted-dark max-w-3xl mx-auto">
//           BagBelle is your curated destination for luxury handbags. We feature
//           the finest designers from around the world, bringing you products that
//           combine craftsmanship, innovation, and sophistication.
//         </p>
//       </section>

//       {/* Featured Brands Section */}
//       <section className="py-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-4xl font-semibold text-primary mb-10 text-center">
//             Our Featured Brands
//           </h2>

//           {/* Horizontal Scroll Carousel */}
//           <div className="overflow-x-auto flex gap-6 py-8">
//             {filteredBrands.map((brand, index) => (
//               <div key={index} className="flex-shrink-0 w-72">
//                 <CategoryCard
//                   category={{
//                     name: brand.name,
//                     description: brand.description,
//                     emoji: brand.emoji,
//                   }}
//                   onClick={() => navigate(`/products?brand=${brand.name}`)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission / Story */}
//       <section className="max-w-7xl mx-auto px-6 py-16 bg-accent dark:bg-surface-dark rounded-xl">
//         <h2 className="text-4xl font-semibold text-primary mb-6 text-center">
//           Our Mission
//         </h2>
//         <p className="text-lg text-center max-w-3xl mx-auto text-text-light dark:text-text-dark">
//           At BagBelle, we believe every bag tells a story. Our mission is to
//           provide premium, handcrafted, and iconic handbags that elevate your
//           style and complement your lifestyle. From timeless classics to
//           contemporary must-haves, every piece is selected with care and
//           passion.
//         </p>
//       </section>
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-[var(--color-background-light)] text-[var(--color-text-light)] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-surface-light)] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            About Bagbelle
          </h1>
          <p className="mt-6 text-lg text-[var(--color-muted-light)] max-w-3xl mx-auto">
            Where elegance meets functionality. Bagbelle is a premium bag brand
            crafted for those who value timeless design, quality materials, and
            everyday luxury.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
              Our Story
            </h2>
            <p className="mt-4 text-[var(--color-text-light)] leading-relaxed">
              Bagbelle was born from a passion for beautifully designed bags
              that balance sophistication with practicality. We believe a bag is
              more than an accessory — it’s a statement of confidence, purpose,
              and personal style.
            </p>
            <p className="mt-4 text-[var(--color-muted-light)] leading-relaxed">
              Each Bagbelle piece is thoughtfully crafted using premium
              materials and refined details, ensuring durability without
              compromising on elegance.
            </p>
          </div>

          <div className="bg-[var(--color-surface-dark)] rounded-2xl p-10 text-[var(--color-text-dark)]">
            <h3 className="text-2xl font-semibold">What Sets Us Apart</h3>
            <ul className="mt-6 space-y-4">
              <li>• Premium craftsmanship and materials</li>
              <li>• Minimal yet elegant designs</li>
              <li>• Functional bags for modern lifestyles</li>
              <li>• Attention to detail in every stitch</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[var(--color-accent)] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
            Our Values
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-border-light)]">
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="mt-3 text-[var(--color-muted-light)]">
                We prioritize premium materials and expert craftsmanship in
                every product we create.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-border-light)]">
              <h3 className="text-xl font-semibold">Design</h3>
              <p className="mt-3 text-[var(--color-muted-light)]">
                Our designs are timeless, elegant, and made to complement your
                lifestyle.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm border border-[var(--color-border-light)]">
              <h3 className="text-xl font-semibold">Trust</h3>
              <p className="mt-3 text-[var(--color-muted-light)]">
                Bagbelle is committed to transparency, reliability, and customer
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[var(--color-primary)]">
          Designed for Every Journey
        </h2>
        <p className="mt-4 text-[var(--color-muted-light)] max-w-2xl mx-auto">
          Whether for work, travel, or everyday elegance — Bagbelle is designed
          to move with you.
        </p>
        <Link to="/products">
          <button className="mt-8 px-8 py-3 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition">
            Explore Our Collection
          </button>
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;
