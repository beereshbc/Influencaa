import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  Eye,
  Filter,
  Calendar,
  CreditCard,
  Wallet,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  Shield,
  Zap,
  BarChart3,
  PieChart,
  Receipt,
  Send,
  Plus,
  X,
  FileText,
  Mail,
  Phone,
  User,
  Building,
  MapPin,
} from "lucide-react";

const Earnings = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  // Sample data
  const earningsData = {
    overview: {
      totalEarnings: 125800,
      availableBalance: 45800,
      pendingPayouts: 32000,
      withdrawn: 48000,
      thisMonth: 28500,
      lastMonth: 24200,
      growth: 17.8,
    },
    pendingPayouts: [
      {
        id: 1,
        orderId: "ORD-001",
        brand: "Nike",
        platform: "youtube",
        amount: 8000,
        orderDate: "2025-10-26T07:21:31.627Z",
        expectedDate: "2025-11-02T00:00:00.000Z",
        status: "processing",
      },
      {
        id: 2,
        orderId: "ORD-002",
        brand: "Adidas",
        platform: "instagram",
        amount: 15000,
        orderDate: "2025-10-25T10:15:22.123Z",
        expectedDate: "2025-11-01T00:00:00.000Z",
        status: "pending",
      },
      {
        id: 3,
        orderId: "ORD-003",
        brand: "Spotify",
        platform: "twitter",
        amount: 5000,
        orderDate: "2025-10-24T14:30:45.789Z",
        expectedDate: "2025-10-31T00:00:00.000Z",
        status: "processing",
      },
      {
        id: 4,
        orderId: "ORD-004",
        brand: "Apple",
        platform: "youtube",
        amount: 4000,
        orderDate: "2025-10-23T09:45:33.456Z",
        expectedDate: "2025-10-30T00:00:00.000Z",
        status: "pending",
      },
    ],
    paymentHistory: [
      {
        id: 1,
        orderId: "ORD-005",
        brand: "Samsung",
        platform: "instagram",
        amount: 12000,
        paymentDate: "2025-10-20T14:20:15.123Z",
        status: "completed",
        receiptUrl: "#",
      },
      {
        id: 2,
        orderId: "ORD-006",
        brand: "Microsoft",
        platform: "linkedin",
        amount: 18000,
        paymentDate: "2025-10-18T11:30:45.789Z",
        status: "completed",
        receiptUrl: "#",
      },
      {
        id: 3,
        orderId: "ORD-007",
        brand: "Google",
        platform: "youtube",
        amount: 22000,
        paymentDate: "2025-10-15T09:15:22.456Z",
        status: "completed",
        receiptUrl: "#",
      },
      {
        id: 4,
        orderId: "ORD-008",
        brand: "Amazon",
        platform: "twitter",
        amount: 8000,
        paymentDate: "2025-10-12T16:45:33.123Z",
        status: "completed",
        receiptUrl: "#",
      },
      {
        id: 5,
        orderId: "ORD-009",
        brand: "Netflix",
        platform: "instagram",
        amount: 15000,
        paymentDate: "2025-10-10T13:20:15.789Z",
        status: "completed",
        receiptUrl: "#",
      },
    ],
    withdrawalHistory: [
      {
        id: 1,
        amount: 20000,
        date: "2025-10-25T10:30:45.123Z",
        method: "Bank Transfer",
        status: "completed",
        transactionId: "TXN-789012",
        receiptUrl: "#",
      },
      {
        id: 2,
        amount: 15000,
        date: "2025-10-18T14:20:15.456Z",
        method: "UPI",
        status: "completed",
        transactionId: "TXN-789013",
        receiptUrl: "#",
      },
      {
        id: 3,
        amount: 13000,
        date: "2025-10-10T09:15:22.789Z",
        method: "Bank Transfer",
        status: "completed",
        transactionId: "TXN-789014",
        receiptUrl: "#",
      },
    ],
    earningsByPlatform: [
      { platform: "YouTube", amount: 45000, percentage: 36 },
      { platform: "Instagram", amount: 38000, percentage: 30 },
      { platform: "Twitter", amount: 22000, percentage: 17 },
      { platform: "LinkedIn", amount: 15000, percentage: 12 },
      { platform: "Facebook", amount: 5800, percentage: 5 },
    ],
  };

  const tabs = [
    { key: "overview", label: "Earnings Overview", icon: BarChart3 },
    { key: "pending", label: "Pending Payouts", icon: Clock },
    { key: "history", label: "Payment History", icon: CheckCircle },
    { key: "withdraw", label: "Withdraw Funds", icon: Wallet },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
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
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case "youtube":
        return "bg-red-500";
      case "instagram":
        return "bg-pink-500";
      case "twitter":
        return "bg-blue-400";
      case "linkedin":
        return "bg-blue-600";
      case "facebook":
        return "bg-blue-800";
      default:
        return "bg-gray-500";
    }
  };

  const handleWithdrawal = (e) => {
    e.preventDefault();
    // Handle withdrawal logic here
    setShowWithdrawalModal(false);
    setWithdrawalAmount("");
  };

  const generateReceipt = (type, data) => {
    // In a real app, this would generate a PDF receipt
    setSelectedReceipt({ type, data });
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
            <DollarSign className="w-4 h-4 mr-2" />
            Earnings & Payments
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4"
          >
            Your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Earnings Dashboard
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-outfit"
          >
            Track your earnings, manage payouts, and withdraw funds securely
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center px-6 py-3 rounded-xl font-outfit font-semibold transition-all ${
                    activeTab === tab.key
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-orange-50"
                  }`}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
            >
              <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-outfit">
                    Total Earnings
                  </span>
                  <span className="font-outfit font-bold text-green-600">
                    ₹{earningsData.overview.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-outfit">
                    Available Now
                  </span>
                  <span className="font-outfit font-bold text-blue-600">
                    ₹{earningsData.overview.availableBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-outfit">Pending</span>
                  <span className="font-outfit font-bold text-yellow-600">
                    ₹{earningsData.overview.pendingPayouts.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-outfit">Withdrawn</span>
                  <span className="font-outfit font-bold text-gray-600">
                    ₹{earningsData.overview.withdrawn.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Growth Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8" />
                <span className="text-2xl font-brasika font-bold">
                  +{earningsData.overview.growth}%
                </span>
              </div>
              <p className="font-outfit text-orange-100">
                Growth from last month
              </p>
              <div className="mt-4 flex justify-between text-sm">
                <div>
                  <div className="text-orange-200">This Month</div>
                  <div className="font-outfit font-bold">
                    ₹{earningsData.overview.thisMonth.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-200">Last Month</div>
                  <div className="font-outfit font-bold">
                    ₹{earningsData.overview.lastMonth.toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
            >
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-green-500 mr-2" />
                <span className="font-brasika font-semibold text-gray-900">
                  Secure Payments
                </span>
              </div>
              <p className="text-sm text-gray-600 font-outfit">
                All payments are processed through secure escrow and protected
                by our guarantee.
              </p>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Earnings Overview */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Total Earnings",
                      amount: earningsData.overview.totalEarnings,
                      icon: DollarSign,
                      color: "green",
                      trend: "+17.8%",
                    },
                    {
                      title: "Available Balance",
                      amount: earningsData.overview.availableBalance,
                      icon: Wallet,
                      color: "blue",
                      trend: "Ready to withdraw",
                    },
                    {
                      title: "Pending Payouts",
                      amount: earningsData.overview.pendingPayouts,
                      icon: Clock,
                      color: "yellow",
                      trend: "Processing",
                    },
                    {
                      title: "Total Withdrawn",
                      amount: earningsData.overview.withdrawn,
                      icon: Banknote,
                      color: "gray",
                      trend: "All time",
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`p-3 rounded-xl bg-${stat.color}-100`}
                          >
                            <Icon
                              className={`w-6 h-6 text-${stat.color}-600`}
                            />
                          </div>
                          <span
                            className={`text-sm font-outfit font-semibold text-${stat.color}-600`}
                          >
                            {stat.trend}
                          </span>
                        </div>
                        <h3 className="text-2xl font-brasika font-bold text-gray-900 mb-1">
                          ₹{stat.amount.toLocaleString()}
                        </h3>
                        <p className="text-gray-600 font-outfit text-sm">
                          {stat.title}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Earnings by Platform */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-brasika font-semibold text-gray-900">
                        Earnings by Platform
                      </h3>
                      <PieChart className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {earningsData.earningsByPlatform.map(
                        (platform, index) => (
                          <div
                            key={platform.platform}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-3 ${getPlatformColor(
                                  platform.platform
                                )}`}
                              ></div>
                              <span className="font-outfit font-medium text-gray-900 text-sm">
                                {platform.platform}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                  style={{ width: `${platform.percentage}%` }}
                                ></div>
                              </div>
                              <span className="font-outfit font-semibold text-gray-900 text-sm w-16 text-right">
                                ₹{platform.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-brasika font-semibold text-gray-900">
                        Recent Activity
                      </h3>
                      <Zap className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                      {earningsData.paymentHistory
                        .slice(0, 3)
                        .map((payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <ArrowDownLeft className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-outfit font-semibold text-gray-900 text-sm">
                                  {payment.brand}
                                </div>
                                <div className="text-xs text-gray-600 font-outfit">
                                  {new Date(
                                    payment.paymentDate
                                  ).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-outfit font-bold text-green-600 text-sm">
                                +₹{payment.amount.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 font-outfit capitalize">
                                {payment.platform}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-brasika font-bold mb-2">
                        Ready to Withdraw?
                      </h3>
                      <p className="text-orange-100 font-outfit">
                        Transfer your available balance to your bank account
                        instantly
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setShowWithdrawalModal(true)}
                      className="mt-4 lg:mt-0 px-6 py-3 bg-white text-orange-600 rounded-xl font-outfit font-semibold hover:bg-orange-50 transition-colors flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Pending Payouts */}
            {activeTab === "pending" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 overflow-hidden"
              >
                <div className="p-6 border-b border-orange-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-brasika font-bold text-gray-900">
                        Pending Payouts
                      </h2>
                      <p className="text-gray-600 font-outfit">
                        Payments that are being processed
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <motion.button
                        className="flex items-center px-4 py-2 bg-white text-gray-700 border border-orange-200 rounded-xl font-outfit font-semibold hover:bg-orange-50 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-50 border-b border-orange-200">
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Order & Brand
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Platform
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Expected Date
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {earningsData.pendingPayouts.map((payout) => (
                        <tr
                          key={payout.id}
                          className="hover:bg-orange-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-outfit font-semibold text-gray-900">
                                {payout.orderId}
                              </div>
                              <div className="text-sm text-gray-600 font-outfit">
                                {payout.brand}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${getPlatformColor(
                                  payout.platform
                                )}`}
                              ></div>
                              <span className="font-outfit font-medium text-gray-900 capitalize">
                                {payout.platform}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-outfit font-bold text-orange-600">
                              ₹{payout.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-outfit text-gray-600">
                              {new Date(
                                payout.expectedDate
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-outfit font-medium border ${getStatusColor(
                                payout.status
                              )}`}
                            >
                              {getStatusIcon(payout.status)}
                              <span className="ml-2 capitalize">
                                {payout.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Payment History */}
            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 overflow-hidden"
              >
                <div className="p-6 border-b border-orange-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-brasika font-bold text-gray-900">
                        Payment History
                      </h2>
                      <p className="text-gray-600 font-outfit">
                        All completed payments and receipts
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                      <motion.button
                        className="flex items-center px-4 py-2 bg-white text-gray-700 border border-orange-200 rounded-xl font-outfit font-semibold hover:bg-orange-50 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Date Range
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-orange-50 border-b border-orange-200">
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Order & Brand
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Platform
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Payment Date
                        </th>
                        <th className="px-6 py-4 text-left font-brasika font-semibold text-gray-900">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-100">
                      {earningsData.paymentHistory.map((payment) => (
                        <tr
                          key={payment.id}
                          className="hover:bg-orange-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-outfit font-semibold text-gray-900">
                                {payment.orderId}
                              </div>
                              <div className="text-sm text-gray-600 font-outfit">
                                {payment.brand}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div
                                className={`w-3 h-3 rounded-full mr-2 ${getPlatformColor(
                                  payment.platform
                                )}`}
                              ></div>
                              <span className="font-outfit font-medium text-gray-900 capitalize">
                                {payment.platform}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-outfit font-bold text-green-600">
                              ₹{payment.amount.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-outfit text-gray-600">
                              {new Date(
                                payment.paymentDate
                              ).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <motion.button
                                onClick={() =>
                                  generateReceipt("payment", payment)
                                }
                                className="flex items-center text-orange-600 hover:text-orange-700 font-outfit font-medium text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </motion.button>
                              <motion.button
                                className="flex items-center text-gray-600 hover:text-gray-700 font-outfit font-medium text-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Withdraw Funds */}
            {activeTab === "withdraw" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Withdrawal Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6">
                    <h2 className="text-2xl font-brasika font-bold text-gray-900 mb-2">
                      Withdraw Funds
                    </h2>
                    <p className="text-gray-600 font-outfit mb-6">
                      Transfer your available balance to your bank account
                    </p>

                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-outfit font-semibold text-gray-900">
                          Available Balance
                        </span>
                        <Wallet className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="text-3xl font-brasika font-bold text-orange-600">
                        ₹
                        {earningsData.overview.availableBalance.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-outfit font-semibold text-gray-900 mb-2">
                          Withdrawal Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={withdrawalAmount}
                            onChange={(e) =>
                              setWithdrawalAmount(e.target.value)
                            }
                            placeholder="Enter amount"
                            className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                            max={earningsData.overview.availableBalance}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[5000, 10000, 15000, 20000].map((amount) => (
                          <motion.button
                            key={amount}
                            onClick={() =>
                              setWithdrawalAmount(amount.toString())
                            }
                            className={`p-3 border rounded-xl font-outfit font-semibold transition-all ${
                              parseInt(withdrawalAmount) === amount
                                ? "border-orange-500 bg-orange-50 text-orange-600"
                                : "border-gray-200 text-gray-600 hover:border-orange-300"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            ₹{amount.toLocaleString()}
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => setShowWithdrawalModal(true)}
                        disabled={
                          !withdrawalAmount ||
                          parseInt(withdrawalAmount) >
                            earningsData.overview.availableBalance
                        }
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-outfit font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Send className="w-5 h-5 inline mr-2" />
                        Proceed to Withdraw
                      </motion.button>
                    </div>
                  </div>

                  {/* Withdrawal History */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6">
                    <h3 className="text-lg font-brasika font-semibold text-gray-900 mb-4">
                      Recent Withdrawals
                    </h3>
                    <div className="space-y-4">
                      {earningsData.withdrawalHistory.map((withdrawal) => (
                        <div
                          key={withdrawal.id}
                          className="p-3 bg-orange-50 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-outfit font-semibold text-gray-900">
                              ₹{withdrawal.amount.toLocaleString()}
                            </div>
                            <div
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-outfit font-medium border ${getStatusColor(
                                withdrawal.status
                              )}`}
                            >
                              {getStatusIcon(withdrawal.status)}
                              <span className="ml-1 capitalize">
                                {withdrawal.status}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 font-outfit">
                            {withdrawal.method} •{" "}
                            {new Date(withdrawal.date).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <motion.button
                              onClick={() =>
                                generateReceipt("withdrawal", withdrawal)
                              }
                              className="text-xs text-orange-600 hover:text-orange-700 font-outfit"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              View Receipt
                            </motion.button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-brasika font-semibold text-gray-900">
                      Bank Account Details
                    </h3>
                    <motion.button
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-outfit font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Update Details
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center mb-3">
                        <Building className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-outfit font-semibold text-gray-900">
                          Bank Information
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bank Name:</span>
                          <span className="font-outfit font-medium">
                            HDFC Bank
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Number:</span>
                          <span className="font-outfit font-medium">
                            •••• 7890
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IFSC Code:</span>
                          <span className="font-outfit font-medium">
                            HDFC0000123
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center mb-3">
                        <User className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-outfit font-semibold text-gray-900">
                          Account Holder
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-outfit font-medium">
                            Sarah Johnson
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Type:</span>
                          <span className="font-outfit font-medium">
                            Savings
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Branch:</span>
                          <span className="font-outfit font-medium">
                            Mumbai Main
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawalModal && (
          <WithdrawalModal
            amount={withdrawalAmount}
            availableBalance={earningsData.overview.availableBalance}
            onClose={() => setShowWithdrawalModal(false)}
            onConfirm={handleWithdrawal}
            onChangeAmount={setWithdrawalAmount}
          />
        )}
      </AnimatePresence>

      {/* Receipt Modal */}
      <AnimatePresence>
        {selectedReceipt && (
          <ReceiptModal
            receipt={selectedReceipt}
            onClose={() => setSelectedReceipt(null)}
            onDownload={() => {
              /* Download logic */
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Withdrawal Modal Component
const WithdrawalModal = ({
  amount,
  availableBalance,
  onClose,
  onConfirm,
  onChangeAmount,
}) => {
  const fees = Math.max(10, amount * 0.02); // 2% or min ₹10
  const netAmount = amount - fees;

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
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 font-brasika">
            Confirm Withdrawal
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200 mb-6">
            <div className="text-center">
              <div className="text-2xl font-brasika font-bold text-orange-600 mb-2">
                ₹{parseInt(amount).toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 font-outfit">
                Withdrawal amount
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-outfit">
                Withdrawal Amount
              </span>
              <span className="font-outfit font-medium">
                ₹{parseInt(amount).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-outfit">
                Processing Fee (2%)
              </span>
              <span className="font-outfit font-medium">
                -₹{fees.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
              <span className="font-outfit font-semibold text-gray-900">
                Net Amount
              </span>
              <span className="font-brasika font-bold text-green-600">
                ₹{netAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700 font-outfit">
                Funds will be transferred within 24-48 hours to your registered
                bank account.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-outfit font-semibold hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-outfit font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4 mr-2" />
              Confirm
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Receipt Modal Component
const ReceiptModal = ({ receipt, onClose, onDownload }) => {
  const { type, data } = receipt;

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
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 font-brasika">
            {type === "payment" ? "Payment Receipt" : "Withdrawal Receipt"}
          </h2>
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={onDownload}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-xl font-outfit font-semibold hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </motion.button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Receipt Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              <Receipt className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-brasika font-bold text-gray-900">
              INFLUENCAA
            </h3>
            <p className="text-gray-600 font-outfit">Official Receipt</p>
          </div>

          {/* Receipt Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-brasika font-semibold text-gray-900 mb-4">
                {type === "payment" ? "Payment From" : "Withdrawal To"}
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 font-outfit">Name</div>
                  <div className="font-outfit font-semibold">
                    {type === "payment" ? data.brand : "Sarah Johnson"}
                  </div>
                </div>
                {type === "payment" && (
                  <div>
                    <div className="text-sm text-gray-600 font-outfit">
                      Platform
                    </div>
                    <div className="font-outfit font-semibold capitalize">
                      {data.platform}
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-gray-600 font-outfit">
                    Transaction ID
                  </div>
                  <div className="font-outfit font-semibold">
                    {type === "payment" ? data.orderId : data.transactionId}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-brasika font-semibold text-gray-900 mb-4">
                Payment Details
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 font-outfit">Date</div>
                  <div className="font-outfit font-semibold">
                    {new Date(
                      type === "payment" ? data.paymentDate : data.date
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-outfit">
                    Amount
                  </div>
                  <div className="text-2xl font-brasika font-bold text-green-600">
                    ₹{data.amount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 font-outfit">
                    Status
                  </div>
                  <div className="font-outfit font-semibold text-green-600 capitalize">
                    {data.status}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h4 className="font-brasika font-semibold text-gray-900 mb-4">
              Additional Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 font-outfit">
                  Transaction Type:
                </span>
                <span className="font-outfit font-medium">
                  {type === "payment" ? "Campaign Payment" : "Funds Withdrawal"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-outfit">Processed By:</span>
                <span className="font-outfit font-medium">
                  Influencaa Escrow
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-outfit">Reference:</span>
                <span className="font-outfit font-medium">
                  {type === "payment" ? data.orderId : data.transactionId}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-outfit">
              Thank you for using Influencaa. This is an computer-generated
              receipt.
            </p>
            <p className="text-xs text-gray-500 font-outfit mt-2">
              For any queries, contact support@influencaa.com
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Earnings;
