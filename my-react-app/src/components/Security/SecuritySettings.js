import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import {
  Lock as LockIcon,
  Fingerprint as FingerprintIcon,
  Notifications as NotificationsIcon,
  PhoneAndroid as PhoneIcon,
  VpnKey as VpnKeyIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { colors, spacing, borderRadius } from '../../constants/theme';
import Navigation from '../Navigation/Navigation';

function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactor: true,
    biometric: false,
    loginNotifications: true,
    deviceManagement: true,
    passwordExpiry: true,
    activityLog: true,
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
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
        <Typography variant="h4" sx={{ mb: 4 }}>Security Settings</Typography>
        
        {/* Security Overview Card */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: borderRadius.lg,
            backgroundColor: colors.primary.main,
            color: 'white'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LockIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Security Status: Strong</Typography>
              <Typography variant="body2">Your account is well-protected with multiple security measures</Typography>
            </Box>
          </Box>
        </Paper>

        {/* Security Settings List */}
        <Paper sx={{ borderRadius: borderRadius.lg }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <VpnKeyIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Two-Factor Authentication" 
                secondary="Secure your account with 2FA verification"
              />
              <ListItemSecondaryAction>
                <Switch 
                  edge="end"
                  checked={settings.twoFactor}
                  onChange={() => handleToggle('twoFactor')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemIcon>
                <FingerprintIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Biometric Login" 
                secondary="Use fingerprint or face recognition to log in"
              />
              <ListItemSecondaryAction>
                <Switch 
                  edge="end"
                  checked={settings.biometric}
                  onChange={() => handleToggle('biometric')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemIcon>
                <NotificationsIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Login Notifications" 
                secondary="Get notified of new login attempts"
              />
              <ListItemSecondaryAction>
                <Switch 
                  edge="end"
                  checked={settings.loginNotifications}
                  onChange={() => handleToggle('loginNotifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Device Management" 
                secondary="Manage devices that can access your account"
              />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small">
                  Manage
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemIcon>
                <HistoryIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Activity Log" 
                secondary="View your account activity history"
              />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small">
                  View Log
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>

        {/* Recent Activity */}
        <Paper sx={{ mt: 4, p: 3, borderRadius: borderRadius.lg }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Recent Security Activity</Typography>
          <List>
            {[
              { text: 'Password changed successfully', type: 'success', time: '2 hours ago' },
              { text: 'New device logged in from Mumbai', type: 'warning', time: '1 day ago' },
              { text: 'Two-factor authentication enabled', type: 'success', time: '3 days ago' },
            ].map((activity, index) => (
              <Alert 
                key={index} 
                severity={activity.type}
                sx={{ mb: 1 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">{activity.text}</Typography>
                  <Typography variant="caption" sx={{ ml: 2 }}>{activity.time}</Typography>
                </Box>
              </Alert>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}

export default SecuritySettings; 