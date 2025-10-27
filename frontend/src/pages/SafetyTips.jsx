const SafetyTips = () => {
  const safetyCategories = [
    {
      icon: '🔒',
      title: 'Personal Information',
      tips: [
        'Never share your home address until you\'ve built trust',
        'Keep financial information completely private',
        'Use platform messaging initially instead of personal contact',
        'Be cautious about sharing social media profiles early on'
      ]
    },
    {
      icon: '👥',
      title: 'Meeting People',
      tips: [
        'Meet in public places for the first few sessions',
        'Inform someone you trust about your meeting plans',
        'Trust your instincts - if something feels off, leave',
        'Consider bringing a friend to the first meeting'
      ]
    },
    {
      icon: '💻',
      title: 'Online Sessions',
      tips: [
        'Use video calls to verify identity before meeting',
        'Keep your background neutral and don\'t reveal location',
        'Record sessions if teaching valuable skills',
        'Use secure platforms with good privacy policies'
      ]
    },
    {
      icon: '⚠️',
      title: 'Red Flags',
      tips: [
        'Requests for money, gifts, or financial information',
        'Pressure to meet in private locations immediately',
        'Aggressive or inappropriate communication',
        'Refusal to video chat or verify identity'
      ]
    },
    {
      icon: '🎓',
      title: 'Learning Safety',
      tips: [
        'Verify instructor credentials for risky skills',
        'Ensure proper safety equipment for hands-on skills',
        'Don\'t attempt dangerous activities without supervision',
        'Ask about insurance coverage for physical activities'
      ]
    },
    {
      icon: '📱',
      title: 'Digital Security',
      tips: [
        'Use strong, unique passwords for your account',
        'Enable two-factor authentication',
        'Be wary of phishing attempts via email or messages',
        'Log out of shared devices completely'
      ]
    }
  ]

  const emergencyContacts = [
    {
      situation: 'Immediate Danger',
      action: 'Call Local Emergency Services',
      number: '911 (US) / 999 (UK) / 112 (EU)',
      icon: '🚨'
    },
    {
      situation: 'Harassment or Abuse',
      action: 'Contact Platform Safety',
      number: 'safety@SwapSkillz.com',
      icon: '🛡️'
    },
    {
      situation: 'Suspicious Activity',
      action: 'Report to Support',
      number: 'report@SwapSkillz.com',
      icon: '⚠️'
    },
    {
      situation: 'Technical Issues',
      action: 'Contact Tech Support',
      number: 'support@SwapSkillz.com',
      icon: '🔧'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Tips</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety is our top priority. Follow these guidelines to ensure secure and positive 
            skill-sharing experiences on SwapSkillz.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-lg font-bold text-red-800">Important Safety Reminder</h2>
          </div>
          <p className="text-red-700">
            SwapSkillz is a platform for skill exchange only. We never ask for payment, and neither should our users. 
            Any request for money is against our terms and should be reported immediately.
          </p>
        </div>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safetyCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{contact.situation}</h3>
                <p className="text-sm text-gray-600 mb-3">{contact.action}</p>
                <div className="text-blue-600 font-medium text-sm break-all">{contact.number}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Checklist */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Before Each Skill Session</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-4">Preparation Checklist</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Verified partner's identity through video call</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Chosen a safe meeting location (public for in-person)</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Informed someone about your meeting plans</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Reviewed safety equipment needed (if applicable)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-4">Communication Checklist</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Established clear session goals and timeline</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Confirmed both parties' expectations</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Agreed on cancellation policy</span>
                </li>
                <li className="flex items-center">
                  <input type="checkbox" className="mr-3 h-4 w-4 text-green-600" />
                  <span className="text-green-700">Exchanged contact for emergency only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reporting Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Trust Your Instincts</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            If something doesn't feel right, it probably isn't. Your safety comes first, always. 
            Don't hesitate to end a session or report concerning behavior.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:safety@SwapSkillz.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Report Safety Concern
            </a>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Get Help Now
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Safety guidelines are regularly updated based on community feedback and best practices.</p>
          <p className="mt-2">Remember: It's always okay to prioritize your safety over being polite.</p>
        </div>
      </div>
    </div>
  )
}

export default SafetyTips