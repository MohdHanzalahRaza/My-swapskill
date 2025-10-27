const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2024"

  const dataTypes = [
    {
      category: 'Personal Information',
      icon: '👤',
      items: ['Name, email address, profile photo', 'Account preferences and settings', 'Skills and expertise information', 'Location (city/country only)']
    },
    {
      category: 'Communication Data',
      icon: '💬',
      items: ['Messages between users on platform', 'Support communications', 'Feedback and reviews', 'Community forum posts']
    },
    {
      category: 'Usage Information',
      icon: '📊',
      items: ['Login times and frequency', 'Pages visited and features used', 'Search queries and filters applied', 'Session duration and activity']
    },
    {
      category: 'Technical Data',
      icon: '⚙️',
      items: ['IP address and device information', 'Browser type and version', 'Operating system', 'Cookies and tracking pixels']
    }
  ]

  const userRights = [
    {
      right: 'Access Your Data',
      description: 'Request a copy of all personal data we hold about you',
      action: 'Download from Settings or email us'
    },
    {
      right: 'Correct Your Data',
      description: 'Update or correct any inaccurate personal information',
      action: 'Edit in your profile settings'
    },
    {
      right: 'Delete Your Data',
      description: 'Request deletion of your account and associated data',
      action: 'Use account deletion in Settings'
    },
    {
      right: 'Data Portability',
      description: 'Export your data in a standard format',
      action: 'Request data export tool'
    },
    {
      right: 'Restrict Processing',
      description: 'Limit how we use your personal information',
      action: 'Contact privacy team'
    },
    {
      right: 'Withdraw Consent',
      description: 'Remove consent for data processing activities',
      action: 'Update preferences in Settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We are committed to protecting your privacy and being transparent about how we collect, 
            use, and share your information on SwapSkillz.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Privacy at a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold text-blue-800">Your Data is Secure</div>
              <div className="text-blue-700 text-sm">End-to-end encryption for messages</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🚫</div>
              <div className="font-semibold text-blue-800">Never Sold</div>
              <div className="text-blue-700 text-sm">We never sell your personal data</div>
            </div>
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold text-blue-800">You Control It</div>
              <div className="text-blue-700 text-sm">Delete or export anytime</div>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataTypes.map((type, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-3">{type.icon}</span>
                  <h3 className="font-semibold text-gray-900">{type.category}</h3>
                </div>
                <ul className="space-y-2">
                  {type.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Platform Services</h3>
                <p className="text-gray-600">To provide skill matching, messaging, and account management features that make SwapSkillz work.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Safety & Security</h3>
                <p className="text-gray-600">To verify accounts, prevent fraud, detect abuse, and maintain community safety standards.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Platform Improvement</h3>
                <p className="text-gray-600">To analyze usage patterns, fix bugs, and develop new features based on how you use SwapSkillz.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-600">To send important updates, respond to support requests, and notify you about relevant platform activity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userRights.map((right, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{right.right}</h3>
                <p className="text-gray-600 text-sm mb-3">{right.description}</p>
                <div className="text-blue-600 text-sm font-medium">{right.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sharing */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">When We Share Information</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <span className="font-semibold text-yellow-800">With Other Users:</span>
                <span className="text-yellow-700"> Only your public profile information and skills you choose to share</span>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <span className="font-semibold text-yellow-800">Service Providers:</span>
                <span className="text-yellow-700"> Trusted partners who help us operate the platform (hosting, analytics, support)</span>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <span className="font-semibold text-yellow-800">Legal Requirements:</span>
                <span className="text-yellow-700"> When required by law, court order, or to protect safety and security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Encryption</h3>
              <p className="text-gray-600 text-sm">All data encrypted in transit and at rest using industry standards</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Access Control</h3>
              <p className="text-gray-600 text-sm">Strict access controls and regular security audits</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Auth</h3>
              <p className="text-gray-600 text-sm">Optional 2FA for additional account protection</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
          <p className="text-blue-100 mb-6">
            Our privacy team is here to help you understand and exercise your privacy rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@SwapSkillz.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Privacy Team
            </a>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Manage Privacy Settings
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm space-y-2">
          <p>This privacy policy may be updated periodically. We'll notify users of significant changes.</p>
          <p>For international users, we comply with GDPR, CCPA, and other applicable privacy laws.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>
            <a href="#" className="text-blue-600 hover:underline">Data Processing Agreement</a>
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy