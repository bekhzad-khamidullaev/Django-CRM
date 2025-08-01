import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography } from '@mui/material';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function EditLead() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', first_name: '', last_name: '', email: '' });

  useEffect(() => {
    if (!id) return;
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}/`);
        const { title, first_name, last_name, email } = res.data;
        setForm({ title: title || '', first_name: first_name || '', last_name: last_name || '', email: email || '' });
      } catch (err) {
        console.error(err);
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/leads/${id}/`, form);
      router.push(`/leads/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Edit Lead
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 400 }}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
        />
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
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Layout>
  );
}
