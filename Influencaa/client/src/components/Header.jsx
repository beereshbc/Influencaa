import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion, useAnimation } from "framer-motion";
import {
  Target,
  BarChart3,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  DollarSign,
  Search,
  Filter,
  MessageCircle,
} from "lucide-react";

const Header = () => {
  const controls = useAnimation();

  const benefits = [
    {
      icon: Target,
      title: "Precise Targeting",
      description:
        "Reach your exact target audience with AI-powered influencer matching based on demographics, interests, and behavior.",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Track campaign performance with detailed metrics including engagement rates, reach, conversions, and ROI.",
    },
    {
      icon: Shield,
      title: "Secure Collaboration",
      description:
        "Protected payments, clear contracts, and transparent communication ensure safe and professional partnerships.",
    },
    {
      icon: Zap,
      title: "Quick Launch",
      description:
        "Go from discovery to campaign launch in hours, not weeks. Streamlined processes for faster results.",
    },
  ];

  const features = [
    {
      icon: Search,
      title: "Smart Discovery",
      description:
        "Advanced filters by niche, audience size, engagement rate, and demographics",
    },
    {
      icon: Filter,
      title: "Quality Vetting",
      description:
        "Verified influencers with authentic followers and proven track records",
    },
    {
      icon: DollarSign,
      title: "Budget Control",
      description:
        "Set your budget and find influencers that deliver maximum value",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description:
        "Built-in messaging for seamless collaboration and quick approvals",
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description:
        "Reduce campaign setup time by 70% with our streamlined workflow",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor campaign progress and optimize in real-time",
    },
  ];

  const successMetrics = [
    { metric: "3-5x", description: "Higher ROI compared to traditional ads" },
    { metric: "68%", description: "Faster campaign launch time" },
    { metric: "89%", description: "Brands achieve their campaign goals" },
    { metric: "4.8/5", description: "Average brand satisfaction rating" },
  ];

  const influencerTiers = [
    {
      range: "1K - 10K",
      type: "Nano Influencers",
      benefits: [
        "Highest engagement rates",
        "Most authentic content",
        "Budget-friendly",
      ],
      bestFor: "Product launches, Local campaigns",
    },
    {
      range: "10K - 50K",
      type: "Micro Influencers",
      benefits: [
        "Strong community trust",
        "Good engagement",
        "Reasonable pricing",
      ],
      bestFor: "Brand awareness, Targeted promotions",
    },
    {
      range: "50K - 500K",
      type: "Mid-tier Influencers",
      benefits: [
        "Wider reach",
        "Professional content",
        "Established credibility",
      ],
      bestFor: "National campaigns, Product reviews",
    },
    {
      range: "500K+",
      type: "Macro Influencers",
      benefits: [
        "Massive visibility",
        "High production quality",
        "Brand authority",
      ],
      bestFor: "Large campaigns, Brand partnerships",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-red-50 relative overflow-hidden">
      {/* Enhanced Background decorative elements */}
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
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-orange-300 to-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-50"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Enhanced Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 xl:px-24 py-20 lg:py-32">
        {/* Hero Section for Marketers */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-outfit font-semibold mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Target size={16} className="mr-2" />
              For Brands & Marketers
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl xl:text-7xl font-brasika font-bold text-gray-900 leading-tight mb-6"
            >
              Amplify Your{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Brand Reach
              </span>{" "}
              <span className="block mt-2">With Authentic Influence</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl font-playfair text-gray-700 mb-6 leading-relaxed max-w-2xl"
            >
              Connect with verified influencers who resonate with your audience
              and drive{" "}
              <span className="font-bold text-orange-600">real results</span>{" "}
              for your campaigns.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg font-outfit text-gray-600 mb-10 max-w-2xl leading-relaxed"
            >
              Our platform eliminates the guesswork from influencer marketing.
              Access detailed analytics, secure collaborations, and measure ROI
              with precision - all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-transparent hover:border-orange-200 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Campaign</span>
                <ArrowRight
                  size={20}
                  className="ml-2 transform group-hover:translate-x-1 transition-transform"
                />
              </motion.button>

              <motion.button
                className="group px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-800 font-outfit font-semibold rounded-xl border-2 border-orange-200 shadow-lg hover:shadow-xl flex items-center justify-center hover:border-orange-400 transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Book Demo</span>
                <Users
                  size={20}
                  className="ml-2 transform group-hover:scale-110 transition-transform"
                />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 grid grid-cols-2 gap-6"
          >
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-bold font-outfit bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {metric.metric}
                </div>
                <div className="text-gray-600 text-sm font-outfit font-medium">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4">
              Why Brands Choose{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Influencaa
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-outfit max-w-3xl mx-auto">
              Everything you need to run successful influencer marketing
              campaigns, backed by data and trusted by thousands of brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-brasika font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 font-outfit leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4">
              Powerful Tools for{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Smart Marketing
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-outfit max-w-3xl mx-auto">
              Our platform is built with features that make influencer marketing
              efficient, measurable, and scalable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={20} className="text-white" />
                    </div>
                    <h3 className="text-lg font-brasika font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 font-outfit leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Influencer Tiers Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-gray-900 mb-4">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Influencer Match
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-outfit max-w-3xl mx-auto">
              Choose from different influencer tiers to match your campaign
              goals and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {influencerTiers.map((tier, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-center mb-4">
                  <div className="text-2xl font-brasika font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    {tier.range}
                  </div>
                  <div className="text-lg font-outfit font-semibold text-gray-800">
                    {tier.type}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div
                      key={benefitIndex}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle
                        size={16}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-sm font-outfit text-gray-600">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-orange-200 pt-4">
                  <div className="text-xs font-outfit font-semibold text-gray-500 uppercase mb-2">
                    Best For
                  </div>
                  <div className="text-sm font-outfit text-gray-700">
                    {tier.bestFor}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-brasika font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-white/90 font-outfit mb-8 max-w-2xl mx-auto">
            Join thousands of successful brands already using Influencaa to
            drive authentic engagement and measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-orange-600 font-outfit font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center border-2 border-transparent hover:bg-orange-50 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Free Trial</span>
              <ArrowRight
                size={20}
                className="ml-2 transform group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-transparent text-white font-outfit font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
