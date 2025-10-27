const TermsOfService = () => {
  const lastUpdated = "January 15, 2024"

  const keyTerms = [
    {
      title: 'Account Responsibilities',
      points: [
        'You must be 18+ years old to use SwapSkillz',
        'Provide accurate information when creating your account',
        'Keep your login credentials secure and confidential',
        'You are responsible for all activity on your account'
      ]
    },
    {
      title: 'Skill Sharing Rules',
      points: [
        'Only offer skills you genuinely possess and can teach',
        'Maintain professionalism in all skill exchanges',
        'Complete agreed-upon skill swaps as promised',
        'No monetary payment for skills - this is a barter platform'
      ]
    },
    {
      title: 'Prohibited Activities',
      points: [
        'Harassment, discrimination, or inappropriate behavior',
        'Sharing illegal, harmful, or copyrighted content',
        'Creating fake accounts or impersonating others',
        'Commercial advertising or spam activities'
      ]
    },
    {
      title: 'Content & Intellectual Property',
      points: [
        'You retain rights to content you create and share',
        'Grant SwapSkillz license to display your content on the platform',
        'Respect others\' intellectual property rights',
        'Report copyright violations to our designated agent'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {lastUpdated}</p>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            By using SwapSkillz, you agree to these terms. Please read them carefully.
          </p>
        </div>

        {/* Agreement Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-lg font-bold text-blue-900">Legal Agreement</h2>
          </div>
          <p className="text-blue-800">
            These Terms of Service constitute a legally binding agreement between you and SwapSkillz. 
            By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </div>

        {/* Key Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {keyTerms.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Limitation of Liability */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">Limitation of Liability</h2>
          <div className="space-y-3 text-yellow-800">
            <p className="text-sm">
              <strong>Platform Availability:</strong> SwapSkillz is provided "as is" without warranties. We don't guarantee uninterrupted service.
            </p>
            <p className="text-sm">
              <strong>User Interactions:</strong> We facilitate connections but aren't responsible for the quality or outcome of skill exchanges between users.
            </p>
            <p className="text-sm">
              <strong>Damages:</strong> Our liability is limited to the amount you paid us (if any) in the 12 months before the incident.
            </p>
          </div>
        </div>

        {/* Quick Legal Points */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Important Legal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
              <p className="text-gray-600 text-sm">These terms are governed by the laws of [Your Jurisdiction]</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Changes to Terms</h3>
              <p className="text-gray-600 text-sm">We may update these terms with 30 days notice</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600 text-sm">Questions? Email legal@SwapSkillz.com</p>
            </div>
          </div>
        </div>

        {/* Account Termination */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-red-800 mb-4">Account Termination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-red-800 mb-2">You May Terminate:</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Anytime by deleting your account</li>
                <li>• Download your data before deletion</li>
                <li>• Account deletion is permanent</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-800 mb-2">We May Terminate For:</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Violation of these terms</li>
                <li>• Harmful or illegal activity</li>
                <li>• Prolonged account inactivity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
          <p className="text-blue-100 mb-6">
            Our legal team is available to clarify any questions about these terms of service.
          </p>
          <a
            href="mailto:legal@SwapSkillz.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Legal Team
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>These terms are effective as of the last updated date above.</p>
          <p className="mt-2">Continued use of SwapSkillz after changes constitutes acceptance of new terms.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService