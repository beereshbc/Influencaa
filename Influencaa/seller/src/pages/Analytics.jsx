import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  MessageCircle,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Share2,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Clock,
  Award,
  Zap,
  Star,
  Crown,
  TrendingDown,
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeMetric, setActiveMetric] = useState("engagement");

  // Sample analytics data
  const analyticsData = {
    overview: {
      totalEarnings: 125800,
      completedCampaigns: 24,
      activeCampaigns: 6,
      engagementRate: 8.5,
      totalReach: 1250000,
      avgCompletionTime: "3.2 days",
      clientSatisfaction: 4.8,
    },
    performanceMetrics: [
      {
        month: "Jan",
        earnings: 22000,
        reach: 98000,
        engagement: 7.2,
        conversions: 45,
      },
      {
        month: "Feb",
        earnings: 18000,
        reach: 112000,
        engagement: 8.1,
        conversions: 52,
      },
      {
        month: "Mar",
        earnings: 25000,
        reach: 145000,
        engagement: 8.8,
        conversions: 68,
      },
      {
        month: "Apr",
        earnings: 19500,
        reach: 132000,
        engagement: 7.9,
        conversions: 58,
      },
      {
        month: "May",
        earnings: 28000,
        reach: 168000,
        engagement: 9.2,
        conversions: 74,
      },
      {
        month: "Jun",
        earnings: 31500,
        reach: 189000,
        engagement: 9.6,
        conversions: 82,
      },
      {
        month: "Jul",
        earnings: 29500,
        reach: 175000,
        engagement: 8.9,
        conversions: 71,
      },
      {
        month: "Aug",
        earnings: 34000,
        reach: 198000,
        engagement: 9.8,
        conversions: 89,
      },
      {
        month: "Sep",
        earnings: 37500,
        reach: 215000,
        engagement: 10.2,
        conversions: 95,
      },
      {
        month: "Oct",
        earnings: 42000,
        reach: 238000,
        engagement: 10.8,
        conversions: 108,
      },
    ],
    platformPerformance: [
      { name: "YouTube", value: 45, color: "#FF0000" },
      { name: "Instagram", value: 30, color: "#E4405F" },
      { name: "Twitter", value: 15, color: "#1DA1F2" },
      { name: "LinkedIn", value: 8, color: "#0A66C2" },
      { name: "Facebook", value: 2, color: "#1877F2" },
    ],
    campaignPerformance: [
      {
        name: "Nike Running",
        reach: 125000,
        engagement: 12.5,
        conversions: 89,
        roi: 4.2,
      },
      {
        name: "Adidas Originals",
        reach: 98000,
        engagement: 10.8,
        conversions: 76,
        roi: 3.8,
      },
      {
        name: "Spotify Playlists",
        reach: 156000,
        engagement: 14.2,
        conversions: 112,
        roi: 5.1,
      },
      {
        name: "Apple Review",
        reach: 89000,
        engagement: 9.3,
        conversions: 64,
        roi: 3.2,
      },
      {
        name: "Samsung Launch",
        reach: 178000,
        engagement: 15.7,
        conversions: 134,
        roi: 5.8,
      },
      {
        name: "Netflix Series",
        reach: 142000,
        engagement: 13.1,
        conversions: 98,
        roi: 4.6,
      },
    ],
    engagementMetrics: [
      { name: "Likes", value: 12500, change: +12.5 },
      { name: "Comments", value: 3200, change: +8.3 },
      { name: "Shares", value: 1800, change: +15.2 },
      { name: "Saves", value: 4200, change: +22.7 },
      { name: "Click-through", value: 8900, change: +18.9 },
    ],
    audienceDemographics: [
      { age: "18-24", percentage: 35, gender: { male: 45, female: 55 } },
      { age: "25-34", percentage: 42, gender: { male: 48, female: 52 } },
      { age: "35-44", percentage: 15, gender: { male: 52, female: 48 } },
      { age: "45+", percentage: 8, gender: { male: 55, female: 45 } },
    ],
    recentAchievements: [
      {
        title: "Top Performer",
        description: "Highest engagement rate this month",
        icon: Award,
        color: "text-yellow-500",
      },
      {
        title: "Rising Star",
        description: "50% growth in followers",
        icon: TrendingUp,
        color: "text-green-500",
      },
      {
        title: "Brand Favorite",
        description: "Most repeated client",
        icon: Crown,
        color: "text-purple-500",
      },
      {
        title: "Quick Deliver",
        description: "Fastest campaign completion",
        icon: Zap,
        color: "text-blue-500",
      },
    ],
  };

  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" },
  ];

  const metrics = [
    { key: "engagement", label: "Engagement", icon: Heart, color: "#EF4444" },
    { key: "reach", label: "Reach", icon: Eye, color: "#3B82F6" },
    { key: "earnings", label: "Earnings", icon: DollarSign, color: "#10B981" },
    { key: "conversions", label: "Conversions", icon: Users, color: "#8B5CF6" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm border border-orange-200 rounded-xl p-4 shadow-lg">
          <p className="font-brasika font-semibold text-gray-900 mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-outfit"
              style={{ color: entry.color }}
            >
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.value.toLocaleString()
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getMetricData = () => {
    return analyticsData.performanceMetrics.map((item) => ({
      month: item.month,
      value: item[activeMetric],
    }));
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
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-6 shadow-lg"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance Analytics
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4"
          >
            Your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto font-outfit"
          >
            Track your performance, analyze campaign results, and optimize your
            influencer strategy
          </motion.p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex bg-orange-100 rounded-xl p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-4 py-2 rounded-lg font-outfit font-semibold transition-all ${
                      timeRange === range.value
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                className="flex items-center px-4 py-2 bg-white text-gray-700 border border-orange-200 rounded-xl font-outfit font-semibold hover:bg-orange-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </motion.button>
              <motion.button
                className="flex items-center px-4 py-2 bg-white text-gray-700 border border-orange-200 rounded-xl font-outfit font-semibold hover:bg-orange-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </motion.button>
              <motion.button
                className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-outfit font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Earnings",
              value: `₹${analyticsData.overview.totalEarnings.toLocaleString()}`,
              change: "+24.5%",
              icon: DollarSign,
              color: "green",
            },
            {
              title: "Engagement Rate",
              value: `${analyticsData.overview.engagementRate}%`,
              change: "+8.2%",
              icon: Heart,
              color: "red",
            },
            {
              title: "Total Reach",
              value: `${(analyticsData.overview.totalReach / 1000).toFixed(
                0
              )}K`,
              change: "+15.7%",
              icon: Users,
              color: "blue",
            },
            {
              title: "Client Rating",
              value: analyticsData.overview.clientSatisfaction,
              change: "+0.3",
              icon: Star,
              color: "yellow",
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
                  <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <span
                    className={`text-sm font-outfit font-semibold text-${stat.color}-600`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-brasika font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 font-outfit text-sm">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6 h-full"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-brasika font-semibold text-gray-900">
                    Performance Overview
                  </h3>
                  <p className="text-gray-600 font-outfit">
                    Track your key metrics over time
                  </p>
                </div>
                <div className="flex space-x-2 mt-4 lg:mt-0">
                  {metrics.map((metric) => {
                    const Icon = metric.icon;
                    const isActive = activeMetric === metric.key;
                    return (
                      <motion.button
                        key={metric.key}
                        onClick={() => setActiveMetric(metric.key)}
                        className={`flex items-center px-3 py-2 rounded-lg font-outfit font-semibold transition-all ${
                          isActive
                            ? "text-white shadow-lg"
                            : "text-gray-600 hover:text-gray-900 hover:bg-orange-50"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? metric.color
                            : "transparent",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {metric.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={getMetricData()}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={
                            metrics.find((m) => m.key === activeMetric)?.color
                          }
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={
                            metrics.find((m) => m.key === activeMetric)?.color
                          }
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={
                        metrics.find((m) => m.key === activeMetric)?.color
                      }
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Platform Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-brasika font-semibold text-gray-900">
                  Platform Distribution
                </h3>
                <p className="text-gray-600 font-outfit">
                  Earnings by social platform
                </p>
              </div>
              <PieChartIcon className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.platformPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analyticsData.platformPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-4">
              {analyticsData.platformPerformance.map((platform, index) => (
                <div
                  key={platform.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="font-outfit font-medium text-gray-900">
                      {platform.name}
                    </span>
                  </div>
                  <span className="font-outfit font-semibold text-gray-700">
                    {platform.value}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Campaign Performance & Engagement Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Campaign Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-brasika font-semibold text-gray-900">
                  Campaign Performance
                </h3>
                <p className="text-gray-600 font-outfit">
                  Top performing campaigns
                </p>
              </div>
              <Target className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {analyticsData.campaignPerformance.map((campaign, index) => (
                <div
                  key={campaign.name}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200"
                >
                  <div className="flex-1">
                    <h4 className="font-outfit font-semibold text-gray-900 text-sm">
                      {campaign.name}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>Reach: {(campaign.reach / 1000).toFixed(0)}K</span>
                      <span>Engagement: {campaign.engagement}%</span>
                      <span>ROI: {campaign.roi}x</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-outfit font-bold text-green-600 text-sm">
                      {campaign.conversions} conversions
                    </div>
                    <div className="text-xs text-gray-500 font-outfit">
                      Success
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Engagement Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-brasika font-semibold text-gray-900">
                  Engagement Metrics
                </h3>
                <p className="text-gray-600 font-outfit">
                  Detailed engagement breakdown
                </p>
              </div>
              <MessageCircle className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {analyticsData.engagementMetrics.map((metric, index) => (
                <div
                  key={metric.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm mr-3">
                      {metric.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-outfit font-semibold text-gray-900">
                        {metric.name}
                      </div>
                      <div className="text-sm text-gray-600 font-outfit">
                        {metric.value.toLocaleString()} interactions
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center px-3 py-1 rounded-full text-sm font-outfit font-semibold ${
                      metric.change >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {metric.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(metric.change)}%
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Audience Demographics & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Audience Demographics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-brasika font-semibold text-gray-900">
                  Audience Demographics
                </h3>
                <p className="text-gray-600 font-outfit">
                  Your audience age distribution
                </p>
              </div>
              <Users className="w-5 h-5 text-gray-400" />
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.audienceDemographics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="age" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar
                    dataKey="percentage"
                    fill="#F97316"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {analyticsData.audienceDemographics.map((demo, index) => (
                <div
                  key={demo.age}
                  className="bg-orange-50 rounded-lg p-3 border border-orange-200"
                >
                  <div className="font-outfit font-semibold text-gray-900 text-sm">
                    {demo.age} Age Group
                  </div>
                  <div className="text-2xl font-brasika font-bold text-orange-600">
                    {demo.percentage}%
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 font-outfit mt-1">
                    <span>♂ {demo.gender.male}%</span>
                    <span>♀ {demo.gender.female}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-brasika font-semibold text-gray-900">
                  Recent Achievements
                </h3>
                <p className="text-gray-600 font-outfit">
                  Your performance milestones
                </p>
              </div>
              <Award className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {analyticsData.recentAchievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.title}
                    className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
                  >
                    <div
                      className={`p-3 rounded-xl bg-white mr-4 ${achievement.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-outfit font-semibold text-gray-900">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600 font-outfit">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Performance Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
              <div className="text-center">
                <div className="text-2xl font-brasika font-bold mb-2">
                  Excellent Performance!
                </div>
                <p className="text-orange-100 font-outfit text-sm">
                  You're performing better than 92% of influencers in your
                  category
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
