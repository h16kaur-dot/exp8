import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Button, Paper, Chip } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/dashboard', { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Failed to load'));
  }, [auth.token]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 400, textAlign: 'center' }}>
        <Typography variant="h5" mb={1}>Dashboard</Typography>
        <Chip label={`Role: ${auth.role}`} color={auth.role === 'admin' ? 'error' : 'primary'} sx={{ mb: 2 }} />
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        {auth.role === 'admin' && (
          <Button variant="outlined" color="error" fullWidth sx={{ mb: 1 }} onClick={() => navigate('/admin')}>
            Admin Panel
          </Button>
        )}
        <Button variant="contained" color="secondary" fullWidth onClick={() => { logout(); navigate('/login'); }}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
