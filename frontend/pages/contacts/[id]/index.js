import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function ContactDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchContact = async () => {
      try {
        const res = await api.get(`/contacts/${id}/`);
        setContact(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await api.delete(`/contacts/${id}/`);
        router.push('/contacts');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!contact) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">
          {contact.first_name} {contact.last_name}
        </Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            href={`/contacts/${id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
      {contact.primary_email && (
        <Typography gutterBottom>Email: {contact.primary_email}</Typography>
      )}
      {contact.mobile_number && (
        <Typography gutterBottom>Phone: {contact.mobile_number}</Typography>
      )}
    </Layout>
  );
}
