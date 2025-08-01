import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Layout from '../../components/Layout';
import api from '../../lib/api';

export default function LeadDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [lead, setLead] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchLead = async () => {
      try {
        const res = await api.get(`/leads/${id}/`);
        setLead(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLead();
  }, [id]);

  if (!lead) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        {lead.title || lead.name || lead.email}
      </Typography>
      {lead.email && (
        <Typography gutterBottom>Email: {lead.email}</Typography>
      )}
      {lead.company && (
        <Typography gutterBottom>Company: {lead.company}</Typography>
      )}
    </Layout>
  );
}

