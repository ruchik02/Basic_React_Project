import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Description as DocumentIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  MoreVert as MoreIcon,
  CloudDownload as DownloadIcon,
  Delete as DeleteIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import Navigation from '../Navigation/Navigation';
import { colors, spacing, borderRadius } from '../../constants/theme';

function DocumentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const documents = [
    {
      id: 1,
      name: 'Workout Plan 2024.pdf',
      type: 'pdf',
      size: '2.5 MB',
      date: '2024-01-15',
      icon: <PdfIcon sx={{ color: '#F40F02' }} />
    },
    {
      id: 2,
      name: 'Diet Chart.docx',
      type: 'doc',
      size: '1.8 MB',
      date: '2024-01-10',
      icon: <DocumentIcon sx={{ color: '#4285F4' }} />
    },
    {
      id: 3,
      name: 'Progress Photos.jpg',
      type: 'image',
      size: '3.2 MB',
      date: '2024-01-05',
      icon: <ImageIcon sx={{ color: '#34A853' }} />
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5">Documents</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: borderRadius.full,
              backgroundColor: colors.primary.main,
              '&:hover': {
                backgroundColor: colors.primary.dark
              }
            }}
          >
            Upload Document
          </Button>
        </Box>

        <Paper sx={{ p: 3, mb: 4, borderRadius: borderRadius.lg }}>
          <TextField
            fullWidth
            placeholder="Search documents..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: colors.text.secondary }} />
                </InputAdornment>
              )
            }}
          />
        </Paper>

        <Grid container spacing={3}>
          {documents.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: borderRadius.lg,
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.background.default,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    {doc.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" noWrap>{doc.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.size} • {doc.date}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton size="small" sx={{ color: colors.primary.main }}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: colors.primary.main }}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton size="small" sx={{ color: colors.error.main }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default DocumentsScreen; 