import { useState } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  browserLocalPersistence,
  setPersistence,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { 
  Button, TextField, Paper, Typography, Container, 
  Box, Divider, Alert 
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login({ setShowRegister }) {
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Add validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, values.email, values.password);
      } catch (error) {
        console.error('Email sign in error:', error.code);
        switch (error.code) {
          case 'auth/user-not-found':
            setError('No account exists with this email');
            break;
          case 'auth/invalid-credential':
            setError('Incorrect password or email');
            break;
          case 'auth/too-many-requests':
            setError('Too many failed attempts. Please try again later');
            break;
          default:
            setError('Failed to sign in. Please try again');
        }
      } finally {
        setLoading(false);
      }
    }
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      
      // Add scopes
      provider.addScope('profile');
      provider.addScope('email');
      
      // Set custom parameters
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      // Set persistence and sign in
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      
      console.log('Successfully signed in with Google:', result.user.email);
    } catch (error) {
      console.error('Google sign in error:', error);
      
      switch (error.code) {
        case 'auth/popup-blocked':
          setError('Please allow popups for this website');
          break;
        case 'auth/popup-closed-by-user':
          setError('Sign in was cancelled');
          break;
        case 'auth/cancelled-popup-request':
          setError('Only one popup request allowed at a time');
          break;
        case 'auth/operation-not-allowed':
          setError('Google sign in is not enabled. Please contact support.');
          break;
        default:
          setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formik.values.email) {
      setError('Please enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formik.values.email);
      setResetSent(true);
      setError('');
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send reset email. Please try again');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Sign In
          </Button>
          <Button
            size="small"
            onClick={handlePasswordReset}
            sx={{ mt: 1 }}
          >
            Forgot Password?
          </Button>
          {resetSent && (
            <Alert severity="success" sx={{ mt: 2, width: '100%' }}>
              Password reset email sent!
            </Alert>
          )}
        </Box>

        <Divider sx={{ width: '100%', my: 2 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          Sign in with Google
        </Button>

        <Button
          onClick={() => setShowRegister(true)}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Don't have an account? Sign Up
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;