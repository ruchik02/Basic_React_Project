import { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContainer from './components/Auth/AuthContainer';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {!user ? (
        <AuthContainer />
      ) : (
        <div>
          <h1>Welcome, {user.email}!</h1>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          {/* Add your habit tracking components here */}
        </div>
      )}
    </div>
  );
}

export default App;