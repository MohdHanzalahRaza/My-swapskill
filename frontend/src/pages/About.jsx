import { useState, useEffect, useRef } from 'react'

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [stats, setStats] = useState({
    users: 0,
    skills: 0,
    swaps: 0,
    rating: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateStats()
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateStats = () => {
    const finalStats = { users: 5000, skills: 500, swaps: 10000, rating: 4.8 }
    const duration = 2000
    const steps = 100
    const increment = {
      users: finalStats.users / steps,
      skills: finalStats.skills / steps,
      swaps: finalStats.swaps / steps,
      rating: finalStats.rating / steps
    }

    let currentStep = 0
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setStats({
          users: Math.floor(increment.users * currentStep),
          skills: Math.floor(increment.skills * currentStep),
          swaps: Math.floor(increment.swaps * currentStep),
          rating: (increment.rating * currentStep).toFixed(1)
        })
        currentStep++
      } else {
        setStats(finalStats)
        clearInterval(timer)
      }
    }, duration / steps)
  }

  const values = [
    {
      icon: '👥',
      title: 'Community First',
      description: 'We believe in the power of community. Every feature we build is designed to strengthen connections and foster meaningful relationships.',
      color: 'blue'
    },
    {
      icon: '❤️',
      title: 'Accessibility',
      description: 'Learning should be free and available to everyone, regardless of their financial situation. We\'re committed to keeping our platform 100% free.',
      color: 'red'
    },
    {
      icon: '🛡️',
      title: 'Trust & Safety',
      description: 'We prioritize creating a safe, verified community where users can learn and teach with confidence and peace of mind.',
      color: 'green'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously evolve and improve, incorporating user feedback to create the best skill-sharing experience possible.',
      color: 'yellow'
    },
    {
      icon: '🤝',
      title: 'Reciprocity',
      description: 'Learning is a two-way street. We encourage everyone to both teach and learn, creating balanced and enriching experiences.',
      color: 'purple'
    },
    {
      icon: '🌍',
      title: 'Inclusivity',
      description: 'We celebrate diversity and welcome people from all backgrounds, cultures, and skill levels to join our global community.',
      color: 'indigo'
    }
  ]

  const team = [
    {
      name: 'Mohd Hanzalah Raza',
      role: 'Founder & CEO',
      bio: 'Passionate about democratizing education and building communities that empower people to learn and grow together.',
      image: 'https://ui-avatars.com/api/?name=Mohd+Hanzalah&background=6366f1&color=fff&size=200'
    },
    {
      name: 'Coming Soon',
      role: 'CTO',
      bio: 'Join our growing team and help shape the future of skill-sharing and peer learning.',
      image: 'https://ui-avatars.com/api/?name=Tech+Lead&background=10b981&color=fff&size=200'
    },
    {
      name: 'Coming Soon',
      role: 'Community Manager',
      bio: 'We\'re looking for passionate individuals to join our mission of making learning accessible to everyone.',
      image: 'https://ui-avatars.com/api/?name=Community+Manager&background=f59e0b&color=fff&size=200'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-gradient-to-b from-white to-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SwapSkillz
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
              <a href="/skills" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Browse Skills</a>
              <a href="/about" className="text-blue-600 font-medium">About</a>
              <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-3">
              <a href="/login" className="hidden sm:block px-5 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors">
                Sign In
              </a>
              <a href="/register" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">About Us</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About SwapSkillz
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Building a world where knowledge flows freely and everyone has the opportunity to learn and teach
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                📖 OUR JOURNEY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  SwapSkillz was born from a simple belief: everyone has something valuable to teach and something 
                  new to learn. In a world where education is often expensive and inaccessible, we saw an opportunity 
                  to create something different.
                </p>
                <p>
                  Founded in 2024, we started with a vision to break down barriers to learning by creating a 
                  community-driven platform where skills are the currency. No money, no subscriptions—just people 
                  helping people grow.
                </p>
                <p>
                  Today, we're proud to connect thousands of learners and teachers across hundreds of skills, 
                  creating meaningful relationships and transforming lives through the power of peer-to-peer learning.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Team collaboration"
                className="relative rounded-3xl shadow-2xl transform hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💎 OUR VALUES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-8 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br from-${value.color}-400 to-${value.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform shadow-lg`}>
                  <span className="text-4xl">{value.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg font-medium">Active Users</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stats.skills.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg font-medium">Skills Available</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stats.swaps.toLocaleString()}+
              </div>
              <div className="text-blue-100 text-lg font-medium">Successful Swaps</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8">
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stats.rating}<span className="text-3xl">/5</span>
              </div>
              <div className="text-blue-100 text-lg font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              👨‍💼 OUR TEAM
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The people behind SwapSkillz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full transform group-hover:scale-110 transition-transform"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-lg text-blue-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Start learning and teaching today. It's completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
            >
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all text-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
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
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-110"
                    aria-label={social}
                  >
                    <span className="text-sm">📱</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ About Us</a></li>
                <li><a href="/browse-skills" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Browse Skills</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-400">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Community Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Safety Tips</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-800 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 SwapSkillz. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all z-40 flex items-center justify-center ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

export default About