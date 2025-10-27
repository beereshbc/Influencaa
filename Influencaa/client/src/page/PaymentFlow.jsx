import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Target,
  Eye,
  Download,
} from "lucide-react";

const PaymentFlow = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      title: "Funds Secured in Escrow",
      description:
        "Payment is safely held in escrow until milestones are completed",
      icon: Shield,
      status: "completed",
    },
    {
      title: "Content Creation",
      description: "Influencer is working on creating the content",
      icon: FileText,
      status: "in_progress",
    },
    {
      title: "Review & Approval",
      description: "Brand reviews and approves the content",
      icon: Users,
      status: "pending",
    },
    {
      title: "Publishing",
      description: "Content is published on the platform",
      icon: TrendingUp,
      status: "pending",
    },
    {
      title: "Payment Release",
      description: "Funds are released to the influencer",
      icon: DollarSign,
      status: "pending",
    },
  ];

  const handleApproveStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getCurrentMilestone = () => {
    if (!order) return null;
    return (
      order.milestones[currentStep - 1] ||
      order.milestones[order.milestones.length - 1]
    );
  };

  const currentMilestone = getCurrentMilestone();

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-white via-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
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
            Payment Escrow Flow
          </h1>
          <p className="text-xl font-playfair text-gray-700">
            Secure milestone-based payments for your campaign
          </p>
          {order && (
            <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-200">
              <div className="flex items-center justify-between font-outfit">
                <div>
                  <span className="text-gray-600">Order:</span>
                  <span className="font-semibold text-gray-900 ml-2">
                    {orderId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Influencer:</span>
                  <span className="font-semibold text-gray-900 ml-2">
                    {order.influencerName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-orange-600 ml-2">
                    ₹{order.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-orange-200">
              <motion.div
                className="h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-lg"
                          : isCurrent
                          ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-500 text-white shadow-lg"
                          : "bg-white border-orange-300 text-orange-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={`text-sm font-medium font-outfit ${
                          isCompleted || isCurrent
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 max-w-[120px] font-outfit">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Current Step Details */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-brasika">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600 font-outfit">
                {steps[currentStep].description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {currentStep === 0 && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium font-outfit">
                  Completed
                </span>
              )}
              {currentStep > 0 && currentStep < steps.length - 1 && (
                <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-sm font-medium font-outfit">
                  In Progress
                </span>
              )}
              {currentStep === steps.length - 1 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium font-outfit">
                  Final Step
                </span>
              )}
            </div>
          </div>

          {/* Step-specific content */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                      Funds Secured
                    </h3>
                    <p className="text-gray-600 font-outfit">
                      Your payment of ₹{order?.amount.toLocaleString()} is
                      safely held in escrow.
                    </p>
                  </div>
                </div>
              </div>

              {currentMilestone && (
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-semibold text-gray-900 font-brasika mb-4">
                    Next Milestone
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 font-outfit">
                        {currentMilestone.name}
                      </h4>
                      <p className="text-sm text-gray-600 font-outfit">
                        Payout: ₹{currentMilestone.payout.toLocaleString()}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                      Content in Progress
                    </h3>
                    <p className="text-gray-600 font-outfit">
                      {order?.influencerName} is currently working on creating
                      the content.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900 font-outfit">
                        Expected completion
                      </span>
                    </div>
                    <p className="text-lg font-bold text-blue-600 font-outfit mt-1">
                      2-3 days
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900 font-outfit">
                        Current Milestone
                      </span>
                    </div>
                    <p className="text-lg font-bold text-blue-600 font-outfit mt-1">
                      ₹{currentMilestone?.payout.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                      Ready for Review
                    </h3>
                    <p className="text-gray-600 font-outfit">
                      Please review the content submitted by{" "}
                      {order?.influencerName}.
                    </p>
                  </div>
                </div>

                <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center bg-white/50">
                  <FileText className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-outfit mb-4">
                    Content preview will appear here for your review
                  </p>
                  <div className="flex justify-center space-x-3">
                    <motion.button
                      className="flex items-center px-4 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-outfit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Files
                    </motion.button>
                    <motion.button
                      className="flex items-center px-4 py-2 bg-white border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-outfit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Content
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                      Publishing Phase
                    </h3>
                    <p className="text-gray-600 font-outfit">
                      Content is being published on {order?.platform}.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 font-outfit">
                        Publication Status
                      </h4>
                      <p className="text-sm text-gray-600 font-outfit">
                        Content is scheduled for publishing
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium font-outfit">
                      Scheduled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 font-outfit">
                      Final Payment Release
                    </h3>
                    <p className="text-gray-600 font-outfit">
                      Ready to release the final payment to{" "}
                      {order?.influencerName}.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-blue-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 font-outfit mb-2">
                        Payment Summary
                      </h4>
                      <div className="space-y-2 font-outfit">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span className="font-medium">
                            ₹{order?.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Already Released:
                          </span>
                          <span className="font-medium text-green-600">
                            ₹
                            {order?.milestones
                              .slice(0, -1)
                              .reduce((sum, m) => sum + m.payout, 0)
                              .toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-600">Final Release:</span>
                          <span className="font-bold text-orange-600">
                            ₹{currentMilestone?.payout.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 font-outfit">
                          All milestones completed successfully
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <>
                <motion.button
                  className="px-6 py-3 border border-orange-300 rounded-xl hover:bg-orange-50 transition-colors font-outfit font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Changes
                </motion.button>
                <motion.button
                  onClick={handleApproveStep}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-colors font-outfit font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Approve & Continue
                </motion.button>
              </>
            )}

            {currentStep === steps.length - 1 && (
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-colors font-outfit font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Release Final Payment
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFlow;
