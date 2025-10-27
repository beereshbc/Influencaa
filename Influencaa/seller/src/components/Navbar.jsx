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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
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
  const [infToken, setInfToken] = useState(localStorage.getItem("infToken"));

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
      name: "Campaigns",
      path: "/influencer/campaigns",
      icon: <Megaphone size={18} />,
      dropdown: [
        {
          name: "Available Campaigns",
          path: "/influencer/campaigns",
          icon: <Target size={16} />,
          description: "Find new brand partnerships",
          badge: "12",
        },
        {
          name: "Create New campaign",
          path: "/influencer/campaigns/new",
          icon: <FileText size={16} />,
          description: "Creat new campaign packege",
          badge: "3",
        },
      ],
    },
    {
      name: "Orders",
      path: "/influencer/orders",
      icon: <ShoppingCart size={18} />,
      dropdown: [
        {
          name: "All Orders",
          path: "/influencer/orders",
          icon: <Package size={16} />,
          description: "View all your orders",
          badge: "8",
        },
        {
          name: "Pending Requests",
          path: "/influencer/orders/pending",
          icon: <Clock size={16} />,
          description: "Orders awaiting your response",
          badge: "2",
        },
        {
          name: "In Progress",
          path: "/influencer/orders/active",
          icon: <TrendingUp size={16} />,
          description: "Orders you're working on",
          badge: "3",
        },
        {
          name: "Completed",
          path: "/influencer/orders/completed",
          icon: <CheckCircle2 size={16} />,
          description: "Delivered orders",
        },
        {
          name: "Cancelled",
          path: "/influencer/orders/cancelled",
          icon: <X size={16} />,
          description: "Cancelled orders",
        },
      ],
    },
    {
      name: "Earnings",
      path: "/influencer/earnings",
      icon: <DollarSign size={18} />,
      dropdown: [
        {
          name: "Earnings Overview",
          path: "/influencer/earnings",
          icon: <PieChart size={16} />,
          description: "View your earnings dashboard",
        },
        {
          name: "Pending Payouts",
          path: "/influencer/earnings/pending",
          icon: <Clock size={16} />,
          description: "Amount waiting for clearance",
          badge: "₹25,500",
        },
        {
          name: "Payment History",
          path: "/influencer/earnings/history",
          icon: <Receipt size={16} />,
          description: "Complete transaction history",
        },
        {
          name: "Withdraw Funds",
          path: "/influencer/earnings/withdraw",
          icon: <CreditCard size={16} />,
          description: "Transfer to your bank account",
        },
      ],
    },
    {
      name: "Analytics",
      path: "/influencer/analytics",
      icon: <BarChart size={18} />,
      dropdown: [
        {
          name: "Performance Overview",
          path: "/influencer/analytics",
          icon: <Activity size={16} />,
          description: "Your overall performance",
        },
        {
          name: "Campaign Analytics",
          path: "/influencer/analytics/campaigns",
          icon: <Target size={16} />,
          description: "Campaign-specific insights",
        },
      ],
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

  const toggleDropdown = (linkName) => {
    setActiveDropdown(activeDropdown === linkName ? null : linkName);
  };

  const handleLogoClick = () => {
    navigate("/influencer/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDirectNavigation = (path) => {
    navigate(path);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setProfileOpen(false);
    setNotificationsOpen(false);
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
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {influencerNavLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                ref={(el) => (dropdownRefs.current[link.name] = el)}
              >
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      onMouseEnter={() => setActiveDropdown(link.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-outfit font-semibold transition-all duration-300 group text-sm ${
                        location.pathname === link.path ||
                        (link.dropdown &&
                          link.dropdown.some(
                            (item) => location.pathname === item.path
                          ))
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">
                          {link.badge}
                        </span>
                      )}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <motion.div
                      className={`absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50 ${
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
                      <div className="p-2">
                        <div className="space-y-1">
                          {link.dropdown.map((item) => (
                            <button
                              key={item.name}
                              onClick={() => handleDirectNavigation(item.path)}
                              className={`flex items-center justify-between w-full text-left p-3 rounded-lg transition-all duration-200 group text-sm ${
                                location.pathname === item.path
                                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                  {item.icon}
                                </div>
                                <div className="text-left">
                                  <div className="font-outfit font-semibold flex items-center gap-2">
                                    {item.name}
                                    {item.badge && (
                                      <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
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
                      `flex items-center gap-2 px-3 py-2 rounded-lg font-outfit font-semibold transition-all duration-300 group text-sm ${
                        isActive
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                      }`
                    }
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Actions & Profile */}
          <div className="flex items-center gap-2">
            {influencer ? (
              <>
                {/* Search Bar */}
                <div className="hidden md:block relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit text-sm w-64"
                  />
                </div>

                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <motion.button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </motion.button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50"
                    >
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
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 hover:bg-orange-50 cursor-pointer transition-colors ${
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
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-orange-100">
                        <button className="w-full text-center text-orange-600 hover:text-orange-700 font-outfit font-semibold text-sm py-2">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Messages */}
                <motion.button
                  className="p-2 text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={20} />
                  {quickStats.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {quickStats.unreadMessages}
                    </span>
                  )}
                </motion.button>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                  <motion.button
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg font-outfit font-semibold transition-all duration-300 hover:bg-orange-50 text-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                    <ChevronDown size={14} />
                  </motion.button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setProfileOpen(true)}
                      onMouseLeave={() => setProfileOpen(false)}
                      className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-orange-100 overflow-hidden z-50"
                    >
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
                        <button className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 hover:bg-orange-50 text-gray-700 font-outfit font-semibold text-sm">
                          <User size={16} />
                          <span>Profile & Portfolio</span>
                        </button>

                        <div className="border-t border-orange-100 pt-2 mt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 text-red-600 font-outfit font-semibold text-sm"
                          >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              // Not logged in - show login button
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
              >
                Join as Creator
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden bg-white/95 backdrop-blur-xl border-t border-orange-100 overflow-hidden ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-2">
            {influencerNavLinks.map((link) => (
              <div key={link.name} className="space-y-1">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center justify-between w-full px-3 py-3 rounded-lg font-outfit font-semibold transition-all duration-200 text-sm ${
                        location.pathname === link.path ||
                        (link.dropdown &&
                          link.dropdown.some(
                            (item) => location.pathname === item.path
                          ))
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "text-gray-700 hover:bg-orange-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon}
                        <span>{link.name}</span>
                        {link.badge && (
                          <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">
                            {link.badge}
                          </span>
                        )}
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
                        className="ml-4 space-y-1 bg-orange-50/50 rounded-lg p-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.dropdown.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleDirectNavigation(item.path)}
                            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                              location.pathname === item.path
                                ? "bg-orange-500 text-white"
                                : "text-gray-700 hover:bg-orange-100"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.icon}
                              <span>{item.name}</span>
                            </div>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleDirectNavigation(link.path)}
                    className={`flex items-center gap-2 w-full px-3 py-3 rounded-lg font-outfit font-semibold transition-all duration-200 text-sm ${
                      location.pathname === link.path
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {link.icon}
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
