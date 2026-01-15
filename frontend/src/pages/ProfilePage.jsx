


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
//   const [preview, setPreview] = useState(
//     user?.filepath ? `http://localhost:5050${user.filepath}` : "/default-profile.png"
//   );

//   if (!user) return <p>Loading...</p>;

//   const headers = { Authorization: `Bearer ${token}` };

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
//     <div className="min-h-screen bg-[var(--color-background-light)] py-12 px-4 md:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-[var(--color-surface-dark)] py-10 text-center text-white relative">
//           <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide">
//              My Profile
//           </h1>
//           <p className="mt-2 text-lg opacity-90">
//             Manage your BagBelle account details
//           </p>

//           {/* Profile Image */}
//           <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
//             <div className="relative w-36 h-36 rounded-full shadow-xl border-4 border-white overflow-hidden">
//               <img
//                 src={preview}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 className="absolute bottom-2 right-2 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full shadow hover:bg-[#274E36]/90 transition"
//               >
//                 Upload
//               </button>
//             </div>
//             <input
//               type="file"
//               ref={fileInputRef}
//               onChange={(e) => {
//                 setImage(e.target.files[0]);
//                 setPreview(URL.createObjectURL(e.target.files[0]));
//               }}
//               className="hidden"
//             />
//             {image && (
//               <button
//                 onClick={handleUploadImage}
//                 className="mt-4 w-full md:w-auto px-6 py-2 bg-[var(--color-accent)] text-white rounded-full shadow hover:bg-[#274E36]/90 transition"
//               >
//                 Save Image
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="pt-28 pb-12 px-6 md:px-12 space-y-10">
//           {/* Role */}
//           <p className="text-center text-sm md:text-base text-gray-600">
//             Role:{" "}
//             <span className={user.role === "admin" ? "text-red-600" : "text-[var(--color-primary)]"}>
//               {user.role}
//             </span>
//           </p>

//           {/* Profile Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 disabled
//                 className="p-3 rounded-xl border border-gray-300 bg-gray-50 cursor-not-allowed shadow-sm"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Street, City, Country"
//                 className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={handleUpdateProfile}
//               className="mt-4 px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
//             >
//               Update Profile
//             </button>
//           </div>

//           <hr className="my-10 border-gray-200" />

//           {/* Change Password */}
//           <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] text-center mb-6">
//             🔒 Change Password
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//                 className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
//               />
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={handleChangePassword}
//               className="mt-4 px-8 py-3 bg-yellow-400 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
//             >
//               Change Password
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/authProvider";
import axios from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔒 PASSWORD STRENGTH CHECKER
const calculatePasswordStrength = (password) => {
  let score = 0;
  if (!password) return { score: 0, strength: "Weak", color: "red", width: "0%" };

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  let strength = "Weak";
  let color = "red";
  let width = "33%";

  if (score >= 5) {
    strength = "Strong";
    color = "green";
    width = "100%";
  } else if (score >= 3) {
    strength = "Medium";
    color = "yellow";
    width = "66%";
  }

  return { score, strength, color, width };
};

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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    strength: "Weak",
    color: "red",
    width: "0%"
  });
  const [passwordStatus, setPasswordStatus] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  // 🔒 FETCH PASSWORD STATUS ON MOUNT
  useEffect(() => {
    const fetchPasswordStatus = async () => {
      try {
        const res = await axios.get("/users/profile", { headers });
        if (res.data.passwordStatus) {
          setPasswordStatus(res.data.passwordStatus);
        }
      } catch (err) {
        console.error("Failed to fetch password status:", err);
      }
    };
    fetchPasswordStatus();
  }, []);

  // 🔒 UPDATE PASSWORD STRENGTH
  const handleNewPasswordChange = (e) => {
    const pwd = e.target.value;
    setNewPassword(pwd);
    const strength = calculatePasswordStrength(pwd);
    setPasswordStrength(strength);
  };

  if (!user) return <p>Loading...</p>;

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
    if (!oldPassword || !newPassword) {
      return toast.error("Please fill in all password fields");
    }

    if (passwordStrength.score < 3) {
      return toast.error("Please use a stronger password");
    }

    try {
      await axios.put(
        "/users/profile/password",
        { oldPassword, newPassword },
        { headers }
      );
      setOldPassword("");
      setNewPassword("");
      setPasswordStrength({ score: 0, strength: "Weak", color: "red", width: "0%" });
      toast.success("Password changed successfully! Your password will expire in 90 days.");
      
      // Refresh password status
      const res = await axios.get("/users/profile", { headers });
      if (res.data.passwordStatus) {
        setPasswordStatus(res.data.passwordStatus);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-light)] py-12 px-4 md:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--color-surface-dark)] py-10 text-center text-white relative">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide">
            👜 My Profile
          </h1>
          <p className="mt-2 text-lg opacity-90">
            Manage your BagBelle account details
          </p>

          {/* 🔒 PASSWORD EXPIRY WARNING */}
          {passwordStatus && !passwordStatus.isExpired && passwordStatus.daysUntilExpiry <= 7 && (
            <div className="mt-4 mx-auto max-w-md bg-yellow-500 text-white px-4 py-2 rounded-lg">
              ⚠️ Your password expires in {passwordStatus.daysUntilExpiry} days
            </div>
          )}

          {passwordStatus && passwordStatus.isExpired && (
            <div className="mt-4 mx-auto max-w-md bg-red-500 text-white px-4 py-2 rounded-lg">
              ❌ Your password has expired! Please change it immediately.
            </div>
          )}

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

          {/* 🔒 CHANGE PASSWORD WITH SECURITY FEATURES */}
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] text-center mb-6">
            🔒 Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showOldPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="w-full p-3 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* PASSWORD STRENGTH METER */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          width: passwordStrength.width,
                          backgroundColor:
                            passwordStrength.color === "green"
                              ? "#10b981"
                              : passwordStrength.color === "yellow"
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        passwordStrength.color === "green"
                          ? "text-green-600"
                          : passwordStrength.color === "yellow"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {passwordStrength.strength}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-2">🔐 Password Requirements:</p>
            <ul className="space-y-1 ml-4">
              <li>✓ At least 8 characters</li>
              <li>✓ Contains uppercase and lowercase letters</li>
              <li>✓ Contains numbers and special characters</li>
              <li>✓ Cannot reuse last 5 passwords</li>
              <li>✓ Expires after 90 days</li>
            </ul>
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