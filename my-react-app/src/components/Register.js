import { useState } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Button, TextField, Paper, Typography, Container, 
  Box, Alert, Grid 
} from '@mui/material';

function Register({ setShowRegister }) {
  const [error, setError] = useState('');

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    fitnessGoal: Yup.string(),
    currentWeight: Yup.number()
      .positive('Weight must be positive')
      .typeError('Please enter a valid number'),
    targetWeight: Yup.number()
      .positive('Weight must be positive')
      .typeError('Please enter a valid number')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      fitnessGoal: '',
      currentWeight: '',
      targetWeight: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          values.email, 
          values.password
        );

        // Create user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: values.name,
          fitnessGoal: values.fitnessGoal,
          currentWeight: values.currentWeight,
          targetWeight: values.targetWeight,
          email: values.email,
          createdAt: new Date()
        });

      } catch (error) {
        setError(error.message);
      }
    }
  });

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>

        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}

        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fitness Goal"
                name="fitnessGoal"
                multiline
                rows={2}
                value={formik.values.fitnessGoal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fitnessGoal && Boolean(formik.errors.fitnessGoal)}
                helperText={formik.touched.fitnessGoal && formik.errors.fitnessGoal}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Current Weight (kg)"
                name="currentWeight"
                type="number"
                value={formik.values.currentWeight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.currentWeight && Boolean(formik.errors.currentWeight)}
                helperText={formik.touched.currentWeight && formik.errors.currentWeight}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Target Weight (kg)"
                name="targetWeight"
                type="number"
                value={formik.values.targetWeight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.targetWeight && Boolean(formik.errors.targetWeight)}
                helperText={formik.touched.targetWeight && formik.errors.targetWeight}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Button
            onClick={() => setShowRegister(false)}
            fullWidth
            sx={{ mt: 1 }}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;