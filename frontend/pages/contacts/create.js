import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import api from '../../lib/api';

export default function CreateContact() {
  const [form, setForm] = useState({ first_name: '', last_name: '', primary_email: '', mobile_number: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/contacts/', form);
      router.push('/contacts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Create Contact
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 400 }}>
        <TextField
          name="first_name"
          label="First Name"
          fullWidth
          margin="normal"
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          name="last_name"
          label="Last Name"
          fullWidth
          margin="normal"
          value={form.last_name}
          onChange={handleChange}
        />
        <TextField
          name="primary_email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.primary_email}
          onChange={handleChange}
        />
        <TextField
          name="mobile_number"
          label="Mobile Number"
          fullWidth
          margin="normal"
          value={form.mobile_number}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Layout>
  );
}
