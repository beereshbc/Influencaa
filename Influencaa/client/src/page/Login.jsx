import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Building,
  ArrowRight,
  CheckCircle,
  Target,
  BarChart3,
  Shield,
  Zap,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    companyName: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const benefits = [
    {
      icon: Target,
      title: "Precise Campaigns",
      description:
        "Launch targeted campaigns with AI-powered influencer matching",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track ROI and campaign performance with detailed metrics",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Protected payments and transparent collaboration",
    },
    {
      icon: Zap,
      title: "Quick Launch",
      description: "Go from discovery to campaign launch in hours",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log("Form submitted:", formData);
    // After successful auth, navigate to dashboard
    navigate("/dashboard");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background decorative elements matching header */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-red-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-orange-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      {/* Space for floating navbar */}
      <div className="h-32"></div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Side - Benefits & Info */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-6 shadow-lg"
              >
                <Building size={16} className="mr-2" />
                For Brands & Marketers
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl lg:text-4xl xl:text-5xl font-brasika font-bold text-gray-900 leading-tight mb-4"
              >
                Amplify Your{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Brand Reach
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl font-playfair text-gray-700 mb-6 leading-relaxed"
              >
                Join thousands of successful brands already driving{" "}
                <span className="font-bold text-orange-600">real results</span>{" "}
                with influencer marketing.
              </motion.p>

              {/* Benefits Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              >
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-100"
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <IconComponent size={16} className="text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-brasika font-bold text-gray-900 text-sm">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 font-outfit text-xs leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-100"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      3-5x
                    </div>
                    <div className="text-gray-600 text-xs font-outfit">
                      Higher ROI
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      89%
                    </div>
                    <div className="text-gray-600 text-xs font-outfit">
                      Campaign Success
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Compact Auth Form */}
            <motion.div
              className="lg:w-1/2 w-full max-w-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-orange-100">
                {/* Toggle Switch */}
                <div className="flex bg-orange-50 rounded-xl p-1 mb-6">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-3 rounded-lg font-outfit font-semibold text-sm transition-all duration-300 ${
                      isLogin
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-3 rounded-lg font-outfit font-semibold text-sm transition-all duration-300 ${
                      !isLogin
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-brasika font-bold text-gray-900 text-center">
                        Welcome Back
                      </h2>
                      <p className="text-gray-600 text-center font-outfit text-sm mb-4">
                        Sign in to manage your campaigns and track performance
                      </p>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-10 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Remember Me & Forgot Password */}
                      <div className="flex items-center justify-between text-xs">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="w-3 h-3 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                          />
                          <span className="text-gray-600">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>

                      {/* Sign In Button */}
                      <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 text-sm"
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Sign In to Dashboard</span>
                        <ArrowRight
                          size={16}
                          className="transform group-hover:translate-x-1 transition-transform"
                        />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <h2 className="text-xl font-brasika font-bold text-gray-900 text-center">
                        Start Your Journey
                      </h2>
                      <p className="text-gray-600 text-center font-outfit text-sm mb-4">
                        Create your brand account and launch your first campaign
                      </p>

                      {/* Full Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Full Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Company Name
                        </label>
                        <div className="relative">
                          <Building
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="Your company name"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Work Email
                        </label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@company.com"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-10 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                          />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-outfit text-sm"
                            required
                          />
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <label className="flex items-start space-x-2 text-xs">
                        <input
                          type="checkbox"
                          className="w-3 h-3 mt-0.5 text-orange-500 border-orange-300 rounded focus:ring-orange-200"
                          required
                        />
                        <span className="text-gray-600">
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button
                            type="button"
                            className="text-orange-600 hover:text-orange-700 font-semibold"
                          >
                            Privacy Policy
                          </button>
                        </span>
                      </label>

                      {/* Create Account Button */}
                      <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 text-sm"
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Create Brand Account</span>
                        <ArrowRight
                          size={16}
                          className="transform group-hover:translate-x-1 transition-transform"
                        />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Divider */}
                <div className="mt-6 pt-4 border-t border-orange-200">
                  <p className="text-center text-gray-600 font-outfit text-xs">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                      {isLogin ? "Create account" : "Sign in"}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Back to Home Button */}c
      <motion.button
        onClick={() => navigate("/")}
        className="fixed top-32 left-6 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-outfit font-semibold rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
        whileHover={{ x: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ArrowLeft size={16} />
        Back to Home
      </motion.button>
    </div>
  );
};

export default Login;
