import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Eye,
  MessageCircle,
  TrendingUp,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  History,
  ArrowRight,
  UserCheck,
  AlertCircle,
  Loader,
  CreditCard,
  Shield,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

// --- Order Status Icons and Colors (Helper functions) ---
const getStatusColor = (status) => {
  // Check for the backend 'approved' status and treat it as 'accepted' for color/UI
  const displayStatus = status === "approved" ? "accepted" : status;

  if (!displayStatus) return "bg-gray-100 text-gray-800";

  switch (displayStatus) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in_progress":
      return "bg-blue-100 text-blue-800";
    case "payment_initiated":
      return "bg-purple-100 text-purple-800";
    case "payment_pending":
      return "bg-orange-100 text-orange-800";
    case "accepted": // Maps to backend 'approved' or explicit 'accepted' if used
      return "bg-cyan-100 text-cyan-800";
    case "pending": // Maps to frontend 'pending_acceptance'
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status) => {
  const displayStatus = status === "approved" ? "accepted" : status;

  if (!displayStatus) return <XCircle className="w-4 h-4" />;

  switch (displayStatus) {
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
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "cancelled":
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return <XCircle className="w-4 h-4" />;
  }
};

const getStatusText = (status) => {
  if (!status) return "Unknown Status";

  switch (status) {
    case "pending":
      return "Pending Acceptance";
    case "approved":
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
    case "cancelled":
    case "rejected":
      return status.charAt(0).toUpperCase() + status.slice(1);
    default:
      return status.replace("_", " ");
  }
};
// -----------------------------------------------------------------

