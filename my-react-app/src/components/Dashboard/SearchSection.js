import React from 'react';
import { Box, InputBase, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { colors, borderRadius, spacing } from '../../constants/theme';

export default function SearchSection() {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: spacing.xxl,
      gap: spacing.xl
    }}>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        maxWidth: '500px',
        backgroundColor: colors.background.paper,
        borderRadius: borderRadius.full,
        border: `1px solid ${colors.border.light}`,
        px: spacing.md,
        py: spacing.sm
      }}>
        <SearchIcon sx={{ color: colors.text.secondary, mr: spacing.sm }} />
        <InputBase 
          placeholder="Search Activities, messages"
          fullWidth
          sx={{ 
            '& input': {
              fontSize: '14px',
              color: colors.text.primary,
            }
          }}
        />
      </Box>
      <Button 
        variant="contained"
        sx={{
          backgroundColor: colors.primary.main,
          borderRadius: borderRadius.full,
          textTransform: 'none',
          px: spacing.xl,
          py: spacing.sm,
          '&:hover': {
            backgroundColor: colors.primary.dark
          }
        }}
      >
        SCHEDULE EVENTS
      </Button>
    </Box>
  );
} 