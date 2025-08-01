import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CRM
        </Typography>
        <Button color="inherit" component={Link} href="/leads">
          Leads
        </Button>
        <Button color="inherit" component={Link} href="/leads/create">
          New Lead
        </Button>
        <Button color="inherit" component={Link} href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
