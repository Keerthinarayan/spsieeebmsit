import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            text: "Hello! I'm your IEEE SPS assistant. How can I help you today?",
            isBot: true
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setMessages([...messages, { text: inputText, isBot: false }]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking with variable response time
    setTimeout(() => {
      const response = getBotResponse(inputText);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: response, isBot: true }]);

      // Check if the user said goodbye
      if (inputText.toLowerCase().match(/\b(bye|goodbye|see you|farewell)\b/)) {
        setTimeout(() => setIsOpen(false), 1500);
      }
    }, Math.random() * 500 + 500); // Random delay between 500-1000ms

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Goodbye responses
    if (lowerInput.match(/\b(bye|goodbye|see you|farewell)\b/)) {
      return "Goodbye! Have a great day! Feel free to come back if you have more questions. 👋";
    }

    // Thank you responses
    if (lowerInput.match(/\b(thanks|thank you|thx)\b/)) {
      return "You're welcome! Is there anything else you'd like to know about IEEE SPS?";
    }

    // Events related queries
    if (lowerInput.includes('event') || lowerInput.includes('workshop') || lowerInput.includes('conference')) {
      if (lowerInput.includes('next') || lowerInput.includes('upcoming')) {
        return 'Our next major event is "Capture The Signal 2025" happening from MAY 15-17, 2025. You can register for it on our Events page!\n\nWe also have a Workshop on AI in Signal Processing coming up in July 2025.';
      }
      if (lowerInput.includes('register') || lowerInput.includes('sign up')) {
        return 'You can register for our events through the Events page. For Capture The Signal 2025, registration is open now!\n\nWould you like me to tell you more about the event?';
      }
      if (lowerInput.includes('cost') || lowerInput.includes('fee') || lowerInput.includes('price')) {
        return 'Event fees vary. IEEE members get special discounts on all events. Contact us for specific event pricing!';
      }
      return 'We organize various technical events including:\n- Workshops\n- Conferences\n- Student meetups\n- Technical competitions\n\nOur flagship event "Capture The Signal" is coming up in May 2025!';
    }
    
    // Membership queries
    if (lowerInput.includes('join') || lowerInput.includes('member') || lowerInput.includes('registration')) {
      if (lowerInput.includes('benefit') || lowerInput.includes('perks')) {
        return 'IEEE SPS membership benefits include:\n- Access to technical resources\n- Event discounts\n- Networking opportunities\n- Professional development\n- Digital library access';
      }
      if (lowerInput.includes('cost') || lowerInput.includes('fee')) {
        return 'Student membership fees are discounted! Visit ieee.org/membership for current rates and special offers.';
      }
      return 'To become a member of IEEE SPS:\n1. Visit ieee.org/membership\n2. Select your membership type\n3. Complete the registration process\n\nStudent members get special discounts!';
    }
    
    // About SPS
    if (lowerInput.includes('sps') || lowerInput.includes('signal') || lowerInput.includes('about')) {
      if (lowerInput.includes('mission') || lowerInput.includes('goal')) {
        return 'Our mission is to advance signal processing technology through:\n- Innovation\n- Education\n- Research collaboration\n- Professional development';
      }
      if (lowerInput.includes('location') || lowerInput.includes('where')) {
        return 'We are located at BMS Institute of Technology & Management, Bengaluru. Our chapter is part of the global IEEE Signal Processing Society.';
      }
      return 'IEEE Signal Processing Society (SPS) at BMSIT&M is dedicated to advancing signal processing technology. We focus on innovation, education, and building a strong technical community.';
    }
    
    // Team related queries
    if (lowerInput.includes('team') || lowerInput.includes('committee') || lowerInput.includes('faculty')) {
      if (lowerInput.includes('faculty') || lowerInput.includes('advisor')) {
        return 'Our Faculty Advisor is Dr. Saneesh, who guides our chapter activities and technical initiatives.';
      }
      if (lowerInput.includes('chair') || lowerInput.includes('lead')) {
        return 'Our current leadership:\n- Chair: Sourabh K H\n- Vice Chair: Smriti\n- Secretary: Maanya\n- Treasurer: Chinamy Bhat';
      }
      return 'Our team is led by Dr. Saneesh (Faculty Advisor) and includes Sourabh K H (Chair), Smriti (Vice Chair), and other dedicated members. Visit our Team page to meet everyone!';
    }
    
    // Contact information
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      if (lowerInput.includes('urgent') || lowerInput.includes('emergency')) {
        return 'For urgent matters, please email us at contact@ieeesps.org or reach out to our Faculty Advisor directly.';
      }
      return 'You can reach us at:\nEmail: contact@ieeesps.org\nLocation: BMSIT&M Campus, Bengaluru\n\nFollow us on social media for updates!';
    }
    
    // General greetings
    if (lowerInput.match(/\b(hi|hello|hey|howdy|greetings)\b/)) {
      return "Hello! I'm here to help you learn about IEEE SPS at BMSIT&M. You can ask me about:\n- Events and activities\n- Membership details\n- Our team\n- Contact information\n\nWhat would you like to know?";
    }

    // Help or confused user
    if (lowerInput.includes('help') || lowerInput.includes('confused') || lowerInput.includes('what can you')) {
      return "I can help you with:\n1. Information about our events\n2. Membership details\n3. Team information\n4. Contact details\n5. General queries about SPS\n\nJust ask me anything about these topics!";
    }

    return "I'm not quite sure about that. You can ask me about:\n- Our events and activities\n- Membership details\n- Our team\n- Contact information\n\nOr try rephrasing your question!";
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed left-4 bottom-4 z-50 p-3 rounded-full shadow-lg transition-colors duration-200 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 bottom-20 z-50 w-[calc(100%-2rem)] sm:w-[350px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-sm">IEEE SPS Assistant</h3>
                  <p className="text-xs text-blue-100">Ask me anything!</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-[350px] overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-gray-800 dark:text-gray-200'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 text-white'
                    }`}
                  >
                    <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex space-x-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 w-16"
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-2 h-2 rounded-full bg-gray-400"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: dot * 0.1
                      }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-2 text-sm border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="p-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;