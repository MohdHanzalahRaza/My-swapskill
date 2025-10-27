import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Layout Components
import Layout from "./components/layout/Layout";
import PublicLayout from "./components/layout/PublicLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BrowseSkills from "./pages/BrowseSkills";
import HelpCenter from "./pages/HelpCenter";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import SafetyTips from "./pages/SafetyTips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import HowItWorks from "./pages/temp";

// Protected Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Skills from "./pages/skills/Skills";
import SkillDetail from "./pages/skills/SkillDetail";
import Swaps from "./pages/swaps/Swaps";
import SwapDetail from "./pages/swaps/SwapDetail";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";

// Components
import LoadingSpinner from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="browse-skills" element={<BrowseSkills />} />

            <Route path="help" element={<HelpCenter />} />
            <Route
              path="community-guidelines"
              element={<CommunityGuidelines />}
            />
            <Route path="safety-tips" element={<SafetyTips />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="cookie-policy" element={<CookiePolicy />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            {/* Auth Routes */}
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />
            <Route
              path="reset-password/:token"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />

            {/* Profile Routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />

            {/* Skills Routes */}
            <Route path="skills" element={<Skills />} />
            <Route path="skills/:id" element={<SkillDetail />} />

            {/* Swaps Routes */}
            <Route path="swaps" element={<Swaps />} />
            <Route path="swaps/:id" element={<SwapDetail />} />

            {/* Messages Routes */}
            <Route path="messages" element={<Messages />} />

            {/* Settings Routes */}
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-gray-600 mb-8">Page not found</p>
                  <a
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
