import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function AccountDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchAccount = async () => {
      try {
        const res = await api.get(`/accounts/${id}/`);
        setAccount(res.data.account_obj);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccount();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this account?')) {
      try {
        await api.delete(`/accounts/${id}/`);
        router.push('/accounts');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!account) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{account.name}</Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            href={`/accounts/${id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
      {account.email && (
        <Typography gutterBottom>Email: {account.email}</Typography>
      )}
      {account.phone && (
        <Typography gutterBottom>Phone: {account.phone}</Typography>
      )}
    </Layout>
  );
}
