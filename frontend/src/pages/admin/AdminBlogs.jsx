// // import { useEffect, useState } from "react";
// // import { getBlogs, deleteBlog } from "../../services/blogApi";
// // import { Link } from "react-router-dom";

// // const AdminBlogs = () => {
// //   const [blogs, setBlogs] = useState([]);

// //   const loadBlogs = () =>
// //     getBlogs().then(res => setBlogs(res.data));

// //   useEffect(() => {
// //     loadBlogs();
// //   }, []);

// //   return (
// //     <div>
// //       <Link to="/admin/create">Create Blog</Link>

// //       {blogs.map(blog => (
// //         <div key={blog._id}>
// //           <h3>{blog.title}</h3>
// //           <Link to={`/admin/edit/${blog._id}`}>Edit</Link>
// //           <button onClick={() => {
// //             deleteBlog(blog._id).then(loadBlogs);
// //           }}>
// //             Delete
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default AdminBlogs;

// import { useEffect, useState } from "react";
// import { getBlogs, deleteBlog } from "../../services/blogApi";
// import { Link } from "react-router-dom";

// const LIMIT = 5;

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const loadBlogs = async (currentPage = page) => {
//     const res = await getBlogs({
//       page: currentPage,
//       limit: LIMIT,
//     });

//     setBlogs(res.data.blogs || res.data);
//     setTotalPages(res.data.totalPages || 1);
//   };

//   useEffect(() => {
//     loadBlogs(page);
//   }, [page]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog?")) return;
//     await deleteBlog(id);
//     loadBlogs(1);
//     setPage(1);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">📝 Manage Blogs</h1>
//         <Link
//           to="/admin/create"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
//         >
//           + Create Blog
//         </Link>
//       </div>

//       {/* Blog Cards */}
//       <div className="space-y-4">
//         {blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white shadow rounded-lg p-5 flex flex-col md:flex-row md:justify-between"
//           >
//             <div>
//               <h3 className="text-xl font-semibold">{blog.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">
//                 ✍️ {blog.author || "Unknown Author"}
//               </p>
//               <p className="text-gray-600 text-sm line-clamp-2 mt-2">
//                 {blog.content}
//               </p>
//             </div>

//             <div className="flex gap-3 mt-4 md:mt-0">
//               <Link
//                 to={`/admin/edit/${blog._id}`}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Edit
//               </Link>
//               <button
//                 onClick={() => handleDelete(blog._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-3 mt-8">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span className="px-4 py-2 font-semibold">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // export default AdminBlogs;
// import { useEffect, useState } from "react";
// import { getBlogs, deleteBlog } from "../../services/blogApi";
// import { Link } from "react-router-dom";

// const AdminBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 5;

//   const loadBlogs = () => getBlogs().then((res) => setBlogs(res.data));

//   useEffect(() => {
//     loadBlogs();
//   }, []);

//   const indexOfLast = currentPage * blogsPerPage;
//   const indexOfFirst = indexOfLast - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(blogs.length / blogsPerPage);

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold">📚 Manage Blogs</h2>
//         <Link
//           to="/admin/create"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
//         >
//           + Create Blog
//         </Link>
//       </div>

//       <div className="grid gap-6 sm:grid-cols-2">
//         {currentBlogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white shadow-lg rounded-xl overflow-hidden"
//           >
//             {blog.image && (
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-4">
//               <h3 className="text-xl font-bold mb-1">{blog.title}</h3>
//               <p className="text-gray-500 text-sm mb-2">By {blog.author}</p>
//               <p className="text-gray-700 mb-4">
//                 {blog.content.substring(0, 100)}...
//               </p>
//               <div className="flex justify-between">
//                 <Link
//                   to={`/admin/edit/${blog._id}`}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => deleteBlog(blog._id).then(loadBlogs)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 space-x-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i + 1}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded-lg border ${
//               currentPage === i + 1
//                 ? "bg-blue-600 text-white border-blue-600"
//                 : "bg-white text-gray-700 border-gray-300"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminBlogs;
//  import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getBlogs, deleteBlog } from "../../services/blogApi";

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadBlogs();
//   }, []);

//   const loadBlogs = async () => {
//     try {
//       setLoading(true);
//       const { data } = await getBlogs();
//       setBlogs(data.blogs || data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load blogs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, title) => {
//     if (!window.confirm(`Delete blog "${title}"?`)) return;

//     try {
//       await deleteBlog(id);
//       toast.success(`Blog "${title}" deleted`);
//       loadBlogs();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete blog");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Blog Management
//         </h2>
//         <Link
//           to="/admin/create"
//           className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition"
//         >
//           + Add Blog
//         </Link>
//       </div>

//       {blogs.length === 0 ? (
//         <div className="text-center text-gray-500 p-12">
//           No blogs found. Add your first blog!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {blogs.map((b) => (
//             <div
//               key={b._id}
//               className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col"
//             >
//               <div className="h-48 w-full relative">
//                 {b.imagepath ? (
//                   <img
//                     src={`http://localhost:5050/uploads/${b.imagepath}`}
//                     alt={b.title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       e.target.nextElementSibling.style.display = "flex";
//                     }}
//                   />
//                 ) : null}
//                 <div
//                   className={`w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-4xl ${
//                     b.imagepath ? "hidden" : ""
//                   }`}
//                 >
//                   📝
//                 </div>
//               </div>

//               <div className="p-4 flex-1 flex flex-col justify-between">
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
//                     {b.title}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
//                     {b.category?.name || "Uncategorized"}
//                   </p>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       b.status === "published"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {b.status || "draft"}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <Link
//                     to={`/admin/blogs/edit/${b._id}`}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(b._id, b.title)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
//         Total Blogs: <span className="font-semibold">{blogs.length}</span>
//       </div>
//     </div>
//   );
// };

// export default Blogs;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminBlogs, deleteBlog } from "../../services/blogApi"; // ✅ Use getAdminBlogs

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await getAdminBlogs(); // ✅ Changed from getBlogs
      setBlogs(data.blogs || data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete blog "${title}"?`)) return;

    try {
      await deleteBlog(id);
      toast.success(`Blog "${title}" deleted`);
      loadBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Blog Management
        </h2>
        <Link
          to="/admin/create"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          + Add Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-500 p-12">
          No blogs found. Add your first blog!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((b) => (
            <div
              key={b._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col"
            >
              <div className="h-48 w-full relative">
                {b.imagepath ? (
                  <img
                    src={`http://localhost:5050/uploads/${b.imagepath}`}
                    alt={b.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextElementSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-4xl ${
                    b.imagepath ? "hidden" : ""
                  }`}
                >
                  📝
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {b.category?.name || "Uncategorized"}
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      b.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {b.status || "draft"}
                  </span>
                </div>

                <div className="mt-4 flex justify-between">
                  <Link
                    to={`/admin/edit/${b._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(b._id, b.title)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Total Blogs: <span className="font-semibold">{blogs.length}</span>
      </div>
    </div>
  );
};

export default AdminBlogs;
