import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Layout = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container-xl">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-xl font-bold text-primary-600">
              SkillzSwap
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.firstName}!</span>
              <button 
                onClick={logout}
                className="btn-outline btn-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container-xl py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout