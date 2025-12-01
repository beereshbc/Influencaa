import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  Megaphone,
  DollarSign,
  Crown,
  Zap,
  Clock,
  Wallet,
  BarChart,
  LogOut,
  Bell,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const { scrollY } = useScroll();

  const { influencerToken, influencer, logout, isLoading } = useAppContext();

  // Detect scroll for styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    // We want the main navbar to start sticking once the user scrolls past the top stats bar (or immediately if logged out)
    setIsScrolled(latest > 10);
  });

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the profile dropdown and the button
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      // Check if the click is outside the notification dropdown and the button
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu/dropdowns on route change
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
  }, [location]);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  const navLinks = [
    { path: "/influencer/campaigns", label: "Campaigns", icon: Megaphone },
    { path: "/influencer/orders", label: "Orders", icon: ShoppingCart },
    { path: "/influencer/earnings", label: "Earnings", icon: DollarSign },
    { path: "/influencer/analytics", label: "Analytics", icon: BarChart },
  ];

  // Mock Notifications
  const notifications = [
    {
      id: 1,
      text: "New campaign invitation from Nike",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Payment of ₹15,000 received",
      time: "1h ago",
      unread: false,
    },
  ];

  // Determine the correct top padding/height for the main navbar
  // The top stats bar has a fixed height (approx 18px).
  // The main navbar should sit right below it when not scrolled.
  const NAVBAR_TOP_OFFSET = influencerToken ? "18px" : "0";

  // Helper component for the Profile Avatar (reused)
  const ProfileAvatar = ({ size = "8", initial }) => (
    <div
      className={`w-${size} h-${size} bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-sm`}
    >
      <span className="font-bold text-sm">{initial}</span>
    </div>
  );

  return (
    <>
      {/* --- Top Bar Stats (Desktop Only - Logged In) --- */}
      <AnimatePresence>
        {influencerToken && !isScrolled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "18px", opacity: 1 }} // Explicitly set height
            exit={{ height: 0, opacity: 0 }}
            className="hidden md:block bg-orange-50 border-b border-orange-100 text-xs py-0 px-4 font-outfit fixed top-0 left-0 right-0 z-50 overflow-hidden"
            style={{ height: "18px" }} // Tailwind utility classes are often better than inline styles
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Wallet size={14} className="text-orange-500" />
                  <span className="text-gray-500">Balance:</span>
                  <span className="font-bold text-gray-800">
                    ₹{influencer?.balance || "0"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-orange-400" />
                  <span className="text-gray-500">Pending:</span>
                  <span className="font-bold text-gray-800">
                    ₹{influencer?.pendingBalance || "0"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-green-600 font-medium">Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Navbar --- */}
      <motion.nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 font-outfit ${
          isScrolled || mobileMenuOpen
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-100 top-0"
            : "bg-white border-b border-transparent md:border-b-orange-100"
        }`}
        style={{
          // 🌟 CLEANUP FIX: Use CSS variable or calculated value for top position
          top: isScrolled ? "0" : NAVBAR_TOP_OFFSET,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 1. Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform duration-300">
                <Zap size={20} className="fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-brasika text-xl font-bold text-gray-900 leading-none group-hover:text-orange-600 transition-colors">
                  Influencaa
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                  {influencerToken ? "Creator Hub" : "Connect"}
                </span>
              </div>
            </div>

            {/* 2. Desktop Navigation Links (Logged In) */}
            {influencerToken && (
              <div className="hidden md:flex items-center gap-1 ml-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-orange-50 text-orange-600 shadow-sm border border-orange-100"
                          : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/50"
                      }`
                    }
                  >
                    <link.icon size={18} />
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* 3. Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {isLoading ? (
                // Loading Skeleton
                <div className="flex gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full animate-pulse" />
                  <div className="w-28 h-9 bg-gray-100 rounded-full animate-pulse hidden md:block" />
                </div>
              ) : influencerToken ? (
                /* --- LOGGED IN STATE --- */
                <>
                  {/* Notifications */}
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className={`relative p-2.5 rounded-full transition-all duration-300 ${
                        notificationsOpen
                          ? "bg-orange-100 text-orange-600"
                          : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                      }`}
                    >
                      <Bell size={20} />
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button>

                    {/* Notifications Dropdown (Unchanged) */}
                    <AnimatePresence>
                      {notificationsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden z-50 origin-top-right"
                        >
                          <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-orange-50/30">
                            <h3 className="font-semibold text-gray-800">
                              Notifications
                            </h3>
                            <span className="text-xs text-orange-600 cursor-pointer font-medium hover:text-orange-700">
                              Mark all read
                            </span>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {notifications.map((note) => (
                              <div
                                key={note.id}
                                className={`p-4 border-b border-gray-50 hover:bg-orange-50/30 cursor-pointer transition-colors ${
                                  note.unread ? "bg-orange-50/60" : ""
                                }`}
                              >
                                <div className="flex gap-3">
                                  <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm text-gray-700 leading-snug font-medium">
                                      {note.text}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                                      <Clock size={10} /> {note.time}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className={`flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-300 ${
                        profileOpen
                          ? "border-orange-200 bg-orange-50 shadow-sm"
                          : "border-gray-200 hover:border-orange-200 hover:shadow-md bg-white"
                      }`}
                    >
                      {/* Avatar on the button */}
                      <ProfileAvatar
                        size="8"
                        initial={influencer?.name?.charAt(0) || "U"}
                      />
                      <div className="hidden md:block text-left">
                        <p className="text-xs font-bold text-gray-700 leading-none mb-0.5">
                          {influencer?.name?.split(" ")[0] || "Creator"}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-none">
                          Level {influencer?.level || 1}
                        </p>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-gray-400 transition-transform duration-300 ${
                          profileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Profile Dropdown Menu */}
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden z-50 origin-top-right"
                        >
                          {/* 🌟 FIX: Added Avatar/Icon to Dropdown Header 🌟 */}
                          <div className="p-4 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100 flex items-center gap-3">
                            <ProfileAvatar
                              size="10"
                              initial={influencer?.name?.charAt(0) || "U"}
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-800">
                                {influencer?.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {influencer?.email}
                              </p>
                            </div>
                          </div>

                          <div className="p-2 space-y-1">
                            <button
                              onClick={() => navigate("/influencer/profile")}
                              className="flex items-center w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors group"
                            >
                              <User
                                size={16}
                                className="mr-3 text-gray-400 group-hover:text-orange-500 transition-colors"
                              />
                              Profile
                            </button>
                            <button
                              onClick={() => navigate("/influencer/settings")}
                              className="flex items-center w-full px-3 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors group"
                            >
                              <Settings
                                size={16}
                                className="mr-3 text-gray-400 group-hover:text-orange-500 transition-colors"
                              />
                              Settings
                            </button>
                          </div>

                          <div className="h-px bg-gray-100 mx-2" />

                          <div className="p-2">
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
                            >
                              <LogOut
                                size={16}
                                className="mr-3 text-red-400 group-hover:text-red-600 transition-colors"
                              />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                /* --- LOGGED OUT STATE --- */
                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold text-gray-600 hover:text-orange-600 px-5 py-2.5 rounded-full hover:bg-orange-50 transition-all duration-300"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 px-6 py-2.5 rounded-full shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                  >
                    Join Now
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-orange-100 overflow-hidden shadow-lg"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Profile Card (Logged In) */}
                {influencerToken && (
                  <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-3">
                    {/* Avatar in Mobile Card */}
                    <ProfileAvatar
                      size="10"
                      initial={influencer?.name?.charAt(0) || "U"}
                    />
                    <div>
                      <p className="font-bold text-gray-800">
                        {influencer?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {influencer?.email}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  {influencerToken ? (
                    /* Mobile Nav Links (Logged In) */
                    <>
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                              isActive
                                ? "bg-orange-50 text-orange-600 shadow-sm"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                          }
                        >
                          <link.icon size={20} />
                          {link.label}
                        </NavLink>
                      ))}
                      <NavLink
                        to="/influencer/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "bg-orange-50 text-orange-600 shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`
                        }
                      >
                        <User size={20} />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/influencer/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                            isActive
                              ? "bg-orange-50 text-orange-600 shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`
                        }
                      >
                        <Settings size={20} />
                        Settings
                      </NavLink>
                    </>
                  ) : (
                    /* Mobile Auth Buttons (Logged Out) */
                    <div className="grid gap-4 pt-2">
                      <button
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3.5 font-semibold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Log In
                      </button>
                      <button
                        onClick={() => {
                          navigate("/login"); // Assuming login handles both login/signup flow for simplicity
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3.5 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-200 transition-colors"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>

                {influencerToken && (
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={20} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

// Helper component for the Profile Avatar (moved outside main component)
const ProfileAvatar = ({ size = "8", initial }) => (
  <div
    className={`w-${size} h-${size} bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-sm`}
  >
    <span className="font-bold text-sm">{initial}</span>
  </div>
);

export default Navbar;
