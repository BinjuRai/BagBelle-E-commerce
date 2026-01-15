// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { registerUserApi, loginUserApi } from "../services/userService";
// import { useAuth } from "../auth/authProvider";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const navigate = useNavigate();
//   const { login, redirectPath, setRedirectPath } = useAuth();

//   // Auto-login after registration
//   const loginMutation = useMutation({
//     mutationFn: loginUserApi,
//     onSuccess: (response) => {
//       const { token, user } = response.data.data;
//       login(user, token);
//       toast.success(`Welcome to Luxury Bags, ${user.name}! ✨`);

//       const destination = redirectPath || "/";
//       setRedirectPath(null);
//       navigate(destination);
//     },
//   });

//   const registerMutation = useMutation({
//     mutationFn: registerUserApi,
//     onSuccess: () => {
//       toast.success("Registration successful! Logging you in...");
//       loginMutation.mutate({
//         email: formData.email,
//         password: formData.password,
//       });
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Registration failed");
//     },
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     registerMutation.mutate(formData);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-surface-light relative overflow-hidden">
//       {/* Floating luxury icons */}
//       <div className="absolute top-10 left-10 w-16 h-16 bg-leather-icon bg-no-repeat bg-contain animate-float-slow opacity-60"></div>
//       <div className="absolute top-1/3 right-20 w-12 h-12 bg-leather-icon bg-no-repeat bg-contain animate-float-slow delay-2000 opacity-50"></div>
//       <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-leather-icon bg-no-repeat bg-contain animate-float-slow delay-4000 opacity-40"></div>

//       {/* Central container */}
//       <div className="relative flex flex-col md:flex-row bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
//         {/* Logo */}
//         <div className="absolute top-4 left-4 z-10 ">
//           <img
//             src="src/assets/images/BagbelleLogo.svg"
//             alt="Premium Bags Logo"
//             className="w-12 h-auto"
//           />
//         </div>

//         {/* Left side - Form */}
//         <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-0">
//           <h2 className="text-2xl font-bold text-center mt-6 mb-6 text-text-light dark:text-text-dark secondary-font">
//             Step Into Luxury With Our Premium Bags 👜
//           </h2>

//           {redirectPath && (
//             <div className="mb-4 p-3 bg-accent/10 border border-accent rounded-lg">
//               <p className="text-sm text-accent">
//                 Create an account to continue your journey
//               </p>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
//                 placeholder="John Doe"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
//                 placeholder="1234567890"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 minLength={6}
//                 className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
//                 placeholder="••••••••"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={registerMutation.isLoading || loginMutation.isLoading}
//               className="w-full bg-primary hover:bg-primary-hover text-surface-light py-2 rounded-lg font-semibold disabled:bg-muted-dark transition"
//             >
//               {registerMutation.isLoading || loginMutation.isLoading
//                 ? "Creating account..."
//                 : "Register"}
//             </button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-light dark:text-muted-dark">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-accent hover:underline font-semibold"
//               >
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Right side - Image */}
//         <div className="hidden md:flex md:w-1/2 h-64 md:h-auto overflow-hidden">
//           <img
//             src="src/assets/images/luxury-bag-hero.jpg"
//             alt="Luxury bag"
//             className="w-full h-full object-cover transform transition-transform duration-500"
//           />
//         </div>
//       </div>

//       {/* Tailwind Animations */}
//       <style>{`
//         @keyframes float {
//           0% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-15px) rotate(5deg); }
//           100% { transform: translateY(0px) rotate(0deg); }
//         }
//         .animate-float-slow { animation: float 6s ease-in-out infinite; }
//         .delay-2000 { animation-delay: 2s; }
//         .delay-4000 { animation-delay: 4s; }
//         .bg-leather-icon {
//           background-image: url('https://images.unsplash.com/photo-1598300051773-7e79a2d7a68a?auto=format&fit=crop&w=64&q=80');
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi, loginUserApi } from "../services/userService";
import { useAuth } from "../auth/authProvider";
import { toast } from "react-toastify";

// 🔒 PASSWORD STRENGTH CHECKER
const calculatePasswordStrength = (password) => {
  let score = 0;
  const feedback = [];

  if (!password) return { score: 0, feedback: ["Enter a password"], color: "gray" };

  // Length
  if (password.length >= 8) score++;
  else feedback.push("At least 8 characters");
  
  if (password.length >= 12) score++;

  // Uppercase
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add uppercase letter (A-Z)");
  }

  // Lowercase
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("Add lowercase letter (a-z)");
  }

  // Numbers
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("Add number (0-9)");
  }

  // Special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score++;
  } else {
    feedback.push("Add special character (!@#$...)");
  }

  // Determine strength
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

  return { score, strength, color, width, feedback };
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    strength: "Weak",
    color: "gray",
    width: "0%",
    feedback: []
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, redirectPath, setRedirectPath } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (response) => {
      const { token, user } = response.data.data;
      login(user, token);
      toast.success(`Welcome to Luxury Bags, ${user.name}! ✨`);

      const destination = redirectPath || "/";
      setRedirectPath(null);
      navigate(destination);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUserApi,
    onSuccess: () => {
      toast.success("Registration successful! Logging you in...");
      loginMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Registration failed";
      const errors = error.response?.data?.errors;
      
      if (errors && Array.isArray(errors)) {
        errors.forEach(err => toast.error(err));
      } else {
        toast.error(errorMsg);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 🔒 UPDATE PASSWORD STRENGTH IN REAL-TIME
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔒 CLIENT-SIDE VALIDATION
    if (passwordStrength.score < 3) {
      toast.error("Please use a stronger password");
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background-light to-surface-light relative overflow-hidden">
      {/* Floating luxury icons */}
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

        {/* Left side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-0">
          <h2 className="text-2xl font-bold text-center mt-6 mb-6 text-text-light dark:text-text-dark secondary-font">
            Step Into Luxury With Our Premium Bags 👜
          </h2>

          {redirectPath && (
            <div className="mb-4 p-3 bg-accent/10 border border-accent rounded-lg">
              <p className="text-sm text-accent">
                Create an account to continue your journey
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                placeholder="1234567890"
              />
            </div>

            {/* 🔒 PASSWORD WITH STRENGTH METER */}
            <div>
              <label className="block text-sm font-medium mb-2 text-text-light dark:text-text-dark">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-2 pr-12 border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* PASSWORD STRENGTH METER */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
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

                  {/* FEEDBACK */}
                  {passwordStrength.feedback.length > 0 && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {passwordStrength.feedback.map((tip, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span>❌</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {passwordStrength.score >= 5 && (
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <span>✅</span>
                      <span>Strong password!</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={registerMutation.isLoading || loginMutation.isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-surface-light py-2 rounded-lg font-semibold disabled:bg-muted-dark transition"
            >
              {registerMutation.isLoading || loginMutation.isLoading
                ? "Creating account..."
                : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-light dark:text-muted-dark">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:flex md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img
            src="src/assets/images/luxury-bag-hero.jpg"
            alt="Luxury bag"
            className="w-full h-full object-cover transform transition-transform duration-500"
          />
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float-slow { animation: float 6s ease-in-out infinite; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
        .bg-leather-icon {
          background-image: url('https://images.unsplash.com/photo-1598300051773-7e79a2d7a68a?auto=format&fit=crop&w=64&q=80');
        }
      `}</style>
    </div>
  );
};

export default Register;