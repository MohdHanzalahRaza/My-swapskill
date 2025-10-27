import { useState, useEffect } from 'react'

const Contact = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      displayToast('Please fill in all required fields')
      return
    }

    console.log('Contact form submitted:', formData)
    displayToast('Message sent successfully! We\'ll get back to you soon.')
    
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const displayToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Drop us an email and we\'ll respond within 24 hours',
      link: 'support@SwapSkillz.com',
      linkType: 'email',
      color: 'blue'
    },
    {
      icon: '📞',
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 6pm IST',
      link: '+91 98765 43210',
      linkType: 'phone',
      color: 'green'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Come say hello at our office HQ',
      address: 'Bhopal, Madhya Pradesh\nIndia - 462001',
      color: 'purple'
    },
    {
      icon: '🕐',
      title: 'Working Hours',
      description: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed',
      color: 'orange'
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: '👤', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Instagram', icon: '📷', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
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
              <a href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="/contact" className="text-blue-600 font-medium">Contact</a>
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
            <span className="text-sm font-medium text-white">Contact Us</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br from-${info.color}-400 to-${info.color}-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg`}>
                      <span className="text-3xl">{info.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                      {info.description && (
                        <p className="text-gray-600 mb-2 whitespace-pre-line">{info.description}</p>
                      )}
                      {info.link && (
                        <a 
                          href={info.linkType === 'email' ? `mailto:${info.link}` : `tel:${info.link}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                          {info.link}
                        </a>
                      )}
                      {info.address && (
                        <p className="text-gray-700 whitespace-pre-line">{info.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social Links */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border-2 border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white transform hover:scale-110 transition-all shadow-md"
                      title={social.name}
                    >
                      <span className="text-2xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-vertical"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-lg flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📍 LOCATION
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Us Here</h2>
            <p className="text-xl text-gray-600">Our office location in Bhopal</p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.7468850283!2d77.31489654999999!3d23.259933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
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

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact