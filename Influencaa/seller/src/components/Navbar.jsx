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
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
  Settings,
  ShoppingCart,
  CreditCard,
  Megaphone,
  DollarSign,
  TrendingUp,
  Package,
  Receipt,
  Bell,
  MessageCircle,
  Heart,
  Star,
  Zap,
  Calendar,
  FileText,
  Shield,
  HelpCircle,
  BookOpen,
  Gift,
  Crown,
  Target,
  Eye,
  Clock,
  CheckCircle2,
  Wallet,
  PieChart,
  BarChart,
  Activity,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);
  const controls = useAnimation();

  // Check for influencer token
  const [infToken, setInfToken] = useState(true);

  // Mock influencer data
  const [influencer, setInfluencer] = useState(
    infToken
      ? {
          name: "Sarah Johnson",
          username: "@sarahcreates",
          email: "sarah@creator.com",
          rating: 4.9,
          completedOrders: 47,
          responseTime: "1 hour",
          earnings: "₹2,85,000",
          avatar: "/api/placeholder/40/40",
          level: "Pro Creator",
          isOnline: true,
        }
      : null
  );

  // Notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Nike wants you for their summer campaign",
      time: "5 min ago",
      read: false,
      amount: "₹15,000",
    },
    {
      id: 2,
      type: "message",
      title: "New Message",
      message: "Adidas team sent you a message",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      message: "₹8,500 credited to your account",
      time: "2 hours ago",
      read: true,
      amount: "₹8,500",
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      message: "You received a 5-star review from Puma",
      time: "1 day ago",
      read: true,
    },
  ]);

  // Navigation links for Influencers
  const influencerNavLinks = [
    {
      id: 1,
      label: "Campaigns",
      path: "/influencer/campaigns",
      icon: <Megaphone size={18} />,
    },
    {
      id: 2,
      label: "Orders",
      path: "/influencer/orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      id: 3,
      label: "Earnings",
      path: "/influencer/earnings",
      icon: <DollarSign size={18} />,
    },
    {
      id: 4,
      label: "Analytics",
      path: "/influencer/analytics",
      icon: <BarChart size={18} />,
    },
  ];

  // Quick stats for the navbar
  const quickStats = {
    balance: "₹15,250",
    pending: "₹25,500",
    activeOrders: 3,
    unreadMessages: 2,
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setProfileOpen(false);
    setNotificationsOpen(false);
  }, [location]);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      controls.start({
        opacity: 1,
        y: 0,
        backdropFilter: scrollY > 50 ? "blur(20px)" : "blur(10px)",
      });
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
          setOpenDropdown(null);
        }
      });

      // Close profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

      // Close notifications dropdown
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleDirectNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
  };

  const handleNotificationClick = (notification) => {
    setNotificationsOpen(false);

    // Navigate based on notification type
    switch (notification.type) {
      case "order":
        handleDirectNavigation("/influencer/orders");
        break;
      case "message":
        handleDirectNavigation("/influencer/messages");
        break;
      case "payment":
        handleDirectNavigation("/influencer/earnings");
        break;
      case "review":
        handleDirectNavigation("/influencer/reviews");
        break;
      default:
        handleDirectNavigation("/influencer/notifications");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("infToken");
    setInfToken(null);
    setInfluencer(null);
    setProfileOpen(false);
    navigate("/");
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-lg border-b border-gray-200/30"
      }`}
    >
      {/* Top Bar with Stats */}
      {influencer && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Wallet size={12} />
                <span>
                  Balance: <strong>{quickStats.balance}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={12} />
                <span>
                  Pending: <strong>{quickStats.pending}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Package size={12} />
                <span>
                  Active Orders: <strong>{quickStats.activeOrders}</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Crown size={12} />
                <span>{influencer.level}</span>
              </div>
              <div
                className={`flex items-center space-x-1 ${
                  influencer.isOnline ? "text-green-300" : "text-gray-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    influencer.isOnline ? "bg-green-300" : "bg-gray-300"
                  }`}
                />
                <span>{influencer.isOnline ? "Online" : "Offline"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Zap size={16} className="text-white" />
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col mx-2">
              <span className="font-brasika font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Influencaa
              </span>
              <span className="text-xs text-gray-500 font-outfit -mt-1">
                Creator Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {influencerNavLinks.map(({ id, label, path, icon, links }) => (
              <div
                key={id}
                className="group relative"
                ref={(el) => (dropdownRefs.current[id] = el)}
              >
                <div className="flex items-center gap-1 cursor-pointer">
                  <div
                    onClick={() => handleDirectNavigation(path)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-outfit font-semibold transition-all duration-300 group text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                  >
                    {icon}
                    <span>{label}</span>
                  </div>
                  {links && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 text-gray-600" />
                  )}
                </div>

                {/* Desktop Dropdown Menu */}
                {links && (
                  <div className="absolute left-0 mt-2 hidden group-hover:block transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 py-2 px-1 z-20 w-80">
                    {links.map(
                      ({ to, label, icon, description, badge }, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDirectNavigation(to)}
                          className={`flex items-center justify-between w-full text-left p-3 rounded-lg transition-all duration-200 group text-sm ${
                            location.pathname === to
                              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                              : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                location.pathname === to
                                  ? "bg-white/20"
                                  : "bg-orange-100"
                              }`}
                            >
                              {icon}
                            </div>
                            <div className="text-left">
                              <div className="font-outfit font-semibold flex items-center gap-2">
                                {label}
                                {badge && (
                                  <span
                                    className={`px-1.5 py-0.5 text-xs rounded-full ${
                                      location.pathname === to
                                        ? "bg-white/30 text-white"
                                        : "bg-orange-500 text-white"
                                    }`}
                                  >
                                    {badge}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-xs ${
                                  location.pathname === to
                                    ? "text-white/80"
                                    : "text-gray-500"
                                }`}
                              >
                                {description}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {influencer ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 relative"
                  >
                    <Bell size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50">
                      <div className="p-4 border-b border-orange-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-brasika font-bold text-gray-900">
                            Notifications
                          </h3>
                          <span className="text-orange-600 text-sm font-outfit font-semibold">
                            {unreadNotifications} unread
                          </span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className={`w-full text-left p-3 border-b border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors ${
                              !notification.read ? "bg-blue-50" : ""
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-outfit font-semibold text-sm">
                                    {notification.title}
                                  </span>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-xs mb-1">
                                  {notification.message}
                                </p>
                                {notification.amount && (
                                  <span className="text-green-600 text-xs font-semibold">
                                    {notification.amount}
                                  </span>
                                )}
                                <div className="text-gray-400 text-xs mt-1">
                                  {notification.time}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="p-2 border-t border-orange-100">
                        <button
                          className="w-full text-center text-orange-600 hover:text-orange-700 font-outfit font-semibold text-sm py-2"
                          onClick={() =>
                            handleDirectNavigation("/influencer/notifications")
                          }
                        >
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <button
                  onClick={() => handleDirectNavigation("/influencer/messages")}
                  className="p-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 relative"
                >
                  <MessageCircle size={20} />
                  {quickStats.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {quickStats.unreadMessages}
                    </span>
                  )}
                </button>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-outfit font-semibold transition-all duration-300 hover:bg-orange-50 text-gray-700"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      {influencer.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="text-left hidden lg:block">
                      <div className="text-sm font-semibold">
                        {influencer.name.split(" ")[0]}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Star
                          size={10}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {influencer.rating}
                      </div>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50">
                      {/* User Info Header */}
                      <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                              <User size={24} className="text-white" />
                            </div>
                            {influencer.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-brasika font-bold text-sm">
                              {influencer.name}
                            </h3>
                            <p className="font-outfit text-white/80 text-xs">
                              {influencer.username}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Crown size={12} className="text-yellow-300" />
                              <span className="text-xs text-white/90">
                                {influencer.level}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="p-3 bg-orange-50 border-b border-orange-100">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-bold text-gray-900">
                              {influencer.completedOrders}
                            </div>
                            <div className="text-gray-600">Orders</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900">
                              {influencer.rating}
                            </div>
                            <div className="text-gray-600">Rating</div>
                          </div>
                        </div>
                      </div>

                      {/* Profile Links */}
                      <div className="p-2 space-y-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-600 font-outfit font-semibold text-sm"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Not logged in - show login button
              <button
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                onClick={handleLogin}
              >
                Join as Creator
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors duration-200"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 bg-white/95 backdrop-blur-xl border-t border-orange-100 space-y-4 rounded-b-xl">
            {influencerNavLinks.map(({ id, label, path, icon, links }) => (
              <div key={id}>
                <button
                  onClick={() => toggleDropdown(id)}
                  className="w-full flex justify-between items-center py-2 text-lg font-outfit font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span>{label}</span>
                  </div>
                  {links &&
                    (openDropdown === id ? <ChevronUp /> : <ChevronDown />)}
                </button>
                {openDropdown === id && links && (
                  <div className="pl-6 mt-1 space-y-1">
                    {links.map(({ to, label, badge }, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDirectNavigation(to)}
                        className="block w-full text-left py-2 text-sm text-gray-600 hover:text-orange-600 flex items-center justify-between"
                      >
                        <span>{label}</span>
                        {badge && (
                          <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                            {badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Search */}
            {influencer && (
              <div className="pt-4 border-t border-orange-100">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit text-sm w-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
