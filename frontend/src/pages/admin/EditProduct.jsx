import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import { getAdminCategories } from "../../api/admin/categoryApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    Type: "",
    stock: "",
    careInstructions: "",
    BrandName: "",
    isFeatured: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await getAdminCategories();
      setCategories(data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/admin/products/${id}`);
      const product = data.product;

      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
        plantType: product.plantType || "",
        stock: product.stock || "",
        careInstructions: product.careInstructions || "",
        scientificName: product.scientificName || "",
        isFeatured: product.isFeatured || false,
      });

      if (product.imagepath) setImagePreview(product.imagepath);
      if (product.filepath) setVideoPreview(product.filepath);
    } catch (err) {
      toast.error("Failed to load product");
      navigate("/admin/products");
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size should be less than 5MB");
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      return toast.error("Please select a video file");
    }
    if (file.size > 25 * 1024 * 1024) {
      return toast.error("Video size should be less than 25MB");
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.categoryId) {
      return toast.error("Name, price, and category are required!");
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (imageFile) data.append("imagepath", imageFile);
    if (videoFile) data.append("filepath", videoFile);

    try {
      setLoading(true);
      await api.put(`/admin/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-400">
        ✏️ Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg"
          placeholder="Product Name"
          required
        />

        {/* Scientific Name */}
        <input
          name="scientificName"
          value={formData.scientificName}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg"
          placeholder="Scientific Name"
        />

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg"
            placeholder="Price"
            required
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg"
            placeholder="Stock"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg"
          rows={4}
          placeholder="Description"
        />

        {/* Category & Plant Type */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            name="plantType"
            value={formData.plantType}
            onChange={handleChange}
            className="px-4 py-2.5 border rounded-lg"
          >
            <option value="">Plant Type</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="hanging">Hanging</option>
            <option value="succulent">Succulent</option>
            <option value="flowering">Flowering</option>
          </select>
        </div>

        {/* Care Instructions */}
        <textarea
          name="careInstructions"
          value={formData.careInstructions}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border rounded-lg"
          rows={3}
          placeholder="Care Instructions"
        />

        {/* Featured */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          ⭐ Featured Product
        </label>

        {/* Image */}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            className="h-48 w-full object-cover rounded"
          />
        )}

        {/* Video */}
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        {videoPreview && (
          <video src={videoPreview} controls className="h-48 w-full rounded" />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
