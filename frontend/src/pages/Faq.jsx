import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes Bagbelle bags premium?",
    answer:
      "Bagbelle bags are crafted using high-quality materials, refined finishes, and thoughtful designs. Every piece is made to balance elegance, durability, and everyday functionality.",
  },
  {
    question: "Are Bagbelle bags suitable for daily use?",
    answer:
      "Absolutely. Our bags are designed for modern lifestyles—perfect for work, travel, and everyday wear while maintaining a luxurious look.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, Bagbelle offers international shipping to selected countries. Shipping options and delivery timelines are displayed during checkout.",
  },
  {
    question: "How do I care for my Bagbelle bag?",
    answer:
      "To maintain your bag’s quality, store it in a dust bag, avoid prolonged exposure to moisture and direct sunlight, and clean gently with a soft cloth.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a hassle-free return policy. Products must be unused, in original condition, and returned within the specified return period mentioned in our policy.",
  },
  {
    question: "How can I contact Bagbelle support?",
    answer:
      "You can reach our customer support team through the Contact Us page or email us directly. We’re always happy to help.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-[var(--color-background-light)]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[var(--color-primary)]">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-center text-[var(--color-muted-light)]">
          Everything you need to know about Bagbelle
        </p>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--color-surface-light)] border border-[var(--color-border-light)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-[var(--color-text-light)] hover:bg-[var(--color-accent-hover)] transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 text-[var(--color-muted-light)] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
