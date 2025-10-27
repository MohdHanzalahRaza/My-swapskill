import { useState } from 'react'

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started')

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'skills', name: 'Skills & Swaps', icon: '🔄' },
    { id: 'safety', name: 'Safety', icon: '🛡️' },
    { id: 'technical', name: 'Technical', icon: '⚙️' }
  ]

  const faqs = {
    'getting-started': [
      {
        question: 'How do I create my first skill listing?',
        answer: 'Go to your dashboard, click "Add Skill", fill in the details about what you can teach, set your availability, and publish. Make sure to be specific about your expertise level and what students can expect to learn.'
      },
      {
        question: 'How does skill swapping work?',
        answer: 'Browse available skills, send a swap request to someone whose skill you want to learn, and offer one of your skills in return. Once both parties agree, you can schedule your learning sessions.'
      },
      {
        question: 'What skills can I teach or learn?',
        answer: 'Almost anything! From programming and design to cooking and languages. As long as it\'s legal and safe, you can share your knowledge with our community.'
      }
    ],
    'account': [
      {
        question: 'How do I update my profile?',
        answer: 'Go to Settings > Profile, where you can update your bio, skills, availability, and profile picture. A complete profile helps others trust and connect with you.'
      },
      {
        question: 'Can I delete my account?',
        answer: 'Yes, go to Settings > Account > Delete Account. This action is permanent and will remove all your data, skills, and swap history.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Go to Settings > Security > Change Password. For security, you\'ll need to enter your current password before setting a new one.'
      }
    ],
    'skills': [
      {
        question: 'How do I find the right skill swap partner?',
        answer: 'Use our advanced search filters to find people by skill, location, experience level, and availability. Read profiles carefully and don\'t hesitate to message potential partners before committing to a swap.'
      },
      {
        question: 'What if I\'m not satisfied with a skill swap?',
        answer: 'Communicate openly with your partner first. If issues persist, you can end the swap early and leave an honest review. Our community team is also available to mediate disputes.'
      },
      {
        question: 'How long should a skill swap last?',
        answer: 'This varies by skill complexity. Simple skills might take a few hours, while complex ones could span weeks or months. Discuss and agree on the timeline before starting.'
      }
    ],
    'safety': [
      {
        question: 'How do you verify users?',
        answer: 'We require email verification and encourage users to complete their profiles. Users build reputation through reviews and successful swaps. Report any suspicious behavior immediately.'
      },
      {
        question: 'Should I meet in person or online?',
        answer: 'Both options are available. For in-person meetings, always choose public places for the first few sessions. Online sessions through video calls are often safer and more convenient.'
      },
      {
        question: 'What information should I not share?',
        answer: 'Never share personal information like home address, financial details, or passwords. Keep conversations focused on the skill being taught and learned.'
      }
    ],
    'technical': [
      {
        question: 'The site isn\'t loading properly, what should I do?',
        answer: 'Try refreshing the page, clearing your browser cache, or using a different browser. If problems persist, check our status page or contact support.'
      },
      {
        question: 'How do I report a bug?',
        answer: 'Use the "Report Issue" button in the footer or email support@SwapSkillz.com with details about what happened and steps to reproduce the problem.'
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Our website is fully mobile-responsive. A dedicated mobile app is in development and will be available soon. You\'ll be notified when it launches.'
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and get the help you need to make the most of SwapSkillz.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {categories.find(cat => cat.id === activeCategory)?.name} FAQs
              </h2>
              
              <div className="space-y-6">
                {faqs[activeCategory]?.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still need help?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@SwapSkillz.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter