import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getActivityDetail } from '../services/api';
import { 
  Box, Card, CardContent, Typography, Button, Stack, 
  Chip, List, ListItem, ListItemIcon, ListItemText, Paper, CircularProgress, Divider 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const loadData = async () => {
      try {
        const res = await getActivityDetail(id);
        setActivity(res.data);

        if (res.data && res.data.recommendation) {
          setLoading(false);
          if (interval) clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
      }
    };

    loadData();
    interval = setInterval(loadData, 3000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: '70vh' }} spacing={2}>
        <CircularProgress size={50} />
        <Typography variant="h6" color="text.secondary">
          AI is analyzing your {activity?.activityType || 'activity'}...
        </Typography>
        <Typography variant="body2">This usually takes about 10 seconds.</Typography>
      </Stack>
    );
  }

  const DataList = ({ title, items, icon, color }) => {
    if (!items || items.length === 0) return null;
    return (
      <Box sx={{ mt: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          {icon}
          <Typography variant="subtitle1" fontWeight="bold" color={color}>{title}</Typography>
        </Stack>
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index} disableGutters sx={{ alignItems: 'flex-start' }}>
              <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                <CheckCircleIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>← Back</Button>

      <Card sx={{ mb: 3, borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold">{activity.activityType}</Typography>
          <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
            <Box>
              <Typography variant="h6">{activity.duration} min</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Duration</Typography>
            </Box>
            <Box>
              <Typography variant="h6">{activity.caloriesBurned} kcal</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>Calories</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          AI Personal Insights
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.7, mb: 2 }}>
          {activity.recommendation}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <DataList 
          title="Ways to Improve" 
          items={activity.improvements} 
          icon={<TrendingUpIcon color="info" />} 
          color="info.main" 
        />

        <DataList 
          title="Next Steps" 
          items={activity.suggestions} 
          icon={<InfoIcon color="primary" />} 
          color="primary.main" 
        />

        <DataList 
          title="Safety Precautions" 
          items={activity.safety} 
          icon={<SecurityIcon color="error" />} 
          color="error.main" 
        />
      </Paper>
    </Box>
  );
};

export default ActivityDetail;