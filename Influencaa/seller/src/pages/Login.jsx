import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  Shield,
  ArrowLeft,
  Instagram,
  Youtube,
  Hash,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Ensuring the relative path is correct based on standard src/pages vs src/context structure
import { useAppContext } from "../context/AppContext.jsx";

// Reusable Background Blob Component
const Blob = ({ className, delay }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-40 ${className}`}
    animate={{
      scale: [1, 1.1, 1],
      x: [0, 30, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

const Login = () => {
  // 1. Extract setInfluencerToken from Context
  const { setInfluencerToken, loadUserProfile, axios } = useAppContext();

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    niche: "",
  });

  const navigate = useNavigate();

  // Calculate Password Strength
  useEffect(() => {
    if (!isLogin) {
      let score = 0;
      if (formData.password.length > 6) score++;
      if (formData.password.length > 10) score++;
      if (/[A-Z]/.test(formData.password)) score++;
      if (/[0-9]/.test(formData.password)) score++;
      if (/[^A-Za-z0-9]/.test(formData.password)) score++;
      setPasswordStrength(score);
    }
  }, [formData.password, isLogin]);

  const niches = [
    "Fashion & Lifestyle",
    "Tech & Gaming",
    "Food & Beverage",
    "Travel",
    "Fitness & Health",
    "Beauty & Makeup",
    "Education",
    "Entertainment",
    "Finance",
    "Other",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // --- LOGIN LOGIC ---
        const res = await axios.post("/api/influencer/login", {
          email: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          // A. Set token in localStorage
          localStorage.setItem("influencerToken", res.data.influencerToken);

          // B. CRITICAL: Update Context State to trigger Navbar refresh
          setInfluencerToken(res.data.influencerToken);

          // C. Optional: Immediately fetch profile data to populate Navbar
          if (loadUserProfile) await loadUserProfile();

          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(res.data.message || "Invalid credentials!");
        }
      } else {
        // --- REGISTER LOGIC ---
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }
        const res = await axios.post("/api/influencer/register", {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          niche: formData.niche,
        });

        if (res.data.success) {
          localStorage.setItem("influencerToken", res.data.influencerToken);

          // Update Context here as well for immediate login after signup
          setInfluencerToken(res.data.influencerToken);
          if (loadUserProfile) await loadUserProfile();

          toast.success("Account created successfully!");
          navigate("/");
        } else {
          toast.error(res.data.message || "Registration failed!");
        }
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Password Strength Color Logic
  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-outfit">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <Blob className="top-0 left-0 w-96 h-96 bg-orange-300" delay={0} />
        <Blob className="bottom-0 right-0 w-96 h-96 bg-red-300" delay={2} />
        <Blob className="top-1/2 left-1/2 w-80 h-80 bg-pink-300" delay={4} />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Navbar Placeholder */}
      <div className="h-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-16">
          {/* Left Side - Immersive Info */}
          <motion.div
            className="lg:w-5/12 flex flex-col justify-center lg:block hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-orange-100 rounded-full text-orange-600 text-sm font-bold shadow-sm mb-6"
              >
                <Sparkles size={16} />
                <span>#1 Platform for Creators</span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-brasika font-bold text-slate-900 leading-[1.1] mb-6">
                Turn Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Passion
                </span>{" "}
                into <br />
                Profit.
              </h1>

              <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md">
                Join a curated network of 50,000+ creators connecting with
                premium brands. Secure payments, real growth.
              </p>

              {/* Floating Success Cards */}
              <div className="relative h-48">
                <motion.div
                  className="absolute top-0 left-0 right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">
                        Avg. Campaign Value
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        ₹45,000
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-20 left-10 right-0 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                      <Shield size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">
                        Escrow Secured
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        100% Safe
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            className="lg:w-5/12 w-full"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 relative overflow-hidden">
              {/* Toggle Switch */}
              <div className="flex bg-slate-100/80 p-1 rounded-xl mb-8 relative">
                <motion.div
                  className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm"
                  initial={false}
                  animate={{
                    left: isLogin ? "4px" : "50%",
                    width: "calc(50% - 4px)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 relative z-10 text-sm font-bold transition-colors duration-300 ${
                    isLogin ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 relative z-10 text-sm font-bold transition-colors duration-300 ${
                    !isLogin ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  Register
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField
                          icon={User}
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-span-2">
                        <div className="relative group">
                          <Hash
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                            size={20}
                          />
                          <select
                            name="niche"
                            value={formData.niche}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                            required
                          >
                            <option value="" disabled>
                              Select Niche
                            </option>
                            {niches.map((n) => (
                              <option key={n} value={n}>
                                {n}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <ArrowRight
                              size={14}
                              className="text-slate-400 rotate-90"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <InputField
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <div className="relative group">
                    <Lock
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Meter (Register Only) */}
                  {!isLogin && formData.password && (
                    <div className="space-y-1">
                      <div className="flex gap-1 h-1.5">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div
                            key={step}
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              step <= passwordStrength
                                ? getStrengthColor()
                                : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 text-right font-medium">
                        {passwordStrength <= 2
                          ? "Weak"
                          : passwordStrength <= 4
                          ? "Medium"
                          : "Strong"}{" "}
                        Password
                      </p>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="relative group">
                      <Lock
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
                        size={20}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:ring-4 outline-none transition-all font-medium text-slate-700 ${
                          formData.confirmPassword &&
                          formData.password !== formData.confirmPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-slate-200 focus:border-orange-500 focus:ring-orange-500/10"
                        }`}
                        required
                      />
                      {formData.confirmPassword && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          {formData.password === formData.confirmPassword ? (
                            <Check size={18} className="text-green-500" />
                          ) : (
                            <X size={18} className="text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {isLogin && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-xs font-bold text-orange-600 hover:text-orange-700"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 group transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight
                      size={18}
                      className="transform group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </motion.form>
              </AnimatePresence>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white/50 backdrop-blur-sm text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SocialButton
                    icon={Instagram}
                    label="Instagram"
                    color="text-pink-600"
                  />
                  <SocialButton
                    icon={Youtube}
                    label="YouTube"
                    color="text-red-600"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Back Button */}
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 z-50 p-3 bg-white/80 backdrop-blur-md text-slate-700 rounded-full border border-white/50 shadow-lg hover:scale-110 transition-all"
        whileHover={{ x: -3 }}
      >
        <ArrowLeft size={20} />
      </motion.button>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative group">
    <Icon
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
      size={20}
    />
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
      required
    />
  </div>
);

const SocialButton = ({ icon: Icon, label, color }) => (
  <button
    type="button"
    className="flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group"
  >
    <Icon
      size={18}
      className={`${color} group-hover:scale-110 transition-transform`}
    />
    <span className="text-sm font-bold text-slate-600">{label}</span>
  </button>
);

export default Login;
