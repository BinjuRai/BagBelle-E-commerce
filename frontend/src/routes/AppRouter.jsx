

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout.jsx";
// // import AdminLayout from "../layouts/AdminLayout.jsx";

// // Pages
// import Homepage from "../pages/homepage.jsx";
// import LoginPage from "../pages/login.jsx";
// import RegisterPage from "../pages/register.jsx";
// // import Checkout from "../pages/Checkout.jsx";
// // import OrderSuccess from "../pages/orderSuccess.jsx";
// // import MyOrders from "../pages/MyOrder.jsx";
// // import NotificationsPage from "../pages/Notfication.jsx";
// // import BlogDetails from "../pages/BlogDetails.jsx";
// // import Aboutus from "../pages/aboutus.jsx";
// // import CategoryPage from "../pages/Categories.jsx";
// // import WishlistPage from "../pages/wishlistPage.jsx";
// // import AllProductsPage from "../pages/allProductPage.jsx";
// // import CartPage from "../pages/cart.jsx";
// // import ProductDetailsPage from "../pages/plantDetails.jsx";
// // import Blogs from "../pages/blogs.jsx";
// // import Contact from "../pages/contact.jsx";
// // import ProfilePage from "../pages/ProfilePage.jsx";

// // // Admin Pages
// // import AdminDashboard from "../pages/admin/Dashboard.jsx";
// // import Products from "../pages/admin/Products.jsx";
// // import AddProduct from "../pages/admin/AddProduct.jsx";
// // import EditProduct from "../pages/admin/EditProduct.jsx";
// // import Categories from "../pages/admin/Category.jsx";
// // import AddCategory from "../pages/admin/AddCategory.jsx";
// // import EditCategory from "../pages/admin/EditCategory.jsx";
// // import AdminOrdersPage from "../pages/admin/AdminOrderpage.jsx";
// // import AdminUsersPage from "../pages/admin/AdminUsersPage.jsx";
// // import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage.jsx";
// // import AdminSettingsPage from "../pages/admin/AdminSettingsPage.jsx";
// // import BlogForm from "../pages/admin/BlogForm.jsx";
// // import AdminBlogs from "../pages/admin/AdminBlogs.jsx";

// // Route Guards
// import GuestRoute from "./GuestRouter.jsx";
// import ProtectedRoute from "./ProtectedRoutes.jsx";
// import AdminRoute from "./AdminRouter.jsx";

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ================= PUBLIC ROUTES (Accessible to everyone) ================= */}
//         <Route element={<MainLayout />}>
//           <Route path="/" element={<Homepage />} />
//           {/* <Route path="/aboutus" element={<Aboutus />} />
//           <Route path="/categories" element={<CategoryPage />} />
//           <Route path="/products" element={<AllProductsPage />} />
//           <Route path="/products/:id" element={<ProductDetailsPage />} />
//           <Route path="/blogs" element={<Blogs />} />
//           <Route path="/blogs/:id" element={<BlogDetails />} />
//           <Route path="/contact" element={<Contact />} /> */}
//         </Route>

//         {/* ================= GUEST-ONLY ROUTES (Login/Register) ================= */}
//         <Route element={<GuestRoute />}>
//           <Route element={<MainLayout />}>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//           </Route>
//         </Route>

//         {/* ================= PROTECTED USER ROUTES (Requires login) ================= */}
//         <Route element={<ProtectedRoute />}>
//           <Route element={<MainLayout />}>
//             {/* <Route path="/checkout" element={<Checkout />} />
//             <Route path="/order-success" element={<OrderSuccess />} />
//             <Route path="/orders" element={<MyOrders />} />
//             <Route path="/notifications" element={<NotificationsPage />} />
//             <Route path="/wishlist" element={<WishlistPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/profile" element={<ProfilePage />} /> */}
//           </Route>
//         </Route>

//         {/* ================= ADMIN ROUTES (Requires admin role) ================= */}
//         {/* <Route element={<AdminRoute />}>
//           <Route element={<AdminLayout />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin/products" element={<Products />} />
//             <Route path="/admin/products/add" element={<AddProduct />} />
//             <Route path="/admin/products/edit/:id" element={<EditProduct />} />
//             <Route path="/admin/categories" element={<Categories />} />
//             <Route path="/admin/categories/add" element={<AddCategory />} />
//             <Route
//               path="/admin/categories/edit/:id"
//               element={<EditCategory />}
//             />
//             <Route path="/admin/orders" element={<AdminOrdersPage />} />
//             <Route path="/admin/users" element={<AdminUsersPage />} />
//             <Route path="/admin/customers" element={<AdminUsersPage />} />
//             <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
//             <Route path="/admin/settings" element={<AdminSettingsPage />} />
//             <Route path="/admin/blogs" element={<AdminBlogs />} />
//             <Route path="/admin/create" element={<BlogForm />} />
//             <Route path="/admin/edit/:id" element={<BlogForm />} />
//           </Route>
//         </Route> */}

//         {/* ================= 404 PAGE ================= */}
//         <Route
//           path="*"
//           element={
//             <div className="min-h-screen flex items-center justify-center text-2xl">
//               404 - Page Not Found 🌿
//             </div>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

// Pages
import Homepage from "../pages/homepage.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";

// Route Guards
import GuestRoute from "./GuestRouter.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-2xl">
              404 - Page Not Found 🌿
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
