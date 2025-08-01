import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import api from '../../lib/api';

export default function CreateAccount() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    contact_name: '',
    billing_address_line: '',
    billing_street: '',
    billing_city: '',
    billing_state: '',
    billing_postcode: '',
    billing_country: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/accounts/', form);
      router.push('/accounts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Create Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 400 }}>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={form.name}
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
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          margin="normal"
          value={form.phone}
          onChange={handleChange}
        />
        <TextField
          name="contact_name"
          label="Contact Name"
          fullWidth
          margin="normal"
          value={form.contact_name}
          onChange={handleChange}
        />
        <TextField
          name="billing_address_line"
          label="Address Line"
          fullWidth
          margin="normal"
          value={form.billing_address_line}
          onChange={handleChange}
        />
        <TextField
          name="billing_street"
          label="Street"
          fullWidth
          margin="normal"
          value={form.billing_street}
          onChange={handleChange}
        />
        <TextField
          name="billing_city"
          label="City"
          fullWidth
          margin="normal"
          value={form.billing_city}
          onChange={handleChange}
        />
        <TextField
          name="billing_state"
          label="State"
          fullWidth
          margin="normal"
          value={form.billing_state}
          onChange={handleChange}
        />
        <TextField
          name="billing_postcode"
          label="Postcode"
          fullWidth
          margin="normal"
          value={form.billing_postcode}
          onChange={handleChange}
        />
        <TextField
          name="billing_country"
          label="Country"
          fullWidth
          margin="normal"
          value={form.billing_country}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Layout>
  );
}
