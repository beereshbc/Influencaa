import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  ArrowUp,
  Heart,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    product: [
      { name: "Features", path: "/features" },
      { name: "Pricing", path: "/pricing" },
      { name: "Case Studies", path: "/case-studies" },
      { name: "Updates", path: "/updates" },
    ],
    company: [
      { name: "About", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Careers", path: "/careers" },
      { name: "Contact", path: "/contact" },
    ],
    resources: [
      { name: "Documentation", path: "/docs" },
      { name: "Help Center", path: "/help" },
      { name: "Community", path: "/community" },
      { name: "Partners", path: "/partners" },
    ],
    legal: [
      { name: "Privacy", path: "/privacy" },
      { name: "Terms", path: "/terms" },
      { name: "Security", path: "/security" },
      { name: "Compliance", path: "/compliance" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Mail, href: "mailto:hello@influencaa.com", label: "Email" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative px-4 py-12 sm:px-6 lg:px-8  bg-gradient-to-br from-red-50 via-orange-50 to-white"
    >
      {/* Floating Footer Container */}
      <div className="max-w-7xl mx-auto ">
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Footer Content */}
          <div className="px-6 py-12 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  className="flex items-center gap-3 mb-4 cursor-pointer group"
                  onClick={() => navigate("/")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Zap size={24} className="text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"
                      animate={{ rotate: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-brasika font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Influencaa
                    </span>
                    <span className="text-sm text-gray-500 font-outfit -mt-1">
                      For Brands
                    </span>
                  </div>
                </motion.div>

                <p className="text-gray-600 font-outfit text-lg mb-6 max-w-md">
                  Connect with the right influencers. Build authentic
                  partnerships. Scale your brand with confidence.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300 group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="font-outfit font-semibold text-gray-900 mb-4 text-lg">
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.path}
                        className="text-gray-600 hover:text-orange-600 font-outfit transition-colors duration-300 block"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="font-outfit font-semibold text-gray-900 mb-4 text-lg">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.path}
                        className="text-gray-600 hover:text-orange-600 font-outfit transition-colors duration-300 block"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="font-outfit font-semibold text-gray-900 mb-4 text-lg">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.path}
                        className="text-gray-600 hover:text-orange-600 font-outfit transition-colors duration-300 block"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="font-outfit font-semibold text-gray-900 mb-4 text-lg">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <motion.li
                      key={link.name}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a
                        href={link.path}
                        className="text-gray-600 hover:text-orange-600 font-outfit transition-colors duration-300 block"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200/50 px-6 py-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.p
                className="text-gray-500 font-outfit text-sm flex items-center gap-1"
                whileHover={{ scale: 1.02 }}
              >
                Made with{" "}
                <Heart size={16} className="text-red-500 fill-current" /> by
                Influencaa Team
              </motion.p>

              <div className="flex items-center gap-6">
                <p className="text-gray-500 font-outfit text-sm">
                  © 2024 Influencaa. All rights reserved.
                </p>

                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowUp size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
