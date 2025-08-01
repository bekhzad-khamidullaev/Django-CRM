import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../lib/api';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get('/leads/');
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeads();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>Leads</Typography>
      <Button
        variant="contained"
        component={Link}
        href="/leads/create"
        sx={{ mb: 2 }}
      >
        Add Lead
      </Button>
      <List>
        {leads.map((lead) => (
          <ListItem key={lead.id} divider>
            <ListItemText primary={lead.title || lead.name || lead.email} />
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
