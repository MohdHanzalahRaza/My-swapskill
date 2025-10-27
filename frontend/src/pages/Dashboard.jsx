import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { name: 'Skills Shared', value: '12', href: '/skills' },
    { name: 'Active Swaps', value: '3', href: '/swaps' },
    { name: 'Messages', value: '8', href: '/messages' },
    { name: 'Profile Views', value: '24', href: '/profile' },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'swap_request',
      message: 'New swap request for Python programming',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'message',
      message: 'Sarah sent you a message about React tutorial',
      time: '5 hours ago',
      status: 'unread'
    },
    {
      id: 3,
      type: 'swap_completed',
      message: 'Completed skill swap: Graphic Design with John',
      time: '1 day ago',
      status: 'completed'
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl font-semibold text-blue-600">
                  {user?.firstName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600">
                Ready to learn something new or share your expertise?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {stat.value}
              </dd>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              to="/browse-skills"
              className="relative block w-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="mx-auto h-8 w-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Browse Skills
              </span>
            </Link>

            <Link
              to="/swaps"
              className="relative block w-full bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg
                className="mx-auto h-8 w-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Start a Swap
              </span>
            </Link>

            <Link
              to="/profile/edit"
              className="relative block w-full bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="mx-auto h-8 w-8 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Update Profile
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          activity.status === 'completed' ? 'bg-green-500' :
                          activity.status === 'pending' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}>
                          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">{activity.message}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard