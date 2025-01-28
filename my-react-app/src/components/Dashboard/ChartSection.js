import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { colors, borderRadius, spacing } from '../../constants/theme';

export function ActivityChart({ data }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: spacing.xl, 
        borderRadius: borderRadius.xl,
        border: `1px solid ${colors.border.light}`,
        backgroundColor: colors.background.paper
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: spacing.xl }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.text.primary,
            fontWeight: 500
          }}
        >
          Activity
        </Typography>
        <Button 
          variant="outlined"
          sx={{
            borderColor: colors.border.light,
            color: colors.text.primary,
            textTransform: 'uppercase',
            borderRadius: borderRadius.lg,
            px: spacing.md,
            '&:hover': {
              borderColor: colors.border.main,
              backgroundColor: 'transparent'
            }
          }}
        >
          Weekly
        </Button>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text.secondary, fontSize: 12 }}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(108, 92, 231, 0.1)' }}
            contentStyle={{
              backgroundColor: colors.background.paper,
              border: `1px solid ${colors.border.light}`,
              borderRadius: borderRadius.md,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            fill={colors.primary.main}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export function ProgressChart({ data }) {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: spacing.xl, 
        borderRadius: borderRadius.xl,
        border: `1px solid ${colors.border.light}`,
        backgroundColor: colors.background.paper
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: spacing.xl }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: colors.text.primary,
            fontWeight: 500
          }}
        >
          Progress
        </Typography>
        <Button 
          variant="outlined"
          sx={{
            borderColor: colors.border.light,
            color: colors.text.primary,
            textTransform: 'uppercase',
            borderRadius: borderRadius.lg,
            px: spacing.md,
            '&:hover': {
              borderColor: colors.border.main,
              backgroundColor: 'transparent'
            }
          }}
        >
          Weekly
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 300 }}>
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              innerRadius={60} 
              outerRadius={80}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: colors.background.paper,
                border: `1px solid ${colors.border.light}`,
                borderRadius: borderRadius.md,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <Box sx={{ width: '40%' }}>
          {data.map((item, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: spacing.sm 
              }}
            >
              <Box 
                sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: item.color,
                  mr: spacing.sm
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: colors.text.primary,
                  flex: 1
                }}
              >
                {item.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: colors.text.secondary }}
              >
                {item.hours}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
} 