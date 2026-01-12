// // import { useEffect, useState } from "react";
// // import { getAllCategoriesApi } from "../../services/categoryService";

// // export default function CategoryTabs({ categories, active, onChange }) {
// //   return (
// //     <div className="flex gap-6 justify-center bg-white py-4 shadow-sm overflow-x-auto">
// //       {/* All */}
// //       <button
// //         onClick={() => onChange("all")}
// //         className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
// //           ${
// //             active === "all"
// //               ? "bg-[#274E36] text-white"
// //               : "text-[#274E36] hover:bg-[#274E36]/10"
// //           }`}
// //       >
// //         All
// //       </button>

// //       {categories.map((cat) => (
// //         <button
// //           key={cat._id}
// //           onClick={() => onChange(cat._id)}
// //           className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
// //             ${
// //               active === cat._id
// //                 ? "bg-[#274E36] text-white"
// //                 : "text-[#274E36] hover:bg-[#274E36]/10"
// //             }`}
// //         >
// //           {cat.name}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // export default function CategoryTabs({ categories, active, onChange }) {
// //   return (
// //     <div className="flex gap-6 justify-center bg-white py-6 shadow-sm overflow-x-auto">
// //       {/* All Tab */}
// //       <button
// //         onClick={() => onChange("all")}
// //         className={`flex flex-col items-center min-w-[90px] transition
// //           ${active === "all" ? "scale-105" : "opacity-70 hover:opacity-100"}`}
// //       >
// //         <div className={`w-16 h-16 rounded-full flex items-center justify-center
// //           ${active === "all" ? "bg-[#274E36] text-white" : "bg-[#274E36]/10 text-[#274E36]"}`}>
// //           🌿
// //         </div>
// //         <span className="mt-2 text-sm font-semibold text-[#274E36]">
// //           All
// //         </span>
// //       </button>

// //       {categories.map((cat) => {
// //         const imageUrl = cat.imagepath
// //           ? `http://localhost:5050/uploads/${cat.imagepath}`
// //           : null;

// //         return (
// //           <button
// //             key={cat._id}
// //             onClick={() => onChange(cat._id)}
// //             className={`flex flex-col items-center min-w-[90px] transition
// //               ${active === cat._id ? "scale-105" : "opacity-70 hover:opacity-100"}`}
// //           >
// //             <div
// //               className={`w-16 h-16 rounded-full overflow-hidden border-2
// //                 ${active === cat._id ? "border-[#274E36]" : "border-transparent"}`}
// //             >
// //               {imageUrl ? (
// //                 <img
// //                   src={imageUrl}
// //                   alt={cat.name}
// //                   className="w-full h-full object-cover"
// //                 />
// //               ) : (
// //                 <div className="w-full h-full flex items-center justify-center text-2xl bg-[#274E36]/10">
// //                   🌿
// //                 </div>
// //               )}
// //             </div>

// //             <span className="mt-2 text-sm font-semibold text-[#274E36] text-center">
// //               {cat.name}
// //             </span>
// //           </button>
// //         );
// //       })}
// //     </div>
// //   );
// // }
// const shapeStyles = [
//   "rounded-[60%_40%_60%_40%]", // leaf -> bag
//   "rounded-[50%_60%_40%_50%]", // water
//   "rounded-[40%_60%_50%_50%]", // sun
//   "rounded-2xl"                // soil
// ];

// export default function CategoryTabs({ categories, active, onChange }) {
//   return (
//     <div className="flex gap-8 justify-center py-6 px-4 overflow-x-auto bg-[var(--color-background-light)] shadow-sm">
      
//       {/* ALL */}
//       <button
//         onClick={() => onChange("all")}
//         className="group flex flex-col items-center"
//       >
//         <div
//           className={`w-20 h-16 flex items-center justify-center text-2xl
//             bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)]
//             text-white shadow-lg transition-all duration-500
//             rounded-[40%_60%_50%_50%]
//             ${active === "all"
//               ? "animate-pulse scale-105"
//               : "opacity-80 hover:scale-110 hover:-translate-y-1"}`}
//         >
//           👜
//         </div>
//         <span className="mt-3 text-sm font-semibold text-[var(--color-primary)]">
//           All
//         </span>
//       </button>

//       {categories.map((cat, index) => {
//         const imageUrl = cat.imagepath
//           ? `http://localhost:5050/uploads/${cat.imagepath}`
//           : null;

//         const isActive = active === cat._id;
//         const shape = shapeStyles[index % shapeStyles.length];

