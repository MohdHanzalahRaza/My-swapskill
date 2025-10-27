import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  // Animated counter for stats
  const [stats, setStats] = useState({
    users: 0,
    skills: 0,
    swaps: 0,
  });

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Handle scroll for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "how-it-works",
        "skills",
        "about",
        "testimonials",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate stats on load
    const finalStats = { users: 5000, skills: 500, swaps: 10000 };
    const duration = 2000;
    const steps = 100;
    const increment = {
      users: finalStats.users / steps,
      skills: finalStats.skills / steps,
      swaps: finalStats.swaps / steps,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          users: Math.floor(increment.users * currentStep),
          skills: Math.floor(increment.skills * currentStep),
          swaps: Math.floor(increment.swaps * currentStep),
        });
        currentStep++;
      } else {
        setStats(finalStats);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const skills = [
    {
      id: 1,
      name: "Python Programming",
      category: "tech",
      icon: "🐍",
      teachers: 45,
      level: "Beginner to Advanced",
    },
    {
      id: 2,
      name: "Graphic Design",
      category: "creative",
      icon: "🎨",
      teachers: 32,
      level: "All Levels",
    },
    {
      id: 3,
      name: "Spanish Language",
      category: "language",
      icon: "🇪🇸",
      teachers: 28,
      level: "Beginner to Native",
    },
    {
      id: 4,
      name: "Digital Marketing",
      category: "business",
      icon: "📱",
      teachers: 38,
      level: "Intermediate",
    },
    {
      id: 5,
      name: "React Development",
      category: "tech",
      icon: "⚛️",
      teachers: 52,
      level: "Intermediate to Advanced",
    },
    {
      id: 6,
      name: "Photography",
      category: "creative",
      icon: "📸",
      teachers: 41,
      level: "All Levels",
    },
    {
      id: 7,
      name: "French Language",
      category: "language",
      icon: "🇫🇷",
      teachers: 19,
      level: "Beginner to Advanced",
    },
    {
      id: 8,
      name: "Business Strategy",
      category: "business",
      icon: "💼",
      teachers: 25,
      level: "Advanced",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Graphic Designer",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "I learned Python from John and taught him Photoshop in return. It's amazing how much you can learn when teaching others!",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "The community here is fantastic. I've made great connections and learned skills I never thought I could.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Specialist",
      image:
        "https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=150",
      text: "SwapSkillz transformed my career. I learned data analysis and now work at my dream job!",
      rating: 5,
    },
  ];

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  const navItems = [
    { id: "hero", label: "Home", icon: "🏠" },
    { id: "how-it-works", label: "How It Works", icon: "⚙️" },
    { id: "skills", label: "Skills", icon: "🎯" },
    { id: "about", label: "About", icon: "ℹ️" },
    { id: "testimonials", label: "Reviews", icon: "⭐" },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      {/* Enhanced Navigation Bar - Without Theme Toggle */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? `${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-lg py-3`
            : `${
                isDarkMode
                  ? "bg-gradient-to-b from-gray-900 to-transparent"
                  : "bg-gradient-to-b from-white to-transparent"
              } py-5`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <span
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                SwapSkillz
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all hover:scale-105 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : `${
                          isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-800"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }`
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className={`px-6 py-2 font-medium rounded-full transition-all hover:scale-105 ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className={`p-2 rounded-lg ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme Toggle Button - Below Navigation */}
      <div className="fixed top-20 right-8 z-40">
        <button
          onClick={toggleTheme}
          className={`w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center ${
            isDarkMode
              ? "bg-yellow-500 text-yellow-900"
              : "bg-gray-800 text-yellow-400"
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          isDarkMode
            ? "bg-gray-900"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-20 left-20 w-64 h-64 rounded-full opacity-20 animate-pulse ${
              isDarkMode ? "bg-blue-400" : "bg-blue-200"
            }`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-20 animate-pulse ${
              isDarkMode ? "bg-purple-400" : "bg-purple-200"
            }`}
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 animate-pulse ${
              isDarkMode ? "bg-pink-400" : "bg-pink-200"
            }`}
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
              Trade Skills,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Not Money
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Join thousands of learners and teachers. Share what you know,
              learn what you need.{" "}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your community, your growth.
              </span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <span>Start Learning Today</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                to="/how-it-works"
                className={`inline-flex items-center justify-center px-8 py-4 border-2 font-bold rounded-full transition-all text-lg ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Active Learners", value: stats.users, icon: "👥" },
                { label: "Skills Available", value: stats.skills, icon: "🎯" },
                { label: "Successful Swaps", value: stats.swaps, icon: "🔄" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl backdrop-blur-sm transition-all hover:scale-105 ${
                    isDarkMode
                      ? "bg-gray-800/50 border border-gray-700"
                      : "bg-white/70 border border-white"
                  } shadow-xl`}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value.toLocaleString()}+
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - From First File */}
      <section
        id="how-it-works"
        className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SwapSkillz
              </span>{" "}
              Works
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Our innovative platform makes skill exchange simple, safe, and
              rewarding. Join thousands who are already transforming their lives
              through learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Sign up and showcase your skills. Tell us what you can teach and what you want to learn.",
                icon: "👤",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Find Your Match",
                description:
                  "Browse our community and find the perfect skill exchange partner using our smart matching system.",
                icon: "🔍",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Start Learning",
                description:
                  "Connect, schedule sessions, and begin your learning journey. Track progress and leave reviews.",
                icon: "🚀",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl transition-all hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-50"
                } shadow-xl hover:shadow-2xl`}
              >
                {/* Step number */}
                <div
                  className={`absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:rotate-12 transition-transform`}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 text-center">{step.icon}</div>

                {/* Content */}
                <h3
                  className={`text-2xl font-bold mb-4 text-center ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-center leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>

                {/* Connecting line for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Your Journey Today
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Explore{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Popular Skills
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From technology to creative arts, discover skills that can
              transform your career and life.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["all", "tech", "creative", "language", "business"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : `${
                          isDarkMode
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className={`group p-6 rounded-2xl transition-all hover:scale-105 cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg hover:shadow-xl border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <div className="text-4xl mb-4 text-center">{skill.icon}</div>
                <h3
                  className={`text-xl font-bold mb-2 text-center ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {skill.name}
                </h3>
                <p
                  className={`text-sm mb-4 text-center ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {skill.level}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {skill.teachers} teachers
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/skills"
              className={`inline-flex items-center px-8 py-4 border-2 font-bold rounded-full transition-all hover:scale-105 ${
                isDarkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Explore All Skills
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose SwapSkillz Section - From First File */}
      <section
        id="about"
        className={`py-20 ${
          isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose SwapSkillz?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              More than just a learning platform - we're building a global
              community of knowledge sharers and lifelong learners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Completely Free",
                description:
                  "No hidden costs, no subscription fees. Learning and teaching should be accessible to everyone.",
                icon: "💰",
              },
              {
                title: "Global Community",
                description:
                  "Connect with learners and teachers from around the world. Expand your network while learning.",
                icon: "🌍",
              },
              {
                title: "Verified Profiles",
                description:
                  "All our users go through verification. Learn from trusted community members safely.",
                icon: "✅",
              },
              {
                title: "Flexible Scheduling",
                description:
                  "Learn at your own pace with flexible scheduling options that fit your lifestyle.",
                icon: "📅",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Learn More About Us
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Community Says
              </span>
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Real stories from real people who have transformed their lives
              through SwapSkillz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`p-8 rounded-2xl transition-all hover:scale-105 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-xl hover:shadow-2xl`}
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className={`mb-6 italic leading-relaxed ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4
                      className={`font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of learners and teachers today. It's free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span>Get Started Free</span>
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all text-lg"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer with Newsletter */}
      <footer
        className={`py-16 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-900"
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold">SwapSkillz</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Empowering communities through skill exchange. Learn, teach, and
                grow together.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "linkedin", "instagram"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">
                Quick Links
              </h4>
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
              <h4 className="text-lg font-bold mb-4 text-purple-400">
                Resources
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", path: "/help" },
                  {
                    label: "Community Guidelines",
                    path: "/community-guidelines",
                  },
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
              <h4 className="text-lg font-bold mb-4 text-green-400">
                Newsletter
              </h4>
              <p className="text-gray-300 mb-4 text-sm">
                Stay updated with our latest news, features, and skill
                opportunities.
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
              <Link
                to="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-30 flex items-center justify-center ${
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Home;
