import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Layout = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              SwapSkillz
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.firstName || 'User'}!</span>
              <button 
                onClick={logout}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout