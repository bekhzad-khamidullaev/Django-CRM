import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../lib/api';
import { Typography, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get('/accounts/');
        const open = res.data?.active_accounts?.open_accounts || [];
        const closed = res.data?.closed_accounts?.close_accounts || [];
        setAccounts([...open, ...closed]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>Accounts</Typography>
      <Button
        variant="contained"
        component={Link}
        href="/accounts/create"
        sx={{ mb: 2 }}
      >
        Add Account
      </Button>
      <List>
        {accounts.map((account) => (
          <ListItem key={account.id} disablePadding>
            <ListItemButton component={Link} href={`/accounts/${account.id}`}>
              <ListItemText primary={account.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
