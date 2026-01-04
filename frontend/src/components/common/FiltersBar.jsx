export default function FiltersBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#274E36]"
      />

      {/* SORT */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300"
        >
          <option value="featured">Featured</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="latest">Latest</option>
        </select>
      </div>
    </div>
  );
}
