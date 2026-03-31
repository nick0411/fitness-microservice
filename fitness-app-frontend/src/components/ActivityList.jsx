import { Card, CardContent, Grid2, Typography, CardActionArea, Box, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getActivities().then(res => setActivities(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <Grid2 container spacing={3}>
      {activities.map((activity) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={activity.id}>
          <Card sx={{ borderRadius: 3, '&:hover': { boxShadow: 6 } }}>
            <CardActionArea onClick={() => navigate(`/activities/${activity.id}`)}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant='h6' fontWeight="bold">{activity.type}</Typography>
                  <Chip label="Cardio" color="primary" size="small" variant="outlined" />
                </Box>
                <Typography variant="body2" color="text.secondary">⏱ {activity.duration} min</Typography>
                <Typography variant="body2" color="text.secondary">🔥 {activity.caloriesBurned} kcal</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  )
}
export default ActivityList;