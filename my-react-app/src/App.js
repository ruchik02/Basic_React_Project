import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthContainer from './components/Auth/AuthContainer';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SecuritySettings from './components/Security/SecuritySettings';
import ActivityScreen from './components/Activity/ActivityScreen';
import MessagesScreen from './components/Messages/MessagesScreen';
import DocumentsScreen from './components/Documents/DocumentsScreen';
import HelpScreen from './components/Help/HelpScreen';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setAuthChecked(true);
    });

    // Add timeout for loading state
    const timeoutId = setTimeout(() => {
      if (!authChecked) setLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [authChecked]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <AuthContainer /> : <Navigate to="/dashboard" replace />} 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
          <Route path="/security" element={<SecuritySettings />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/documents" element={<DocumentsScreen />} />
          <Route path="/help" element={<HelpScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;