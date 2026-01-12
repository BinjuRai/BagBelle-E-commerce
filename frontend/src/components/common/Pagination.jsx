export default function Pagination({ current, total, onChange }) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = current === i + 1;
        return (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full font-semibold
              transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg"
                  : "bg-white border border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary-dark)]"
              }
            `}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

