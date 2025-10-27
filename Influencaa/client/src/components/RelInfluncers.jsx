import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Users,
  TrendingUp,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { sampleInfluencers } from "../assets/assets";

const RelInfluncers = ({ niche, Iid }) => {
  const navigate = useNavigate();

  // Filter influencers by same niche, excluding current influencer
  const relatedInfluencers = sampleInfluencers
    .filter((infl) => infl.niche === niche && infl.id !== parseInt(Iid))
    .slice(0, 6); // Show max 6 related influencers

  const socialPlatforms = {
    instagram: { icon: Instagram, color: "bg-pink-500", label: "Instagram" },
    youtube: { icon: Youtube, color: "bg-red-500", label: "YouTube" },
    facebook: { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
    linkedin: { icon: Linkedin, color: "bg-blue-800", label: "LinkedIn" },
    twitter: { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
  };

  const formatAudience = (audience) => {
    if (audience >= 1000000) return `${(audience / 1000000).toFixed(1)}M`;
    if (audience >= 1000) return `${(audience / 1000).toFixed(0)}K`;
    return audience.toString();
  };

  const getStartingPrice = (influencer) => {
    // Get minimum price from all platforms
    let minPrice = Infinity;
    Object.values(influencer.platforms).forEach((platform) => {
      if (platform && platform.services) {
        const platformMin = Math.min(
          ...Object.values(platform.services).map((service) => service.amount)
        );
        minPrice = Math.min(minPrice, platformMin);
      }
    });
    return minPrice === Infinity ? 0 : minPrice;
  };

  const getAvailablePlatforms = (influencer) => {
    return Object.keys(influencer.platforms || {});
  };

  if (relatedInfluencers.length === 0) {
    return null; // Don't show anything if no related influencers
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3"
        >
          Similar Influencers in{" "}
          <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {niche}
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Discover other talented creators in the same niche
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedInfluencers.map((influencer, index) => (
          <motion.div
            key={influencer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            whileHover={{
              y: -4,
              transition: { duration: 0.2 },
            }}
            onClick={() => navigate(`/explore/${influencer.id}`)}
            className="bg-white rounded-xl cursor-pointer shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative"
          >
            {/* Premium Badge */}
            {influencer.rating >= 4.7 && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Premium</span>
                </div>
              </div>
            )}

            {/* Compact Square Thumbnail */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-orange-400 to-red-500 overflow-hidden">
              <img
                src={influencer.thumbnail}
                alt={influencer.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Top Right - Rating */}
              <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                <span className="text-xs font-bold text-gray-800 flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {influencer.rating}
                </span>
              </div>

              {/* Bottom Left - Followers */}
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs font-semibold text-white flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {formatAudience(influencer.audience)}
                </span>
              </div>

              {/* Bottom Right - Engagement */}
              <div className="absolute bottom-2 right-2 bg-green-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs font-semibold text-white flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {influencer.engagement}%
                </span>
              </div>
            </div>

            {/* Compact Content */}
            <div className="p-4">
              {/* Influencer Info - Compact */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1 flex-1">
                    {influencer.name}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2"
                  >
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </motion.div>
                </div>
                <p className="text-orange-600 font-medium text-sm">
                  {influencer.niche}
                </p>
              </div>

              {/* Compact Stats */}
              <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1 text-gray-500" />
                  <span>{influencer.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1 text-gray-500" />
                  <span>{influencer.totalReviews} reviews</span>
                </div>
              </div>

              {/* Available Platforms - Compact */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {getAvailablePlatforms(influencer).map((key) => {
                    const PlatformIcon = socialPlatforms[key].icon;
                    const platform = influencer.platforms[key];
                    return (
                      <div key={key} className="relative group/platform">
                        <div
                          className={`p-1.5 rounded-lg ${socialPlatforms[key].color} text-white shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                          <PlatformIcon className="w-3 h-3" />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/platform:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                          {socialPlatforms[key].label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pricing & CTA - Compact */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 block">From</span>
                  <div className="text-lg font-bold text-orange-600">
                    ₹{getStartingPrice(influencer).toLocaleString()}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/explore/${influencer.id}`);
                  }}
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact View All Button */}
      {relatedInfluencers.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/explore")}
            className="bg-white text-orange-600 border border-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center space-x-2 mx-auto"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default RelInfluncers;
