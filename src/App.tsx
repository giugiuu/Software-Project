import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EventDetailsPage from './pages/EventDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import UserBookingsPage from './pages/UserBookingsPage';
import MyEventsPage from './pages/MyEventsPage';
import EventFormPage from './pages/EventFormPage';
import AdminEventsPage from './pages/AdminEventsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

// Protected Route Component
const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  requiredRole?: 'user' | 'organizer' | 'admin';
}> = ({ element, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events/:eventId" element={<EventDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Protected Routes - Standard User */}
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute
                    element={<UserBookingsPage />}
                    requiredRole="user"
                  />
                }
              />
              <Route
                path="/checkout/:eventId"
                element={
                  <ProtectedRoute
                    element={<CheckoutPage />}
                    requiredRole="user"
                  />
                }
              />

              {/* Protected Routes - Organizer */}
              <Route
                path="/my-events"
                element={
                  <ProtectedRoute
                    element={<MyEventsPage />}
                    requiredRole="organizer"
                  />
                }
              />
              <Route
                path="/my-events/new"
                element={
                  <ProtectedRoute
                    element={<EventFormPage />}
                    requiredRole="organizer"
                  />
                }
              />
              <Route
                path="/my-events/:id/edit"
                element={
                  <ProtectedRoute
                    element={<EventFormPage />}
                    requiredRole="organizer"
                  />
                }
              />
              <Route
                path="/my-events/analytics/:id"
                element={
                  <ProtectedRoute
                    element={<div>Analytics Page (Coming Soon)</div>}
                    requiredRole="organizer"
                  />
                }
              />

              {/* Protected Routes - Admin */}
              <Route
                path="/admin/events"
                element={
                  <ProtectedRoute
                    element={<AdminEventsPage />}
                    requiredRole="admin"
                  />
                }
              />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;