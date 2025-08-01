import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography } from '@mui/material';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function EditContact() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ first_name: '', last_name: '', primary_email: '', mobile_number: '' });

  useEffect(() => {
    if (!id) return;
    const fetchContact = async () => {
      try {
        const res = await api.get(`/contacts/${id}/`);
        const { first_name, last_name, primary_email, mobile_number } = res.data;
        setForm({ first_name: first_name || '', last_name: last_name || '', primary_email: primary_email || '', mobile_number: mobile_number || '' });
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/contacts/${id}/`, form);
      router.push(`/contacts/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Edit Contact
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
