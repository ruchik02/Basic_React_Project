import { useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import { Box } from '@mui/material';

function AuthContainer() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5' // Optional: adds a light background
      }}
    >
      {showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setShowRegister={setShowRegister} />
      )}
    </Box>
  );
}

export default AuthContainer;