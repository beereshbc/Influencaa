import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
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
  Target,
  ArrowRight,
  Package,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

// 1. Static Configuration (Used for icons/colors/labels)
const STATIC_PLATFORM_DATA = {
  instagram: {
    key: "instagram",
    icon: Instagram,
    color: "bg-gradient-to-br from-pink-500 to-purple-600",
    label: "Instagram",
  },
  youtube: {
    key: "youtube",
    icon: Youtube,
    color: "bg-gradient-to-br from-red-500 to-red-700",
    label: "YouTube",
  },
  facebook: {
    key: "facebook",
    icon: Facebook,
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    label: "Facebook",
  },
  twitter: {
    key: "twitter",
    icon: Twitter,
    color: "bg-gradient-to-br from-sky-500 to-blue-600",
    label: "Twitter",
  },
  linkedin: {
    key: "linkedin",
    icon: Linkedin,
    color: "bg-gradient-to-br from-blue-800 to-blue-900",
    label: "LinkedIn",
  },
};

const Campaigns = () => {
  const [campaignData, setCampaignData] = useState({});
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { influencerToken, axios } = useAppContext();

  const PLATFORM_KEYS = Object.keys(STATIC_PLATFORM_DATA);

  // Filter platform data to only show tabs that HAVE packages
  const platformsWithPackagesKeys = Object.keys(campaignData).filter(
    (key) => Object.keys(campaignData[key]?.packages || {}).length > 0
  );

  const currentPlatform = campaignData[selectedPlatform] || {
    ...STATIC_PLATFORM_DATA[selectedPlatform],
    packages: {},
    username: "Not Connected",
    engagementRate: 0,
    followers: "0",
  };

  const currentPackage = currentPlatform.packages
    ? currentPlatform.packages[selectedPackage]
    : null;

  // 2. Fetch Data on Mount
  const fetchCampaigns = async () => {
    try {
      if (!influencerToken) return;

      const { data } = await axios.get("/api/influencer/campaigns", {
        headers: {
          Authorization: `Bearer ${influencerToken}`,
        },
      });

      if (data.success) {
        const mergedData = {};
        let firstPkgKey = null;
        let initialPlatform = "instagram";

        Object.keys(STATIC_PLATFORM_DATA).forEach((key) => {
          const backendPlatformData = data.campaignData[key] || {};
          mergedData[key] = {
            ...STATIC_PLATFORM_DATA[key],
            ...backendPlatformData,
            packages: backendPlatformData.packages || {},
          };

          if (
            !firstPkgKey &&
            Object.keys(mergedData[key].packages).length > 0
          ) {
            firstPkgKey = Object.keys(mergedData[key].packages)[0];
            initialPlatform = key;
          }
        });

        setCampaignData(mergedData);
        setSelectedPlatform(initialPlatform);
        setSelectedPackage(firstPkgKey);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // 3. Toggle Published Status
  const togglePublishStatus = async (platformKey, packageId) => {
    const currentPkg = campaignData[platformKey].packages[packageId];
    const newStatus = !currentPkg.published;

    setCampaignData((prev) => ({
      ...prev,
      [platformKey]: {
        ...prev[platformKey],
        packages: {
          ...prev[platformKey].packages,
          [packageId]: { ...currentPkg, published: newStatus },
        },
      },
    }));

    try {
      await axios.put(
        `/api/influencer/packages/toggle/${packageId}`,
        {
          published: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${influencerToken}`,
          },
        }
      );
      toast.success(newStatus ? "Package Published" : "Package Hidden");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  // 4. Update Package Fields (Inline Editing)
  const updatePackageField = async (field, value) => {
    if (!currentPackage) return;
    const pkgId = currentPackage._id;
    console.log(currentPackage);

    setCampaignData((prev) => ({
      ...prev,
      [selectedPlatform]: {
        ...prev[selectedPlatform],
        packages: {
          ...prev[selectedPlatform].packages,
          [selectedPackage]: { ...currentPackage, [field]: value },
        },
      },
    }));

    try {
      await axios.put(
        `/api/influencer/packages/${pkgId}`,
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${influencerToken}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    }
  };

  const addNewPackage = async (payload) => {
    try {
      const targetPlatformKey = payload.platform;
      console.log("Sending Payload:", payload);

      const { data } = await axios.post("/api/influencer/packages", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${influencerToken}`,
        },
      });

      if (data.success) {
        const savedPackage = data.package;

        setCampaignData((prev) => {
          const newState = { ...prev };

          if (!newState[targetPlatformKey]) {
            newState[targetPlatformKey] = {
              ...STATIC_PLATFORM_DATA[targetPlatformKey],
              packages: {},
            };
          }

          newState[targetPlatformKey].packages[savedPackage._id] = savedPackage;
          return newState;
        });

        setSelectedPlatform(targetPlatformKey);
        setSelectedPackage(savedPackage._id);
        setShowAddPackage(false);

        toast.success(
          `Package created successfully for ${STATIC_PLATFORM_DATA[targetPlatformKey].label}`
        );
      }
    } catch (err) {
      console.error("Axios Error:", err);
      toast.error("Failed to create package");
    }
  };

  // 6. Delete Package
  const deletePackage = async (packageId) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      await axios.delete(`/api/influencer/packages/${packageId}`, {
        headers: {
          Authorization: `Bearer ${influencerToken}`,
        },
      });

      setCampaignData((prev) => {
        const updatedPackages = { ...prev[selectedPlatform].packages };
        delete updatedPackages[packageId];

        const nextPackageKey = Object.keys(updatedPackages)[0] || null;

        const newState = {
          ...prev,
          [selectedPlatform]: {
            ...prev[selectedPlatform],
            packages: updatedPackages,
          },
        };

        let newSelectedPlatform = selectedPlatform;

        // If the current platform is now empty, find a new platform to select
        if (nextPackageKey === null) {
          const remainingPlatformKeys = platformsWithPackagesKeys.filter(
            (key) => key !== selectedPlatform
          );
          if (remainingPlatformKeys.length > 0) {
            newSelectedPlatform = remainingPlatformKeys[0];
            setSelectedPlatform(newSelectedPlatform);
          } else {
            // Nothing left, reset selection
            newSelectedPlatform = PLATFORM_KEYS[0];
            setSelectedPlatform(newSelectedPlatform);
          }
        }

        setSelectedPackage(nextPackageKey);

        return newState;
      });

      toast.success("Package deleted");
    } catch (err) {
      toast.error("Failed to delete package");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const isFullLayoutActive = platformsWithPackagesKeys.length > 0;

  // --- UI RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-red-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
          animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

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
          <h1 className="text-5xl lg:text-6xl font-brasika font-bold text-gray-900 mb-4">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Campaign Packages
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-outfit">
            Create, customize, and manage your campaign packages across
            different social media platforms
          </p>
        </motion.div>

        {/* Action Bar (Always visible) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? (
                  <Save className="w-4 h-4 mr-2" />
                ) : (
                  <Edit3 className="w-4 h-4 mr-2" />
                )}
                {isEditing ? "Done Editing" : "Edit Packages"}
              </motion.button>

              <motion.button
                onClick={() => setShowAddPackage(true)}
                className="group flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-outfit font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Package
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Layout Grid */}
        {isFullLayoutActive ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar (Only shows platforms with packages) */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-brasika">
                  Platforms
                </h3>
                <div className="space-y-3">
                  {platformsWithPackagesKeys.map((key) => {
                    const platform =
                      campaignData[key] || STATIC_PLATFORM_DATA[key];
                    const Icon = platform.icon;
                    const isSelected = selectedPlatform === platform.key;
                    const pkgCount = Object.keys(
                      platform.packages || {}
                    ).length;

                    return (
                      <motion.button
                        key={platform.key}
                        onClick={() => {
                          setSelectedPlatform(platform.key);
                          const firstPkg = Object.keys(
                            campaignData[platform.key]?.packages || {}
                          )[0];
                          setSelectedPackage(firstPkg || null);
                        }}
                        className={`w-full flex items-center p-4 rounded-xl border-2 transition-all group ${
                          isSelected
                            ? "border-orange-500 bg-orange-50 shadow-md"
                            : "border-orange-100 hover:border-orange-300"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className={`p-3 rounded-full ${platform.color} text-white mr-4`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-900 font-outfit">
                            {platform.label}
                          </div>
                          <div className="text-sm text-gray-600 font-outfit">
                            {pkgCount} packages
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Package Details / Edit Column */}
            <div className="lg:col-span-3">
              {/* Platform Stats Header */}
              <motion.div
                key={selectedPlatform + "header"}
                initial={{ opacity: 0, y: 10 }}
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
                        @{currentPlatform.username}
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
                        Followers
                      </div>
                      <div className="text-2xl font-bold text-orange-600 font-outfit">
                        {currentPlatform.followers}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Package List Column */}
                <div className="lg:col-span-1">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 font-brasika">
                        Packages
                      </h3>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium font-outfit">
                        {Object.keys(currentPlatform.packages || {}).length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(currentPlatform.packages || {}).map(
                        ([key, pkg]) => (
                          <motion.div
                            key={key}
                            onClick={() => setSelectedPackage(key)}
                            className={`bg-gradient-to-r rounded-xl p-4 cursor-pointer transition-all border-2 ${
                              selectedPackage === key
                                ? "from-orange-50 to-amber-50 border-orange-400 shadow-md"
                                : "from-white to-gray-50 border-orange-100 hover:border-orange-300"
                            }`}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900 text-sm font-outfit line-clamp-1">
                                {pkg.name}
                              </h4>
                              {isEditing && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deletePackage(key);
                                  }}
                                  className="text-red-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="text-lg font-bold text-orange-600 mb-2 font-outfit">
                              ₹{pkg.amount.toLocaleString()}
                            </div>
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  pkg.published
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {pkg.published ? "Published" : "Draft"}
                              </span>
                              {isEditing && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePublishStatus(selectedPlatform, key);
                                  }}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {pkg.published ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Package Details / Edit Column */}
                <div className="lg:col-span-3">
                  {currentPackage ? (
                    <motion.div
                      key={selectedPackage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-200 p-6"
                    >
                      {/* Package Detail Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-orange-100 pb-4">
                        <div className="w-full">
                          <label className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1 block">
                            Package Name
                          </label>
                          {isEditing ? (
                            <input
                              className="text-3xl font-bold text-gray-900 font-brasika bg-orange-50 w-full rounded px-2"
                              value={currentPackage.name}
                              onChange={(e) =>
                                updatePackageField("name", e.target.value)
                              }
                            />
                          ) : (
                            <h2 className="text-3xl font-bold text-gray-900 font-brasika">
                              {currentPackage.name}
                            </h2>
                          )}
                          <div className="flex gap-2 mt-2">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">
                              {currentPackage.serviceType}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <label className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1 block">
                            Price
                          </label>
                          <div className="text-3xl font-bold text-orange-600 font-outfit flex items-center">
                            ₹{" "}
                            {isEditing ? (
                              <input
                                type="number"
                                className="w-32 bg-orange-50 rounded px-2 ml-1"
                                value={currentPackage.amount}
                                onChange={(e) =>
                                  updatePackageField(
                                    "amount",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              currentPackage.amount.toLocaleString()
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-orange-500" />{" "}
                              Description
                            </h3>
                            {isEditing ? (
                              <textarea
                                className="w-full h-32 p-3 bg-orange-50 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500"
                                value={currentPackage.description}
                                onChange={(e) =>
                                  updatePackageField(
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <p className="text-gray-600 leading-relaxed font-outfit">
                                {currentPackage.description}
                              </p>
                            )}
                          </div>

                          <div>
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />{" "}
                              Deliverables
                            </h3>
                            <ul className="space-y-2">
                              {currentPackage.deliverables?.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start text-gray-600 font-outfit"
                                >
                                  <span className="mr-2 text-green-500">•</span>
                                  {isEditing ? (
                                    <input
                                      className="flex-1 bg-orange-50 rounded px-2 py-1"
                                      value={item}
                                      onChange={(e) => {
                                        const newArr = [
                                          ...currentPackage.deliverables,
                                        ];
                                        newArr[idx] = e.target.value;
                                        updatePackageField(
                                          "deliverables",
                                          newArr
                                        );
                                      }}
                                    />
                                  ) : (
                                    item
                                  )}
                                </li>
                              ))}
                              {isEditing && (
                                <button
                                  className="text-sm text-orange-500 font-bold mt-2"
                                  onClick={() =>
                                    updatePackageField("deliverables", [
                                      ...currentPackage.deliverables,
                                      "New Item",
                                    ])
                                  }
                                >
                                  + Add Deliverable
                                </button>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">
                                Timeline
                              </span>
                              <Clock className="w-4 h-4 text-orange-500" />
                            </div>
                            {isEditing ? (
                              <input
                                className="w-full bg-white rounded px-2 py-1"
                                value={currentPackage.timeline}
                                onChange={(e) =>
                                  updatePackageField("timeline", e.target.value)
                                }
                              />
                            ) : (
                              <p className="font-bold text-gray-700">
                                {currentPackage.timeline}
                              </p>
                            )}
                          </div>

                          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">
                                Revisions
                              </span>
                              <Edit3 className="w-4 h-4 text-orange-500" />
                            </div>
                            {isEditing ? (
                              <input
                                type="number"
                                className="w-full bg-white rounded px-2 py-1"
                                value={currentPackage.revisions}
                                onChange={(e) =>
                                  updatePackageField(
                                    "revisions",
                                    Number(e.target.value)
                                  )
                                }
                              />
                            ) : (
                              <p className="font-bold text-gray-700">
                                {currentPackage.revisions} Rounds
                              </p>
                            )}
                          </div>

                          <div>
                            <h3 className="font-bold text-gray-900 mb-2">
                              Requirements
                            </h3>
                            <ul className="space-y-2">
                              {currentPackage.requirements?.map((req, idx) => (
                                <li
                                  key={idx}
                                  className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                                >
                                  {isEditing ? (
                                    <input
                                      className="w-full bg-white rounded px-2 py-1"
                                      value={req}
                                      onChange={(e) => {
                                        const newArr = [
                                          ...currentPackage.requirements,
                                        ];
                                        newArr[idx] = e.target.value;
                                        updatePackageField(
                                          "requirements",
                                          newArr
                                        );
                                      }}
                                    />
                                  ) : (
                                    req
                                  )}
                                </li>
                              ))}
                              {isEditing && (
                                <button
                                  className="text-sm text-orange-500 font-bold mt-2"
                                  onClick={() =>
                                    updatePackageField("requirements", [
                                      ...currentPackage.requirements,
                                      "New Requirement",
                                    ])
                                  }
                                >
                                  + Add Requirement
                                </button>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    // Fallback for an empty platform tab selection (if other tabs exist)
                    <div className="h-full flex flex-col items-center justify-center bg-white/50 border border-dashed border-orange-300 rounded-2xl p-12 text-center">
                      <Package className="w-16 h-16 text-orange-200 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 font-brasika">
                        No Packages on {currentPlatform.label}
                      </h3>
                      <p className="text-gray-500 mb-6 font-outfit">
                        Create a new package to start offering services on this
                        platform.
                      </p>
                      <button
                        onClick={() => setShowAddPackage(true)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition"
                      >
                        Create New Package
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Initial Empty State: No packages created anywhere
          <div className="h-96 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-dashed border-orange-300 p-16 text-center">
            <Package className="w-16 h-16 text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 font-brasika">
              Welcome to the Package Manager!
            </h3>
            <p className="text-gray-600 mb-6 font-outfit">
              Get started by defining your first campaign package. This will
              automatically enable the platform tab.
            </p>
            <button
              onClick={() => setShowAddPackage(true)}
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-200"
            >
              <Plus className="w-4 h-4 mr-2 inline" /> Create First Package
            </button>
          </div>
        )}
      </div>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddPackage && (
          <AddPackageModal
            onClose={() => setShowAddPackage(false)}
            onAdd={addNewPackage}
            staticPlatforms={STATIC_PLATFORM_DATA}
            initialPlatformKey={selectedPlatform}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Add Package Modal Component
const AddPackageModal = ({
  onClose,
  onAdd,
  staticPlatforms,
  initialPlatformKey,
}) => {
  const SERVICE_OPTIONS = [
    "Reel",
    "Story",
    "Post",
    "Video",
    "Live Stream",
    "Carousel",
    "Shoutout",
    "Blog Post",
  ];

  const PLATFORM_KEYS = Object.keys(staticPlatforms);

  const [formData, setFormData] = useState({
    platform: initialPlatformKey,
    name: "",
    serviceType: SERVICE_OPTIONS[0],
    amount: 1000,
    description: "",
    deliverables: [""],
    timeline: "3 Days",
    revisions: 2,
    requirements: [""],
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

    // The entire formData object is the payload, including 'platform'
    onAdd(
      {
        ...formData,
        deliverables: formData.deliverables.filter(
          (item) => item.trim() !== ""
        ),
        requirements: formData.requirements.filter(
          (item) => item.trim() !== ""
        ),
      }
      // Do not pass platform key separately, it's already in the payload
    );
  };

  const PlatformIcon = staticPlatforms[formData.platform]?.icon || Package;
  const platformLabel =
    staticPlatforms[formData.platform]?.label || "Select Platform";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-orange-100 bg-orange-50/50">
          <div className="flex items-center">
            <PlatformIcon
              className={`w-6 h-6 mr-3 ${
                staticPlatforms[formData.platform]?.color?.split(" ")[3] ||
                "text-gray-500"
              }`}
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-brasika">
                Add {platformLabel} Package
              </h2>
              <p className="text-sm text-gray-500 font-outfit">
                Define your service offering details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-colors"
          >
            <Trash2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit">
                Target Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => updateField("platform", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:ring-opacity-50 outline-none font-outfit appearance-none bg-white"
                required
              >
                {PLATFORM_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {staticPlatforms[key].label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit">
                Package Name
              </label>
              <input
                type="text"
                placeholder="e.g. Gold Tier Shoutout"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:ring-opacity-50 outline-none font-outfit"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit">
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => updateField("serviceType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:ring-opacity-50 outline-none font-outfit appearance-none bg-white"
                required
              >
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit">
                Price (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  updateField("amount", parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:ring-opacity-50 outline-none font-outfit"
                required
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:ring-opacity-50 outline-none font-outfit"
              required
            />
          </div>

          {/* Deliverables Array Input */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700 font-outfit flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />{" "}
                Deliverables
              </label>
              <button
                type="button"
                onClick={() => addArrayItem("deliverables")}
                className="text-xs text-orange-600 font-bold hover:text-orange-800 transition"
              >
                + Add Item
              </button>
            </div>
            <div className="space-y-2">
              {formData.deliverables.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateArrayField("deliverables", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none font-outfit text-sm"
                    placeholder="e.g. 1 Story with Link"
                  />
                  {formData.deliverables.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("deliverables", index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" /> Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-outfit"
                required
                placeholder="e.g. 5 Business Days"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-2 font-outfit flex items-center">
                <Edit3 className="w-4 h-4 mr-2 text-purple-500" /> Revisions
              </label>
              <input
                type="number"
                value={formData.revisions}
                onChange={(e) =>
                  updateField("revisions", parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none font-outfit"
                required
                min="0"
              />
            </div>
          </div>

          {/* Requirements Array Input */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700 font-outfit flex items-center">
                <FileText className="w-4 h-4 mr-2 text-orange-600" />{" "}
                Requirements
              </label>
              <button
                type="button"
                onClick={() => addArrayItem("requirements")}
                className="text-xs text-orange-600 font-bold hover:text-orange-800 transition"
              >
                + Add Item
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateArrayField("requirements", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none font-outfit text-sm"
                    placeholder="e.g. Brand must provide script"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("requirements", index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-outfit font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-colors font-outfit font-bold shadow-lg shadow-orange-200"
            >
              Create Package
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Campaigns;
