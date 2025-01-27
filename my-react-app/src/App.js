import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContainer from './components/Auth/AuthContainer';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
                <div>
                  <h1>Welcome, {user?.email}!</h1>
                  <button onClick={() => auth.signOut()}>Sign Out</button>
                  {/* Add your habit tracking components here */}
                </div>
              </ProtectedRoute>
            }
          />
          {/* Redirect root to dashboard or login based on auth state */}
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;