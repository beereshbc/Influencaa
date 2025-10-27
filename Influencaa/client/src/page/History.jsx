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
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  BarChart3,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";

// Dummy datasets for completed orders
const completedOrders = [
  {
    id: "ORD-003",
    campaignId: "CAMP-003",
    influencerName: "Emma Wilson",
    serviceType: "Reel Creation",
    platform: "Instagram",
    amount: 12000,
    status: "completed",
    orderDate: "2025-10-20",
    completedDate: "2025-10-25",
    timeline: "5 days delivery",
    milestones: [
      { name: "Content Creation", status: "completed", payout: 6000 },
      { name: "Review & Approval", status: "completed", payout: 3000 },
      { name: "Publishing", status: "completed", payout: 3000 },
    ],
    currentMilestone: 3,
    chatId: "chat-003",
    rating: 5,
    review:
      "Excellent work! Emma delivered high-quality content that perfectly matched our brand guidelines.",
  },
  {
    id: "ORD-005",
    campaignId: "CAMP-005",
    influencerName: "Jessica Brown",
    serviceType: "Story Package",
    platform: "Instagram",
    amount: 7000,
    status: "completed",
    orderDate: "2025-10-18",
    completedDate: "2025-10-22",
    timeline: "4 days delivery",
    milestones: [
      { name: "Content Creation", status: "completed", payout: 3500 },
      { name: "Publishing", status: "completed", payout: 3500 },
    ],
    currentMilestone: 2,
    chatId: "chat-005",
    rating: 4,
    review: "Good communication and timely delivery. Would work with again!",
  },
  {
    id: "ORD-006",
    campaignId: "CAMP-006",
    influencerName: "David Kim",
    serviceType: "YouTube Review",
    platform: "YouTube",
    amount: 20000,
    status: "completed",
    orderDate: "2025-10-15",
    completedDate: "2025-10-25",
    timeline: "10 days delivery",
    milestones: [
      { name: "Script Approval", status: "completed", payout: 4000 },
      { name: "Video Production", status: "completed", payout: 10000 },
      { name: "Final Review", status: "completed", payout: 3000 },
      { name: "Publishing", status: "completed", payout: 3000 },
    ],
    currentMilestone: 4,
    chatId: "chat-006",
    rating: 5,
    review:
      "Outstanding video quality and engagement. Generated 15% conversion rate!",
  },
  {
    id: "ORD-007",
    campaignId: "CAMP-007",
    influencerName: "Sophia Martinez",
    serviceType: "Shoutout Package",
    platform: "TikTok",
    amount: 9000,
    status: "completed",
    orderDate: "2025-10-12",
    completedDate: "2025-10-15",
    timeline: "3 days delivery",
    milestones: [
      { name: "Content Creation", status: "completed", payout: 4500 },
      { name: "Publishing", status: "completed", payout: 4500 },
    ],
    currentMilestone: 2,
    chatId: "chat-007",
    rating: 4,
    review:
      "Great energy and creativity. Content performed very well with our target audience.",
  },
];

const History = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(completedOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Analytics for completed orders
  const analytics = {
    totalCompleted: orders.length,
    totalSpent: orders.reduce((sum, order) => sum + order.amount, 0),
    averageRating: (
      orders.reduce((sum, order) => sum + order.rating, 0) / orders.length
    ).toFixed(1),
    successfulCampaigns: orders.filter((order) => order.rating >= 4).length,
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.campaignId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.influencerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handlePaymentFlow = (order) => {
    navigate(`/payment-flow/${order.id}`, {
      state: {
        order: order,
      },
    });
  };

  const getStatusColor = (status) => {
    return "bg-green-100 text-green-800";
  };

  const getStatusIcon = (status) => {
    return <CheckCircle className="w-4 h-4" />;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-white via-orange-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors font-outfit"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </motion.button>
          <h1 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-2">
            Campaign History
          </h1>
          <p className="text-xl font-playfair text-gray-700">
            Review your completed influencer campaigns and performance
          </p>
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
                  Completed Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.totalCompleted}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
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
                  Total Invested
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  ₹{analytics.totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
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
                  Average Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.averageRating}/5
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
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
                  Successful Campaigns
                </p>
                <p className="text-2xl font-bold text-gray-900 font-brasika">
                  {analytics.successfulCampaigns}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
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
                Completed Orders
              </h2>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                  />
                </div>

                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center font-outfit">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
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
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-outfit">
                    Completed Date
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
                      <div className="flex items-center space-x-2">
                        {renderStars(order.rating)}
                        <span className="text-sm text-gray-600 font-outfit">
                          {order.rating}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-outfit">
                        {order.completedDate}
                      </div>
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
                          View Details
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            navigate(`/chat/${order.chatId}`, {
                              state: {
                                orderId: order.id,
                                influencerName: order.influencerName,
                                campaignId: order.campaignId,
                              },
                            })
                          }
                          className="text-green-600 hover:text-green-900 flex items-center font-outfit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </motion.button>
                        <motion.button
                          onClick={() => handlePaymentFlow(order)}
                          className="text-purple-600 hover:text-purple-900 flex items-center font-outfit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowRight className="w-4 h-4 mr-1" />
                          Payment Flow
                        </motion.button>
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
                No completed orders found
              </div>
              <div className="text-sm text-gray-500 font-outfit">
                Try adjusting your search terms
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
          onPaymentFlow={handlePaymentFlow}
        />
      )}
    </div>
  );
};

// Order Details Modal Component for History
const OrderDetailsModal = ({ order, onClose, onPaymentFlow }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handlePaymentFlowClick = () => {
    onPaymentFlow(order);
    onClose();
  };

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
              {order.campaignId} • {order.id}
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
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                Campaign Information
              </h3>
              <div className="space-y-2 font-outfit">
                <div className="flex justify-between">
                  <span className="text-gray-600">Influencer:</span>
                  <span className="font-medium">{order.influencerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-medium">{order.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-medium">{order.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{order.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed Date:</span>
                  <span className="font-medium text-green-600">
                    {order.completedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                Performance & Rating
              </h3>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit">
                      Your Rating
                    </span>
                    {renderStars(order.rating)}
                  </div>
                  <p className="text-sm text-gray-600 font-outfit">
                    {order.rating}/5 stars
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 font-outfit">
                      Total Investment
                    </span>
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  </div>
                  <p className="text-lg font-bold text-orange-600 font-outfit">
                    ₹{order.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 font-brasika">
              Your Review
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 italic font-outfit">
                "{order.review}"
              </p>
            </div>
          </div>

          {/* Milestones Progress */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 font-brasika">
              Campaign Milestones
            </h3>
            <div className="space-y-3">
              {order.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 font-outfit"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {milestone.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Payout: ₹{milestone.payout.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 rounded-b-2xl">
          <div className="flex space-x-3">
            <motion.button
              onClick={() =>
                navigate(`/chat/${order.chatId}`, {
                  state: {
                    orderId: order.id,
                    influencerName: order.influencerName,
                    campaignId: order.campaignId,
                  },
                })
              }
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              View Chat History
            </motion.button>
            <motion.button
              onClick={handlePaymentFlowClick}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Payment Flow
            </motion.button>
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

export default History;