const Dashboard = () => {
  const navigate = useNavigate();
  const { orders, loading, fetchOrders, orderRazorpay } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const calculateAnalytics = (currentOrders) => {
    if (!currentOrders || currentOrders.length === 0) {
      return {
        totalOrders: 0,
        pendingAcceptance: 0,
        acceptedOrders: 0,
        paymentPending: 0,
        inProgressOrders: 0,
        totalSpent: 0,
        escrowHeld: 0,
      };
    }

    const totalOrders = currentOrders.length;
    const pendingAcceptance = currentOrders.filter(
      (order) => order.status === "pending"
    ).length;
    const acceptedOrders = currentOrders.filter(
      (order) => order.status === "approved" || order.status === "accepted"
    ).length;
    const paymentPending = currentOrders.filter(
      (order) =>
        order.status === "payment_pending" ||
        order.status === "payment_initiated"
    ).length;
    const inProgressOrders = currentOrders.filter(
      (order) => order.status === "in_progress"
    ).length;

    const totalSpent = currentOrders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    const escrowHeld = currentOrders
      .filter(
        (order) =>
          order.status === "in_progress" || order.status === "payment_initiated"
      )
      .reduce((sum, order) => {
        const releasedAmount = (order.milestones || [])
          .slice(0, order.currentMilestone || 0)
          .reduce(
            (milestoneSum, milestone) =>
              milestoneSum + (milestone?.payout || 0),
            0
          );

        return sum + ((order.totalAmount || 0) - releasedAmount);
      }, 0);

    return {
      totalOrders,
      pendingAcceptance,
      acceptedOrders,
      paymentPending,
      inProgressOrders,
      totalSpent,
      escrowHeld,
    };
  };

  const analytics = calculateAnalytics(orders);

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      (order.orderDetails?.brandName?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (order.orderDetails?.contactPerson?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (order.serviceDetails?.service?.toLowerCase() || "").includes(
        searchLower
      ) ||
      (order.influencerName?.toLowerCase() || "").includes(searchLower);

    const matchesStatus =
      statusFilter === "all" ||
      order.status === statusFilter ||
      (statusFilter === "approved" && order.status === "approved") ||
      (statusFilter === "pending_acceptance" && order.status === "pending");

    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleChat = (order) => {
    navigate(`/chat/${order?.chatId || order._id}`, {
      state: {
        orderId: order._id,
        influencerName: order.influencerName,
        campaignId: order._id,
      },
    });
  };

  const handlePaymentFlow = (order) => {
    // Navigate to the new payment status page using the order ID
    navigate(`/payment-status/${order._id}`);
  };

  const handleInitiatePayment = (orderId) => {
    if (
      window.confirm(
        "Do you want to initiate the secure payment for this order? This will open the Razorpay payment gateway."
      )
    ) {
      orderRazorpay(orderId);
      setSelectedOrder(null);
      setShowOrderModal(false);
    }
  };

  const handleCompletePayment = (orderId) => {
    console.log(`API Call: Complete payment for ${orderId}`);
  };

  const handlePaymentRelease = (orderId, milestoneIndex) => {
    console.log(
      `API Call: Release payment for order ${orderId}, milestone ${milestoneIndex}`
    );
  };

  const handleCancelOrder = (orderId) => {
    console.log(`API Call: Cancelling order ${orderId}`);
    setSelectedOrder(null);
    setShowOrderModal(false);
    fetchOrders();
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
                        <History className="w-4 h-4 mr-2" />            View
            History          
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
                             <option value="pending">Pending Acceptance</option>
                                   {" "}
                  <option value="approved">Accepted - Pay Now</option>         
                         
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
                    key={order._id}
                    className="hover:bg-orange-50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                                       
                    <td className="px-6 py-4 whitespace-nowrap">
                                           
                      <div className="text-sm font-medium text-gray-900 font-outfit">
                                                CAMPAIGN-
                        {order._id.substring(18)}                     
                      </div>
                                           
                      <div className="text-sm text-gray-500 font-outfit">
                                                Order: {order._id}             
                               
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
                                               
                        {order.serviceDetails?.service || "N/A"}               
                             
                      </div>
                                         
                    </td>
                                       
                    <td className="px-6 py-4 whitespace-nowrap">
                                           
                      <div className="text-sm font-medium text-gray-900 font-outfit">
                                                ₹
                        {(order.totalAmount || 0).toLocaleString()}             
                               
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
                                               
                        {order.status === "approved" && (
                          <motion.button
                            onClick={() => handleInitiatePayment(order._id)}
                            className="text-orange-600 hover:text-red-700 flex items-center font-outfit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                                                       
                            <CreditCard className="w-4 h-4 mr-1" />             
                                          Pay Now                          
                          </motion.button>
                        )}
                                               
                        {(order.status === "payment_initiated" ||
                          order.status === "in_progress" ||
                          order.status === "completed") && (
                          <motion.button
                            onClick={() => handlePaymentFlow(order)}
                            className="text-purple-600 hover:text-purple-900 flex items-center font-outfit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                                                       
                            <ArrowRight className="w-4 h-4 mr-1" />             
                                          Flow                          
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
      <AnimatePresence>
               
        {showOrderModal && selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setShowOrderModal(false)}
            onPaymentRelease={handlePaymentRelease}
            onPaymentFlow={handlePaymentFlow}
            onInitiatePayment={handleInitiatePayment}
            onCompletePayment={handleCompletePayment}
            onCancelOrder={handleCancelOrder}
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
  onPaymentRelease,
  onPaymentFlow,
  onInitiatePayment,
  onCompletePayment,
  onCancelOrder,
}) => {
  const navigate = useNavigate();

  const handleChat = () => {
    navigate(`/chat/${order._id}`, {
      state: {
        orderId: order._id,
        influencerName: order?.influencerName,
        campaignId: order._id,
      },
    });
    onClose();
  };

  const handlePaymentFlowClick = () => {
    onPaymentFlow(order);
    onClose();
  };

  const handleCancelClick = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      onCancelOrder(order._id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
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
                            Campaign: {order?.orderDetails.brandName} • Order
              {order?._id}           
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
                                        {formatDate(order?.orderDate)}         
                           
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Influencer Name:</span>       
                           
                  <span className="font-medium">{order?.influencerName}</span> 
                               
                </div>
                             
              </div>
                           
              <div className="space-y-2">
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Current Status:</span>       
                           
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                                       
                    {order.status ? getStatusText(order.status) : "Unknown"}   
                                 
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Total Amount:</span>         
                         
                  <span className="font-medium text-orange-600">
                                        ₹
                    {(order?.totalAmount || 0).toLocaleString()}               
                     
                  </span>
                                 
                </div>
                             
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
                                   <span className="text-gray-600">Brand:</span>
                                   
                  <span className="font-medium">
                                        {order?.orderDetails?.brandName}       
                             
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Platform:</span>             
                      <span className="font-medium">{order?.platform}</span>   
                             
                </div>
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Service Type:</span>         
                         
                  <span className="font-medium">
                                        {order?.serviceDetails?.service}       
                             
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Timeline:</span>             
                     
                  <span className="font-medium">
                                        {order?.serviceDetails?.timeline}       
                             
                  </span>
                                 
                </div>
                             
              </div>
                         
            </div>
                       
            <div className="space-y-4">
                           
              <h3 className="text-lg font-semibold text-gray-900 font-brasika">
                                Contact Details              
              </h3>
                           
              <div className="space-y-2 font-outfit">
                               
                <div className="flex justify-between">
                                   
                  <span className="text-gray-600">Contact Person:</span>       
                           
                  <span className="font-medium">
                                        {order?.orderDetails?.contactPerson}   
                                 
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   <span className="text-gray-600">Email:</span>
                                   
                  <span className="font-medium">
                                        {order?.orderDetails?.email}           
                         
                  </span>
                                 
                </div>
                               
                <div className="flex justify-between">
                                   <span className="text-gray-600">Phone:</span>
                                   
                  <span className="font-medium">
                                        {order?.orderDetails?.phone}           
                         
                  </span>
                                 
                </div>
                                             
              </div>
                         
            </div>
                     
          </div>
                    {/* Payment Actions */}         
          {(order?.status === "approved" ||
            order?.status === "payment_pending") && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                           
              <h3 className="text-lg font-semibold text-gray-900 font-brasika mb-4">
                                Payment Required              
              </h3>
                           
              <div className="flex items-center justify-between">
                               
                <div>
                                   
                  <p className="text-gray-600 font-outfit mb-2">
                                        Please complete the payment to start the
                    campaign. Funds                     will be held in escrow
                    until campaign completion.                  
                  </p>
                                   
                  <p className="text-sm text-gray-500 font-outfit">
                                        Amount:                    
                    <span className="font-bold text-orange-600">
                                            ₹
                      {(order?.totalAmount || 0).toLocaleString()}             
                           
                    </span>
                                     
                  </p>
                                 
                </div>
                               
                <div className="flex space-x-3">
                                   
                  {order?.status === "approved" && (
                    <motion.button
                      onClick={() => onInitiatePayment(order._id)}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-colors font-outfit font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                                            Pay Full Amount (Escrow)            
                             
                    </motion.button>
                  )}
                                   
                  {order?.status === "payment_pending" && (
                    <motion.button
                      onClick={() => onCompletePayment(order._id)}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-outfit font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                                            Complete Pending Payment            
                             
                    </motion.button>
                  )}
                                 
                </div>
                             
              </div>
                         
            </div>
          )}
                    {/* Milestones Progress */}         
          {order?.status === "in_progress" && (
            <div className="space-y-4">
                           
              <h3 className="text-lg font-semibold text-gray-900 font-brasika mb-4">
                                Milestones & Payments              
              </h3>
                           
              <div className="space-y-4">
                               
                <p className="text-gray-600 font-outfit">
                                    Milestones management for payment release
                  will appear here.                
                </p>
                             
              </div>
                         
            </div>
          )}
                 
        </div>
                {/* Footer Actions */}       
        <div className="border-t border-orange-200 p-6 flex flex-col sm:flex-row justify-between gap-3">
                    {/* Cancel Button */}         
          {(order.status === "pending" ||
            order.status === "approved" ||
            order.status === "payment_pending") && (
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
                       
            <motion.button
              onClick={handleChat}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                            <MessageCircle className="w-4 h-4 mr-2" />         
                  Open Chat            
            </motion.button>
                       
            {(order?.status === "payment_initiated" ||
              order?.status === "in_progress" ||
              order?.status === "completed") && (
              <motion.button
                onClick={handlePaymentFlowClick}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors font-outfit font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                                <ArrowRight className="w-4 h-4 mr-1" />         
                      Payment Flow              
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
         
    </div>
  );
};

export default Dashboard;
