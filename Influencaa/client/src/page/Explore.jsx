import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  DollarSign,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Filter,
  ArrowUpDown,
  Star,
} from "lucide-react";
import { sampleInfluencers } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [filters, setFilters] = useState({
    audienceMax: "",
    budgetMax: "",
    search: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  const [filteredInfluencers, setFilteredInfluencers] =
    useState(sampleInfluencers);
  const [activePlatforms, setActivePlatforms] = useState({});
  const [currentSocialIndex, setCurrentSocialIndex] = useState({});
  const [isAutoSliding, setIsAutoSliding] = useState({});
  const autoSlideRefs = useRef({});
  const navigate = useNavigate();

  const socialPlatforms = [
    {
      key: "instagram",
      icon: Instagram,
      color: "bg-pink-500",
      label: "Instagram",
    },
    { key: "youtube", icon: Youtube, color: "bg-red-500", label: "YouTube" },
    {
      key: "facebook",
      icon: Facebook,
      color: "bg-blue-600",
      label: "Facebook",
    },
    {
      key: "linkedin",
      icon: Linkedin,
      color: "bg-blue-800",
      label: "LinkedIn",
    },
    { key: "twitter", icon: Twitter, color: "bg-sky-500", label: "Twitter" },
  ];

  // Get available platforms for each influencer
  const getAvailablePlatforms = (influencer) => {
    return socialPlatforms.filter(
      (platform) => influencer.platforms && influencer.platforms[platform.key]
    );
  };

  // Initialize active platforms and social indices based on available platforms
  useEffect(() => {
    const initialPlatforms = {};
    const initialIndices = {};
    const initialAutoSlide = {};

    sampleInfluencers.forEach((influencer) => {
      const availablePlatforms = getAvailablePlatforms(influencer);
      if (availablePlatforms.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * availablePlatforms.length
        );
        initialPlatforms[influencer.id] = availablePlatforms[randomIndex].key;
        initialIndices[influencer.id] = randomIndex;
        initialAutoSlide[influencer.id] = true;
      }
    });

    setActivePlatforms(initialPlatforms);
    setCurrentSocialIndex(initialIndices);
    setIsAutoSliding(initialAutoSlide);
  }, []);

  // Auto-slide social platforms for each influencer independently
  useEffect(() => {
    sampleInfluencers.forEach((influencer) => {
      if (isAutoSliding[influencer.id] !== false) {
        autoSlideRefs.current[influencer.id] = setInterval(() => {
          setCurrentSocialIndex((prev) => {
            const availablePlatforms = getAvailablePlatforms(influencer);
            if (availablePlatforms.length === 0) return prev;

            const newIndex =
              (prev[influencer.id] + 1) % availablePlatforms.length;
            setActivePlatforms((prevPlatforms) => ({
              ...prevPlatforms,
              [influencer.id]: availablePlatforms[newIndex].key,
            }));
            return {
              ...prev,
              [influencer.id]: newIndex,
            };
          });
        }, 3000);
      }
    });

    return () => {
      Object.values(autoSlideRefs.current).forEach(clearInterval);
    };
  }, [isAutoSliding]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...sampleInfluencers];

    // Apply audience filter
    if (filters.audienceMax) {
      result = result.filter(
        (influencer) => influencer.audience <= parseInt(filters.audienceMax)
      );
    }

    // Apply budget filter
    if (filters.budgetMax) {
      result = result.filter((influencer) => {
        const platform = activePlatforms[influencer.id];
        if (!platform) return false;

        const platformData = influencer.platforms[platform];
        if (!platformData || !platformData.services) return false;

        const serviceAmounts = Object.values(platformData.services).map(
          (service) => service.amount
        );
        const minPrice = Math.min(...serviceAmounts);
        return minPrice <= parseInt(filters.budgetMax);
      });
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (influencer) =>
          influencer.name.toLowerCase().includes(searchLower) ||
          influencer.niche.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === "audience") {
          return sortConfig.direction === "asc"
            ? a.audience - b.audience
            : b.audience - a.audience;
        } else if (sortConfig.key === "budget") {
          const aPlatform = activePlatforms[a.id];
          const bPlatform = activePlatforms[b.id];
          const aPlatformData = a.platforms[aPlatform];
          const bPlatformData = b.platforms[bPlatform];

          const aMinPrice =
            aPlatformData && aPlatformData.services
              ? Math.min(
                  ...Object.values(aPlatformData.services).map(
                    (service) => service.amount
                  )
                )
              : Infinity;
          const bMinPrice =
            bPlatformData && bPlatformData.services
              ? Math.min(
                  ...Object.values(bPlatformData.services).map(
                    (service) => service.amount
                  )
                )
              : Infinity;

          return sortConfig.direction === "asc"
            ? aMinPrice - bMinPrice
            : bMinPrice - aMinPrice;
        }
        return 0;
      });
    }

    setFilteredInfluencers(result);
  }, [filters, sortConfig, activePlatforms]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSocialPlatformChange = (influencerId, platformKey, index) => {
    // Stop auto-slide for this specific influencer
    setIsAutoSliding((prev) => ({
      ...prev,
      [influencerId]: false,
    }));

    // Clear existing interval for this influencer
    if (autoSlideRefs.current[influencerId]) {
      clearInterval(autoSlideRefs.current[influencerId]);
    }

    // Update platform and index for this influencer only
    setActivePlatforms((prev) => ({ ...prev, [influencerId]: platformKey }));
    setCurrentSocialIndex((prev) => ({ ...prev, [influencerId]: index }));

    // Restart auto-slide after 8 seconds only for this influencer
    setTimeout(() => {
      setIsAutoSliding((prev) => ({
        ...prev,
        [influencerId]: true,
      }));
    }, 8000);
  };

  const formatAudience = (audience) => {
    if (audience >= 1000000) return `${(audience / 1000000).toFixed(1)}M`;
    if (audience >= 1000) return `${(audience / 1000).toFixed(0)}K`;
    return audience.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50">
      {/* Hero Section */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Influencer Match
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Discover authentic creators who align with your brand values and
              drive real results
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Active Influencers" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "24h", label: "Average Response" },
              { number: "4.8★", label: "Platform Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-orange-200 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Filters & Sorting
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Audience Filter */}
                <div className="flex-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 mr-2" />
                    Max Audience
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="e.g., 1000000"
                      value={filters.audienceMax}
                      onChange={(e) =>
                        handleFilterChange("audienceMax", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSort("audience")}
                      className={`px-3 py-2 border rounded-lg flex items-center space-x-1 transition-colors ${
                        sortConfig.key === "audience"
                          ? "bg-orange-100 border-orange-500 text-orange-700"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      <span className="text-sm">
                        {sortConfig.key === "audience" &&
                        sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Budget Filter */}
                <div className="flex-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Max Budget (₹)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="e.g., 50000"
                      value={filters.budgetMax}
                      onChange={(e) =>
                        handleFilterChange("budgetMax", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSort("budget")}
                      className={`px-3 py-2 border rounded-lg flex items-center space-x-1 transition-colors ${
                        sortConfig.key === "budget"
                          ? "bg-orange-100 border-orange-500 text-orange-700"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      <span className="text-sm">
                        {sortConfig.key === "budget" &&
                        sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="flex-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </label>
                  <input
                    type="text"
                    placeholder="Name or niche..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Influencer Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInfluencers.map((influencer, index) => {
              const availablePlatforms = getAvailablePlatforms(influencer);
              const currentPlatform = activePlatforms[influencer.id];
              const currentIndex = currentSocialIndex[influencer.id] || 0;

              // If influencer has no platforms, don't show the card
              if (availablePlatforms.length === 0) return null;

              return (
                <motion.div
                  onClick={() => navigate(`/explore/${influencer.id}`)}
                  key={influencer.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl cursor-pointer shadow-sm border border-orange-200 overflow-hidden hover:shadow-md transition-all duration-300 hover:border-orange-300"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-gradient-to-br from-orange-400 to-red-500">
                    <img
                      src={influencer.thumbnail}
                      alt={influencer.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-semibold text-gray-800 flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {influencer.rating}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs font-semibold text-white">
                        {formatAudience(influencer.audience)} followers
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-green-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs font-semibold text-white">
                        {influencer.engagement}% engagement
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Influencer Info */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {influencer.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {influencer.niche}
                      </p>
                    </div>

                    {/* Social Platform Carousel - Only show available platforms */}
                    {availablePlatforms.length > 0 && (
                      <div className="relative mb-3">
                        <div className="flex justify-center space-x-1">
                          {availablePlatforms.map((platform, index) => {
                            const Icon = platform.icon;
                            const isActive = currentPlatform === platform.key;
                            return (
                              <button
                                key={platform.key}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSocialPlatformChange(
                                    influencer.id,
                                    platform.key,
                                    index
                                  );
                                }}
                                className={`p-1.5 rounded-full transition-all duration-300 transform ${
                                  isActive
                                    ? `${platform.color} text-white scale-110 shadow-lg`
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                              </button>
                            );
                          })}
                        </div>

                        {/* Auto-slide indicator - Only show if multiple platforms */}
                        {availablePlatforms.length > 1 && (
                          <div className="flex justify-center space-x-1 mt-2">
                            {availablePlatforms.map((_, index) => (
                              <div
                                key={index}
                                className={`w-1 h-1 rounded-full transition-all duration-300 ${
                                  currentIndex === index
                                    ? "bg-orange-500 w-2"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service Table */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-center mb-2">
                        <div className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          {
                            socialPlatforms.find(
                              (p) => p.key === currentPlatform
                            )?.label
                          }{" "}
                          Services
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        {["I1", "I2", "I3"].map((serviceKey) => {
                          const platformData =
                            influencer.platforms[currentPlatform];
                          const serviceData =
                            platformData?.services?.[serviceKey];

                          // Don't show service if it doesn't exist for this platform
                          if (!serviceData) return null;

                          return (
                            <div
                              key={serviceKey}
                              className="grid grid-cols-2 gap-2 p-1.5 rounded bg-white hover:bg-orange-50 transition-colors duration-200"
                            >
                              <div className="text-xs font-medium text-gray-700 truncate">
                                {serviceData.service}
                              </div>
                              <div className="text-xs font-semibold text-orange-600 text-right">
                                ₹{serviceData.amount.toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredInfluencers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No influencers found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to find more results
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
