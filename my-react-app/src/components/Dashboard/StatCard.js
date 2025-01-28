import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { colors, borderRadius, spacing } from '../../constants/theme';

export default function StatCard({ title, icon, value, unit, subtitle, color }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: spacing.xl,
        borderRadius: borderRadius.xl,
        backgroundColor: color,
        color: colors.background.paper,
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          {value}
          <Typography component="span" variant="h6" sx={{ ml: spacing.xs }}>
            {unit}
          </Typography>
        </Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Box>
    </Paper>
  );
} 