import { Heart } from "lucide-react";

export const WishlistButton = ({ active, onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
  >
    <Heart
      size={18}
      className={`${active ? "fill-red-500 text-red-500" : "text-gray-700"}`}
    />
  </button>
);
