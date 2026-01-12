import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/admin/products");
      setProducts(data.products || data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;

    try {
      await api.delete(`/admin/products/${id}`);
      toast.success(`Product "${name}" deleted`);
      loadProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text">
            Products
          </h2>
          <p className="text-sm text-muted">
            Manage Bagbelle inventory
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent">
            <tr>
              <th className="px-5 py-4 text-left">Image</th>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Price</th>
              <th className="px-5 py-4 text-left">Stock</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-muted">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="hover:bg-accent-hover transition">
                  <td className="px-5 py-4">
                    {p.imagepath ? (
                      <img
                        src={`http://localhost:5050/uploads/${p.imagepath}`}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-accent rounded-lg" />
                    )}
                  </td>

                  <td className="px-5 py-4 font-medium text-text">
                    {p.name}
                  </td>

                  <td className="px-5 py-4 text-text">
                    ₹{p.price}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        p.stock > 10
                          ? "bg-accent text-text"
                          : p.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-muted">
                    {p.categoryId?.name || "-"}
                  </td>

                  <td className="px-5 py-4 text-center space-x-2">
                    <Link
                      to={`/admin/products/edit/${p._id}`}
                      className="px-4 py-1.5 text-sm rounded-lg border border-border hover:border-primary transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id, p.name)}
                      className="px-4 py-1.5 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-muted">
        Total products: <span className="font-medium">{products.length}</span>
      </p>
    </div>
  );
};

export default Products;
