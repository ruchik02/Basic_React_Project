import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  InputAdornment
} from '@mui/material';
import {
  Search as SearchIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import Navigation from '../Navigation/Navigation';
import { colors, spacing, borderRadius } from '../../constants/theme';

function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Sarah Wilson',
      avatar: '/avatars/sarah.jpg',
      lastMessage: 'Great workout today! 💪',
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: '/avatars/mike.jpg',
      lastMessage: 'See you at tomorrow\'s session',
      time: '9:15 AM',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Fitness Group',
      avatar: '/avatars/group.jpg',
      lastMessage: 'Alex: Who\'s joining the morning run?',
      time: 'Yesterday',
      unread: 5,
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Wilson',
      content: 'Hey! How was your workout today?',
      time: '10:15 AM',
      isSender: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'It was great! Hit a new personal record 🎉',
      time: '10:20 AM',
      isSender: true
    },
    {
      id: 3,
      sender: 'Sarah Wilson',
      content: 'Great workout today! 💪',
      time: '10:30 AM',
      isSender: false
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
          width: 'calc(100% - 80px)',
          display: 'flex'
        }}
      >
        {/* Chats List */}
        <Paper sx={{ 
          width: '350px', 
          borderRadius: borderRadius.lg,
          mr: 3,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Messages</Typography>
            <TextField
              fullWidth
              placeholder="Search messages..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: colors.text.secondary }} />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
          </Box>
          <Divider />
          <List sx={{ flexGrow: 1, overflow: 'auto' }}>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                button
                selected={selectedChat === chat.id}
                onClick={() => setSelectedChat(chat.id)}
                sx={{ 
                  px: 3,
                  py: 2,
                  '&.Mui-selected': {
                    backgroundColor: colors.primary.light + '20'
                  }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: chat.online ? colors.success.main : colors.text.secondary
                      }
                    }}
                  >
                    <Avatar src={chat.avatar} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={chat.lastMessage}
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    fontWeight: chat.unread ? 600 : 400
                  }}
                  secondaryTypographyProps={{
                    variant: 'body2',
                    noWrap: true
                  }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Typography variant="caption" color="text.secondary">
                    {chat.time}
                  </Typography>
                  {chat.unread > 0 && (
                    <Badge
                      badgeContent={chat.unread}
                      color="primary"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Chat Window */}
        <Paper sx={{ 
          flexGrow: 1, 
          borderRadius: borderRadius.lg,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: 1, 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Avatar 
                  src={chats.find(c => c.id === selectedChat)?.avatar}
                  sx={{ mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">
                    {chats.find(c => c.id === selectedChat)?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Online
                  </Typography>
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Messages */}
              <Box sx={{ 
                flexGrow: 1, 
                p: 3, 
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.isSender ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: '70%',
                        bgcolor: msg.isSender ? colors.primary.main : colors.background.paper,
                        color: msg.isSender ? 'white' : 'inherit',
                        borderRadius: msg.isSender ? '20px 20px 4px 20px' : '20px 20px 20px 4px'
                      }}
                    >
                      <Typography variant="body1">{msg.content}</Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: 'block', 
                          mt: 1,
                          color: msg.isSender ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                        }}
                      >
                        {msg.time}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton>
                          <AttachFileIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <SendIcon />
                        </IconButton>
                      </Box>
                    )
                  }}
                />
              </Box>
            </>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}>
              <Typography variant="h6" color="text.secondary">
                Select a conversation to start messaging
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default MessagesScreen; 