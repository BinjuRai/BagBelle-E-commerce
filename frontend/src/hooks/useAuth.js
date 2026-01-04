import { useState, useEffect } from "react";
import * as userService from "../services/userService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await userService.getProfile();
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (credentials) => {
    const res = await userService.loginUser(credentials);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, logout, setUser };
};
