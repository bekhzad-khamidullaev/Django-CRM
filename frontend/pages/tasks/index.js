import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../lib/api';
import { Typography, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';
import Link from 'next/link';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks/');
        setTasks(res.data?.tasks || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>Tasks</Typography>
      <Button
        variant="contained"
        component={Link}
        href="/tasks/create"
        sx={{ mb: 2 }}
      >
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemButton component={Link} href={`/tasks/${task.id}`}>
              <ListItemText primary={task.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}
