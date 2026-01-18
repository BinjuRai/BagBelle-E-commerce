import React, { useState, useEffect } from "react";
import { authAPI, fetchCsrfToken } from "../services/api";

const AuthTest = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  // 🛡️ Fetch CSRF token on mount
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    getCsrfToken();
  }, []);

  // 📝 Test Registration
  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await authAPI.register({
        name: "Test User",
        email: "test@example.com",
        password: "Test@1234",
        phone: "1234567890",
      });
      setMessage(`✅ ${response.data.message}`);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Registration failed"}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Test Login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await authAPI.login({
        email: "test@example.com",
        password: "Test@1234",
      });
      setMessage(`✅ ${response.data.message}`);
      setUser(response.data.data.user);
      console.log("🍪 Cookies set:", document.cookie);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Login failed"}`);
    } finally {
      setLoading(false);
    }
  };

  // 👤 Test Get Profile
  const handleGetProfile = async () => {
    setLoading(true);
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.data);
      setMessage("✅ Profile fetched successfully");
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Failed to fetch profile"}`);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Test Update Profile
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await authAPI.updateProfile({
        name: "Updated Test User",
      });
      setUser(response.data.data);
      setMessage("✅ Profile updated successfully");
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Update failed"}`);
    } finally {
      setLoading(false);
    }
  };

  // 🚪 Test Logout
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await authAPI.logout();
      setMessage(`✅ ${response.data.message}`);
      setUser(null);
      console.log("🍪 Cookies after logout:", document.cookie);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || "Logout failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔐 Secure Session Management Test</h1>

      {/* CSRF Token Display */}
      <div style={{ background: "#f0f0f0", padding: "10px", marginBottom: "20px", borderRadius: "5px" }}>
        <strong>🛡️ CSRF Token:</strong>
        <code style={{ display: "block", marginTop: "5px", fontSize: "12px", wordBreak: "break-all" }}>
          {csrfToken || "Loading..."}
        </code>
      </div>

      {/* User Info */}
      {user && (
        <div style={{ background: "#d4edda", padding: "15px", marginBottom: "20px", borderRadius: "5px" }}>
          <h3>👤 Logged In User:</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          background: message.startsWith("✅") ? "#d4edda" : "#f8d7da",
          color: message.startsWith("✅") ? "#155724" : "#721c24"
        }}>
          {message}
        </div>
      )}

      {/* Test Buttons */}
      <div style={{ display: "grid", gap: "10px" }}>
        <button
          onClick={handleRegister}
          disabled={loading}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          📝 Register Test User
        </button>

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          🔑 Login
        </button>

        <button
          onClick={handleGetProfile}
          disabled={loading || !user}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          👤 Get Profile
        </button>

        <button
          onClick={handleUpdateProfile}
          disabled={loading || !user}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          ✏️ Update Profile
        </button>

        <button
          onClick={handleLogout}
          disabled={loading || !user}
          style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Instructions */}
      <div style={{ marginTop: "30px", padding: "15px", background: "#fff3cd", borderRadius: "5px" }}>
        <h3>📋 Testing Instructions:</h3>
        <ol>
          <li>Click "Register Test User" to create a test account</li>
          <li>Click "Login" to authenticate (cookies will be set automatically)</li>
          <li>Open DevTools → Application → Cookies to see HTTP-Only cookies</li>
          <li>Click "Get Profile" to test authentication</li>
          <li>Click "Update Profile" to test CSRF protection</li>
          <li>Click "Logout" to clear session</li>
        </ol>
        <p><strong>🔍 Check Console:</strong> All requests and CSRF tokens are logged</p>
      </div>
    </div>
  );
};

export default AuthTest;