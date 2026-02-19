import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';
import Layout from './layouts/Layout';
import Dashboard from './pages/Dashboard';
import FormBuilder from './pages/FormBuilder';
import FormResponses from './pages/FormResponses';
import DocumentManager from './pages/DocumentManager';
import SignatureRequests from './pages/SignatureRequests';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';

export default function App() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading SIGNISTRUCT...</p>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forms" element={<FormBuilder />} />
            <Route path="/forms/:formId/responses" element={<FormResponses />} />
            <Route path="/documents" element={<DocumentManager />} />
            <Route path="/signatures" element={<SignatureRequests />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}
