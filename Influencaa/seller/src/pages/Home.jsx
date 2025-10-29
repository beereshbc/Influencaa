import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  MessageCircle,
  Heart,
  Share2,
  Zap,
  Rocket,
  Target,
  Star,
  ArrowRight,
  Search,
  Filter,
  Eye,
  FileText,
} from "lucide-react";

const Home = () => {
  const controls = useAnimation();
  const [recentOrders, setRecentOrders] = useState([]);

  // Mock data for recent orders based on your screenshot structure
  useEffect(() => {
    const mockOrders = [
      {
        id: 1,
        brandName: "Nike",
        campaignBrief: "Summer Collection Launch",
        totalAmount: 8000,
        status: "completed",
        orderDate: "2025-10-26T07:21:31.627Z",
        platform: "YouTube",
        service: "Shoutout Package",
        timeline: "7 days delivery",
        deliverables: [
          "30-second product mention",
          "Video description link",
          "Pinned comment",
        ],
        contactPerson: "BEERESHKUMAR B C",
        email: "bcbeereshkumar@gmail.com",
      },
      {
        id: 2,
        brandName: "Sephora",
        campaignBrief: "New Lipstick Line Promotion",
        totalAmount: 6500,
        status: "in-progress",
        orderDate: "2025-10-25T14:30:00.000Z",
        platform: "Instagram",
        service: "Story Series",
        timeline: "5 days delivery",
        deliverables: ["5 Instagram Stories", "1 Feed Post", "Swipe-up link"],
        contactPerson: "Sarah Wilson",
        email: "sarah.wilson@sephora.com",
      },
      {
        id: 3,
        brandName: "TechGadgets Inc",
        campaignBrief: "Wireless Earbuds Launch",
        totalAmount: 12000,
        status: "pending",
        orderDate: "2025-10-24T09:15:00.000Z",
        platform: "TikTok",
        service: "Video Review",
        timeline: "10 days delivery",
        deliverables: [
          "1-minute review video",
          "Product unboxing",
          "Giveaway announcement",
        ],
        contactPerson: "Mike Johnson",
        email: "mike.j@techgadgets.com",
      },
      {
        id: 4,
        brandName: "FreshFoods Market",
        campaignBrief: "Organic Snacks Promotion",
        totalAmount: 4500,
        status: "completed",
        orderDate: "2025-10-23T11:45:00.000Z",
        platform: "Instagram",
        service: "Reel Package",
        timeline: "3 days delivery",
        deliverables: ["30-second Reel", "Recipe showcase", "Product tags"],
        contactPerson: "Emily Chen",
        email: "emily.chen@freshfoods.com",
      },
      {
        id: 5,
        brandName: "Luxury Watches Co",
        campaignBrief: "Limited Edition Launch",
        totalAmount: 15000,
        status: "in-progress",
        orderDate: "2025-10-22T16:20:00.000Z",
        platform: "YouTube",
        service: "Full Review",
        timeline: "14 days delivery",
        deliverables: [
          "5-minute detailed review",
          "B-roll footage",
          "Website link in description",
        ],
        contactPerson: "David Brown",
        email: "david.b@luxurywatches.com",
      },
    ];
    setRecentOrders(mockOrders);
  }, []);

  const stats = [
    {
      number: "₹1,28,450",
      label: "Total Earnings",
      icon: DollarSign,
      change: "+12%",
      description: "Last 30 days",
    },
    {
      number: "28",
      label: "Active Campaigns",
      icon: Users,
      change: "+5",
      description: "Currently working",
    },
    {
      number: "4.8%",
      label: "Avg Engagement",
      icon: TrendingUp,
      change: "+0.4%",
      description: "Across all platforms",
    },
    {
      number: "156K",
      label: "New Followers",
      icon: BarChart3,
      change: "+8.2K",
      description: "This month",
    },
  ];

  const quickActions = [
    {
      icon: Search,
      label: "Find Campaigns",
      color: "from-orange-500 to-red-500",
      description: "Discover new opportunities",
    },
    {
      icon: MessageCircle,
      label: "Messages",
      color: "from-orange-500 to-red-500",
      description: "Brand communications",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      color: "from-orange-500 to-red-500",
      description: "Performance insights",
    },
    {
      icon: Calendar,
      label: "Schedule",
      color: "from-orange-500 to-red-500",
      description: "Content calendar",
    },
  ];

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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "in-progress":
        return <Clock size={16} className="text-blue-600" />;
      case "pending":
        return <AlertCircle size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Elements */}
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

      {/* Grid Pattern */}
      <div className="absolute inset-0  bg-[linear-gradient(rgba(255,165,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 xl:px-24 py-8">
        {/* Hero Section */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Rocket size={16} className="mr-2" />
              Welcome Back, Influencer!
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-5xl xl:text-6xl font-brasika font-bold text-gray-900 leading-tight mb-6"
            >
              Grow Your{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Influence
              </span>{" "}
              <span className="block mt-2">
                Maximize Your{" "}
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Earnings
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl font-playfair text-gray-700 mb-6 leading-relaxed max-w-2xl"
            >
              Access premium brand collaborations, track your performance, and
              grow your influence with our AI-powered platform designed for
              content creators.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg font-outfit text-gray-600 mb-10 max-w-2xl leading-relaxed"
            >
              Connect with top brands, streamline your workflow, and focus on
              creating amazing content while we handle the business side.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-transparent hover:border-orange-200 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Campaigns</span>
                <ArrowRight
                  size={20}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-outfit font-semibold rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl flex items-center justify-center hover:border-orange-400 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={20} className="mr-2" />
                <span>View Tutorial</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <span className="text-sm font-outfit font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-800 font-outfit font-medium text-sm">
                    {stat.label}
                  </div>
                  <div className="text-gray-600 font-outfit text-xs mt-1">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4 text-center">
            Quick Actions
          </h2>
          <p className="text-xl text-gray-600 font-outfit max-w-3xl mx-auto text-center mb-8">
            Everything you need to manage your influencer business in one place
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={index}
                  className={`bg-gradient-to-r ${action.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <IconComponent
                      size={32}
                      className="mb-3 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-outfit font-semibold text-lg mb-1">
                      {action.label}
                    </span>
                    <span className="font-outfit text-white/80 text-sm">
                      {action.description}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Orders Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100 p-8 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-2">
                Recent Campaigns
              </h2>
              <p className="text-xl text-gray-600 font-outfit">
                Your last 5 collaborations and campaign details
              </p>
            </div>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter size={18} className="mr-2" />
              Filter
            </motion.button>
          </div>

          <div className="space-y-6">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Main Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold font-outfit text-lg">
                          {order.brandName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-brasika font-bold text-gray-900">
                            {order.brandName}
                          </h3>
                          <p className="text-gray-700 font-outfit text-lg">
                            {order.campaignBrief}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          ₹{order.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-gray-600 font-outfit text-sm">
                          Total Amount
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-outfit font-semibold text-gray-700">
                          Platform
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {order.platform}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-outfit font-semibold text-gray-700">
                          Service
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {order.service}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-outfit font-semibold text-gray-700">
                          Timeline
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {order.timeline}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-outfit font-semibold text-gray-700">
                          Order Date
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {formatDate(order.orderDate)}
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="mb-4">
                      <div className="text-sm font-outfit font-semibold text-gray-700 mb-2">
                        Deliverables
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {order.deliverables.map((deliverable, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-outfit font-medium"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <div className="font-outfit font-semibold text-gray-700">
                          Contact Person
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {order.contactPerson}
                        </div>
                      </div>
                      <div>
                        <div className="font-outfit font-semibold text-gray-700">
                          Email
                        </div>
                        <div className="text-gray-900 font-outfit">
                          {order.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex flex-col items-end justify-between space-y-4">
                    <div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-outfit font-semibold text-sm capitalize">
                        {order.status.replace("-", " ")}
                      </span>
                    </div>

                    <motion.button
                      className="group px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center transition-all duration-300"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FileText size={18} className="mr-2" />
                      View Details
                      <ArrowRight
                        size={18}
                        className="ml-2 transform group-hover:translate-x-1 transition-transform"
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="px-8 py-4 bg-white text-gray-700 font-outfit font-semibold rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 flex items-center mx-auto"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Campaigns</span>
              <ArrowRight size={18} className="ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Performance CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-white mb-6">
            Ready to Boost Your Performance?
          </h2>
          <p className="text-xl text-white/90 font-outfit mb-8 max-w-2xl mx-auto">
            Join thousands of successful influencers who are growing their
            income and influence with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-orange-600 font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-transparent hover:bg-orange-50 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Upgrade Plan</span>
              <Star size={20} className="ml-2" />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent text-white font-outfit font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
