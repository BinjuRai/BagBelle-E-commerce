import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById, updateCategory } from "../../api/admin/categoryApi";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setFetchLoading(true);
        const { data } = await getCategoryById(id);
        
        setName(data.name);
        setDescription(data.description || "");
        
        if (data.imagepath) {
          setExistingImage(data.imagepath);
          setImagePreview(`http://localhost:5050/uploads/${data.imagepath}`);
        }
      } catch (err) {
        console.error("Fetch category error:", err);
        toast.error("Failed to load category");
        navigate("/admin/categories");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setExistingImage(null);
    
    const fileInput = document.getElementById("category-image");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    
    // Only append new image if selected
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      await updateCategory(id, formData);

      toast.success(`🌿 Category "${name}" updated successfully!`);
      navigate("/admin/categories");
    } catch (err) {
      console.error("Update category error:", err);
      const errorMsg = err.response?.data?.message || "Failed to update category";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <button
        onClick={() => navigate("/admin/categories")}
        className="text-sm text-primary hover:underline"
      >
        ← Back to Categories
      </button>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Edit Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-muted">
              Category Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-2 w-full px-4 py-2.5 rounded-lg border border-border bg-background resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted">
              Category Image
            </label>
            <input
              id="category-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full text-sm"
            />

            {imagePreview && (
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-destructive text-white w-8 h-8 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="flex-1 border border-border py-3 rounded-lg text-text hover:bg-accent"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-hover disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




export default EditCategory;