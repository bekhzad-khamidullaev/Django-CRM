import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthenticated(!!localStorage.getItem('token'));
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setAuthenticated(false);
      router.push('/login');
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CRM
        </Typography>
        <Button color="inherit" component={Link} href="/leads">
          Leads
        </Button>
        <Button color="inherit" component={Link} href="/contacts">
          Contacts
        </Button>
        <Button color="inherit" component={Link} href="/accounts">
          Accounts
        </Button>
        <Button color="inherit" component={Link} href="/tasks">
          Tasks
        </Button>
        <Button color="inherit" component={Link} href="/leads/create">
          New Lead
        </Button>
        <Button color="inherit" component={Link} href="/contacts/create">
          New Contact
        </Button>
        <Button color="inherit" component={Link} href="/accounts/create">
          New Account
        </Button>
        <Button color="inherit" component={Link} href="/tasks/create">
          New Task
        </Button>
        {authenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
