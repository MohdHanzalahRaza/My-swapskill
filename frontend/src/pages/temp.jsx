import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterStatus("Thanks for subscribing! 🎉");
      setEmail("");
      setTimeout(() => setNewsletterStatus(""), 3000);
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and showcase your skills. Tell us what you can teach and what you want to learn. Build your credibility with detailed descriptions and examples of your expertise.",
      icon: "👤",
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "Add multiple skills you can teach",
        "List skills you want to learn",
        "Upload portfolio/work samples",
        "Set your availability preferences"
      ]
    },
    {
      number: "02",
      title: "Find Your Match",
      description: "Browse our community and find the perfect skill exchange partner using our smart matching system. Connect with people who have what you need and want what you offer.",
      icon: "🔍",
      gradient: "from-purple-500 to-pink-500",
      features: [
        "Smart algorithm matches compatible partners",
        "Filter by location, schedule, and skill level",
        "Read reviews and ratings",
        "Chat before committing to a swap"
      ]
    },
    {
      number: "03",
      title: "Plan Your Exchange",
      description: "Coordinate with your match to plan your skill exchange sessions. Decide on the format, duration, and schedule that works for both of you.",
      icon: "📅",
      gradient: "from-green-500 to-emerald-500",
      features: [
        "Choose online or in-person sessions",
        "Set mutual learning goals",
        "Schedule convenient times",
        "Access built-in video calling tools"
      ]
    },
    {
      number: "04",
      title: "Start Learning",
      description: "Begin your learning journey! Attend sessions, track your progress, and build lasting connections. Leave reviews to help the community grow.",
      icon: "🚀",
      gradient: "from-orange-500 to-red-500",
      features: [
        "Interactive learning sessions",
        "Progress tracking tools",
        "Milestone achievements",
        "Community reviews and feedback"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is SwapSkillz really free?",
      answer: "Yes! SwapSkillz is 100% free with no hidden costs or subscription fees. We believe education should be accessible to everyone. Our platform is supported by the community and we're committed to keeping it free forever."
    },
    {
      question: "How do I know if someone is qualified?",
      answer: "Every user has a profile with reviews and ratings from previous skill swaps. We also have a verification system for users who want to prove their credentials. You can read reviews, check ratings, and even chat with potential partners before committing."
    },
    {
      question: "What if I don't have any skills to offer?",
      answer: "Everyone has valuable skills! It could be anything from cooking, gardening, language skills, music, sports, or even life experiences. Think about what comes naturally to you - that's your skill. We encourage everyone to both teach and learn."
    },
    {
      question: "Can I swap skills online or does it have to be in person?",
      answer: "Both! You can choose to swap skills online via video calls or in person at a location of your choice. Many of our users prefer online swaps for convenience, but in-person sessions work great for hands-on skills like cooking or sports."
    },
    {
      question: "How long does a typical skill swap take?",
      answer: "It varies! Some skills can be taught in a single 1-hour session, while others might need multiple sessions over weeks or months. You and your swap partner agree on the duration and frequency that works for both of you."
    },
    {
      question: "What if I want to cancel a swap?",
      answer: "Life happens! You can cancel or reschedule sessions by communicating with your swap partner. We encourage clear communication and mutual respect. If there's a serious issue, our support team is here to help resolve conflicts."
    },
    {
      question: "Is my personal information safe?",
      answer: "Absolutely! We take privacy and security very seriously. Your personal information is encrypted and never shared without your permission. We comply with all data protection regulations and you have full control over what information you share."
    },
    {
      question: "Can I swap multiple skills at once?",
      answer: "Yes! You can have multiple active swaps with different people at the same time. Many users teach several skills while learning others. There's no limit to how many swaps you can participate in."
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg py-3`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SwapSkillz</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Home
              </Link>
              <Link to="/how-it-works" className="font-medium text-blue-600">
                How It Works
              </Link>
              <Link to="/skills" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Skills
              </Link>
              <Link to="/about" className={`font-medium transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                About
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className={`px-6 py-2 font-medium rounded-full transition-all hover:scale-105 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                Login
              </Link>
              <Link to="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Toggle Button */}
      <div className="fixed top-20 right-8 z-40">
        <button
          onClick={toggleTheme}
          className={`w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center ${
            isDarkMode ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-800 text-yellow-400'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How <span className="text-yellow-300">SwapSkillz</span> Works
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Learn how to start your skill exchange journey in just 4 simple steps. 
            Join thousands who are already transforming their lives through learning.
          </p>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} flex justify-center`}>
                  <div className={`w-full max-w-md h-80 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center text-8xl shadow-2xl transform hover:scale-105 transition-transform`}>
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to know about getting started with SwapSkillz
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl overflow-hidden transition-all ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-lg hover:shadow-xl`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-8 py-6 text-left flex items-center justify-between transition-colors ${
                    isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      activeFAQ === index ? 'rotate-180' : ''
                    } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of learners and teachers today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span>Sign Up Now</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/skills"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all text-lg"
            >
              Browse Skills
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Newsletter - Same as Homepage */}
      <footer className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-900'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-2xl font-bold">SwapSkillz</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering communities through skill exchange. Learn, teach, and grow together.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "linkedin", "instagram"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", path: "/" },
                  { label: "About Us", path: "/about" },
                  { label: "Browse Skills", path: "/browse-skills" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      → {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-400">Resources</h4>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", path: "/help" },
                  { label: "Community Guidelines", path: "/community-guidelines" },
                  { label: "Safety Tips", path: "/safety-tips" },
                  { label: "Privacy Policy", path: "/privacy-policy" },
                ].map((resource) => (
                  <li key={resource.path}>
                    <Link
                      to={resource.path}
                      className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all"
                    >
                      → {resource.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-green-400">Newsletter</h4>
              <p className="text-gray-300 mb-4 text-sm">
                Stay updated with our latest news, features, and skill opportunities.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterStatus && (
                  <p className="text-green-400 text-sm">{newsletterStatus}</p>
                )}
              </form>
              <div className="mt-4 text-xs text-gray-400">
                <p>🔒 Your email is safe with us. No spam, ever.</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-8" />

          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2025 SwapSkillz. All rights reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-30 flex items-center justify-center opacity-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default HowItWorks;