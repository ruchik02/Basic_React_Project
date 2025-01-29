import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Button
} from '@mui/material';
import {
  DirectionsRun as RunIcon,
  DirectionsBike as BikeIcon,
  DirectionsWalk as WalkIcon,
  Pool as SwimIcon,
  CalendarToday as CalendarIcon,
  LocalFireDepartment as FireIcon,
  FitnessCenter,
  AccessTime,
  Straighten,
  LocalDrink as WaterIcon,
  Favorite as HeartIcon,
  SelfImprovement as YogaIcon,
  MusicNote as DanceIcon
} from '@mui/icons-material';
import Navigation from '../Navigation/Navigation';
import { colors, spacing, borderRadius } from '../../constants/theme';

function ActivityScreen() {
  const [tabValue, setTabValue] = useState(0);

  const activities = [
    {
      type: 'Running',
      icon: <RunIcon />,
      duration: '45 min',
      distance: '5.2 km',
      date: 'Today',
      calories: '420',
      status: 'Completed'
    },
    {
      type: 'Cycling',
      icon: <BikeIcon />,
      duration: '1h 20min',
      distance: '15.7 km',
      date: 'Yesterday',
      calories: '650',
      status: 'Completed'
    },
    {
      type: 'Swimming',
      icon: <SwimIcon />,
      duration: '30 min',
      distance: '1 km',
      date: '2 days ago',
      calories: '300',
      status: 'Completed'
    }
  ];

  const upcomingActivities = [
    {
      type: 'Workout',
      icon: <FitnessCenter />,
      duration: '1h',
      date: 'Tomorrow, 9:00 AM',
      status: 'Scheduled'
    },
    {
      type: 'Cardio',
      icon: <HeartIcon />,
      duration: '45 min',
      date: 'Tomorrow, 8:00 AM',
      status: 'Scheduled'
    },
    {
        type: 'Yoga',
        icon: <YogaIcon />,
        duration: '45 min',
        date: 'Tomorrow, 6:00 PM',
        status: 'Scheduled'
      },
      {
        type: 'Dancing',
        icon: <DanceIcon />,
        duration: '45 min',
        date: 'Tomorrow, 10:00 AM',
        status: 'Scheduled'
      },
  ];

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
        <Typography variant="h4" sx={{ mb: 4 }}>Activity Tracker</Typography>

        <Paper sx={{ mb: 4, borderRadius: borderRadius.lg, overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: colors.primary.main,
              }
            }}
          >
            <Tab label="Recent Activities" />
            <Tab label="Upcoming" />
            <Tab label="Calendar" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {tabValue === 0 && (
              <List sx={{ '& .MuiListItem-root': { px: 3 } }}>
                {activities.map((activity, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      mb: 2, 
                      bgcolor: colors.background.default,
                      borderRadius: borderRadius.md,
                      height: '80px'
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        bgcolor: colors.primary.main,
                        p: 1.5,
                        borderRadius: borderRadius.md,
                        color: 'white',
                        minWidth: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3
                      }}
                    >
                      {activity.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                          {activity.type}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 3, color: 'text.secondary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{activity.duration}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Straighten sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{activity.distance}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FireIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">{activity.calories} cal</Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Chip 
                        label={activity.status} 
                        color="success"
                        size="small"
                        sx={{ 
                          borderRadius: '16px',
                          bgcolor: '#e8f5e9',
                          color: '#2e7d32',
                          '& .MuiChip-label': {
                            px: 2,
                            py: 0.5
                          }
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {tabValue === 1 && (
              <List sx={{ '& .MuiListItem-root': { px: 3 } }}>
                {upcomingActivities.map((activity, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      mb: 2, 
                      bgcolor: colors.background.default,
                      borderRadius: borderRadius.md,
                      height: '72px',
                      position: 'relative'
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        bgcolor: colors.primary.light,
                        p: 1.5,
                        borderRadius: borderRadius.md,
                        color: 'white',
                        minWidth: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 3
                      }}
                    >
                      {activity.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {activity.type}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {activity.duration} • {activity.date}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{
                          borderRadius: '20px',
                          borderColor: colors.primary.main,
                          color: colors.primary.main,
                          textTransform: 'none',
                          px: 3,
                          '&:hover': {
                            borderColor: colors.primary.dark,
                            backgroundColor: 'rgba(33, 150, 243, 0.04)'
                          }
                        }}
                      >
                        Reschedule
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {tabValue === 2 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CalendarIcon sx={{ fontSize: 100, color: colors.primary.main }} />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Calendar View Coming Soon
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Activity Stats */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: spacing.md 
        }}>
          {[
            { label: 'Total Distance', value: '45.2 km', icon: <WalkIcon /> },
            { label: 'Active Minutes', value: '380 min', icon: <FitnessCenter /> },
            { label: 'Calories Burned', value: '2,450', icon: <FireIcon /> },
            { label: 'Water Intake', value: '1.25 L', icon: <WaterIcon /> }
          ].map((stat, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                borderRadius: borderRadius.lg,
                display: 'flex',
                alignItems: 'center',
                gap: 3
              }}
            >
              <Box sx={{ 
                bgcolor: colors.primary.light,
                p: 1.5,
                borderRadius: borderRadius.md,
                color: 'white',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default ActivityScreen; 