import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  CreditCard,
  Shield,
  XCircle,
  ArrowLeft,
  Loader,
  UserCheck,
  AlertCircle,
  Send, // Added for release button
} from "lucide-react";
// 💡 FIX: Reverting to the typical relative path assumption for files nested in 'pages'
import { useAppContext } from "../context/AppContext";

// Helper function to format currency
const formatCurrency = (amount) => `₹${(amount || 0).toLocaleString()}`;

// --- Order Status Icons and Colors (Helper functions) ---
const getStatusColor = (status) => {
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
    case "approved": // Mapped from backend to frontend flow
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

// Helper to determine Milestone UI
const getMilestoneIcon = (status) => {
  switch (status) {
    case "released":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "disputed":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "pending":
    default:
      return <Clock className="w-5 h-5 text-yellow-500" />;
  }
};

const PaymentFlowStatusPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { axios, clientToken, fetchOrders } = useAppContext(); // Included fetchOrders to update dashboard

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [releaseLoading, setReleaseLoading] = useState(false); // Fetch the detailed order data including the populated paymentRef

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/api/client/order-payment-details/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        }
      );

      if (response.data.success && response.data.data) {
        setOrder(response.data.data);
      } else {
        setError(response.data.message || "Failed to load order details.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to connect to API or retrieve data."
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Milestone Release Handler ---
  const handleReleaseMilestone = async (milestoneIndex) => {
    if (
      !window.confirm(
        `Are you sure you want to release payment for Milestone ${
          milestoneIndex + 1
        }? This action is irreversible.`
      )
    ) {
      return;
    }

    setReleaseLoading(true);
    try {
      // 💡 NOTE: The backend route for this needs to be implemented and added to clientRouter.js
      const response = await axios.put(
        `/api/client/release-milestone`,
        {
          orderId,
          milestoneIndex,
        },
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        }
      );

      if (response.data.success) {
        // Refresh the detailed view to show the updated milestone status
        await fetchDetails();
        // Also update the main dashboard order list
        fetchOrders();
        console.log(`Milestone ${milestoneIndex + 1} Released!`);
      } else {
        setError(response.data.message || "Failed to release milestone.");
      }
    } catch (err) {
      console.error("Release Error:", err);
      setError(
        err.response?.data?.message || "Failed to process release request."
      );
    } finally {
      setReleaseLoading(false);
    }
  };

  useEffect(() => {
    if (orderId && clientToken) {
      fetchDetails();
    }
  }, [orderId, clientToken]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <Loader className="w-8 h-8 animate-spin text-orange-500" />     
         
        <h2 className="ml-3 text-2xl font-bold text-gray-900">
                    Loading Payment Flow...        
        </h2>
             
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-red-50 p-6 pt-20 text-center">
               
        <h1 className="text-3xl font-bold text-red-700 mb-4">
                    Error Loading Order        
        </h1>
               
        <p className="text-red-600">{error || "Order data not found."}</p>     
         
        <motion.button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-4 py-2 bg-gray-300 rounded-xl flex items-center justify-center mx-auto"
        >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard    
             
        </motion.button>
                       
      </div>
    );
  }

  const payment = order.paymentRef; // Check if payment details exist and if payment is 'paid' (into escrow)
  const isEscrowFunded = payment && payment.paymentStatus === "paid";
  // Check if the overall campaign status allows for milestone actions
  const isCampaignInProgress = order.status === "in_progress";

  const milestones = payment?.milestones || [];
  const totalReleased = milestones
    .filter((m) => m.status === "released")
    .reduce((sum, m) => sum + m.amountDue, 0);
  const escrowHeld = payment?.totalEscrowAmount - totalReleased; // campaignStatusText now uses the correctly defined helper function
  const campaignStatusText = getStatusText(order.status); // --- Escrow Flow Visualization ---

  const EscrowProgress = () => (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-purple-200 space-y-6">
           
      <h3 className="text-xl font-brasika text-purple-800 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-600" /> Escrow &
        Fund Status      
      </h3>
           
      <div className="grid grid-cols-2 gap-4 text-sm font-outfit">
               
        <p>
                    <strong>Total Escrow Amount:</strong>          
          {formatCurrency(payment.totalEscrowAmount)}       
        </p>
               
        <p>
                    <strong>Amount Released:</strong>          
          <span className="text-green-600">
                        {formatCurrency(totalReleased)}         
          </span>
                 
        </p>
               
        <p>
                    <strong>Funds Currently Held:</strong>          
          <span className="font-bold text-purple-600">
                        {formatCurrency(escrowHeld)}         
          </span>
                 
        </p>
               
        <p>
                    <strong>Payment Status:</strong>          
          <span className="font-bold text-blue-600">
                        {payment.paymentStatus.toUpperCase()}         
          </span>
                 
        </p>
             
      </div>
           
      <div className="space-y-4">
               
        <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    Milestones ({milestones.length})        
        </h4>
               
        {milestones.length === 0 ? (
          <p className="text-gray-500">No milestones defined for this order.</p>
        ) : (
          <ol className="relative border-l border-purple-300 ml-4">
                       
            {milestones.map((milestone, index) => {
              // Determine if this milestone is ready to be released
              const isReleasable =
                isEscrowFunded &&
                isCampaignInProgress &&
                milestone.status === "pending" &&
                (index === 0 || milestones[index - 1].status === "released");

              return (
                <li key={index} className="mb-8 ml-6">
                                 
                  <span
                    className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${
                      milestone.status === "released"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                                      {getMilestoneIcon(milestone.status)}     
                             
                  </span>
                                 
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                                       
                      <h5 className="font-bold text-md text-gray-900">
                                            {milestone.milestoneName}           
                             
                      </h5>
                                       
                      <p className="text-sm text-gray-600 my-1">
                                            Amount:                    
                        <span className="font-semibold">
                                               
                          {formatCurrency(milestone.amountDue)}                 
                           
                        </span>
                                         
                      </p>
                                       
                      <p className="text-xs text-gray-500">
                                            Status:                    
                        <span
                          className={`font-medium ${
                            milestone.status === "released"
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                                                {milestone.status.toUpperCase()}
                                             
                        </span>
                                         
                      </p>
                                       
                      {milestone.status === "released" && (
                        <p className="text-xs text-gray-500 mt-1">
                                                Released:                      
                          {new Date(milestone.releaseDate).toLocaleDateString()}
                                             
                        </p>
                      )}
                    </div>
                    {isReleasable && (
                      <motion.button
                        onClick={() => handleReleaseMilestone(index)}
                        disabled={releaseLoading}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold flex items-center text-sm disabled:bg-gray-400"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {releaseLoading ? (
                          <Loader className="w-4 h-4 animate-spin mr-1" />
                        ) : (
                          <Send className="w-4 h-4 mr-1" />
                        )}
                        Release
                        {index === 0
                          ? "Deposit"
                          : formatCurrency(milestone.amountDue)}
                      </motion.button>
                    )}
                                   
                  </motion.div>
                               
                </li>
              );
            })}
                     
          </ol>
        )}
             
      </div>
         
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-pink-50 p-6 pt-20">
           
      <div className="max-w-5xl mx-auto space-y-8">
               
        <header className="flex justify-between items-center pb-4 border-b border-gray-300">
                   
          <div>
                       
            <h1 className="text-4xl font-brasika font-bold text-gray-900 mb-2">
                            Payment Flow: #{orderId.substring(18)}           
            </h1>
                       
            <p className="text-gray-600 font-outfit mt-1">
                            Tracking campaign payments for              
              <strong>{order.influencerName}</strong> ({order.platform})        
                 
            </p>
                     
          </div>
                   
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors flex items-center font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard        
             
          </motion.button>
                 
        </header>
               
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Status (Left Column) */}         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
                       
            <h3 className="text-xl font-brasika text-gray-900 flex items-center">
                            <CreditCard className="w-6 h-6 mr-3 text-red-500" />
              Payment               Details            
            </h3>
                       
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4 font-outfit">
                             
              <div className="flex justify-between border-b pb-2">
                                   
                <span className="text-gray-600">Initial Order Amount:</span>   
                               
                <span className="font-bold text-xl">
                                          {formatCurrency(order.totalAmount)}   
                                 
                </span>
                               
              </div>
                             
              <div className="flex justify-between">
                                   
                <span className="text-gray-600">Client ID:</span>               
                    <span>{order.clientId}</span>               
              </div>
                             
              <div className="flex justify-between">
                                   
                <span className="text-gray-600">Order Status:</span>           
                       
                <span
                  className={`font-semibold ${getStatusColor(
                    order.status
                  ).replace(/bg-|text-/g, "text-")}`}
                >
                                          {campaignStatusText}                 
                   
                </span>
                               
              </div>
                             
              <div className="flex justify-between">
                                   
                <span className="text-gray-600">Transaction ID (R-ID):</span>   
                               
                <span className="text-xs">{payment?.paymentId || "N/A"}</span> 
                             
              </div>
                         
            </div>
                     
          </motion.div>
                    {/* Escrow Progress (Right Column) */}         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
                       
            {payment ? (
              <EscrowProgress />
            ) : (
              <div className="bg-red-100 p-6 rounded-2xl border border-red-400">
                               
                <p className="text-red-700 font-semibold">
                                    Payment record initialization pending or
                  missing.                
                </p>
                             
              </div>
            )}
                     
          </motion.div>
                 
        </div>
             
      </div>
         
    </div>
  );
};

export default PaymentFlowStatusPage;
