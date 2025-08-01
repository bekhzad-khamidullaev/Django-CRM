import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../lib/api';
import { Typography, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/contacts/');
        setContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>Contacts</Typography>
      <Button
        variant="contained"
        component={Link}
        href="/contacts/create"
        sx={{ mb: 2 }}
      >
        Add Contact
      </Button>
      <List>
        {contacts.map((contact) => (
          <ListItem key={contact.id} disablePadding>
            <ListItemButton component={Link} href={`/contacts/${contact.id}`}>
              <ListItemText primary={`${contact.first_name} ${contact.last_name}` || contact.primary_email} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
