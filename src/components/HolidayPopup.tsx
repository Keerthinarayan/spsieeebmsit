import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HolidayPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const valentineSlides = [
    {
      title: "SPS Connecting Signals Together",
      description: "Where signals meet, connections happen 💖",
      icon: <Heart className="w-16 h-16 text-pink-400 drop-shadow-glow" />,
    },
    {
      title: "Don't Let Your Signal Fade Away!",
      description: "Join SPS now, or your perfect frequency match might slip away! 💝",
      icon: <Sparkles className="w-16 h-16 text-pink-400 drop-shadow-glow" />,
    }
  ];

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Change slides every 5 seconds
    const slideTimer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % valentineSlides.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  const isValentinesSeason = () => {
    const today = new Date();
    return today.getMonth() === 1 && today.getDate() >= 1 && today.getDate() <= 14;
  };

  if (!isValentinesSeason()) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Backdrop with hearts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-pink-500/40 to-red-500/40 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />

          {/* Content Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl mx-4 overflow-hidden"
          >
            {/* Main Content */}
            <motion.div
              className="relative bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-2xl overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(236, 72, 153, 0)",
                  "0 0 0 20px rgba(236, 72, 153, 0.2)",
                  "0 0 0 40px rgba(236, 72, 153, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Slides Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                  className="p-12 min-h-[400px] flex items-center justify-center"
                >
                  {/* Floating Hearts Background */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100,
                        rotate: Math.random() * 360,
                        scale: Math.random() * 0.5 + 0.5
                      }}
                      animate={{
                        y: -100,
                        rotate: Math.random() * 360,
                        scale: [0.5, 1, 0.5],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                      }}
                    >
                      <Heart className={`w-6 h-6 ${
                        Math.random() > 0.5 ? 'text-pink-300' : 'text-red-300'
                      }`} />
                    </motion.div>
                  ))}

                  <motion.div
                    className="relative z-10 text-center"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-center mb-8">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                          y: [0, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {valentineSlides[slideIndex].icon}
                      </motion.div>
                    </div>

                    <motion.h2
                      className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {valentineSlides[slideIndex].title}
                    </motion.h2>
                    
                    <motion.p
                      className="text-xl md:text-2xl text-pink-100 mb-8"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {valentineSlides[slideIndex].description}
                    </motion.p>

                    <motion.div
                      className="flex justify-center"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Link
                        to="/events"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-pink-100 rounded-full text-pink-600 font-medium text-lg transition-colors"
                        onClick={() => setIsVisible(false)}
                      >
                        <span>Join SPS Today</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                        
                        {/* Button glow effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-pink-400 blur-xl"
                          animate={{
                            opacity: [0.2, 0.4, 0.2]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {valentineSlides.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === slideIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    animate={index === slideIndex ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayPopup;