import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function EditAccount() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAccount = async () => {
      try {
        const res = await api.get(`/accounts/${id}/`);
        setForm(res.data.account_obj);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccount();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/accounts/${id}/`, form);
      router.push(`/accounts/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!form) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Edit Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 400 }}>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={form.name || ''}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email || ''}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Phone"
          fullWidth
          margin="normal"
          value={form.phone || ''}
          onChange={handleChange}
        />
        <TextField
          name="contact_name"
          label="Contact Name"
          fullWidth
          margin="normal"
          value={form.contact_name || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_address_line"
          label="Address Line"
          fullWidth
          margin="normal"
          value={form.billing_address_line || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_street"
          label="Street"
          fullWidth
          margin="normal"
          value={form.billing_street || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_city"
          label="City"
          fullWidth
          margin="normal"
          value={form.billing_city || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_state"
          label="State"
          fullWidth
          margin="normal"
          value={form.billing_state || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_postcode"
          label="Postcode"
          fullWidth
          margin="normal"
          value={form.billing_postcode || ''}
          onChange={handleChange}
        />
        <TextField
          name="billing_country"
          label="Country"
          fullWidth
          margin="normal"
          value={form.billing_country || ''}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Layout>
  );
}
