import React, {useState} from 'react';
import { auth } from '../../firebase/config';
import { signOut, updateProfile } from 'firebase/auth';
import Navigation from '../Navigation/Navigation';
import { colors, borderRadius, spacing } from '../../constants/theme';
import { 
  Box, 
  Container, 
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  DirectionsRun as RunIcon,
  DirectionsBike as BikeIcon,
  DirectionsWalk as WalkIcon,
} from '@mui/icons-material';
import WelcomeSection from './WelcomeSection';
import SearchSection from './SearchSection';
import StatCard from './StatCard';
import { ActivityChart, ProgressChart } from './ChartSection';
import { activityStats, activityData, progressData } from './dashboardData'; // Move data to separate file

function Dashboard({ user }) {
  const [loading, setLoading] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [updateError, setUpdateError] = useState('');

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDisplayName = async () => {
    if (!newDisplayName.trim()) {
      setUpdateError('Display name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName
      });
      setOpenNameDialog(false);
      setUpdateError('');
      // Force a re-render by updating local state
      setNewDisplayName('');
    } catch (error) {
      setUpdateError('Failed to update display name: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Container 
        maxWidth={false}
        sx={{ 
          py: spacing.xl,
          ml: '80px',
          px: spacing.xxl,
          maxWidth: '1600px',
          width: 'calc(100% - 80px)'
        }}
      >
        <WelcomeSection 
          user={user} 
          onEditName={() => setOpenNameDialog(true)}
          onSignOut={handleSignOut}
        />
        
        <SearchSection />

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: spacing.xxl,
          mb: spacing.xxl,
          
        }}>
          <ActivityChart data={activityData} />
          <ProgressChart data={progressData} />
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: spacing.xl
        }}>
          {activityStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </Box>

        {/* Activity Cards */}
        <Box sx={{ display: 'flex', gap: spacing.lg, mt: spacing.xxl }}>
          {[
            { title: 'Cycling Hero', icon: <BikeIcon />, progress: 55, target: '50km', current: '10 km / week' },
            { title: 'Daily Running', icon: <RunIcon />, progress: 75, target: '7km/ week', current: '5 km / week' },
            { title: 'Daily Steps', icon: <WalkIcon />, progress: 95, target: '12000/week', current: '10000 steps / week' }
          ].map((activity, index) => (
            <Paper
              key={index}
              sx={{
                p: spacing.lg,
                flex: 1,
                borderRadius: borderRadius.lg,
                backgroundColor: colors.background.paper
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: spacing.md }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                  <Box sx={{ 
                    p: spacing.sm, 
                    borderRadius: borderRadius.md, 
                    backgroundColor: colors.primary.main,
                    color: colors.background.paper
                  }}>
                    {activity.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ color: colors.text.primary }}>
                      {activity.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      {activity.current}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  {/* <MoreIcon /> */}
                </IconButton>
              </Box>
              <Box sx={{ mt: spacing.md }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: spacing.sm }}>
                  <Typography variant="body2" sx={{ color: colors.primary.main }}>
                    Progress
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.primary.main }}>
                    {activity.progress}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={activity.progress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: borderRadius.full,
                    backgroundColor: colors.progress.background,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: colors.primary.main
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: colors.text.secondary, mt: spacing.sm, display: 'block' }}>
                  Target: {activity.target}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Display Name Edit Dialog */}
        <Dialog open={openNameDialog} onClose={() => setOpenNameDialog(false)}>
          <DialogTitle>Update Display Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Display Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              error={!!updateError}
              helperText={updateError}
              sx={{ mt: spacing.md }}
            />
          </DialogContent>
          <DialogActions sx={{ p: spacing.md }}>
            <Button 
              onClick={() => setOpenNameDialog(false)} 
              sx={{ color: colors.text.secondary }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateDisplayName} 
              variant="contained"
              disabled={loading}
              sx={{ 
                borderRadius: borderRadius.full,
                backgroundColor: colors.primary.main,
                '&:hover': {
                  backgroundColor: colors.primary.dark
                }
              }}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default Dashboard;
