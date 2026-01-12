import { useState, useMemo } from "react";
import CategoryTabs from "../components/common/CategoryTabs.jsx";
import FiltersBar from "../components/common/FiltersBar.jsx";
import PlantCard from "../components/home/PlantCard.jsx";
import Pagination from "../components/common/Pagination.jsx";

const ITEMS_PER_PAGE = 8;

export default function CategoryPage({ plants = [] }) {
  const [category, setCategory] = useState("indoor");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  // FILTER + SEARCH + SORT
  const filteredPlants = useMemo(() => {
    let data = plants.filter(
      (p) =>
        p.plantType === category &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);

    return data;
  }, [plants, category, search, sort]);

  // PAGINATION
  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE);
  const paginatedPlants = filteredPlants.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* HERO */}
      <div className="bg-[#6e8f7a] text-white text-center py-20">
        <p className="text-sm opacity-80">
          Discover our full collection of beautiful plants
        </p>
        <h1 className="text-4xl font-serif mt-2">All Plants</h1>
      </div>

      {/* CATEGORY TABS */}
      <CategoryTabs
        active={category}
        onChange={(c) => {
          setCategory(c);
          setPage(1);
        }}
      />

      {/* CONTENT */}
      <div className="bg-[#cdddcf] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          <FiltersBar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
          />

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {paginatedPlants.map((plant) => (
              <PlantCard
                key={plant._id}
                plant={plant}
              />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <Pagination
              current={page}
              total={totalPages}
              onChange={setPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
