import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Eye,
  MessageCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  MoreVertical,
  BarChart3,
  CreditCard,
  Shield,
  FileText,
  History,
  ArrowRight,
  UserCheck,
  AlertCircle,
} from "lucide-react";

// Enhanced dummy datasets with proper order flow
const dummyOrders = [
  {
    id: "ORD-001",
    campaignId: "CAMP-001",
    influencerName: "Sarah Johnson",
    serviceType: "Shoutout Package",
    platform: "YouTube",
    amount: 8000,
    status: "payment_pending",
    orderDate: "2025-10-26",
    timeline: "7 days delivery",
    milestones: [
      { name: "Content Creation", status: "pending", payout: 4000 },
      { name: "Review & Approval", status: "pending", payout: 2000 },
      { name: "Publishing", status: "pending", payout: 2000 },
    ],
    currentMilestone: 0,
    chatId: "chat-001",
    orderFlow: {
      placed: "2025-10-26 10:30",
      accepted: "2025-10-26 14:45", // Influencer accepted
      payment_due: "2025-10-27", // Payment deadline
      payment_status: "pending", // pending, initiated, completed, failed
    },
  },
  {
    id: "ORD-002",
    campaignId: "CAMP-002",
    influencerName: "Mike Chen",
    serviceType: "Story Package",
    platform: "Instagram",
    amount: 5000,
    status: "accepted",
    orderDate: "2025-10-25",
    timeline: "3 days delivery",
    milestones: [
      { name: "Content Creation", status: "pending", payout: 2500 },
      { name: "Publishing", status: "pending", payout: 2500 },
    ],
    currentMilestone: 0,
    chatId: "chat-002",
    orderFlow: {
      placed: "2025-10-25 09:15",
      accepted: "2025-10-25 11:20", // Influencer accepted
      payment_due: "2025-10-26",
      payment_status: "pending",
    },
  },
  {
    id: "ORD-003",
    campaignId: "CAMP-003",
    influencerName: "Priya Sharma",
    serviceType: "Video Review",
    platform: "YouTube",
    amount: 12000,
    status: "payment_initiated",
    orderDate: "2025-10-24",
    timeline: "5 days delivery",
    milestones: [
      { name: "Script Approval", status: "pending", payout: 4000 },
      { name: "Video Production", status: "pending", payout: 4000 },
      { name: "Publishing", status: "pending", payout: 4000 },
    ],
    currentMilestone: 0,
    chatId: "chat-003",
    orderFlow: {
      placed: "2025-10-24 14:20",
      accepted: "2025-10-24 16:45",
      payment_due: "2025-10-25",
      payment_status: "initiated", // Payment initiated but not completed
      payment_initiated: "2025-10-25 10:30",
    },
  },
  {
    id: "ORD-004",
    campaignId: "CAMP-004",
    influencerName: "Alex Rodriguez",
    serviceType: "Video Review",
    platform: "YouTube",
    amount: 15000,
    status: "in_progress",
    orderDate: "2025-10-22",
    timeline: "10 days delivery",
    milestones: [
      { name: "Script Approval", status: "completed", payout: 3000 },
      { name: "Video Production", status: "in_progress", payout: 7000 },
      { name: "Final Review", status: "pending", payout: 3000 },
      { name: "Publishing", status: "pending", payout: 2000 },
    ],
    currentMilestone: 1,
    chatId: "chat-004",
    orderFlow: {
      placed: "2025-10-22 11:00",
      accepted: "2025-10-22 13:15",
      payment_due: "2025-10-23",
      payment_status: "completed", // Payment completed, funds in escrow
      payment_completed: "2025-10-23 09:45",
    },
  },
  {
    id: "ORD-005",
    campaignId: "CAMP-005",
    influencerName: "Rahul Kapoor",
    serviceType: "Feed Post",
    platform: "Instagram",
    amount: 10000,
    status: "pending_acceptance",
    orderDate: "2025-10-27",
    timeline: "4 days delivery",
    milestones: [
      { name: "Content Creation", status: "pending", payout: 5000 },
      { name: "Publishing", status: "pending", payout: 5000 },
    ],
    currentMilestone: 0,
    chatId: "chat-005",
    orderFlow: {
      placed: "2025-10-27 08:30",
      accepted: null, // Waiting for influencer acceptance
      payment_due: null,
      payment_status: "pending",
    },
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Analytics data with safe property access
  const analytics = {
    totalOrders: orders.length,
    pendingAcceptance: orders.filter(
      (order) => order.status === "pending_acceptance"
    ).length,
    acceptedOrders: orders.filter((order) => order.status === "accepted")
      .length,
    paymentPending: orders.filter((order) => order.status === "payment_pending")
      .length,
    inProgressOrders: orders.filter((order) => order.status === "in_progress")
      .length,
    totalSpent: orders.reduce((sum, order) => {
      // Safe access with optional chaining and fallback
      if (order?.orderFlow?.payment_status === "completed") {
        return sum + (order.amount || 0);
      }
      return sum;
    }, 0),
    escrowHeld: orders
      .filter((order) => order?.orderFlow?.payment_status === "completed")
      .reduce((sum, order) => {
        const paidMilestones = (order.milestones || []).slice(
          0,
          order.currentMilestone || 0
        );
        return (
          sum +
          paidMilestones.reduce(
            (milestoneSum, milestone) =>
              milestoneSum + (milestone?.payout || 0),
            0
          )
        );
      }, 0),
  };

  const filteredOrders = orders.filter((order) => {
    // Safe access with optional chaining and fallbacks
    const matchesSearch =
      order?.campaignId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.influencerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.serviceType?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order?.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleChat = (order) => {
    navigate(`/chat/${order?.chatId}`, {
      state: {
        orderId: order?.id,
        influencerName: order?.influencerName,
        campaignId: order?.campaignId,
      },
    });
  };

  const handlePaymentFlow = (order) => {
    if (order?.orderFlow?.payment_status === "completed") {
      navigate(`/payment-flow/${order?.id}`, {
        state: {
          order: order,
        },
      });
    }
  };

  const handleInitiatePayment = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: "payment_initiated",
            orderFlow: {
              ...(order.orderFlow || {}),
              payment_status: "initiated",
              payment_initiated: new Date().toISOString(),
            },
          };
        }
        return order;
      })
    );
  };

  const handleCompletePayment = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: "in_progress",
            orderFlow: {
              ...(order.orderFlow || {}),
              payment_status: "completed",
              payment_completed: new Date().toISOString(),
            },
          };
        }
        return order;
      })
    );
  };

  const handlePaymentRelease = (orderId, milestoneIndex) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedMilestones = (order.milestones || []).map(
            (milestone, index) =>
              index === milestoneIndex
                ? { ...milestone, status: "completed" }
                : milestone
          );

          const nextMilestoneIndex = milestoneIndex + 1;
          const newStatus =
            nextMilestoneIndex >= (order.milestones?.length || 0)
              ? "completed"
              : "in_progress";

          return {
            ...order,
            milestones: updatedMilestones,
            currentMilestone: nextMilestoneIndex,
            status: newStatus,
          };
        }
        return order;
      })
    );
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "payment_initiated":
        return "bg-purple-100 text-purple-800";
      case "payment_pending":
        return "bg-orange-100 text-orange-800";
      case "accepted":
        return "bg-cyan-100 text-cyan-800";
      case "pending_acceptance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return <XCircle className="w-4 h-4" />;

    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "payment_initiated":
        return <CreditCard className="w-4 h-4" />;
      case "payment_pending":
        return <AlertCircle className="w-4 h-4" />;
      case "accepted":
        return <UserCheck className="w-4 h-4" />;
      case "pending_acceptance":
        return <Clock className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    if (!status) return "Unknown Status";

    switch (status) {
      case "pending_acceptance":
        return "Pending Acceptance";
      case "accepted":
        return "Accepted - Pay Now";
      case "payment_pending":
        return "Payment Pending";
      case "payment_initiated":
        return "Payment Initiated";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return status.replace("_", " ");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-white via-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with History Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-2">
              Campaign Dashboard
            </h1>
            <p className="text-xl font-playfair text-gray-700">
              Manage your influencer campaigns and track progress
            </p>
          </div>
          <motion.button
            onClick={() => navigate("/history")}
            className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg flex items-center font-outfit font-semibold group"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <History className="w-4 h-4 mr-2" />
            View History
          </motion.button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 hover:border-orange-300 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-outfit">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 hover:border-orange-300 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-outfit">
                  Awaiting Payment
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.paymentPending + analytics.acceptedOrders}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 hover:border-orange-300 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-outfit">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.inProgressOrders}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 hover:border-orange-300 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 font-outfit">
                  Escrow Held
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  ₹{analytics.escrowHeld.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Orders Table */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Table Header */}
          <div className="p-6 border-b border-orange-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
              <h2 className="text-2xl font-brasika font-bold text-gray-900">
                Active Campaigns
              </h2>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                >
                  <option value="all">All Status</option>
                  <option value="pending_acceptance">Pending Acceptance</option>
                  <option value="accepted">Accepted</option>
                  <option value="payment_pending">Payment Pending</option>
                  <option value="payment_initiated">Payment Initiated</option>
                  <option value="in_progress">In Progress</option>
                </select>

                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center font-outfit">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Campaign ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Influencer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-orange-100">
                {filteredOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    className="hover:bg-orange-50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-outfit">
                        {order.campaignId}
                      </div>
                      <div className="text-sm text-gray-500 font-outfit">
                        {order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-outfit">
                        {order.influencerName}
                      </div>
                      <div className="text-sm text-gray-500 font-outfit">
                        {order.platform}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-outfit">
                        {order.serviceType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-outfit">
                        ₹{order.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )} font-outfit`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="ml-1">
                          {getStatusText(order.status)}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-900 flex items-center font-outfit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </motion.button>
                        <motion.button
                          onClick={() => handleChat(order)}
                          className="text-green-600 hover:text-green-900 flex items-center font-outfit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </motion.button>
                        {order?.orderFlow?.payment_status === "completed" && (
                          <motion.button
                            onClick={() => handlePaymentFlow(order)}
                            className="text-purple-600 hover:text-purple-900 flex items-center font-outfit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            Payment Flow
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2 font-outfit">
                No active campaigns found
              </div>
              <div className="text-sm text-gray-500 font-outfit">
                Try adjusting your search or filters
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowOrderModal(false)}
          onPaymentRelease={handlePaymentRelease}
          onPaymentFlow={handlePaymentFlow}
          onInitiatePayment={handleInitiatePayment}
          onCompletePayment={handleCompletePayment}
        />
      )}
    </div>
  );
};

// Enhanced Order Details Modal Component
const OrderDetailsModal = ({
  order,
  onClose,
  onPaymentRelease,
  onPaymentFlow,
  onInitiatePayment,
  onCompletePayment,
}) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${order?.chatId}`, {
      state: {
        orderId: order?.id,
        influencerName: order?.influencerName,
        campaignId: order?.campaignId,
      },
    });
    onClose();
  };

  const handlePaymentFlowClick = () => {
    onPaymentFlow(order);
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
  };

  const getPaymentStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "initiated":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Safe access to order properties
  const orderFlow = order?.orderFlow || {};
  const milestones = order?.milestones || [];
  const currentMilestone = order?.currentMilestone || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-orange-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-brasika">
              Order Details
            </h2>
            <p className="text-gray-600 font-outfit">
              {order?.campaignId} • {order?.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Order Flow Status */}
          <div className="bg-white rounded-xl border border-orange-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 font-brasika mb-4">
              Order Flow Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-outfit">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Placed:</span>
                  <span className="font-medium">
                    {formatDate(orderFlow.placed)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Influencer Accepted:</span>
                  <span className="font-medium">
                    {orderFlow.accepted
                      ? formatDate(orderFlow.accepted)
                      : "Pending"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      orderFlow.payment_status
                    )}`}
                  >
                    {orderFlow.payment_status
                      ? orderFlow.payment_status.charAt(0).toUpperCase() +
                        orderFlow.payment_status.slice(1)
                      : "Unknown"}
                  </span>
                </div>
                {orderFlow.payment_due && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Due:</span>
                    <span className="font-medium">
                      {formatDate(orderFlow.payment_due)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                Campaign Information
              </h3>
              <div className="space-y-2 font-outfit">
                <div className="flex justify-between">
                  <span className="text-gray-600">Influencer:</span>
                  <span className="font-medium">{order?.influencerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-medium">{order?.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-medium">{order?.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{order?.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeline:</span>
                  <span className="font-medium">{order?.timeline}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                Financial Details
              </h3>
              <div className="space-y-2 font-outfit">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium text-orange-600">
                    ₹{(order?.amount || 0).toLocaleString()}
                  </span>
                </div>
                {orderFlow.payment_status === "completed" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount Released:</span>
                      <span className="font-medium text-green-600">
                        ₹
                        {milestones
                          .slice(0, currentMilestone)
                          .reduce(
                            (sum, milestone) => sum + (milestone?.payout || 0),
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In Escrow:</span>
                      <span className="font-medium text-blue-600">
                        ₹
                        {milestones
                          .slice(currentMilestone)
                          .reduce(
                            (sum, milestone) => sum + (milestone?.payout || 0),
                            0
                          )
                          .toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Payment Actions */}
          {(order?.status === "accepted" ||
            order?.status === "payment_pending") && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika mb-4">
                Payment Required
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-outfit mb-2">
                    Please complete the payment to start the campaign. Funds
                    will be held in escrow until campaign completion.
                  </p>
                  <p className="text-sm text-gray-500 font-outfit">
                    Amount:{" "}
                    <span className="font-bold text-orange-600">
                      ₹{(order?.amount || 0).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-3">
                  {order?.status === "accepted" && (
                    <motion.button
                      onClick={() => onInitiatePayment(order.id)}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-colors font-outfit font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Initiate Payment
                    </motion.button>
                  )}
                  {order?.status === "payment_pending" && (
                    <motion.button
                      onClick={() => onCompletePayment(order.id)}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-outfit font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Complete Payment
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Milestones Progress */}
          {orderFlow.payment_status === "completed" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                Milestones & Payments
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      milestone?.status === "completed"
                        ? "border-green-200 bg-green-50"
                        : milestone?.status === "in_progress"
                        ? "border-blue-200 bg-blue-50"
                        : "border-orange-200 bg-orange-50"
                    } font-outfit`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone?.status === "completed"
                              ? "bg-green-500"
                              : milestone?.status === "in_progress"
                              ? "bg-blue-500"
                              : "bg-orange-400"
                          }`}
                        >
                          {milestone?.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white text-sm font-medium">
                              {index + 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {milestone?.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Payout: ₹{(milestone?.payout || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            milestone?.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : milestone?.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {milestone?.status
                            ? milestone.status.replace("_", " ")
                            : "Unknown"}
                        </span>

                        {milestone?.status === "in_progress" && (
                          <motion.button
                            onClick={() => onPaymentRelease(order.id, index)}
                            className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-colors text-sm font-outfit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Release Payment
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 rounded-b-2xl">
          <div className="flex space-x-3">
            <motion.button
              onClick={handleChat}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Open Chat
            </motion.button>
            {orderFlow.payment_status === "completed" && (
              <motion.button
                onClick={handlePaymentFlowClick}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-outfit font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Payment Flow
              </motion.button>
            )}
          </div>

          <div className="flex space-x-3">
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
    </div>
  );
};

export default Dashboard;
