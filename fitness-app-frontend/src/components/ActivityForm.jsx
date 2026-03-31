import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Paper, Grid2, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({ type: "RUNNING", duration: '', caloriesBurned: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activity.duration || !activity.caloriesBurned) {
        alert("Please fill in all fields");
        return;
    }
    try {
      await addActivity(activity);
      if (onActivityAdded) {
        onActivityAdded();
      }
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' });
    } catch (error) { 
        console.error("Failed to add activity:", error); 
    }
  }

  return (
    <Paper sx={{ p: 3, border: '1px solid #eee', borderRadius: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Log Activity</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={{xs: 12, md: 4}}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select 
                value={activity.type} 
                label="Type" 
                onChange={(e) => setActivity({...activity, type: e.target.value})}
              >
                <MenuItem value="RUNNING">🏃 Running</MenuItem>
                <MenuItem value="WALKING">🚶 Walking</MenuItem>
                <MenuItem value="CYCLING">🚴 Cycling</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{xs: 6, md: 4}}>
            <TextField 
                fullWidth 
                label="Minutes" 
                type='number' 
                value={activity.duration} 
                onChange={(e) => setActivity({...activity, duration: e.target.value})}
            />
          </Grid2>
          <Grid2 size={{xs: 6, md: 4}}>
            <TextField 
                fullWidth 
                label="Calories" 
                type='number' 
                value={activity.caloriesBurned} 
                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
            />
          </Grid2>
          <Grid2 size={12}>
            <Button type='submit' variant='contained' fullWidth sx={{ mt: 1, py: 1.5 }}>
                Add Activity
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  )
}
export default ActivityForm;