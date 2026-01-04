export default function Pagination({ current, total, onChange }) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-9 h-9 rounded-full font-semibold
            ${
              current === i + 1
                ? "bg-[#274E36] text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
