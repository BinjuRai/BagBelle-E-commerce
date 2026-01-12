const CategoryCard = ({ category, onClick }) => {
  const imageUrl = category.imagepath
    ? `http://localhost:5050/uploads/${category.imagepath}`
    : null;

  return (
    <div
      onClick={onClick}
      className="bg-black/5 dark:bg-gray-900 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center"
    >
      {/* IMAGE */}
      <div className="w-full h-60 rounded-2xl overflow-hidden mb-5 bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="text-6xl text-gray-400">👜</div>
        )}
      </div>

      {/* NAME */}
      <h3 className="text-xl md:text-2xl font-serif font-semibold text-black dark:text-white mb-2">
        {category.name}
      </h3>

      {/* DESCRIPTION */}
      {category.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center line-clamp-2">
          {category.description}
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
