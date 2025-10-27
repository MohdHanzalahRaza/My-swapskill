import { useState, useEffect } from 'react'

const BrowseSkills = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentView, setCurrentView] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 'all',
    verified: 'all',
    search: ''
  })

  const itemsPerPage = 6

  const skillsData = [
    {id: 1, title: 'Web Development (React, Node.js)', description: 'I can teach you full-stack web development with modern technologies. Looking to learn graphic design in return.', username: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=5', rating: 4.8, category: 'tech', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', verified: true},
    {id: 2, title: 'Graphic Design (Adobe Suite)', description: 'Expert in Photoshop, Illustrator, and InDesign. Want to learn digital marketing strategies.', username: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4.9, category: 'creative', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400', verified: true},
    {id: 3, title: 'Spanish Language (Fluent Speaker)', description: 'Native Spanish speaker offering conversational lessons. Interested in learning Python programming.', username: 'Ananya Patel', avatar: 'https://i.pravatar.cc/150?img=9', rating: 4.7, category: 'language', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400', verified: true},
    {id: 4, title: 'Digital Marketing & SEO', description: '5 years of experience in SEO and social media marketing. Want to learn video editing.', username: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?img=15', rating: 4.6, category: 'business', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', verified: false},
    {id: 5, title: 'Photography (DSLR & Mobile)', description: 'Professional photographer teaching composition and editing. Looking to learn music production.', username: 'Sneha Gupta', avatar: 'https://i.pravatar.cc/150?img=20', rating: 4.9, category: 'creative', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400', verified: true},
    {id: 6, title: 'Data Science & Machine Learning', description: 'Expert in Python, TensorFlow, and data analysis. Interested in learning UI/UX design.', username: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/150?img=33', rating: 4.8, category: 'tech', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', verified: true},
    {id: 7, title: 'Yoga & Meditation', description: 'Certified yoga instructor with 8 years experience. Want to learn content writing.', username: 'Kavya Reddy', avatar: 'https://i.pravatar.cc/150?img=25', rating: 4.7, category: 'creative', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', verified: false},
    {id: 8, title: 'French Language (Native)', description: 'Native French speaker offering lessons at all levels. Looking to learn guitar.', username: 'Aditya Kumar', avatar: 'https://i.pravatar.cc/150?img=8', rating: 4.5, category: 'language', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400', verified: true},
    {id: 9, title: 'Financial Planning & Investment', description: 'Certified financial advisor. Want to learn web development basics.', username: 'Neha Desai', avatar: 'https://i.pravatar.cc/150?img=47', rating: 4.8, category: 'business', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400', verified: true}
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
    setCurrentPage(1)
  }

  const filteredSkills = skillsData.filter(skill => {
    const matchCategory = filters.category === 'all' || skill.category === filters.category
    const matchRating = filters.rating === 'all' || skill.rating >= parseFloat(filters.rating)
    const matchVerified = filters.verified === 'all' || (filters.verified === 'verified' && skill.verified)
    const matchSearch = !filters.search || 
      skill.title.toLowerCase().includes(filters.search.toLowerCase()) || 
      skill.description.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchCategory && matchRating && matchVerified && matchSearch
  })

  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const skillsToShow = filteredSkills.slice(startIndex, endIndex)

  const getCategoryColor = (category) => {
    const colors = {
      tech: 'blue',
      creative: 'purple',
      language: 'green',
      business: 'orange'
    }
    return colors[category] || 'gray'
  }

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
              <a href="/skills" className="text-blue-600 font-medium">Browse Skills</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-32 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">Browse Skills</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Amazing Skills
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Find the perfect skill match in our community
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <div className="sticky top-16 z-40 bg-white shadow-lg py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="all">All Categories</option>
                <option value="tech">Technology</option>
                <option value="creative">Creative</option>
                <option value="language">Languages</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Verified Only</label>
              <select
                value={filters.verified}
                onChange={(e) => handleFilterChange('verified', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="all">All Users</option>
                <option value="verified">Verified Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search skills..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div className="text-lg text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredSkills.length)} of {filteredSkills.length} skills
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('grid')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentView === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <span className="mr-2">📱</span> Grid
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentView === 'list'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <span className="mr-2">📋</span> List
              </button>
            </div>
          </div>

          {/* Skills Grid/List */}
          {currentView === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillsToShow.map((skill) => (
                <div 
                  key={skill.id}
                  className="group bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={skill.image} alt={skill.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-4 right-4 px-3 py-1 bg-${getCategoryColor(skill.category)}-500 text-white rounded-full text-sm font-semibold`}>
                      {skill.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <img src={skill.avatar} alt={skill.username} className="w-12 h-12 rounded-full border-2 border-blue-200" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{skill.username}</div>
                        {skill.verified && (
                          <div className="flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{skill.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-yellow-500">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold">{skill.rating}</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {skillsToShow.map((skill) => (
                <div 
                  key={skill.id}
                  className="group bg-white rounded-3xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 hover:translate-x-2 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative h-64 md:h-auto overflow-hidden">
                      <img src={skill.image} alt={skill.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute top-4 right-4 px-3 py-1 bg-${getCategoryColor(skill.category)}-500 text-white rounded-full text-sm font-semibold`}>
                        {skill.category}
                      </div>
                    </div>
                    <div className="col-span-2 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <img src={skill.avatar} alt={skill.username} className="w-14 h-14 rounded-full border-2 border-blue-200" />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-lg">{skill.username}</div>
                          {skill.verified && (
                            <div className="flex items-center text-sm text-green-600">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-yellow-500 text-lg">
                          <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-bold">{skill.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{skill.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{skill.description}</p>
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                        Connect Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.max(1, prev - 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => {
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          )}
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
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Home</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ About Us</a></li>
                <li><a href="/skills" className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all">→ Browse Skills</a></li>
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

export default BrowseSkills