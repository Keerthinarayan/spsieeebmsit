import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/vision', label: 'About Us' },
    { path: '/events', label: 'Events' },
    { path: '/archives', label: 'Archives' },
    { path: '/team', label: 'Our Team' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-green-900/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img 
                src="https://i.imgur.com/kXd5V5O.png" 
                alt="SPS Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl">IEEE SPS BMSIT&M</span>
            </motion.div>
            <p className="text-gray-400">
              Advancing signal processing research and applications worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">contact@ieeesps.org</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+91 (555) 1432 324</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">BMS Institute Of Technology & Management, Bengaluru </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  whileHover={{ x: 5, color: "#60A5FA" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for updates and news.
            </p>
            <motion.div 
              className="flex"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 border-gray-700"
              />
              <motion.button 
                className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} IEEE Signal Processing Society BMS Institute of Technology & Managment. All rights reserved. Use of this website signifies your agreement to the IEEE Terms and Conditions.IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
          </p>
        </motion.div>
      </div>

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;
