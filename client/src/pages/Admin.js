import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Chip, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/admin', { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(res => setUsers(res.data.users))
      .catch(e => setError(e.response?.data?.message || 'Access denied'));
  }, [auth.token]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ p: 4, width: 500 }}>
        <Typography variant="h5" mb={2}>Admin Panel — All Users</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {users.length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => (
                <TableRow key={u._id}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>
                    <Chip label={u.role} color={u.role === 'admin' ? 'error' : 'primary'} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Button sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>← Back</Button>
      </Paper>
    </Box>
  );
}
