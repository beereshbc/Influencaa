import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  PlayCircle,
  AlertCircle,
  Mail,
  Phone,
  User,
  Calendar,
  Target,
  FileText,
  Shield,
  CreditCard,
  Send,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const AllOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Sample orders data
  const [orders, setOrders] = useState([
    {
      id: 1,
      influencerId: 1,
      influencerName: "Sarah Johnson",
      orderDate: "2025-10-26T07:21:31.627Z",
      platform: "youtube",
      service: "I1",
      status: "pending",
      totalAmount: 8000,
      brandName: "Nike",
      orderDetails: {
        brandName: "Nike",
        budget: "₹8,000",
        campaignBrief: "Promote our new running shoes with authentic content",
        campaignGoals: "Increase brand awareness and drive sales",
        contactPerson: "BEERESHKUMAR B C",
        contentGuidelines:
          "Show real running experience, highlight comfort features",
        email: "bcbeereshkumar@gmail.com",
        phone: "06360995219",
        specialRequirements: "Include close-ups of shoe technology",
        targetAudience: "Runners aged 18-35",
        timeline: "7 days delivery",
      },
      serviceDetails: {
        amount: 8000,
        deliverables: [
          "30-second product mention",
          "Video description link",
          "Pinned comment",
        ],
        description: "Quick product mention in existing video content",
        name: "Shoutout Package",
        requirements: ["Product information", "Talking points"],
        revisions: 1,
        service: "Shoutout",
        timeline: "7 days delivery",
      },
    },
    {
      id: 2,
      influencerId: 1,
      influencerName: "Sarah Johnson",
      orderDate: "2025-10-25T10:15:22.123Z",
      platform: "instagram",
      service: "I2",
      status: "in-progress",
      totalAmount: 15000,
      brandName: "Adidas",
      orderDetails: {
        brandName: "Adidas",
        budget: "₹15,000",
        campaignBrief: "Lifestyle photos with new sneakers",
        campaignGoals: "Engage fashion-conscious audience",
        contactPerson: "Alex Johnson",
        contentGuidelines: "Urban setting, casual outfits",
        email: "alex.j@adidas.com",
        phone: "09876543210",
        specialRequirements: "Include unboxing moment",
        targetAudience: "Fashion enthusiasts 18-30",
        timeline: "5 days delivery",
      },
      serviceDetails: {
        amount: 15000,
        deliverables: [
          "3 High-quality feed posts",
          "Professional photography",
          "Caption writing",
          "Hashtag strategy",
        ],
        description: "Premium Instagram feed content",
        name: "Feed Post Package",
        requirements: ["Product samples", "Brand guidelines"],
        revisions: 2,
        service: "Feed Posts",
        timeline: "5 days delivery",
      },
    },
    {
      id: 3,
      influencerId: 1,
      influencerName: "Sarah Johnson",
      orderDate: "2025-10-24T14:30:45.789Z",
      platform: "twitter",
      service: "I1",
      status: "completed",
      totalAmount: 5000,
      brandName: "Spotify",
      orderDetails: {
        brandName: "Spotify",
        budget: "₹5,000",
        campaignBrief: "Tweet about new playlist features",
        campaignGoals: "Drive app downloads",
        contactPerson: "Maria Garcia",
        contentGuidelines: "Casual, engaging tone",
        email: "maria.g@spotify.com",
        phone: "1122334455",
        specialRequirements: "Include playlist links",
        targetAudience: "Music lovers",
        timeline: "2 days delivery",
      },
      serviceDetails: {
        amount: 5000,
        deliverables: [
          "3 Strategic tweets",
          "Hashtag research",
          "Engagement monitoring",
        ],
        description: "Twitter campaign for playlist promotion",
        name: "Tweet Package",
        requirements: ["Key messages", "Link to share"],
        revisions: 1,
        service: "Twitter Campaign",
        timeline: "2 days delivery",
      },
    },
    {
      id: 4,
      influencerId: 1,
      influencerName: "Sarah Johnson",
      orderDate: "2025-10-23T09:45:33.456Z",
      platform: "youtube",
      service: "I2",
      status: "cancelled",
      totalAmount: 25000,
      brandName: "Apple",
      orderDetails: {
        brandName: "Apple",
        budget: "₹25,000",
        campaignBrief: "Product review of new iPhone",
        campaignGoals: "Detailed feature showcase",
        contactPerson: "John Smith",
        contentGuidelines: "Professional, tech-focused",
        email: "john.s@apple.com",
        phone: "5566778899",
        specialRequirements: "Compare with previous model",
        targetAudience: "Tech enthusiasts",
        timeline: "14 days delivery",
      },
      serviceDetails: {
        amount: 25000,
        deliverables: [
          "8-10 minute review",
          "Product demonstration",
          "Honest opinion",
          "Community engagement",
        ],
        description: "Detailed product review video",
        name: "Review Package",
        requirements: ["Product samples", "Usage period 7 days"],
        revisions: 2,
        service: "Product Review",
        timeline: "14 days delivery",
      },
    },
  ]);

  const statusFilters = [
    { key: "all", label: "All Orders", count: orders.length, color: "gray" },
    {
      key: "pending",
      label: "Pending",
      count: orders.filter((order) => order.status === "pending").length,
      color: "yellow",
    },
    {
      key: "in-progress",
      label: "In Progress",
      count: orders.filter((order) => order.status === "in-progress").length,
      color: "blue",
    },
    {
      key: "completed",
      label: "Completed",
      count: orders.filter((order) => order.status === "completed").length,
      color: "green",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: orders.filter((order) => order.status === "cancelled").length,
      color: "red",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "in-progress":
        return <PlayCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPlatformIcon = (platform) => {
    const iconClass = "w-5 h-5";
    switch (platform) {
      case "instagram":
        return <Instagram className={iconClass} />;
      case "youtube":
        return <Youtube className={iconClass} />;
      case "facebook":
        return <Facebook className={iconClass} />;
      case "twitter":
        return <Twitter className={iconClass} />;
      case "linkedin":
        return <Linkedin className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-br from-pink-500 to-purple-600";
      case "youtube":
        return "bg-gradient-to-br from-red-500 to-red-700";
      case "facebook":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case "twitter":
        return "bg-gradient-to-br from-sky-500 to-blue-600";
      case "linkedin":
        return "bg-gradient-to-br from-blue-800 to-blue-900";
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-700";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    const matchesSearch =
      order.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderDetails.contactPerson
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.serviceDetails.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAcceptOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "in-progress" } : order
      )
    );
    setShowPaymentModal(true);
  };

  const handleRejectOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "cancelled" } : order
      )
    );
    setSelectedOrder(null);
  };

  const handleCompleteOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "completed" } : order
      )
    );
    setSelectedOrder(null);
  };

  const handlePaymentRequest = () => {
    // Simulate payment request to escrow
    setShowPaymentModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden pt-20">
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
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-4 shadow-lg"
          >
            <FileText className="w-4 h-4 mr-2" />
            Order Management
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4"
          >
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Campaign Orders
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-outfit"
          >
            Track, manage, and complete your influencer campaign orders
          </motion.p>
        </motion.div>

        {/* Stats and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Status Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-brasika">
                Order Status
              </h3>
              <div className="space-y-2">
                {statusFilters.map((filter) => (
                  <motion.button
                    key={filter.key}
                    onClick={() => setSelectedStatus(filter.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                      selectedStatus === filter.key
                        ? "border-orange-500 bg-orange-50 shadow-md"
                        : "border-orange-100 hover:border-orange-300 hover:shadow-sm"
                    }`}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 bg-${filter.color}-500`}
                      ></div>
                      <span className="font-outfit font-medium text-gray-900 text-sm">
                        {filter.label}
                      </span>
                    </div>
                    <span
                      className={`bg-${filter.color}-100 text-${filter.color}-800 px-2 py-1 rounded-full text-xs font-outfit font-semibold`}
                    >
                      {filter.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by brand, contact, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-orange-50 border-b border-orange-200">
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Order Details
                      </th>
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Brand & Contact
                      </th>
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left font-brasika font-semibold text-gray-900 text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order.id}
                        className="hover:bg-orange-50 transition-colors cursor-pointer"
                        whileHover={{
                          backgroundColor: "rgba(255, 237, 213, 0.5)",
                        }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${getPlatformColor(
                                order.platform
                              )} flex items-center justify-center text-white`}
                            >
                              {getPlatformIcon(order.platform)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-outfit font-semibold text-gray-900 text-sm truncate">
                                {order.serviceDetails.name}
                              </div>
                              <div className="text-xs text-gray-600 font-outfit truncate">
                                {order.serviceDetails.service}
                              </div>
                              <div className="text-xs text-gray-500 font-outfit capitalize mt-1">
                                {order.platform}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="min-w-0">
                            <div className="font-outfit font-semibold text-gray-900 text-sm truncate">
                              {order.brandName}
                            </div>
                            <div className="text-xs text-gray-600 font-outfit truncate">
                              {order.orderDetails.contactPerson}
                            </div>
                            <div className="text-xs text-gray-500 font-outfit truncate mt-1">
                              {order.orderDetails.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-outfit font-bold text-orange-600 text-sm">
                            ₹{order.totalAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-outfit font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ml-1.5 capitalize">
                              {order.status.replace("-", " ")}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-outfit text-gray-600 text-sm">
                            {new Date(order.orderDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <motion.button
                            className="flex items-center text-orange-600 hover:text-orange-700 font-outfit font-medium text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                      No orders found
                    </h3>
                    <p className="text-gray-600 font-outfit text-sm">
                      {searchTerm
                        ? "Try adjusting your search terms"
                        : "No orders match the selected filters"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
            onComplete={handleCompleteOrder}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPlatformColor={getPlatformColor}
            getPlatformIcon={getPlatformIcon}
          />
        )}
      </AnimatePresence>

      {/* Payment Request Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentRequestModal
            onClose={() => setShowPaymentModal(false)}
            onConfirm={handlePaymentRequest}
            order={selectedOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({
  order,
  onClose,
  onAccept,
  onReject,
  onComplete,
  getStatusColor,
  getStatusIcon,
  getPlatformColor,
  getPlatformIcon,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <div className="flex items-center">
            <div
              className={`w-12 h-12 rounded-xl ${getPlatformColor(
                order.platform
              )} flex items-center justify-center text-white mr-4`}
            >
              {getPlatformIcon(order.platform)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-brasika">
                {order.serviceDetails.name}
              </h2>
              <div className="flex items-center gap-4 mt-1">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-outfit font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-2 capitalize">
                    {order.status.replace("-", " ")}
                  </span>
                </div>
                <div className="font-outfit font-semibold text-orange-600 text-lg">
                  ₹{order.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-orange-200">
          <div className="flex space-x-8 px-6">
            {["details", "service", "brand"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-outfit font-semibold border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "details"
                  ? "Order Details"
                  : tab === "service"
                  ? "Service Info"
                  : "Brand Info"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit">
                      Campaign Goals
                    </span>
                    <Target className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-gray-600 font-outfit text-sm">
                    {order.orderDetails.campaignGoals}
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit">
                      Timeline
                    </span>
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-gray-600 font-outfit text-sm">
                    {order.orderDetails.timeline}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Campaign Brief
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails.campaignBrief}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Content Guidelines
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails.contentGuidelines}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Special Requirements
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails.specialRequirements}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "service" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                  Service Description
                </h3>
                <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                  {order.serviceDetails.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                  Deliverables
                </h3>
                <div className="space-y-2">
                  {order.serviceDetails.deliverables.map((item, index) => (
                    <div key={index} className="flex items-start text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="font-outfit break-words text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit text-sm">
                      Revisions
                    </span>
                    <FileText className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-gray-600 font-outfit font-medium text-sm">
                    {order.serviceDetails.revisions} included
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit text-sm">
                      Service Timeline
                    </span>
                    <Clock className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-gray-600 font-outfit font-medium text-sm">
                    {order.serviceDetails.timeline}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brand" && (
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-outfit font-bold text-lg mr-4">
                    {order.brandName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-brasika font-semibold text-gray-900">
                      {order.brandName}
                    </h3>
                    <p className="text-gray-600 font-outfit text-sm">
                      Brand Partner
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-2 text-sm">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails.contactPerson}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails.email}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-2 text-sm">
                      Campaign Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Target className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails.targetAudience}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          Ordered on{" "}
                          {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-orange-200 p-6">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            {order.status === "pending" && (
              <>
                <motion.button
                  onClick={() => onReject(order.id)}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-outfit font-semibold hover:bg-red-200 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject Order
                </motion.button>
                <motion.button
                  onClick={() => onAccept(order.id)}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-outfit font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept Order
                </motion.button>
              </>
            )}
            {order.status === "in-progress" && (
              <motion.button
                onClick={() => onComplete(order.id)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-outfit font-semibold hover:from-orange-600 hover:to-red-600 transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Mark as Complete
              </motion.button>
            )}
            <motion.button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-outfit font-semibold hover:bg-gray-200 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Payment Request Modal Component
const PaymentRequestModal = ({ onClose, onConfirm, order }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 font-brasika">
              Payment Request
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-outfit font-semibold text-gray-900">
                Order Amount
              </span>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-orange-600 font-outfit">
              ₹{order?.totalAmount.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 font-outfit mt-2">
              Funds will be held securely in escrow until order completion
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Brand</span>
              <span className="font-outfit font-semibold">
                {order?.brandName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Service</span>
              <span className="font-outfit font-semibold">
                {order?.serviceDetails.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Platform</span>
              <span className="font-outfit font-semibold capitalize">
                {order?.platform}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 font-outfit">
                Payment will be released to you after the brand confirms order
                completion and quality standards are met.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-outfit font-semibold hover:bg-gray-200 transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-outfit font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors text-sm flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4 mr-2" />
              Request Payment
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AllOrders;
