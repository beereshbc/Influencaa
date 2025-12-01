import React, { useState, useEffect } from "react";
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
  Loader,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

// --- Helper Functions ---
const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "approved":
      return <CheckCircle className="w-4 h-4" />;
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
    case "approved":
      return "bg-cyan-100 text-cyan-800 border-cyan-200";
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

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pending Acceptance";
    case "approved":
      return "Approved (Awaiting Payment)";
    case "in-progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
    default:
      return status.replace("-", " ");
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
// -----------------------------------------------------------------

const AllOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false); // 🛑 FIX: Added missing state
  const { orders, fetchOrders, axios, influencerToken, loading } =
    useAppContext();

  // 🛑 FIX: Calculate filter counts with null checks
  const statusFilters = [
    {
      key: "all",
      label: "All Orders",
      count: orders?.length || 0,
      color: "gray",
    },
    {
      key: "pending",
      label: "Pending",
      count: orders?.filter((order) => order.status === "pending").length || 0,
      color: "yellow",
    },
    {
      key: "approved",
      label: "Approved",
      count: orders?.filter((order) => order.status === "approved").length || 0,
      color: "cyan",
    },
    {
      key: "in-progress",
      label: "In Progress",
      count:
        orders?.filter((order) => order.status === "in-progress").length || 0,
      color: "blue",
    },
    {
      key: "completed",
      label: "Completed",
      count:
        orders?.filter((order) => order.status === "completed").length || 0,
      color: "green",
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count:
        orders?.filter((order) => order.status === "cancelled").length || 0,
      color: "red",
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🛑 FIX: Robust filtering logic with null checks
  const filteredOrders =
    orders?.filter((order) => {
      const statusMatch =
        selectedStatus === "all" || order.status === selectedStatus;
      const searchLower = searchTerm.toLowerCase();

      const searchMatch =
        (order.orderDetails?.brandName?.toLowerCase() || "").includes(
          searchLower
        ) ||
        (order.orderDetails?.contactPerson?.toLowerCase() || "").includes(
          searchLower
        ) ||
        (order.serviceDetails?.service?.toLowerCase() || "").includes(
          searchLower
        );

      return statusMatch && searchMatch;
    }) || [];

  // =========================================================================
  // 🎯 HANDLERS WITH BACKEND INTEGRATION
  // =========================================================================

  const handleAcceptOrder = async (orderId) => {
    try {
      console.log(`API Call: Accepting order ${orderId} (Status: approved)`);

      await axios.put(
        `/api/influencer/orders/${orderId}/accept`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer ${influencerToken}` },
        }
      );

      await fetchOrders();
      setSelectedOrder(null);
      setShowOrderModal(false);
      // After accepting, automatically show the request payment modal
      setShowPaymentModal(true);
    } catch (error) {
      console.error(
        "Error during order acceptance:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      console.log(`API Call: Rejecting order ${orderId} (Status: rejected)`);

      await axios.put(
        `/api/influencer/orders/${orderId}/reject`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer ${influencerToken}` },
        }
      );

      await fetchOrders();
      setSelectedOrder(null);
      setShowOrderModal(false);
    } catch (error) {
      console.error(
        "Error during order rejection:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      console.log(`API Call: Cancelling order ${orderId}`);

      await axios.put(
        `/api/influencer/orders/${orderId}/cancel`,
        { status: "cancelled" },
        {
          headers: { Authorization: `Bearer ${influencerToken}` },
        }
      );

      await fetchOrders();
      setSelectedOrder(null);
      setShowOrderModal(false);
    } catch (error) {
      console.error(
        "Error during order cancellation:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      console.log(`API Call: Completing order ${orderId}`);

      await axios.put(
        `/api/influencer/orders/${orderId}/complete`,
        { status: "completed" },
        {
          headers: { Authorization: `Bearer ${influencerToken}` },
        }
      );

      await fetchOrders();
      setSelectedOrder(null);
      setShowOrderModal(false);
    } catch (error) {
      console.error(
        "Error during order completion:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handlePaymentRequest = async (order) => {
    try {
      console.log(`API Call: Notifying client to pay for order ${order._id}`);

      await axios.post(
        `/api/influencer/orders/${order._id}/request-payment`,
        {},
        {
          headers: { Authorization: `Bearer ${influencerToken}` },
        }
      );

      setShowPaymentModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error(
        "Error during payment request:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Loading Orders...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-white via-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
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
            Manage Your
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
                      {/* 🛑 FIX: Use proper color classes */}
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          filter.color === "gray"
                            ? "bg-gray-500"
                            : filter.color === "yellow"
                            ? "bg-yellow-500"
                            : filter.color === "cyan"
                            ? "bg-cyan-500"
                            : filter.color === "blue"
                            ? "bg-blue-500"
                            : filter.color === "green"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-outfit font-medium text-gray-900 text-sm">
                        {filter.label}
                      </span>
                    </div>
                    {/* 🛑 FIX: Use proper color classes */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-outfit font-semibold ${
                        filter.color === "gray"
                          ? "bg-gray-100 text-gray-800"
                          : filter.color === "yellow"
                          ? "bg-yellow-100 text-yellow-800"
                          : filter.color === "cyan"
                          ? "bg-cyan-100 text-cyan-800"
                          : filter.color === "blue"
                          ? "bg-blue-100 text-blue-800"
                          : filter.color === "green"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
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
                <table className="w-full">
                  <thead>
                    <tr className="bg-orange-50 border-b border-orange-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Order Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Brand & Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {filteredOrders.map((order) => (
                      <motion.tr
                        key={order._id}
                        className="hover:bg-orange-50 transition-colors cursor-pointer"
                        whileHover={{
                          backgroundColor: "rgba(255, 237, 213, 0.5)",
                        }}
                        onClick={() => handleViewOrder(order)}
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
                                {order.serviceDetails?.service || "N/A"}
                              </div>
                              <div className="text-xs text-gray-600 font-outfit truncate">
                                {order.serviceDetails?.name || "N/A"}
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
                              {order.orderDetails?.brandName || "N/A"}
                            </div>
                            <div className="text-xs text-gray-600 font-outfit truncate">
                              {order.orderDetails?.contactPerson || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500 font-outfit truncate mt-1">
                              {order.orderDetails?.email || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-outfit font-bold text-orange-600 text-sm">
                            ₹{order.totalAmount?.toLocaleString() || "0"}
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
                              handleViewOrder(order);
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
              </div>

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

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderModal && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => {
              setShowOrderModal(false);
              setSelectedOrder(null);
            }}
            onAccept={handleAcceptOrder}
            onReject={handleRejectOrder}
            onComplete={handleCompleteOrder}
            onCancelOrder={handleCancelOrder}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            getPlatformColor={getPlatformColor}
            getPlatformIcon={getPlatformIcon}
          />
        )}
      </AnimatePresence>

      {/* Payment Request Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedOrder && (
          <PaymentRequestModal
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedOrder(null);
            }}
            onConfirm={handlePaymentRequest}
            order={selectedOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Order Details Modal Component
const OrderDetailsModal = ({
  order,
  onClose,
  onAccept,
  onReject,
  onComplete,
  onCancelOrder,
  getStatusColor,
  getStatusIcon,
  getPlatformColor,
  getPlatformIcon,
}) => {
  const [activeTab, setActiveTab] = useState("details");

  // 🛑 FIX: Handle cancel order properly
  const handleCancelClick = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      onCancelOrder(order._id);
    }
  };

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
                {order.serviceDetails?.name || "Service Name"}
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
                  ₹{order.totalAmount?.toLocaleString() || "0"}
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
                    {order.orderDetails?.campaignGoals ||
                      "No campaign goals specified"}
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
                    {order.serviceDetails?.timeline || "No timeline specified"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Campaign Brief
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails?.campaignBrief ||
                      "No campaign brief provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Content Guidelines
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails?.contentGuidelines ||
                      "No content guidelines provided"}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                    Special Requirements
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed text-sm">
                    {order.orderDetails?.specialRequirements ||
                      "No special requirements"}
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
                  {order.serviceDetails?.description ||
                    "No description available"}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                  Deliverables
                </h3>
                <div className="space-y-2">
                  {(order.serviceDetails?.deliverables || []).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-outfit break-words text-sm">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                  {(!order.serviceDetails?.deliverables ||
                    order.serviceDetails.deliverables.length === 0) && (
                    <p className="text-gray-500 font-outfit text-sm">
                      No deliverables specified
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-2">
                  Requirements
                </h3>
                <div className="space-y-2">
                  {(order.serviceDetails?.requirements || []).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-start text-gray-600"
                      >
                        <Shield className="w-4 h-4 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="font-outfit break-words text-sm">
                          {item}
                        </span>
                      </div>
                    )
                  )}
                  {(!order.serviceDetails?.requirements ||
                    order.serviceDetails.requirements.length === 0) && (
                    <p className="text-gray-500 font-outfit text-sm">
                      No requirements specified
                    </p>
                  )}
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
                    {order.serviceDetails?.revisions || "0"} included
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
                    {order.serviceDetails?.timeline || "No timeline specified"}
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
                    {order.orderDetails?.brandName?.charAt(0) || "B"}
                  </div>
                  <div>
                    <h3 className="text-xl font-brasika font-semibold text-gray-900">
                      {order.orderDetails?.brandName || "Brand Name"}
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
                          {order.orderDetails?.contactPerson || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails?.email || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="font-outfit">
                          {order.orderDetails?.phone || "N/A"}
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
                          {order.orderDetails?.targetAudience || "N/A"}
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
        <div className="border-t border-orange-200 p-6 flex flex-col sm:flex-row justify-end gap-3">
          {/* Cancel Button - Displayed only if order is still pending/approved */}
          {(order.status === "pending" || order.status === "approved") && (
            <motion.button
              onClick={handleCancelClick}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-outfit font-semibold hover:bg-red-600 transition-colors text-sm flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Order
            </motion.button>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {order.status === "pending" && (
              <>
                <motion.button
                  onClick={() => onReject(order._id)}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-outfit font-semibold hover:bg-red-200 transition-colors text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reject Order
                </motion.button>
                <motion.button
                  onClick={() => onAccept(order._id)}
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
                onClick={() => onComplete(order._id)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-outfit font-semibold hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark as Completed
              </motion.button>
            )}
          </div>

          <div className="flex space-x-3 mt-3 sm:mt-0">
            <motion.button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-outfit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
  const handleConfirm = () => {
    if (order) {
      onConfirm(order);
    }
  };

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
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 font-outfit">
                ₹{order?.totalAmount?.toLocaleString() || "0"}
              </div>
              <p className="text-sm text-gray-600 font-outfit mt-2">
                Order payment amount
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Brand</span>
              <span className="font-outfit font-semibold">
                {order?.orderDetails?.brandName || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Service</span>
              <span className="font-outfit font-semibold">
                {order?.serviceDetails?.name || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-outfit text-gray-600">Platform</span>
              <span className="font-outfit font-semibold capitalize">
                {order?.platform || "N/A"}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 font-outfit">
                This button notifies the client that the order is approved and
                they need to make the payment to move the order to 'In
                Progress'.
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
              onClick={handleConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-outfit font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors text-sm flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4 mr-2" />
              Notify Client to Pay
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AllOrders;