//         return (
//           <button
//             key={cat._id}
//             onClick={() => onChange(cat._id)}
//             className="group flex flex-col items-center"
//           >
//             <div
//               className={`relative w-20 h-16 overflow-hidden
//                 transition-all duration-500
//                 ${shape}
//                 ${isActive
//                   ? "scale-110 shadow-xl animate-[float_4s_ease-in-out_infinite]"
//                   : "opacity-80 hover:scale-110 hover:-translate-y-1"}`}
//             >
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={cat.name}
//                   className="w-full h-full object-cover transition-transform duration-700
//                     group-hover:scale-110"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-2xl bg-[var(--color-accent)]/20">
//                   👜
//                 </div>
//               )}

//               {/* Active glow */}
//               {isActive && (
//                 <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-accent)]/30 to-[var(--color-primary)]/30 animate-pulse rounded-[inherit]" />
//               )}
//             </div>

//             <span className={`mt-3 text-sm font-semibold transition
//               ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-muted-light)]"}`}>
//               {cat.name}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// import React from "react";

// export default function CategoryTabs({ categories, active, onChange }) {
//   return (
//     <div className="flex gap-6 justify-start py-6 px-4 overflow-x-auto bg-[var(--color-background-light)] shadow-sm scrollbar-thin scrollbar-thumb-[var(--color-primary)]/30 scrollbar-track-transparent">
      
//       {/* ALL CATEGORIES */}
//       <button
//         onClick={() => onChange("all")}
//         className={`flex flex-col items-center transition-transform duration-300 transform hover:scale-110 ${
//           active === "all" ? "scale-110" : "opacity-90"
//         }`}
//       >
//         <div
//           className={`w-20 h-20 flex items-center justify-center rounded-full shadow-lg border-2 transition-colors duration-300
//             ${active === "all"
//               ? "bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] text-white border-transparent"
//               : "bg-white text-[var(--color-primary)] border-[var(--color-primary)]/30"}
//           `}
//         >
//           👜
//         </div>
//         <span className={`mt-2 text-sm font-semibold transition-colors ${
//           active === "all" ? "text-[var(--color-primary)]" : "text-[var(--color-muted-light)]"
//         }`}>
//           All
//         </span>
//       </button>

//       {/* DYNAMIC CATEGORIES */}
//       {categories.map((cat) => {
//         const imageUrl = cat.imagepath
//           ? `http://localhost:5050/uploads/${cat.imagepath}`
//           : null;
//         const isActive = active === cat._id;

//         return (
//           <button
//             key={cat._id}
//             onClick={() => onChange(cat._id)}
//             className="flex flex-col items-center transition-transform duration-300 transform hover:scale-110"
//           >
//             <div
//               className={`relative w-20 h-20 rounded-full overflow-hidden shadow-md border-2 transition-all duration-500 ${
//                 isActive
//                   ? "border-gradient animate-pulse bg-gradient-to-tr from-[var(--color-accent)] to-[var(--color-primary)]"
//                   : "border-[var(--color-primary)]/20 bg-white"
//               }`}
//             >
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={cat.name}
//                   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-2xl bg-[var(--color-accent)]/20">
//                   👜
//                 </div>
//               )}

//               {/* Active overlay glow */}
//               {isActive && (
//                 <div className="absolute inset-0 rounded-full bg-white/10 shadow-inner animate-pulse" />
//               )}
//             </div>

//             <span className={`mt-2 text-sm font-semibold transition-colors ${
//               isActive ? "text-[var(--color-primary)]" : "text-[var(--color-muted-light)]"
//             }`}>
//               {cat.name}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import React from "react";

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div className="flex flex-col gap-6 py-4 px-2 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-[var(--color-primary)]/30 scrollbar-track-transparent">
      
      {/* ALL CATEGORIES */}
      <button
        onClick={() => onChange("all")}
        className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300
          ${active === "all"
            ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg"
            : "bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"}
        `}
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 text-xl shadow-md">
          👜
        </div>
        <span className="font-semibold text-sm">{`All`}</span>
      </button>

      {/* DYNAMIC CATEGORIES */}
      {categories.map((cat) => {
        const imageUrl = cat.imagepath
          ? `http://localhost:5050/uploads/${cat.imagepath}`
          : null;
        const isActive = active === cat._id;

        return (
          <button
            key={cat._id}
            onClick={() => onChange(cat._id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300
              ${isActive
                ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] text-white shadow-lg"
                : "bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"}
            `}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full overflow-hidden shadow-md border-2
              ${isActive ? "border-transparent" : "border-[var(--color-primary)]/20"}
            `}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl bg-[var(--color-accent)]/20">
                  👜
                </div>
              )}
            </div>
            <span className="font-semibold text-sm">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
