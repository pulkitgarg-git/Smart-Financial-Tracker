import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppPage from './pages/AppPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/app/overview" replace />
  ) : (
    children
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <AppPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/app/overview" replace />} />
      <Route path="*" element={<Navigate to="/app/overview" replace />} />
    </Routes>
  );
}
