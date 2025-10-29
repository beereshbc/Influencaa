import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle,
  Clock,
  FileText,
  Edit3,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  Shield,
  Zap,
  Search,
  Filter,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const Campaigns = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedPackage, setSelectedPackage] = useState("I1");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);

  // Sample campaign data structure - now with state for editing
  const [campaignData, setCampaignData] = useState({
    instagram: {
      icon: Instagram,
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
      label: "Instagram",
      username: "@sarahj_fashion",
      followers: "485K",
      engagementRate: 8.5,
      verification: true,
      packages: {
        I1: {
          name: "Story Package",
          service: "Story Post",
          amount: 5000,
          description: "24-hour Instagram story featuring your product",
          deliverables: [
            "2 Story frames",
            "Product tagging",
            "Swipe-up link",
            "24-hour visibility",
          ],
          timeline: "24 hours",
          revisions: 1,
          requirements: ["High-quality product images", "Key messaging points"],
          published: true,
          theme: "Lifestyle & Fashion",
        },
        I2: {
          name: "Feed Post",
          service: "Post Image",
          amount: 15000,
          description: "High-quality curated feed post",
          deliverables: [
            "1 Feed post",
            "Professional photography",
            "Caption writing",
            "Hashtag strategy",
          ],
          timeline: "48 hours",
          revisions: 2,
          requirements: ["Product samples", "Brand guidelines"],
          published: true,
          theme: "Premium Content",
        },
        I3: {
          name: "Video Content",
          service: "Post Video",
          amount: 30000,
          description: "Professional video content including Reels",
          deliverables: [
            "1 Video Reel (60 sec)",
            "Behind-the-scenes",
            "Professional editing",
            "Performance report",
          ],
          timeline: "72 hours",
          revisions: 3,
          requirements: ["Product samples", "Video concept approval"],
          published: false,
          theme: "Video Production",
        },
      },
    },
    youtube: {
      icon: Youtube,
      color: "bg-gradient-to-br from-red-500 to-red-700",
      label: "YouTube",
      username: "Sarah Johnson Lifestyle",
      followers: "125K",
      engagementRate: 7.8,
      verification: true,
      packages: {
        I1: {
          name: "Shoutout Package",
          service: "Shoutout",
          amount: 8000,
          description: "Quick product mention",
          deliverables: [
            "30-second mention",
            "Video description link",
            "Pinned comment",
          ],
          timeline: "7 days",
          revisions: 1,
          requirements: ["Product information", "Talking points"],
          published: true,
          theme: "Quick Promotion",
        },
        I2: {
          name: "Review Package",
          service: "Product Review",
          amount: 25000,
          description: "Detailed product review",
          deliverables: [
            "8-10 minute review",
            "Product demonstration",
            "Honest opinion",
            "Community engagement",
          ],
          timeline: "14 days",
          revisions: 2,
          requirements: ["Product samples", "Usage period 7 days"],
          published: true,
          theme: "In-depth Review",
        },
        I3: {
          name: "Tutorial Package",
          service: "Tutorial",
          amount: 45000,
          description: "Comprehensive tutorial",
          deliverables: [
            "12-15 minute tutorial",
            "Step-by-step guide",
            "Professional editing",
            "Performance analytics",
          ],
          timeline: "21 days",
          revisions: 3,
          requirements: ["Product samples", "Creative freedom"],
          published: true,
          theme: "Educational Content",
        },
      },
    },
    facebook: {
      icon: Facebook,
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      label: "Facebook",
      username: "Sarah Johnson Official",
      followers: "89K",
      engagementRate: 6.2,
      verification: false,
      packages: {
        I1: {
          name: "Story Package",
          service: "Story Post",
          amount: 4000,
          description: "24-hour Facebook story with product feature",
          deliverables: [
            "2 Story frames",
            "Product tagging",
            "Link sharing",
            "24-hour visibility",
          ],
          timeline: "24 hours",
          revisions: 1,
          requirements: ["High-quality images", "Brand messaging"],
          published: true,
          theme: "Social Engagement",
        },
        I2: {
          name: "Feed Post",
          service: "Post Content",
          amount: 12000,
          description: "Engaging Facebook feed post",
          deliverables: [
            "1 Feed post",
            "Caption writing",
            "Hashtag optimization",
            "Community management",
          ],
          timeline: "48 hours",
          revisions: 2,
          requirements: ["Content guidelines", "Brand assets"],
          published: true,
          theme: "Community Building",
        },
        I3: {
          name: "Video Package",
          service: "Video Content",
          amount: 28000,
          description: "Facebook video content and Reels",
          deliverables: [
            "1 Video (60-90 sec)",
            "Professional editing",
            "Caption optimization",
            "Performance insights",
          ],
          timeline: "72 hours",
          revisions: 3,
          requirements: ["Video concepts", "Brand approval"],
          published: false,
          theme: "Video Marketing",
        },
      },
    },
    twitter: {
      icon: Twitter,
      color: "bg-gradient-to-br from-sky-500 to-blue-600",
      label: "Twitter",
      username: "@SarahJStyle",
      followers: "65K",
      engagementRate: 9.1,
      verification: true,
      packages: {
        I1: {
          name: "Tweet Package",
          service: "Single Tweet",
          amount: 3000,
          description: "Strategic tweet with your message",
          deliverables: [
            "1 Curated tweet",
            "Hashtag research",
            "Engagement monitoring",
            "Performance tracking",
          ],
          timeline: "24 hours",
          revisions: 1,
          requirements: ["Key messages", "Link to share"],
          published: true,
          theme: "Quick Updates",
        },
        I2: {
          name: "Thread Package",
          service: "Tweet Thread",
          amount: 8000,
          description: "Engaging tweet thread storytelling",
          deliverables: [
            "3-5 tweet thread",
            "Story narrative",
            "Visual elements",
            "Thread unrolling",
          ],
          timeline: "48 hours",
          revisions: 2,
          requirements: ["Story outline", "Reference materials"],
          published: true,
          theme: "Storytelling",
        },
        I3: {
          name: "Campaign Package",
          service: "Twitter Campaign",
          amount: 20000,
          description: "Comprehensive Twitter campaign",
          deliverables: [
            "Multiple tweets",
            "Thread creation",
            "Poll integration",
            "Campaign analytics",
          ],
          timeline: "7 days",
          revisions: 3,
          requirements: ["Campaign brief", "Content calendar"],
          published: true,
          theme: "Campaign Management",
        },
      },
    },
    linkedin: {
      icon: Linkedin,
      color: "bg-gradient-to-br from-blue-800 to-blue-900",
      label: "LinkedIn",
      username: "Sarah Johnson",
      followers: "35K",
      engagementRate: 5.8,
      verification: true,
      packages: {
        I1: {
          name: "Post Package",
          service: "LinkedIn Post",
          amount: 6000,
          description: "Professional LinkedIn post",
          deliverables: [
            "1 Detailed post",
            "Professional writing",
            "Hashtag strategy",
            "Engagement response",
          ],
          timeline: "48 hours",
          revisions: 1,
          requirements: ["Industry insights", "Professional tone"],
          published: true,
          theme: "Professional Content",
        },
        I2: {
          name: "Article Package",
          service: "LinkedIn Article",
          amount: 15000,
          description: "Thought leadership article",
          deliverables: [
            "1 Long-form article",
            "Professional editing",
            "SEO optimization",
            "Promotion strategy",
          ],
          timeline: "7 days",
          revisions: 2,
          requirements: ["Article topic", "Expert insights"],
          published: true,
          theme: "Thought Leadership",
        },
        I3: {
          name: "Video Package",
          service: "LinkedIn Video",
          amount: 22000,
          description: "Professional video content for LinkedIn",
          deliverables: [
            "1 Professional video",
            "Script writing",
            "Professional editing",
            "Performance analysis",
          ],
          timeline: "10 days",
          revisions: 3,
          requirements: ["Video concept", "Professional setting"],
          published: false,
          theme: "Professional Video",
        },
      },
    },
  });

  const socialPlatforms = [
    {
      key: "instagram",
      icon: Instagram,
      color: "bg-gradient-to-br from-pink-500 to-purple-600",
      label: "Instagram",
    },
    {
      key: "youtube",
      icon: Youtube,
      color: "bg-gradient-to-br from-red-500 to-red-700",
      label: "YouTube",
    },
    {
      key: "facebook",
      icon: Facebook,
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      label: "Facebook",
    },
    {
      key: "twitter",
      icon: Twitter,
      color: "bg-gradient-to-br from-sky-500 to-blue-600",
      label: "Twitter",
    },
    {
      key: "linkedin",
      icon: Linkedin,
      color: "bg-gradient-to-br from-blue-800 to-blue-900",
      label: "LinkedIn",
    },
  ];

  const currentPlatform = campaignData[selectedPlatform];
  const currentPackage = currentPlatform?.packages[selectedPackage];

  // Toggle package published status
  const togglePublishStatus = (platformKey, packageKey) => {
    setCampaignData((prev) => ({
      ...prev,
      [platformKey]: {
        ...prev[platformKey],
        packages: {
          ...prev[platformKey].packages,
          [packageKey]: {
            ...prev[platformKey].packages[packageKey],
            published: !prev[platformKey].packages[packageKey].published,
          },
        },
      },
    }));
  };

  // Update package field
  const updatePackageField = (field, value) => {
    if (!currentPlatform || !currentPackage) return;

    setCampaignData((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        packages: {
          ...prev[selectedPlatform].packages,
          [selectedPackage]: {
            ...prev[selectedPlatform].packages[selectedPackage],
            [field]: value,
          },
        },
      },
    }));
  };

  // Add new package
  const addNewPackage = (newPackageData) => {
    const newKey = `I${Object.keys(currentPlatform.packages).length + 1}`;
    setCampaignData((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        packages: {
          ...prev[selectedPlatform].packages,
          [newKey]: newPackageData,
        },
      },
    }));
    setSelectedPackage(newKey);
    setShowAddPackage(false);
  };

  // Delete package
  const deletePackage = (packageKey) => {
    const packages = { ...currentPlatform.packages };
    delete packages[packageKey];

    setCampaignData((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        packages,
      },
    }));

    // Select first available package
    const remainingPackages = Object.keys(packages);
    if (remainingPackages.length > 0) {
      setSelectedPackage(remainingPackages[0]);
    } else {
      setSelectedPackage(null);
    }
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-6 shadow-lg"
          >
            <Target className="w-4 h-4 mr-2" />
            Package Management
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-brasika font-bold text-gray-900 mb-4"
          >
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Campaign Packages
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-outfit"
          >
            Create, customize, and manage your campaign packages across
            different social media platforms
          </motion.p>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-brasika">
                Package Manager
              </h2>
              <p className="text-gray-600 font-outfit">
                Manage your service offerings and visibility
              </p>
            </div>
            <div className="flex gap-3">
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className={`group flex items-center px-6 py-3 rounded-xl font-outfit font-semibold transition-all ${
                  isEditing
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Save Changes" : "Edit Packages"}
              </motion.button>

              <motion.button
                onClick={() => setShowAddPackage(true)}
                className="group flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-outfit font-semibold hover:from-amber-600 hover:to-orange-600 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Package
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Platform Selection Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Platform Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-brasika">
                Platforms
              </h3>
              <div className="space-y-3">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatform === platform.key;
                  const platformData = campaignData[platform.key];
                  const packageCount = Object.keys(
                    platformData.packages
                  ).length;

                  return (
                    <motion.button
                      key={platform.key}
                      onClick={() => {
                        setSelectedPlatform(platform.key);
                        setSelectedPackage(
                          Object.keys(platformData.packages)[0]
                        );
                      }}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all group ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-orange-100 hover:border-orange-300 hover:shadow-sm"
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-3 rounded-full ${platform.color} text-white mr-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-gray-900 font-outfit">
                          {platform.label}
                        </div>
                        <div className="text-sm text-gray-600 font-outfit">
                          {packageCount} packages
                        </div>
                      </div>
                      {platformData.verification && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4 font-brasika">
                Platform Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-orange-100 font-outfit">Followers</span>
                  <span className="font-bold font-outfit">
                    {currentPlatform?.followers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100 font-outfit">
                    Engagement
                  </span>
                  <span className="font-bold font-outfit">
                    {currentPlatform?.engagementRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-100 font-outfit">
                    Active Packages
                  </span>
                  <span className="font-bold font-outfit">
                    {
                      Object.values(currentPlatform?.packages || {}).filter(
                        (pkg) => pkg.published
                      ).length
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Platform Header */}
            {currentPlatform && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6 mb-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex items-center mb-4 lg:mb-0">
                    <div
                      className={`p-4 rounded-2xl ${currentPlatform.color} text-white mr-4`}
                    >
                      {React.createElement(currentPlatform.icon, {
                        className: "w-8 h-8",
                      })}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 font-brasika">
                        {currentPlatform.label}
                      </h2>
                      <p className="text-gray-600 text-lg font-outfit">
                        {currentPlatform.username}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 font-medium font-outfit">
                        Engagement Rate
                      </div>
                      <div className="text-2xl font-bold text-green-600 font-outfit">
                        {currentPlatform.engagementRate}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 font-medium font-outfit">
                        Total Packages
                      </div>
                      <div className="text-2xl font-bold text-orange-600 font-outfit">
                        {Object.keys(currentPlatform.packages).length}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Package Selection and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Package List */}
              <div className="lg:col-span-1">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 font-brasika">
                      Your Packages
                    </h3>
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium font-outfit">
                      {Object.keys(currentPlatform?.packages || {}).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {currentPlatform &&
                      Object.entries(currentPlatform.packages).map(
                        ([key, pkg]) => (
                          <motion.div
                            key={key}
                            className={`bg-gradient-to-r rounded-xl p-4 cursor-pointer transition-all border-2 group ${
                              selectedPackage === key
                                ? "from-orange-50 to-amber-50 border-orange-400 shadow-lg"
                                : "from-white to-gray-50 border-orange-100 hover:border-orange-300 hover:shadow-md"
                            }`}
                            onClick={() => setSelectedPackage(key)}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900 text-sm font-outfit">
                                {pkg.name}
                              </h4>
                              {isEditing && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deletePackage(key);
                                  }}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="text-lg font-bold text-orange-600 mb-2 font-outfit">
                              ₹{pkg.amount.toLocaleString()}
                            </div>

                            {/* Publish Toggle */}
                            <div className="flex items-center justify-between">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePublishStatus(selectedPlatform, key);
                                }}
                                className={`flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all font-outfit ${
                                  pkg.published
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {pkg.published ? (
                                  <Eye className="w-3 h-3 mr-1" />
                                ) : (
                                  <EyeOff className="w-3 h-3 mr-1" />
                                )}
                                {pkg.published ? "Published" : "Draft"}
                              </button>
                              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                            </div>
                          </motion.div>
                        )
                      )}
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="lg:col-span-3">
                {currentPackage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-gray-900 font-brasika">
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentPackage.name}
                                onChange={(e) =>
                                  updatePackageField("name", e.target.value)
                                }
                                className="bg-orange-50 border border-orange-300 rounded-lg px-3 py-2 font-bold text-gray-900 font-outfit"
                              />
                            ) : (
                              currentPackage.name
                            )}
                          </h2>
                          <div className="flex gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium font-outfit ${
                                currentPackage.published
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {currentPackage.published ? "Live" : "Draft"}
                            </div>
                            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium font-outfit">
                              {currentPackage.theme}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-orange-600 font-outfit">
                            {isEditing ? (
                              <input
                                type="number"
                                value={currentPackage.amount}
                                onChange={(e) =>
                                  updatePackageField(
                                    "amount",
                                    parseInt(e.target.value)
                                  )
                                }
                                className="bg-orange-50 border border-orange-300 rounded-lg px-3 py-1 w-32 font-bold text-orange-600 font-outfit"
                              />
                            ) : (
                              `₹${currentPackage.amount.toLocaleString()}`
                            )}
                          </div>
                          <button
                            onClick={() =>
                              togglePublishStatus(
                                selectedPlatform,
                                selectedPackage
                              )
                            }
                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all font-outfit ${
                              currentPackage.published
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-green-100 text-green-700 hover:bg-green-200"
                            }`}
                          >
                            {currentPackage.published ? (
                              <EyeOff className="w-4 h-4 mr-2" />
                            ) : (
                              <Eye className="w-4 h-4 mr-2" />
                            )}
                            {currentPackage.published ? "Unpublish" : "Publish"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 font-brasika">
                            Service Description
                          </h3>
                          {isEditing ? (
                            <textarea
                              value={currentPackage.description}
                              onChange={(e) =>
                                updatePackageField(
                                  "description",
                                  e.target.value
                                )
                              }
                              className="w-full h-32 bg-orange-50 border border-orange-300 rounded-lg px-3 py-2 text-gray-600 font-outfit"
                            />
                          ) : (
                            <p className="text-gray-600 leading-relaxed font-outfit">
                              {currentPackage.description}
                            </p>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-gray-900 font-brasika">
                              Deliverables
                            </h3>
                            {isEditing && (
                              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium font-outfit">
                                + Add Item
                              </button>
                            )}
                          </div>
                          <div className="space-y-3">
                            {currentPackage.deliverables.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start text-gray-600"
                              >
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => {
                                      const newDeliverables = [
                                        ...currentPackage.deliverables,
                                      ];
                                      newDeliverables[index] = e.target.value;
                                      updatePackageField(
                                        "deliverables",
                                        newDeliverables
                                      );
                                    }}
                                    className="flex-1 bg-orange-50 border border-orange-300 rounded-lg px-3 py-1 text-gray-600 font-outfit"
                                  />
                                ) : (
                                  <span className="break-words font-outfit">
                                    {item}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900 font-outfit">
                                Timeline
                              </span>
                              <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            {isEditing ? (
                              <input
                                type="text"
                                value={currentPackage.timeline}
                                onChange={(e) =>
                                  updatePackageField("timeline", e.target.value)
                                }
                                className="w-full bg-white border border-orange-300 rounded-lg px-2 py-1 text-gray-600 font-medium font-outfit"
                              />
                            ) : (
                              <p className="text-gray-600 font-medium font-outfit">
                                {currentPackage.timeline}
                              </p>
                            )}
                          </div>

                          <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900 font-outfit">
                                Revisions
                              </span>
                              <FileText className="w-5 h-5 text-orange-600" />
                            </div>
                            {isEditing ? (
                              <input
                                type="number"
                                value={currentPackage.revisions}
                                onChange={(e) =>
                                  updatePackageField(
                                    "revisions",
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-full bg-white border border-orange-300 rounded-lg px-2 py-1 text-gray-600 font-medium font-outfit"
                              />
                            ) : (
                              <p className="text-gray-600 font-medium font-outfit">
                                {currentPackage.revisions} included
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 font-brasika">
                              Requirements
                            </h4>
                            {isEditing && (
                              <button className="text-orange-600 hover:text-orange-700 text-sm font-medium font-outfit">
                                + Add Requirement
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            {currentPackage.requirements.map((req, index) => (
                              <div
                                key={index}
                                className="flex items-center text-gray-600"
                              >
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                {isEditing ? (
                                  <input
                                    type="text"
                                    value={req}
                                    onChange={(e) => {
                                      const newRequirements = [
                                        ...currentPackage.requirements,
                                      ];
                                      newRequirements[index] = e.target.value;
                                      updatePackageField(
                                        "requirements",
                                        newRequirements
                                      );
                                    }}
                                    className="flex-1 bg-white border border-orange-300 rounded-lg px-2 py-1 text-gray-600 text-sm font-outfit"
                                  />
                                ) : (
                                  <span className="text-sm font-outfit">
                                    {req}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {isEditing && (
                          <motion.button
                            onClick={() => setIsEditing(false)}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-outfit"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Save className="w-5 h-5 inline mr-2" />
                            Save Changes
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddPackage && (
          <AddPackageModal
            onClose={() => setShowAddPackage(false)}
            onAdd={addNewPackage}
            platform={currentPlatform?.label}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Add Package Modal Component
const AddPackageModal = ({ onClose, onAdd, platform }) => {
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    amount: 0,
    description: "",
    deliverables: [""],
    timeline: "24 hours",
    revisions: 1,
    requirements: [""],
    theme: "General",
    published: true,
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      deliverables: formData.deliverables.filter((item) => item.trim() !== ""),
      requirements: formData.requirements.filter((item) => item.trim() !== ""),
    });
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
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 font-brasika">
            Add New Package
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
                Package Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
                Service Type
              </label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => updateField("service", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
              Price (₹)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => updateField("amount", parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 font-outfit">
                Deliverables
              </label>
              <button
                type="button"
                onClick={() => addArrayItem("deliverables")}
                className="text-orange-600 hover:text-orange-700 text-sm font-medium font-outfit"
              >
                + Add Item
              </button>
            </div>
            <div className="space-y-2">
              {formData.deliverables.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateArrayField("deliverables", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                    placeholder="Deliverable item"
                  />
                  {formData.deliverables.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("deliverables", index)}
                      className="px-3 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-outfit">
                Revisions
              </label>
              <input
                type="number"
                value={formData.revisions}
                onChange={(e) =>
                  updateField("revisions", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-outfit"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors font-outfit font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Package
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Campaigns;
