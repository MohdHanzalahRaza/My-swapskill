import { Link } from 'react-router-dom'
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  SparklesIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-xl py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trade Skills, Not Money
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with others to learn new skills and share your expertise. 
              Build a community where knowledge flows freely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="btn-lg bg-white text-primary-600 hover:bg-gray-100 font-semibold"
              >
                Get Started
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/about" 
                className="btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How SkillzSwap Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect with like-minded individuals 
              and create meaningful skill exchanges.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AcademicCapIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Share Your Skills
              </h3>
              <p className="text-gray-600">
                List the skills you're passionate about and want to teach others. 
                From coding to cooking, every skill has value.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-success-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Learning Partners
              </h3>
              <p className="text-gray-600">
                Discover people who can teach you what you want to learn. 
                Connect and arrange skill exchanges that benefit everyone.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Grow Together
              </h3>
              <p className="text-gray-600">
                Build lasting connections while expanding your skillset. 
                Rate and review your experiences to help the community grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already part of our community.
          </p>
          <Link 
            to="/register" 
            className="btn-lg btn-primary"
          >
            Join SkillzSwap Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">SkillzSwap</h3>
              <p className="text-gray-400">Trade skills, not money</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              <Link to="/login" className="text-gray-400 hover:text-white">Login</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home