import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import api from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/token/', { email, password });
      const { access } = res.data;
      localStorage.setItem('token', access);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, mx: 'auto', width: 300 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign In</Button>
    </Box>
  );
}
