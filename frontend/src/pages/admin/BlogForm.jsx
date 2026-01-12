// import { useEffect, useState } from "react";
// import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// import { useNavigate, useParams } from "react-router-dom";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({ title: "", content: "", image: "" });
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getBlog(id).then(res => setBlog(res.data));
//     }
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const action = id
//       ? updateBlog(id, blog)
//       : createBlog(blog);

//     action.then(() => navigate("/admin/blogs"));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Title"
//         value={blog.title}
//         onChange={e => setBlog({ ...blog, title: e.target.value })}
//       />
//       <textarea
//         placeholder="Content"
//         value={blog.content}
//         onChange={e => setBlog({ ...blog, content: e.target.value })}
//       />
//       <input
//         placeholder="Image URL"
//         value={blog.image}
//         onChange={e => setBlog({ ...blog, image: e.target.value })}
//       />
//       <button type="submit">{id ? "Update" : "Create"}</button>
//     </form>
//   );
// };

// // export default BlogForm;
// import { useEffect, useState } from "react";
// import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// import { useNavigate, useParams } from "react-router-dom";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     image: "",
//     author: "",
//   });

//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getBlog(id).then((res) => setBlog(res.data));
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!blog.title || !blog.content || !blog.author) {
//       return alert("Title, content, and author are required");
//     }

//     if (id) {
//       await updateBlog(id, blog);
//     } else {
//       await createBlog(blog);
//     }

//     navigate("/admin/blogs");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-3xl font-bold mb-6">
//           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Title */}
//           <input
//             placeholder="Blog title"
//             value={blog.title}
//             onChange={(e) =>
//               setBlog({ ...blog, title: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//           />

//           {/* Author */}
//           <input
//             placeholder="Author name"
//             value={blog.author}
//             onChange={(e) =>
//               setBlog({ ...blog, author: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//           />

//           {/* Content */}
//           <textarea
//             placeholder="Blog content..."
//             rows={6}
//             value={blog.content}
//             onChange={(e) =>
//               setBlog({ ...blog, content: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg resize-none"
//           />

//           {/* Image */}
//           <input
//             placeholder="Image URL (optional)"
//             value={blog.image}
//             onChange={(e) =>
//               setBlog({ ...blog, image: e.target.value })
//             }
//             className="w-full px-4 py-2 border rounded-lg"
//           />

//           {blog.image && (
//             <img
//               src={blog.image}
//               alt="Preview"
//               className="w-full h-64 object-cover rounded-lg"
//             />
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//           >
//             {id ? "Update Blog" : "Create Blog"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // export default BlogForm;
// import { useEffect, useState } from "react";
// import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// import { useNavigate, useParams } from "react-router-dom";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({ title: "", content: "", author: "", image: "" });
//   const [imagePreview, setImagePreview] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getBlog(id).then(res => {
//         setBlog(res.data);
//         setImagePreview(res.data.image);
//       });
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("content", blog.content);
//       formData.append("author", blog.author);
//       if (blog.image instanceof File) {
//         formData.append("image", blog.image);
//       }

//       const action = id
//         ? updateBlog(id, formData)
//         : createBlog(formData);

//       await action;
//       navigate("/admin/blogs");
//     } catch (error) {
//       console.error(error);
//       alert("Error submitting blog");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setBlog({ ...blog, image: file });
//     setImagePreview(URL.createObjectURL(file));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         placeholder="Title"
//         value={blog.title}
//         onChange={e => setBlog({ ...blog, title: e.target.value })}
//         required
//       />
//       <input
//         placeholder="Author"
//         value={blog.author}
//         onChange={e => setBlog({ ...blog, author: e.target.value })}
//         required
//       />
//       <textarea
//         placeholder="Content"
//         value={blog.content}
//         onChange={e => setBlog({ ...blog, content: e.target.value })}
//         required
//       />
//       <input type="file" onChange={handleImageChange} />
//       {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "200px" }} />}
//       <button type="submit">{id ? "Update" : "Create"}</button>
//     </form>
//   );
// };

// export default BlogForm;
// import { useEffect, useState } from "react";
// import { createBlog, getBlog, updateBlog } from "../../services/blogApi";
// import { useNavigate, useParams } from "react-router-dom";

// const BlogForm = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     author: "",
//     image: "",
//   });
//   const [imagePreview, setImagePreview] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       getBlog(id).then((res) => {
//         setBlog(res.data);
//         setImagePreview(res.data.image);
//       });
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!blog.title || !blog.content || !blog.author) {
//       return alert("Title, content, and author are required");
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("content", blog.content);
//       formData.append("author", blog.author);

//       if (blog.image instanceof File) {
//         formData.append("image", blog.image);
//       } else if (typeof blog.image === "string") {
//         formData.append("image", blog.image);
//       }

//       if (id) {
//         await updateBlog(id, formData);
//       } else {
//         await createBlog(formData);
//       }

//       navigate("/admin/blogs");
//     } catch (error) {
//       console.error("Error submitting blog:", error);
//       alert("Error submitting blog");
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setBlog({ ...blog, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-3xl font-bold mb-6">
//           {id ? "✏️ Edit Blog" : "📝 Create Blog"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Title */}
//           <input
//             placeholder="Blog title"
//             value={blog.title}
//             onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           {/* Author */}
//           <input
//             placeholder="Author name"
//             value={blog.author}
//             onChange={(e) => setBlog({ ...blog, author: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />

//           {/* Content */}
//           <textarea
//             placeholder="Blog content..."
//             rows={6}
//             value={blog.content}
//             onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//             className="w-full px-4 py-2 border rounded-lg resize-none"
//             required
//           />

//           {/* Image Upload */}
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mb-2"
//             />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-full h-64 object-cover rounded-lg"
//               />
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//           >
//             {id ? "Update Blog" : "Create Blog"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;

import { useEffect, useState } from "react";
import { createBlog, getAdminBlog, updateBlog } from "../../services/blogApi"; // ✅ Use getAdminBlog
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BlogForm = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAdminBlog(id).then((res) => { // ✅ Changed from getBlog
        setBlog(res.data);
        setImagePreview(res.data.image);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.content || !blog.author) {
      toast.error("Title, content, and author are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      formData.append("author", blog.author);

      if (blog.image instanceof File) {
        formData.append("image", blog.image);
      }

      if (id) {
        await updateBlog(id, formData);
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(formData);
        toast.success("Blog created successfully!");
      }

      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Error submitting blog");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlog({ ...blog, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6">
          {id ? "✏️ Edit Blog" : "📝 Create Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            placeholder="Blog title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            placeholder="Author name"
            value={blog.author}
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <textarea
            placeholder="Blog content..."
            rows={6}
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg resize-none"
            required
          />

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {id ? "Update Blog" : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;

