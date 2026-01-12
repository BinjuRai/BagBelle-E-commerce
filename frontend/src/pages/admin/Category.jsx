import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminCategories, deleteCategory } from "../../api/admin/categoryApi";
import AddCategory from "../../pages/admin/AddCategory";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getAdminCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      await deleteCategory(id);
      toast.success(`Category "${name}" deleted`);
      fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleCategoryCreated = () => {
    setShowAddForm(false);
    fetchCategories();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-text">
            Categories
          </h1>
          <p className="text-sm text-muted">
            Manage product classification
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          {showAddForm ? "Cancel" : "Add Category"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-surface border border-border rounded-xl p-6">
          <AddCategory onSuccess={handleCategoryCreated} />
        </div>
      )}

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-accent text-text">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Image</th>
              <th className="px-6 py-4 text-left font-medium">Name</th>
              <th className="px-6 py-4 text-left font-medium">Description</th>
              <th className="px-6 py-4 text-left font-medium">Created</th>
              <th className="px-6 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-muted">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-accent-hover transition">
                  <td className="px-6 py-4">
                    {category.imagepath ? (
                      <img
                        src={`http://localhost:5050/uploads/${category.imagepath}`}
                        alt={category.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-accent rounded-lg" />
                    )}
                  </td>

                  <td className="px-6 py-4 font-medium text-text">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-muted max-w-xs truncate">
                    {category.description || "-"}
                  </td>

                  <td className="px-6 py-4 text-muted">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(category._id)}
                      className="px-4 py-1.5 text-sm rounded-lg border border-border hover:border-primary transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id, category.name)}
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
        Total categories: <span className="font-medium">{categories.length}</span>
      </p>
    </div>
  );
};

export default Categories;
