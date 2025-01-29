import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Grid
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  Email as ContactIcon,
  Book as GuideIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import Navigation from '../Navigation/Navigation';
import { colors, spacing, borderRadius } from '../../constants/theme';

function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const faqs = [
    {
      question: 'How do I track my workout progress?',
      answer: 'You can track your workout progress by logging your activities in the Activity section. The dashboard will show your progress over time through various charts and statistics.'
    },
    {
      question: 'Can I customize my workout plans?',
      answer: 'Yes, you can customize your workout plans by accessing the Activity section and clicking on "Create Custom Plan". This allows you to set specific goals and create personalized routines.'
    },
    {
      question: 'How do I connect with a fitness trainer?',
      answer: 'You can connect with a fitness trainer through the Messages section. Browse available trainers and send them a message to start your fitness journey.'
    }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: <GuideIcon />,
      description: 'Learn the basics of using the platform'
    },
    {
      title: 'Contact Support',
      icon: <ContactIcon />,
      description: '24/7 support for any questions'
    },
    {
      title: 'Live Chat',
      icon: <ChatIcon />,
      description: 'Chat with our support team'
    }
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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
        <Typography variant="h5" sx={{ mb: 4 }}>Help Center</Typography>

        {/* Search Section */}
        <Paper 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: borderRadius.lg,
            backgroundColor: colors.primary.main,
            color: 'white'
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>How can we help you?</Typography>
          <TextField
            fullWidth
            placeholder="Search for help..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              backgroundColor: 'white',
              borderRadius: borderRadius.md,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'transparent',
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Paper>

        {/* Help Categories */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {helpCategories.map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: borderRadius.lg,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: colors.background.default
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.primary.light + '20',
                      color: colors.primary.main,
                      mr: 2
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography variant="subtitle1">{category.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* FAQs */}
        <Typography variant="h6" sx={{ mb: 3 }}>Frequently Asked Questions</Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={() => setExpanded(expanded === index ? false : index)}
            sx={{
              mb: 2,
              borderRadius: borderRadius.md,
              '&:before': {
                display: 'none',
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: colors.background.default,
                borderRadius: borderRadius.md,
              }}
            >
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

export default HelpScreen; 