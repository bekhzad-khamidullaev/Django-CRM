import { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import api from '../../lib/api';

const statusOptions = ['New', 'In Progress', 'Completed'];
const priorityOptions = ['Low', 'Medium', 'High'];

export default function CreateTask() {
  const [form, setForm] = useState({
    title: '',
    status: 'New',
    priority: 'Low',
    due_date: '',
    account: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/', form);
      router.push('/tasks');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h5" gutterBottom>
        Create Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 400 }}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          select
          name="status"
          label="Status"
          fullWidth
          margin="normal"
          value={form.status}
          onChange={handleChange}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          name="priority"
          label="Priority"
          fullWidth
          margin="normal"
          value={form.priority}
          onChange={handleChange}
        >
          {priorityOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="due_date"
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.due_date}
          onChange={handleChange}
        />
        <TextField
          name="account"
          label="Account ID"
          fullWidth
          margin="normal"
          value={form.account}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Layout>
  );
}
