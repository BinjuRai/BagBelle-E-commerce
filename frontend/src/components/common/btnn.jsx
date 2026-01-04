export default function Btnn({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
    "bg-[#274E36] text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-[#274E36]/50",
    //   "bg-[#274E36] text-white hover:bg-[#] focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled || loading
    ? "opacity-60 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledStyles}`}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {children}
    </button>
  );
}
