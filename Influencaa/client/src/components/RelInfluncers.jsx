import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Star,
  ArrowRight,
} from "lucide-react";
// Assuming useAppContext and fetchInfluencers are correctly defined
// and that 'influencers' state holds the parsed JSON data.
// For this example, I will define a mock context/data source.

// --- MOCK DATA/CONTEXT START ---
// In a real application, you would remove this and use your actual context/data logic.

// Parsed JSON data provided by the user
const MOCK_INFLUENCERS_DATA = [
  {
    id: "6929c1b86a6e438ad667e05b",
    name: "Beeresh B c",
    niche: "Fitness & Health",
    audience: 0,
    rating: 4.5,
    engagement: 0,
    thumbnail: "https://via.placeholder.com/150",
    bio: "",
    responseTime: "1 hour",
    location: "Global",
    email: "bcbeereshkumar@gmail.com",
    phone: "N/A",
    languages: [],
    totalReviews: 0,
    coverImage: "https://via.placeholder.com/1400x320?text=Influencer+Cover",
    platforms: {
      instagram: {
        username: "Beeresh B c",
        followers: 0,
        engagementRate: 0,
        services: {
          I1: {
            service: "Reel",
            amount: 1000,
            timeline: "3 Days",
            revisions: 2,
            description: "s",
            deliverables: ["s"],
            requirements: ["s"],
          },
        },
      },
      linkedin: {
        username: "Beeresh B c",
        followers: 0,
        engagementRate: 0,
        services: {},
      },
    },
  },
  {
    id: "692a8ed60f296db9e414c425",
    name: "BEERESHKUMAR B CHATRAD",
    niche: "Fitness & Health",
    audience: 0,
    rating: 4.5,
    engagement: 0,
    thumbnail:
      "https://res.cloudinary.com/ddreqtrko/image/upload/v1764403400/sellers/thumbnails/sgwfpddevt04mwesfbce.jpg",
    bio: "The cleanup function is removed because it does nothing in a normal function",
    responseTime: "1 hour",
    location: "Davanagere",
    email: "service4u2024@gmail.com",
    phone: "6360995219",
    languages: ["Kannada", "English"],
    totalReviews: 0,
    coverImage:
      "https://res.cloudinary.com/ddreqtrko/image/upload/v1764398560/sellers/covers/wappwre42mzgboq5bnoa.jpg",
    platforms: {
      instagram: {
        username: "BEERESHKUMAR B C",
        followers: 0,
        engagementRate: 0,
        services: {
          I1: {
            service: "Blog Post",
            amount: 100000,
            timeline: "30 Days",
            revisions: 20,
            description: "Map the services array to the required I1",
            deliverables: [
              "Map the services array to the required I1",
              "Map the services array to the required I1",
            ],
            requirements: [
              "Map the services array to the required I1",
              "Map the services array to the required I1",
            ],
          },
          I2: {
            service: "Carousel",
            amount: 1000,
            timeline: "21 Days",
            revisions: 15,
            description: "Map the services array to the required I1",
            deliverables: [
              "Map the services array to the required I1",
              "Map the services array to the required I1",
            ],
            requirements: [
              "Map the services array to the required I1",
              "Map the services array to the required I1",
            ],
          },
          I3: {
            service: "Video",
            amount: 5000,
            timeline: "10 Days",
            revisions: 8,
            description:
              "The cleanup function is removed because it does nothing in a normal function\nThe cleanup function is removed because it does nothing in a normal function",
            deliverables: [
              "The cleanup function is removed because it does nothing in a normal function",
            ],
            requirements: [
              "The cleanup function is removed because it does nothing in a normal function",
              "The cleanup function is removed because it does nothing in a normal function",
            ],
          },
        },
      },
    },
  },
  {
    id: "692c25489a5f261fc12478bd",
    name: "Karibasavaraj",
    niche: "Beauty & Makeup",
    audience: 0,
    rating: 4.5,
    engagement: 0,
    thumbnail:
      "https://res.cloudinary.com/ddreqtrko/image/upload/v1764501720/sellers/thumbnails/hs3u7rfh7cly3p4l7kfi.jpg",
    bio: "",
    responseTime: "1 hour",
    location: "Global",
    email: "kb@gmail.com",
    phone: "N/A",
    languages: [],
    totalReviews: 0,
    coverImage:
      "https://res.cloudinary.com/ddreqtrko/image/upload/v1764501634/sellers/covers/os8pohcx8qrp9mohfuel.jpg",
    platforms: {
      youtube: {
        username: "Karibasavaraj",
        followers: 0,
        engagementRate: 0,
        services: {
          I1: {
            service: "Reel",
            amount: 10000,
            timeline: "3 Days",
            revisions: 2,
            description:
              "Track, manage, and complete your influencer campaign orders",
            deliverables: [
              "Track, manage, and complete your influencer campaign orders",
              "Track, manage, and complete your ",
            ],
            requirements: [
              "Track, manage, and complete your influencer campaign orders",
              "Track, manage, and complete your influencer campaign orders",
            ],
          },
        },
      },
      twitter: {
        username: "Karibasavaraj",
        followers: 0,
        engagementRate: 0,
        services: {
          I1: {
            service: "Post",
            amount: 100000,
            timeline: "3 Days",
            revisions: 2,
            description:
              "Define your service offering details, Define your service offering details",
            deliverables: [
              "Define your service offering details",
              "Define your service offering details",
              "service offering details",
            ],
            requirements: ["Define your service offering details"],
          },
        },
      },
    },
  },
];

