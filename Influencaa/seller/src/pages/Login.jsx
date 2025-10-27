import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowLeft,
  Instagram,
  Youtube,
  Camera,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Benefits for Influencers
  const influencerBenefits = [
    {
      icon: DollarSign,
      title: "Earn More",
      description:
        "Get fair pricing and timely payments for your creative work",
    },
    {
      icon: Users,
      title: "Brand Partnerships",
      description: "Connect with authentic brands that match your audience",
    },
    {
      icon: TrendingUp,
      title: "Growth Tools",
      description: "Access analytics and insights to grow your influence",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Escrow protection ensures you get paid for completed work",
    },
  ];

  // Platform Stats for Creators
  const platformStats = [
    { count: "50K+", label: "Successful Creators" },
    { count: "₹10Cr+", label: "Paid to Creators" },
    { count: "95%", label: "Payment Success Rate" },
    { count: "4.9/5", label: "Creator Satisfaction" },
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

    // Generate influencer token
    const token = `inf_${Math.random()
      .toString(36)
      .substr(2, 9)}_${Date.now()}`;

    // Store token
    localStorage.setItem("infToken", token);

    // Redirect to influencer dashboard
    navigate("/influencer/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 pb-16 to-red-50 relative overflow-hidden">
      {/* Background decorative elements */}
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
                <Camera size={16} className="mr-2" />
                For Content Creators
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl lg:text-4xl xl:text-5xl font-brasika font-bold text-gray-900 leading-tight mb-4"
              >
                Monetize Your{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Influence
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg lg:text-xl font-playfair text-gray-700 mb-6 leading-relaxed"
              >
                Join thousands of creators earning with authentic brand
                partnerships and secure payments. Turn your passion into profit.
              </motion.p>

              {/* Benefits Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              >
                {influencerBenefits.map((benefit, index) => {
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

              {/* Creator Success Stories */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-100"
              >
                <h3 className="font-brasika font-bold text-gray-900 mb-3 text-sm">
                  Creator Success Stories
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-outfit">
                      @TravelWithMe earned
                    </span>
                    <span className="font-bold text-orange-600">₹2.5L</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-outfit">
                      @FoodieAdventures earned
                    </span>
                    <span className="font-bold text-orange-600">₹1.8L</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-outfit">
                      @FitnessGuru earned
                    </span>
                    <span className="font-bold text-orange-600">₹3.2L</span>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-100 mt-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {platformStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {stat.count}
                      </div>
                      <div className="text-gray-600 text-xs font-outfit">
                        {stat.label}
                      </div>
                    </div>
                  ))}
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
                {/* Welcome Header */}
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-3"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <User className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-brasika font-bold text-gray-900">
                    {isLogin
                      ? "Welcome Back, Creator!"
                      : "Join Our Creator Community"}
                  </h2>
                  <p className="text-gray-600 font-outfit text-sm mt-2">
                    {isLogin
                      ? "Sign in to manage your partnerships and earnings"
                      : "Start your journey to monetize your influence"}
                  </p>
                </div>

                {/* Auth Type Toggle */}
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
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Email Address
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
                            placeholder="your@email.com"
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

                      {/* Social Login */}
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white text-gray-500">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            className="py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-outfit text-xs"
                          >
                            <Instagram className="w-4 h-4 text-pink-600 mr-1" />
                            Instagram
                          </button>
                          <button
                            type="button"
                            className="py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center font-outfit text-xs"
                          >
                            <Youtube className="w-4 h-4 text-red-600 mr-1" />
                            YouTube
                          </button>
                        </div>
                      </div>

                      {/* Sign In Button */}
                      <motion.button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group transition-all duration-300 text-sm"
                        whileHover={{ y: -1, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>Sign In as Creator</span>
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

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-outfit font-semibold text-gray-700">
                          Email Address
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
                            placeholder="your@email.com"
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
                        <span>Join as Creator</span>
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

      {/* Back to Home Button */}
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
