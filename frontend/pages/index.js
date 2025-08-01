import Layout from '../components/Layout';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to CRM
      </Typography>
    </Layout>
  );
}
