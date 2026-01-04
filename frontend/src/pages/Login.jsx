import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../services/userService";
import { useAuth } from "../auth/authProvider";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const { login, redirectPath, setRedirectPath } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUserApi,

    onSuccess: (response) => {
      const { token, user } = response.data.data;
      if (!token || !user) {
        toast.error("Login failed: invalid response from server");
        return;
      }

      login(user, token);
      toast.success(`Welcome back, ${user.name}! ✨`);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        const destination = redirectPath || location.state?.from?.pathname || "/";
        setRedirectPath(null);
        navigate(destination);
      }
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-surface-light relative overflow-hidden">
      {/* Floating leather icons */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-leather-icon bg-no-repeat bg-contain animate-float-slow opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-leather-icon bg-no-repeat bg-contain animate-float-slow delay-2000 opacity-50"></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-leather-icon bg-no-repeat bg-contain animate-float-slow delay-4000 opacity-40"></div>

      {/* Central container */}
      <div className="relative flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-10">
          <img
            src="src/assets/images/BagbelleLogo.svg"
            alt="Premium Bags Logo"
            className="w-12 h-auto"
          />
        </div>

        {/* Left Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src="src/assets/images/luxury-bag-hero.jpg"
            alt="Luxury bag"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-0">
          <h2 className="text-2xl font-bold text-center mb-6 text-text-light dark:text-text-dark secondary-font">
            Step Into Luxury With Our Premium Bags 👜
          </h2>

          {redirectPath && (
            <div className="mb-4 p-3 bg-accent/10 border border-accent rounded-lg">
              <p className="text-sm text-accent">
                Please login to continue with your purchase
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-surface-light py-2 rounded-lg font-semibold disabled:bg-muted-dark transition"
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-muted-light dark:text-muted-dark">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-accent hover:underline font-semibold"
              >
                Register here
              </Link>
            </p>
            <Link
              to="/forgot-password"
              className="block text-sm text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        .bg-leather-icon {
          background-image: url('https://images.unsplash.com/photo-1598300051773-7e79a2d7a68a?auto=format&fit=crop&w=64&q=80');
        }
      `}</style>
    </div>
  );
};

export default Login;
