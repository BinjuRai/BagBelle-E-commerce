
import { useState } from "react";
import { toast } from "react-toastify";
// import { createCategory }  from "../../api/categoryApi";
import  {createCategory } from "../../api/admin/categoryApi.js";

const AddCategory = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    // Reset file input
    const fileInput = document.getElementById("category-image");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    // Create FormData
    const formData = new FormData();
    formData.append("name", name.trim());
    if (description.trim()) {
      formData.append("description", description.trim());
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const { data } = await createCategory(formData);

      toast.success(`🌿 Category "${name}" created successfully!`);

      // Reset form
      setName("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      
      const fileInput = document.getElementById("category-image");
      if (fileInput) fileInput.value = "";

      // Call success callback
      if (onSuccess) onSuccess(data);
    } catch (err) {
      console.error("Create category error:", err);
      const errorMsg = err.response?.data?.message || "Failed to create category";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-primary mb-6">
        Add Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm font-medium text-muted">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
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
                className="w-full h-60 object-cover rounded-lg border border-border"
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

        <button
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-hover transition"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );


  // return (
  //   <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
  //     <h2 className="text-2xl font-bold mb-6 text-center text-green-800 dark:text-green-400">
  //       🌿 Add New Category
  //     </h2>

  //     <form onSubmit={handleSubmit} className="space-y-5">
  //       {/* Category Name */}
  //       <div>
  //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
  //           Category Name <span className="text-red-500">*</span>
  //         </label>
  //         <input
  //           type="text"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //           placeholder="e.g., Indoor Plants"
  //           className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
  //           required
  //         />
  //       </div>

  //       {/* Description */}
  //       <div>
  //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
  //           Description
  //         </label>
  //         <textarea
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           placeholder="Brief description of the category..."
  //           className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
  //           rows={4}
  //         />
  //       </div>

  //       {/* Image Upload */}
  //       <div>
  //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
  //           Category Image
  //         </label>
  //         <input
  //           id="category-image"
  //           type="file"
  //           accept="image/*"
  //           onChange={handleImageChange}
  //           className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900 dark:file:text-green-300"
  //         />
  //         <p className="text-xs text-gray-500 mt-1">Max size: 5MB</p>

  //         {/* Image Preview */}
  //         {imagePreview && (
  //           <div className="mt-4 relative">
  //             <img
  //               src={imagePreview}
  //               alt="Preview"
  //               className="w-full h-64 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
  //             />
  //             <button
  //               type="button"
  //               onClick={handleRemoveImage}
  //               className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition shadow-lg"
  //               title="Remove image"
  //             >
  //               ✕
  //             </button>
  //           </div>
  //         )}
  //       </div>

  //       {/* Submit Button */}
  //       <button
  //         type="submit"
  //         disabled={loading}
  //         className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
  //       >
  //         {loading ? (
  //           <>
  //             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
  //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  //             </svg>
  //             Creating...
  //           </>
  //         ) : (
  //           "Create Category"
  //         )}
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default AddCategory;
