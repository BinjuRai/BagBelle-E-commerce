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
    "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";

  const variants = {
    primary: `
      bg-gradient-to-tr from-[#274E36] to-[#3E7C50] text-white
      shadow-md hover:shadow-xl hover:-translate-y-1
      active:translate-y-0 active:shadow-md
      focus:ring-[#274E36]/50
    `,
    secondary: `
      bg-white text-[#274E36] border border-[#274E36] 
      hover:bg-[#274E36]/10 hover:text-[#274E36]
      focus:ring-[#274E36]/30
    `,
    danger: `
      bg-red-600 text-white shadow hover:bg-red-700 hover:shadow-lg
      focus:ring-red-500/50
    `,
    outline: `
      border border-gray-300 text-gray-800 bg-white
      hover:bg-gray-100 hover:shadow-sm focus:ring-gray-400
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = disabled || loading
    ? "opacity-60 cursor-not-allowed pointer-events-none shadow-none"

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
