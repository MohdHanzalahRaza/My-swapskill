const CookiePolicy = () => {
  const lastUpdated = "January 15, 2024"

  const cookieTypes = [
    {
      category: 'Essential Cookies',
      icon: '🔧',
      description: 'Required for the website to function properly',
      purpose: 'Authentication, security, and basic functionality',
      examples: ['Login session tokens', 'Security preferences', 'Site functionality'],
      canDisable: false
    },
    {
      category: 'Analytics Cookies',
      icon: '📊',
      description: 'Help us understand how visitors use our website',
      purpose: 'Improve user experience and site performance',
      examples: ['Page views', 'Popular skills', 'User journey tracking'],
      canDisable: true
    },
    {
      category: 'Preference Cookies',
      icon: '⚙️',
      description: 'Remember your settings and preferences',
      purpose: 'Personalize your experience on SwapSkillz',
      examples: ['Language settings', 'UI preferences', 'Notification settings'],
      canDisable: true
    },
    {
      category: 'Marketing Cookies',
      icon: '📱',
      description: 'Track effectiveness of our communications',
      purpose: 'Measure campaign performance and relevance',
      examples: ['Email campaign tracking', 'Social media integration', 'Ad performance'],
      canDisable: true
    }
  ]

  const thirdPartyServices = [
    { name: 'Google Analytics', purpose: 'Website analytics and user behavior', link: 'https://policies.google.com/privacy' },
    { name: 'Cloudflare', purpose: 'Security and performance optimization', link: 'https://www.cloudflare.com/privacypolicy/' },
    { name: 'Intercom', purpose: 'Customer support and messaging', link: 'https://www.intercom.com/legal/privacy' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            This policy explains how SwapSkillz uses cookies and similar technologies on our website.
          </p>
        </div>

        {/* What Are Cookies */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-3">🍪</div>
            <h2 className="text-xl font-bold text-blue-900">What Are Cookies?</h2>
          </div>
          <p className="text-blue-800 mb-4">
            Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your browsing experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Session Cookies</h3>
              <p className="text-blue-800 text-sm">Temporary cookies deleted when you close your browser</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Persistent Cookies</h3>
              <p className="text-blue-800 text-sm">Remain on your device for a set period or until deleted</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Third-Party Cookies</h3>
              <p className="text-blue-800 text-sm">Set by external services we use on our website</p>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Types of Cookies We Use</h2>
          {cookieTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{type.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{type.category}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  type.canDisable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {type.canDisable ? 'Optional' : 'Required'}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Purpose:</h4>
                  <p className="text-gray-600 text-sm">{type.purpose}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx}>• {example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Third Party Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
          <p className="text-gray-600 mb-6">We use trusted third-party services that may set their own cookies:</p>
          <div className="space-y-4">
            {thirdPartyServices.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.purpose}</p>
                </div>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Privacy Policy →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Management */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-green-800 mb-4">Managing Your Cookie Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-800 mb-3">Browser Settings</h3>
              <ul className="text-green-700 text-sm space-y-2">
                <li>• Block all cookies (may break website functionality)</li>
                <li>• Block third-party cookies only</li>
                <li>• Delete existing cookies</li>
                <li>• Set notifications before cookies are placed</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-800 mb-3">SwapSkillz Settings</h3>
              <ul className="text-green-700 text-sm space-y-2">
                <li>• Customize cookie preferences in your account</li>
                <li>• Opt out of analytics cookies</li>
                <li>• Disable marketing cookies</li>
                <li>• Essential cookies cannot be disabled</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Manage Cookie Preferences
            </button>
          </div>
        </div>

        {/* Browser Instructions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browser-Specific Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { browser: 'Chrome', icon: '🌐' },
              { browser: 'Firefox', icon: '🦊' },
              { browser: 'Safari', icon: '🧭' },
              { browser: 'Edge', icon: '🔷' }
            ].map((browser) => (
              <div key={browser.browser} className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-3xl mb-2">{browser.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{browser.browser}</h3>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Cookie Settings Guide
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Updates Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-lg font-bold text-yellow-800">Policy Updates</h2>
          </div>
          <p className="text-yellow-800">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "last updated" date. 
            Continued use of our website after changes constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Cookies?</h2>
          <p className="text-blue-100 mb-6">
            Contact us if you have questions about how we use cookies or need help managing your preferences.
          </p>
          <a
            href="mailto:privacy@SwapSkillz.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Privacy Team
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>This Cookie Policy is part of our Privacy Policy and Terms of Service.</p>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy