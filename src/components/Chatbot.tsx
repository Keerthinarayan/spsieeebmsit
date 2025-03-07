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
  const [context, setContext] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
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
            text: "👋 Hi there! I'm your friendly IEEE SPS assistant! I'd love to help you explore everything about our community. What's your name?",
            isBot: true
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputText('');
    setIsTyping(true);
    setContext(prev => [...prev, userMessage]);

    // Simulate bot thinking with variable response time
    setTimeout(() => {
      let response: string;
      
      if (!userName) {
        const name = extractName(userMessage);
        setUserName(name);
        response = `Nice to meet you, ${name}! 😊 I'm here to help you with:\n\n🎯 Events and activities\n📚 Membership details\n🔬 Technical resources\n🤝 Networking opportunities\n👥 Team information\n\nWhat would you like to know about?`;
      } else {
        response = getBotResponse(userMessage, context, userName);
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setContext(prev => [...prev, response]);

      if (userMessage.toLowerCase().match(/\b(bye|goodbye|see you|farewell)\b/)) {
        setTimeout(() => setIsOpen(false), 2000);
      }
    }, Math.random() * 500 + 500);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const extractName = (input: string): string => {
    // Remove common greeting phrases
    const cleanInput = input.toLowerCase()
      .replace(/^(hi|hello|hey|my name is|i am|i'm)\s+/i, '')
      .replace(/[^a-zA-Z\s]/g, '')
      .trim();
    
    // Capitalize first letter of each word
    return cleanInput.split(' ')[0].charAt(0).toUpperCase() + 
           cleanInput.split(' ')[0].slice(1).toLowerCase();
  };

  const getBotResponse = (input: string, context: string[], userName: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Friendly greetings with name
    if (lowerInput.match(/\b(hi|hello|hey|greetings)\b/)) {
      return `Hey ${userName}! 👋 Great to see you again! How can I help you today? I'm always excited to chat about:\n\n🎯 Our awesome events\n📚 Membership perks\n🔬 Cool tech stuff\n🤝 Networking opportunities\n\nWhat interests you?`;
    }

    // Goodbye responses with name
    if (lowerInput.match(/\b(bye|goodbye|see you|farewell)\b/)) {
      return `Take care, ${userName}! 👋 It was great chatting with you. Don't forget to check out our upcoming events! Hope to see you again soon! 😊`;
    }

    // Thank you responses with name
    if (lowerInput.match(/\b(thanks|thank you|thx)\b/)) {
      return `You're welcome, ${userName}! 😊 Always happy to help! Is there anything else you'd like to know about our IEEE SPS community?`;
    }

    // Team Information with personality
    if (lowerInput.includes('team') || lowerInput.includes('committee') || lowerInput.includes('who')) {
      return `Let me introduce you to our amazing team, ${userName}! 🌟\n\n👨‍🏫 Faculty Advisor:\n- Dr. Saneesh (Our awesome mentor!)\n\n👥 Student Leaders:\n- Sourabh K H (Chair) - Leading with vision\n- Smriti (Vice Chair) - Our energetic organizer\n- Maanya (Secretary) - Keeping everything running smoothly\n- Chinamy Bhat (Treasurer) - Managing our resources\n\n🎨 Creative Team:\n- Keerthi Narayan & Deepak Reddy (Webmasters)\n- Vikas (Spectrum Volcom Head)\n- Susan Tiji Varghese (Signal Volcom Head)\n\nWould you like to connect with any of them? 🤝`;
    }

    // Events with excitement
    if (lowerInput.includes('event') || lowerInput.includes('workshop') || lowerInput.includes('conference')) {
      if (lowerInput.includes('next') || lowerInput.includes('upcoming')) {
        return `${userName}, you're in for a treat! 🎉 Check out our exciting upcoming events:\n\n🚀 Decode X 2025 (MAY 15-17)\n- Epic technical competitions\n- Mind-blowing expert talks\n- Amazing project showcase\n\n🤖 AI in Signal Processing Workshop (July 8)\n- Hands-on learning sessions\n- Industry experts sharing insights\n\nWant to join the fun? I can help you register! 😊`;
      }
      return `Hey ${userName}! 🌟 We've got tons of exciting events:\n\n🔬 Technical workshops\n🎓 Research symposiums\n🤝 Industry connect sessions\n💡 Hands-on training\n🌐 Networking meets\n\nWhich one sounds most interesting to you?`;
    }

    // Social Media with enthusiasm
    if (lowerInput.includes('social') || lowerInput.includes('follow') || lowerInput.includes('connect')) {
      return `${userName}, let's stay connected! 🌐\n\n📱 Follow our journey:\n- Instagram: @sps_bmsit (for awesome event pics!)\n- LinkedIn: IEEE SPS BMSIT&M (for professional updates)\n- WhatsApp Community (for instant updates)\n\nJoin us and never miss the fun! 🎉`;
    }

    // Contact Information with personality
    if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
      return `${userName}, here's how you can reach us! 📬\n\n✉️ Email:\n- ieee@bmsit.in\n- ieeespsbmsit@gmail.com\n\n📞 Phone:\n- Smriti (Vice Chair): 73892 96975\n- Chinmay Bhat (Treasurer): 86189 78745\n\n📍 Find us at: BMS Institute of Technology & Management, Bengaluru\n\nWe'd love to hear from you! 😊`;
    }

    // Help or confused user
    if (lowerInput.includes('help') || lowerInput.includes('confused')) {
      return `No worries, ${userName}! 😊 I'm here to help! Let's explore:\n\n🎯 Event details and registration\n📚 Membership benefits\n🔬 Technical resources\n🤝 Networking opportunities\n👥 Team connections\n🌐 Social media\n\nWhat would you like to know more about?`;
    }

    // Default response with personality
    return `Hey ${userName}! 🤔 I see you're interested in ${input.toLowerCase().split(' ').slice(-3).join(' ')}. Let me help you better!\n\nWe could talk about:\n🎯 Exciting events\n📚 Membership perks\n🔬 Tech resources\n🤝 Networking\n👥 Our team\n\nWhat catches your eye? 😊`;
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
                  <p className="text-xs text-blue-100">Let's chat! 😊</p>
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
