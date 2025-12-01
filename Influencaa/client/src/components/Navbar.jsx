import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Search,
  BarChart3,
  Users,
  ArrowRight,
  Star,
  Zap,
  Target,
  ChevronDown,
  User,
  Mail,
  Wallet,
  MapPin,
  LogOut,
  Settings,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const profileRef = useRef(null);
  const controls = useAnimation();

  const { clientToken, setClientToken } = useAppContext();

  // Mock user data
  const [user, setUser] = useState(
    clientToken
      ? {
          name: "John Brand",
          email: "john@nike.com",
          company: "Nike Inc.",
          role: "Marketing Manager",
          avatar: "/api/placeholder/40/40",
        }
      : null
  );

  const navLinks = clientToken
    ? [
        {
          name: "Home",
          path: "/",
          icon: <Home size={18} />,
        },
        {
          name: "Explore",
          path: "/explore",
          icon: <Search size={18} />,
        },
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <BarChart3 size={18} />,
        },
        {
          name: "About",
          path: "/about",
          icon: <Users size={18} />,
        },
      ]
    : [];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      if (scrollY > 100) {
        controls.start({
          opacity: 1,
          y: 0,
          backdropFilter: "blur(20px)",
        });
      } else {
        controls.start({
          opacity: 1,
          y: 0,
          backdropFilter: "blur(10px)",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close navigation dropdowns
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && !ref.contains(event.target)) {
          setActiveDropdown(null);
        }
      });

      // Close profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (linkName) => {
    setActiveDropdown(activeDropdown === linkName ? null : linkName);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDirectNavigation = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    setClientToken(null);
    setProfileOpen(false);
    navigate("/");
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setProfileOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.nav
      animate={controls}
      initial="hidden"
      variants={containerVariants}
      className={`fixed top-4 right-[3.5%] sm:left-[10%] transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200/50"
          : "bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200/30"
      } rounded-2xl`}
      style={{ width: "calc(100% - 2rem)", maxWidth: "1200px" }}
    >
      {/* Navbar Container - Made Thinner */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {" "}
          {/* Reduced from h-16 lg:h-14 to h-12 */}
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Zap size={16} className="text-white" />{" "}
                {/* Reduced icon size */}
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-brasika font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {" "}
                {/* Reduced text size */}
                Influencaa
              </span>
              <span className="text-xs text-gray-500 font-outfit -mt-1">
                For Brands
              </span>
            </div>
          </motion.div>
          {/* Desktop Navigation Links - Centered */}
          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
            {" "}
            {/* Reduced gap */}
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                ref={(el) => (dropdownRefs.current[link.name] = el)}
              >
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-outfit font-semibold transition-all duration-300 group text-sm ${
                        location.pathname === link.path
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <motion.div
                      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50 ${
                        activeDropdown === link.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                      initial={false}
                      animate={{
                        opacity: activeDropdown === link.name ? 1 : 0,
                        y: activeDropdown === link.name ? 0 : -10,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3">
                        <div className="space-y-1">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => handleDirectNavigation(item.path)}
                              className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded-xl transition-all duration-200 group text-sm ${
                                location.pathname === item.path
                                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                              }`}
                            >
                              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60 group-hover:opacity-100" />
                              <span className="font-outfit font-medium">
                                {item.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1.5 rounded-xl font-outfit font-semibold transition-all duration-300 group text-sm ${
                        isActive
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </div>
          {/* CTA Buttons & User Profile */}
          <div className="hidden lg:flex items-center gap-2">
            {" "}
            {/* Reduced gap */}
            {clientToken && user ? (
              // User is logged in - show profile icon with clickable dropdown
              <div className="relative" ref={profileRef}>
                <motion.button
                  onClick={toggleProfile}
                  className="flex items-center justify-center w-8 h-8 rounded-xl font-outfit font-semibold transition-all duration-300 hover:bg-orange-50 text-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />{" "}
                    {/* Reduced icon size */}
                  </div>
                </motion.button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50"
                  >
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-brasika font-bold text-sm">
                            {user.name}
                          </h3>
                          <p className="font-outfit text-white/80 text-xs">
                            {user.email}
                          </p>
                          <p className="font-outfit text-white/80 text-xs">
                            {user.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Links - Fixed Sign Out Button */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl transition-all duration-200 hover:bg-red-50 text-red-600 font-outfit font-semibold text-sm"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              // User is not logged in - show login button
              <motion.button
                className="px-4 py-2 text-gray-700 font-outfit font-semibold rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg text-sm" // Reduced padding and text size
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
              >
                Sign In
              </motion.button>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {clientToken && user && (
              <div className="relative" ref={profileRef}>
                <motion.button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-1.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors duration-200" // Reduced padding
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User size={18} /> {/* Reduced icon size */}
                </motion.button>

                {/* Mobile Profile Dropdown */}
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden z-50"
                  >
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      {" "}
                      {/* Reduced padding */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                          {" "}
                          {/* Reduced size */}
                          <User size={16} className="text-white" />{" "}
                          {/* Reduced icon size */}
                        </div>
                        <div>
                          <h3 className="font-brasika font-bold text-sm">
                            {user.name}
                          </h3>
                          <p className="font-outfit text-white/80 text-xs">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl transition-all duration-200 hover:bg-red-50 text-red-600 font-outfit font-semibold text-sm"
                      >
                        <LogOut size={14} /> {/* Reduced icon size */}
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors duration-200" // Reduced padding
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}{" "}
              {/* Reduced icon size */}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden mt-2 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-3 space-y-1">
            {" "}
            {/* Reduced padding and spacing */}
            {navLinks.map((link) => (
              <div key={link.name} className="space-y-1">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl font-outfit font-semibold transition-all duration-200 text-sm ${
                        location.pathname === link.path
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "text-gray-700 hover:bg-orange-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {" "}
                        {/* Reduced gap */}
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Dropdown */}
                    {activeDropdown === link.name && (
                      <motion.div
                        className="ml-4 space-y-1 bg-orange-50/50 rounded-xl p-1" /* Reduced padding and margin */
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.dropdown.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleDirectNavigation(item.path)}
                            className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-lg transition-all duration-200 text-sm ${
                              location.pathname === item.path
                                ? "bg-orange-500 text-white"
                                : "text-gray-700 hover:bg-orange-100"
                            }`}
                          >
                            <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                            <span className="font-outfit font-medium">
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleDirectNavigation(link.path)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-xl font-outfit font-semibold transition-all duration-200 text-sm ${
                      location.pathname === link.path
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </button>
                )}
              </div>
            ))}
            {/* Mobile CTA Buttons - Only show if not logged in */}
            {!clientToken && (
              <div className="pt-2 border-t border-orange-200 space-y-1">
                {" "}
                {/* Reduced padding and spacing */}
                <button
                  onClick={() => handleDirectNavigation("/login")}
                  className="w-full px-3 py-2 text-gray-700 font-outfit font-semibold rounded-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 text-center text-sm"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