// Mock useAppContext hook
const useAppContext = () => ({
  influencers: MOCK_INFLUENCERS_DATA,
  fetchInfluencers: () => console.log("Mock fetchInfluencers called"),
});

// --- MOCK DATA/CONTEXT END ---

const RelInfluncers = ({ niche, Iid }) => {
  const navigate = useNavigate();
  const { influencers, fetchInfluencers } = useAppContext();

  // State for card mechanics
  const [activePlatforms, setActivePlatforms] = useState({});
  const [currentSocialIndex, setCurrentSocialIndex] = useState({});
  const [isAutoSliding, setIsAutoSliding] = useState({});
  const autoSlideRefs = useRef({});

  // Define social media platforms structure
  const socialPlatforms = useMemo(
    () => [
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
    ],
    []
  );

  /**
   * Filter influencers by same niche, excluding current influencer.
   * Iid is a string, so strict comparison is safe here.
   * Using useMemo to prevent unnecessary recalculations.
   */
  const relatedInfluencers = useMemo(() => {
    return influencers
      .filter((infl) => infl.niche === niche && infl.id !== Iid)
      .slice(0, 3); // Limit to 3
  }, [influencers, niche, Iid]);

  // Simulate initial data fetch
  useEffect(() => {
    // In a real app, this would fetch data from an API
    fetchInfluencers();
  }, [fetchInfluencers]);

  // Helper to get only platforms with data
  const getAvailablePlatforms = (influencer) => {
    return socialPlatforms.filter(
      (platform) =>
        influencer.platforms &&
        influencer.platforms[platform.key] &&
        Object.keys(influencer.platforms[platform.key].services || {}).length >
          0 // Check for services
    );
  };

  // Helper to format audience numbers
  const formatAudience = (audience) => {
    if (audience >= 1000000) return `${(audience / 1000000).toFixed(1)}M`;
    if (audience >= 1000) return `${(audience / 1000).toFixed(0)}K`;
    return audience.toString();
  };

  /**
   * Initialization of state for active platforms and index
   */
  useEffect(() => {
    const initialPlatforms = {};
    const initialIndices = {};
    const initialAutoSlide = {};

    relatedInfluencers.forEach((influencer) => {
      const availablePlatforms = getAvailablePlatforms(influencer);
      if (availablePlatforms.length > 0) {
        // Start on the first available platform
        initialPlatforms[influencer.id] = availablePlatforms[0].key;
        initialIndices[influencer.id] = 0;
        initialAutoSlide[influencer.id] = true;
      }
    });

    setActivePlatforms(initialPlatforms);
    setCurrentSocialIndex(initialIndices);
    setIsAutoSliding(initialAutoSlide);
  }, [relatedInfluencers, socialPlatforms]);

  /**
   * Auto-slide interval logic
   */
  useEffect(() => {
    // Clear previous intervals before setting new ones
    Object.values(autoSlideRefs.current).forEach(clearInterval);
    autoSlideRefs.current = {};

    relatedInfluencers.forEach((influencer) => {
      if (isAutoSliding[influencer.id] === true) {
        autoSlideRefs.current[influencer.id] = setInterval(() => {
          setCurrentSocialIndex((prev) => {
            const availablePlatforms = getAvailablePlatforms(influencer);
            if (availablePlatforms.length <= 1) return prev; // No need to slide

            const current = prev[influencer.id] || 0;
            const newIndex = (current + 1) % availablePlatforms.length;
            const newPlatformKey = availablePlatforms[newIndex].key;

            setActivePlatforms((prevPlatforms) => ({
              ...prevPlatforms,
              [influencer.id]: newPlatformKey,
            }));
            return {
              ...prev,
              [influencer.id]: newIndex,
            };
          });
        }, 3000); // Change platform every 3 seconds
      }
    });

    return () => {
      // Cleanup on component unmount or dependency change
      Object.values(autoSlideRefs.current).forEach(clearInterval);
    };
  }, [isAutoSliding, relatedInfluencers, getAvailablePlatforms]);

  /**
   * Handler for manual platform change via button click
   */
  const handleSocialPlatformChange = (influencerId, platformKey, index) => {
    // 1. Stop auto-sliding immediately
    setIsAutoSliding((prev) => ({ ...prev, [influencerId]: false }));
    if (autoSlideRefs.current[influencerId]) {
      clearInterval(autoSlideRefs.current[influencerId]);
    }

    // 2. Set the new active platform/index
    setActivePlatforms((prev) => ({ ...prev, [influencerId]: platformKey }));
    setCurrentSocialIndex((prev) => ({ ...prev, [influencerId]: index }));

    // 3. Restart auto-sliding after a delay (e.g., 8 seconds)
    setTimeout(() => {
      setIsAutoSliding((prev) => ({ ...prev, [influencerId]: true }));
    }, 8000);
  };

  // Do not render if no related influencers are found
  if (relatedInfluencers.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-12">
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3"
        >
          Similar Influencers in{" "}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {niche}
          </span>
        </motion.h2>
        <p className="text-gray-600">
          Compare pricing and engagement with similar creators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedInfluencers.map((influencer, index) => {
          const availablePlatforms = getAvailablePlatforms(influencer);
          const currentPlatform = activePlatforms[influencer.id];
          const currentIndex = currentSocialIndex[influencer.id] || 0;

          // Only render cards that have at least one platform with services
          if (availablePlatforms.length === 0) return null;

          return (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                // Navigate to the influencer's detail page
                navigate(`/explore/${influencer.id}`);
                window.scrollTo(0, 0); // Scroll to top on navigation
              }}
              className="bg-white rounded-xl cursor-pointer shadow-sm border border-orange-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Thumbnail Section */}
              <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
                <img
                  src={influencer.thumbnail}
                  alt={influencer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlays */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                  <span className="text-xs font-bold text-gray-800 flex items-center">
                    <Star className="w-3.5 h-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                    {influencer.rating}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-2.5 py-1">
                  <span className="text-xs font-semibold text-white flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    {formatAudience(influencer.audience)}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-green-500/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
                  <span className="text-xs font-semibold text-white">
                    {influencer.engagement}% ER
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {influencer.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {influencer.niche}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-orange-500"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Platform Switcher */}
                {availablePlatforms.length > 0 && (
                  <div className="relative mb-4 bg-gray-50 p-2 rounded-xl">
                    <div className="flex justify-center space-x-2 mb-2">
                      {availablePlatforms.map((platform, idx) => {
                        const Icon = platform.icon;
                        const isActive = currentPlatform === platform.key;
                        return (
                          <button
                            key={platform.key}
                            // Stop event propagation to prevent navigating to the detail page on button click
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSocialPlatformChange(
                                influencer.id,
                                platform.key,
                                idx
                              );
                            }}
                            className={`p-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? `${platform.color} text-white shadow-md scale-110`
                                : "bg-white text-gray-400 hover:bg-gray-100"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Carousel Indicators */}
                    {availablePlatforms.length > 1 && (
                      <div className="flex justify-center space-x-1">
                        {availablePlatforms.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1 rounded-full transition-all duration-300 ${
                              currentIndex === idx
                                ? "bg-orange-500 w-4"
                                : "bg-gray-300 w-1.5"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Services & Pricing Table */}
                <div className="border border-gray-100 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {/* Find the label for the active platform */}
                      {
                        socialPlatforms.find((p) => p.key === currentPlatform)
                          ?.label
                      }{" "}
                      Rates
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {/* Iterate over the expected service keys */}
                    {["I1", "I2", "I3"].map((serviceKey) => {
                      const platformData =
                        influencer.platforms[currentPlatform];
                      const serviceData = platformData?.services?.[serviceKey];

                      if (!serviceData) return null;

                      return (
                        <div
                          key={serviceKey}
                          className="flex justify-between items-center px-3 py-2 hover:bg-orange-50/50 transition-colors"
                        >
                          <span className="text-xs font-medium text-gray-700">
                            {serviceData.service}
                          </span>
                          <span className="text-xs font-bold text-orange-600">
                            ₹{serviceData.amount.toLocaleString("en-IN")}
                          </span>
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
    </div>
  );
};

export default RelInfluncers;
