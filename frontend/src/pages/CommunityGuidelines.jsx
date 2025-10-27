const CommunityGuidelines = () => {
  const guidelines = [
    {
      icon: '🤝',
      title: 'Be Respectful',
      description: 'Treat all community members with kindness and respect. No harassment, discrimination, or hate speech will be tolerated.',
      rules: [
        'Use appropriate language in all communications',
        'Respect different skill levels and learning speeds',
        'Be patient with beginners and open to feedback',
        'Honor cultural differences and diverse perspectives'
      ]
    },
    {
      icon: '🎯',
      title: 'Stay Focused',
      description: 'Keep interactions focused on skill sharing and learning. This is a professional learning environment.',
      rules: [
        'Share skills that you genuinely possess',
        'Be honest about your skill level and experience',
        'Stick to educational content in your teachings',
        'Avoid off-topic discussions during learning sessions'
      ]
    },
    {
      icon: '🛡️',
      title: 'Maintain Safety',
      description: 'Protect yourself and others by following basic safety practices in all interactions.',
      rules: [
        'Never share personal information like home address or financial details',
        'Meet in public places for in-person skill sessions',
        'Use the platform\'s messaging system for initial communications',
        'Report suspicious behavior immediately'
      ]
    },
    {
      icon: '⚖️',
      title: 'Be Fair',
      description: 'Ensure skill swaps are balanced and both parties benefit equally from the exchange.',
      rules: [
        'Commit to agreed-upon session times and durations',
        'Provide the quality of teaching you would expect to receive',
        'Complete skill swaps as promised',
        'Give honest, constructive feedback in reviews'
      ]
    },
    {
      icon: '📚',
      title: 'Share Responsibly',
      description: 'Only teach skills you are qualified to share and ensure content is appropriate.',
      rules: [
        'Only teach skills you have genuine expertise in',
        'Ensure all content is legal and appropriate',
        'Respect intellectual property and copyrights',
        'Don\'t share skills that could cause harm if done incorrectly'
      ]
    },
    {
      icon: '🚫',
      title: 'Prohibited Content',
      description: 'Certain content and behaviors are strictly prohibited on our platform.',
      rules: [
        'No illegal activities or content',
        'No adult content or inappropriate material',
        'No spam, scams, or commercial promotions',
        'No impersonation or false identity claims'
      ]
    }
  ]

  const reportingSteps = [
    {
      step: 1,
      title: 'Document the Issue',
      description: 'Take screenshots or notes about the problematic behavior or content.'
    },
    {
      step: 2,
      title: 'Use Report Button',
      description: 'Click the report button on the user\'s profile or message thread.'
    },
    {
      step: 3,
      title: 'Provide Details',
      description: 'Fill out the report form with specific details about what happened.'
    },
    {
      step: 4,
      title: 'Follow Up',
      description: 'Our team will review and respond within 24 hours.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Community Guidelines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our guidelines help create a safe, respectful, and productive learning environment for everyone. 
            By using SwapSkillz, you agree to follow these community standards.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {guidelines.map((guideline, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{guideline.icon}</div>
                <h2 className="text-xl font-bold text-gray-900">{guideline.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{guideline.description}</p>
              <ul className="space-y-2">
                {guideline.rules.map((rule, ruleIndex) => (
                  <li key={ruleIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Consequences Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-12">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-2xl font-bold text-yellow-800">Violations & Consequences</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-yellow-600 font-semibold mb-2">First Violation</div>
              <div className="text-yellow-800 text-sm">Warning + Required guideline review</div>
            </div>
            <div className="text-center">
              <div className="text-orange-600 font-semibold mb-2">Second Violation</div>
              <div className="text-orange-800 text-sm">Temporary suspension (7-30 days)</div>
            </div>
            <div className="text-center">
              <div className="text-red-600 font-semibold mb-2">Serious/Repeated</div>
              <div className="text-red-800 text-sm">Permanent account termination</div>
            </div>
          </div>
        </div>

        {/* Reporting Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Report Violations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {reportingSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Questions About Guidelines?</h2>
          <p className="text-blue-100 mb-6">
            Our community team is here to help clarify any guidelines or address concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:community@SwapSkillz.com"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Email Community Team
            </a>
            <button className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-colors">
              Submit Feedback
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>These guidelines are updated regularly. Last updated: January 2024</p>
          <p className="mt-2">By continuing to use SwapSkillz, you agree to abide by these community guidelines.</p>
        </div>
      </div>
    </div>
  )
}

export default CommunityGuidelines