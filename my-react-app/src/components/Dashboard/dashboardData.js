import {
  DirectionsWalk as WalkIcon,
  LocalDrink as WaterIcon,
  LocalFireDepartment as CaloriesIcon,
  Favorite as HeartIcon
} from '@mui/icons-material';
import React from 'react';

export const activityStats = [
  {
    title: 'Steps',
    icon: <WalkIcon />,
    value: '2,500',
    unit: 'Steps',
    subtitle: '50% of your goals',
    color: '#4ECDC4' // Turquoise
  },
  {
    title: 'Water',
    icon: <WaterIcon />,
    value: '1.25',
    unit: 'Liters',
    subtitle: 'Daily intake',
    color: '#FF8A65' // Coral
  },
  {
    title: 'Calories',
    icon: <CaloriesIcon />,
    value: '25000',
    unit: 'burned',
    subtitle: 'Daily burn',
    color: '#FF7B9C' // Pink
  },
  {
    title: 'Heart Rate',
    icon: <HeartIcon />,
    value: '110',
    unit: 'Bpm',
    subtitle: 'Average',
    color: '#6C5CE7' // Purple
  }
];

export const activityData = [
  { name: 'Mon', value: 20 },
  { name: 'Tue', value: 35 },
  { name: 'Wed', value: 25 },
  { name: 'Thu', value: 30 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 28 },
  { name: 'Sun', value: 15 }
];

export const progressData = [
  { name: 'Cardio', value: 30, color: '#4ECDC4', hours: '30 hrs' },
  { name: 'Stretching', value: 40, color: '#FF8A65', hours: '40 hrs' },
  { name: 'Treadmill', value: 30, color: '#FF7B9C', hours: '30 hrs' },
  { name: 'Strength', value: 20, color: '#6C5CE7', hours: '20 hrs' }
]; 