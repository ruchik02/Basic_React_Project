import React from 'react';
import { Box, Typography, IconButton, Avatar, Button } from '@mui/material';
import { 
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { colors, spacing, borderRadius } from '../../constants/theme';

export default function WelcomeSection({ user, onEditName, onSignOut }) {
  return (
    <Box sx={{ 
      mb: spacing.xxl, 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Left Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600, 
              color: colors.text.primary,
              fontSize: '28px'
            }}
          >
            Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
          </Typography>
          <IconButton 
            size="small" 
            onClick={onEditName}
            sx={{ 
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: colors.action.hover }
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: colors.text.secondary,
            mt: spacing.xs
          }}
        >
          Check your activity dashboard
        </Typography>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
        {/* Subscribe Button */}
        <Button 
          variant="contained"
          sx={{
            backgroundColor: colors.secondary.main,
            color: 'white',
            borderRadius: borderRadius.full,
            textTransform: 'none',
            px: spacing.xl,
            '&:hover': {
              backgroundColor: colors.secondary.dark
            }
          }}
        >
          Subscribe
        </Button>

        {/* Notification Icon */}
        <IconButton 
          sx={{ 
            backgroundColor: colors.background.paper,
            '&:hover': { backgroundColor: colors.action.hover }
          }}
        >
          <NotificationsIcon />
        </IconButton>

        {/* Add Icon */}
        <IconButton 
          sx={{ 
            backgroundColor: colors.background.paper,
            '&:hover': { backgroundColor: colors.action.hover }
          }}
        >
          <AddIcon />
        </IconButton>

        {/* Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
          <Avatar 
            src={user?.photoURL} 
            alt={user?.displayName}
            sx={{ 
              width: 40, 
              height: 40,
              border: `2px solid ${colors.background.paper}`,
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Box>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                color: colors.text.primary,
                fontWeight: 500
              }}
            >
              {user?.displayName || 'User'}
            </Typography>
            <Button
              onClick={onSignOut}
              sx={{ 
                color: colors.text.secondary,
                p: 0,
                minWidth: 'auto',
                textTransform: 'none',
                fontSize: '12px',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: colors.primary.main
                }
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
} 