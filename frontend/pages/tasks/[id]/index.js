import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import api from '../../../lib/api';

export default function TaskDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}/`);
        setTask(res.data.task_obj);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}/`);
        router.push('/tasks');
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!task) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{task.title}</Typography>
        <Box>
          <Button
            variant="contained"
            component={Link}
            href={`/tasks/${id}/edit`}
            sx={{ mr: 2 }}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Box>
      {task.status && <Typography gutterBottom>Status: {task.status}</Typography>}
      {task.priority && <Typography gutterBottom>Priority: {task.priority}</Typography>}
      {task.due_date && <Typography gutterBottom>Due Date: {task.due_date}</Typography>}
      {task.account && <Typography gutterBottom>Account: {task.account}</Typography>}
    </Layout>
  );
}
