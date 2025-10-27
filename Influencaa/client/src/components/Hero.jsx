import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { motion, useAnimation } from "framer-motion";
import {
  Users,
  Building2,
  Handshake,
  ArrowRight,
  UserPlus,
  Check,
  Star,
  Search,
  Rocket,
  Target,
  TrendingUp,
  Heart,
  Share2,
  Zap,
} from "lucide-react";

const Hero = () => {
  const controls = useAnimation();

  const stats = [
    { number: "10K+", label: "Active Influencers", icon: Users },
    { number: "5K+", label: "Brand Partners", icon: Building2 },
    { number: "25K+", label: "Successful Collabs", icon: Handshake },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-red-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-orange-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 lg:px-8 xl:px-16 py-8">
          <motion.div
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {/* Text Content - Comes second on mobile */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center"
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-bold mb-6 shadow-lg"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <Zap size={14} className="mr-2" />
                AI-Powered Influencer Matching
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl xl:text-6xl font-brasika font-bold text-gray-900 leading-tight mb-6"
              >
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Connect with
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Perfect Influencers
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl lg:text-2xl font-playfair text-gray-700 mb-6 leading-relaxed max-w-2xl"
              >
                Where{" "}
                <span className="font-semibold text-orange-600">
                  authentic connections
                </span>{" "}
                meet{" "}
                <span className="font-semibold text-red-600">
                  measurable results
                </span>
              </motion.p>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg font-outfit text-gray-600 mb-8 max-w-2xl leading-relaxed"
              >
                Our platform uses advanced AI to match brands with verified
                influencers who align with your vision. Streamline campaigns,
                track performance, and maximize ROI effortlessly.
              </motion.p>

              {/* Buttons - Single row on all screens */}
              <motion.div
                variants={itemVariants}
                className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start mb-8"
              >
                <motion.button
                  className="group flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center border border-transparent transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Search size={18} className="mr-2" />
                  <span className="text-base">Find Influencers</span>
                  <ArrowRight
                    size={18}
                    className="ml-2 transform group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>

                <motion.button
                  className="group flex-1 min-w-[200px] px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-outfit font-semibold rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl flex items-center justify-center hover:border-orange-400 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target size={18} className="mr-2" />
                  <span className="text-base">Join as Creator</span>
                  <UserPlus
                    size={18}
                    className="ml-2 transform group-hover:scale-110 transition-transform"
                  />
                </motion.button>
              </motion.div>

              {/* Stats - Single row on all screens */}
              <motion.div
                variants={itemVariants}
                className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start mb-6"
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="flex-1 min-w-[120px] flex flex-row items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 group"
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                          <IconComponent size={14} className="text-white" />
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="text-lg font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            {stat.number}
                          </div>
                          <div className="text-xs font-outfit font-medium text-gray-600 text-left">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Image Content - Comes first on mobile */}
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2 flex justify-center lg:justify-end items-center relative w-full"
            >
              <div className="relative w-full max-w-lg">
                {/* Main image container */}
                <motion.div
                  className="relative p-4 lg:p-6 rounded-3xl backdrop-blur-sm w-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-30"></div>

                  <motion.div
                    className="relative overflow-hidden rounded-2xl w-full"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img
                      src={assets.img8}
                      className="w-full h-[300px] sm:h-[350px] lg:h-[450px] xl:h-[550px] object-cover cursor-pointer"
                      alt="Influencer Collaboration Platform"
                    />

                    {/* Image overlay stats */}
                    <div className="absolute bottom-0 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-orange-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-red-500">
                            <Heart size={14} fill="currentColor" />
                            <span className="font-outfit font-bold text-xs">
                              2.4K
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-blue-500">
                            <Share2 size={14} />
                            <span className="font-outfit font-bold text-xs">
                              489
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-green-500">
                            <TrendingUp size={14} />
                            <span className="font-outfit font-bold text-xs">
                              +124%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs font-outfit font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                          TRENDING
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Elements - Hidden on mobile, visible on larger screens */}
                <motion.div
                  variants={floatAnimation}
                  animate="animate"
                  className="hidden lg:block absolute -top-4 -right-4 bg-gradient-to-br from-orange-500 to-red-500 text-white p-3 rounded-2xl shadow-2xl z-30 border border-white/20"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <span className="text-sm font-outfit font-bold">Live</span>
                  </div>
                  <div className="text-xs font-outfit font-medium mt-1">
                    24 active
                  </div>
                </motion.div>

                <motion.div
                  variants={floatAnimation}
                  animate="animate"
                  transition={{ delay: 0.5 }}
                  className="hidden lg:block absolute -bottom-4 -left-4 bg-gradient-to-br from-red-500 to-orange-500 text-white p-3 rounded-2xl shadow-2xl z-30 border border-white/20"
                >
                  <div className="text-base font-outfit font-bold">+156</div>
                  <div className="text-xs font-outfit font-medium mt-1">
                    Today
                  </div>
                </motion.div>

                {/* Verified Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 }}
                  className="hidden lg:block absolute top-6 -left-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-2 rounded-full shadow-lg z-30 border border-white/20"
                >
                  <div className="flex items-center space-x-1">
                    <Check size={12} />
                    <span className="text-xs font-outfit font-bold">
                      Verified
                    </span>
                  </div>
                </motion.div>

                {/* Rating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="hidden lg:block absolute bottom-6 -right-4 bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-2 rounded-xl shadow-lg z-30 border border-orange-200"
                >
                  <div className="flex items-center space-x-1">
                    <Star
                      size={14}
                      className="fill-orange-500 text-orange-500"
                    />
                    <span className="text-xs font-outfit font-bold">4.9/5</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
