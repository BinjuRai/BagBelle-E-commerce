export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-[var(--color-background-light)] dark:bg-[var(--color-background-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">

      <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">

        {/* CONTACT INFO */}
        <div className="space-y-6 text-lg">
          <p>
            📞 <a href="tel:+9779800000000" className="text-[var(--color-primary)] underline">
              9800000000
            </a>
          </p>
          <p>
            ✉️ <a href="mailto:bagbelle@gmail.com" className="text-[var(--color-primary)] underline">
              bagbelle@gmail.com
            </a>
          </p>
          <p>📍 Godawari, Lalitpur, Nepal</p>

          {/* MAP */}
          <iframe
            title="BagBelle Location"
            className="w-full h-64 rounded-xl border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]"
            src="https://www.google.com/maps?q=Godawari,Lalitpur,Nepal&output=embed"
            loading="lazy"
          />
        </div>

        {/* CONTACT FORM */}
        <form className="space-y-5 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
            Send us a Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] h-32 bg-[var(--color-accent)] dark:bg-[var(--color-surface-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            required
          />

          <button className="bg-[var(--color-primary)] text-[var(--color-accent)] px-6 py-3 rounded hover:bg-[var(--color-primary-hover)] transition font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
