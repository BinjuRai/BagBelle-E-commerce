
// import { useState, useRef } from "react";
// import { useAuth } from "../auth/authProvider";
// import axios from "../api/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProfilePage = () => {
//   const { user, setUser, token } = useAuth();
//   const fileInputRef = useRef(null);

//   const [name, setName] = useState(user?.name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [phone, setPhone] = useState(user?.phone || "");
//   const [address, setAddress] = useState(user?.address?.join(", ") || "");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(user?.filepath ? `http://localhost:5050${user.filepath}` : "/default-profile.png");

//   if (!user) return <p>Loading...</p>;

//   const headers = { Authorization: `Bearer ${token}` };

//   // Update profile info
//   const handleUpdateProfile = async () => {
//     try {
//       const res = await axios.put(
//         "/users/profile",
//         { name, phone, address: address.split(",").map(a => a.trim()) },
//         { headers }
//       );
//       setUser(res.data.data);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Update failed");
//     }
//   };

//   // Upload profile image
//   const handleUploadImage = async () => {
//     if (!image) return toast.warn("Please select an image first!");
//     const formData = new FormData();
//     formData.append("image", image);
//     try {
//       const res = await axios.put("/users/profile/image", formData, {
//         headers: { ...headers, "Content-Type": "multipart/form-data" },
//       });
//       setUser((prev) => ({ ...prev, filepath: res.data.filepath }));
//       setPreview(`http://localhost:5050${res.data.filepath}`);
//       toast.success("Image uploaded successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Image upload failed");
//     }
//   };

//   // Change password
//   const handleChangePassword = async () => {
//     try {
//       await axios.put(
//         "/users/profile/password",
//         { oldPassword, newPassword },
//         { headers }
//       );
//       setOldPassword("");
//       setNewPassword("");
//       toast.success("Password changed successfully!");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Password change failed");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-green-50 shadow-xl rounded-2xl mt-6 mb-6">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">🌿 My Profile</h1>

//       {/* Role Badge */}
//       <p className="mb-6 text-center text-gray-700">
//         Role:{" "}
//         <span className={user.role === "admin" ? "text-red-600" : "text-green-700"}>
//           {user.role}
//         </span>
//       </p>

//       {/* Profile Image */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="relative">
//           <img
//             src={preview}
//             alt="Profile"
//             className="w-36 h-36 rounded-full object-cover border-4 border-green-200 shadow-lg"
//           />
//           <button
//             onClick={() => fileInputRef.current.click()}
//             className="absolute bottom-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full shadow hover:bg-green-600 transition"
//           >
//             Upload Picture
//           </button>
//         </div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={(e) => {
//             setImage(e.target.files[0]);
//             setPreview(URL.createObjectURL(e.target.files[0]));
//           }}
//           className="hidden"
//         />
//         {image && (
//           <button
//             onClick={handleUploadImage}
//             className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
//           >
//             Save Image
//           </button>
//         )}
//       </div>

//       {/* Profile Info */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block mb-1 text-green-700 font-medium">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-green-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-green-700 font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             disabled
//             className="w-full border border-green-300 rounded-xl p-2 bg-green-100 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-green-700 font-medium">Phone</label>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border border-green-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-green-700 font-medium">Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Street, City, Country"
//             className="w-full border border-green-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>
//       </div>

//       <div className="flex justify-center mb-8">
//         <button
//           onClick={handleUpdateProfile}
//           className="px-8 py-3 bg-green-500 text-white rounded-2xl shadow hover:bg-green-600 transition font-semibold"
//         >
//           Update Profile
//         </button>
//       </div>

//       <hr className="my-6 border-green-200" />

//       {/* Change Password */}
//       <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">🔒 Change Password</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block mb-1 text-green-700 font-medium">Current Password</label>
//           <input
//             type="password"
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//             className="w-full border border-green-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-green-700 font-medium">New Password</label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full border border-green-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={handleChangePassword}
//           className="px-8 py-3 bg-yellow-400 text-white rounded-2xl shadow hover:bg-yellow-500 transition font-semibold"
//         >
//           Change Password
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useRef } from "react";
import { useAuth } from "../auth/authProvider";
import axios from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { user, setUser, token } = useAuth();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address?.join(", ") || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    user?.filepath ? `http://localhost:5050${user.filepath}` : "/default-profile.png"
  );

  if (!user) return <p>Loading...</p>;

  const headers = { Authorization: `Bearer ${token}` };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        "/users/profile",
        { name, phone, address: address.split(",").map(a => a.trim()) },
        { headers }
      );
      setUser(res.data.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleUploadImage = async () => {
    if (!image) return toast.warn("Please select an image first!");
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await axios.put("/users/profile/image", formData, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
      });
      setUser((prev) => ({ ...prev, filepath: res.data.filepath }));
      setPreview(`http://localhost:5050${res.data.filepath}`);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Image upload failed");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put(
        "/users/profile/password",
        { oldPassword, newPassword },
        { headers }
      );
      setOldPassword("");
      setNewPassword("");
      toast.success("Password changed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-light)] py-12 px-4 md:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--color-primary)] py-10 text-center text-white relative">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide">
             My Profile
          </h1>
          <p className="mt-2 text-lg opacity-90">
            Manage your BagBelle account details
          </p>

          {/* Profile Image */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative w-36 h-36 rounded-full shadow-xl border-4 border-white overflow-hidden">
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full shadow hover:bg-[#274E36]/90 transition"
              >
                Upload
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="hidden"
            />
            {image && (
              <button
                onClick={handleUploadImage}
                className="mt-4 w-full md:w-auto px-6 py-2 bg-[var(--color-accent)] text-white rounded-full shadow hover:bg-[#274E36]/90 transition"
              >
                Save Image
              </button>
            )}
          </div>
        </div>

        <div className="pt-28 pb-12 px-6 md:px-12 space-y-10">
          {/* Role */}
          <p className="text-center text-sm md:text-base text-gray-600">
            Role:{" "}
            <span className={user.role === "admin" ? "text-red-600" : "text-[var(--color-primary)]"}>
              {user.role}
            </span>
          </p>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="p-3 rounded-xl border border-gray-300 bg-gray-50 cursor-not-allowed shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, City, Country"
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUpdateProfile}
              className="mt-4 px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Update Profile
            </button>
          </div>

          <hr className="my-10 border-gray-200" />

          {/* Change Password */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] text-center mb-6">
            🔒 Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleChangePassword}
              className="mt-4 px-8 py-3 bg-yellow-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
