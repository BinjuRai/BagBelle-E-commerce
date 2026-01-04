import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar.jsx";
import Navbar from "../components/admin/Navbar.jsx";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar />
        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
