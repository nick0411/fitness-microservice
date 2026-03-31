import { Box, Button, Typography, AppBar, Toolbar, Container, Paper, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router"; 
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import './App.css';

const ActivitiesPage = () => (
  <Stack spacing={4}>
    <ActivityForm onActivityAdded={() => window.location.reload()} />
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>Your History</Typography>
      <ActivityList />
    </Box>
  </Stack>
);

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) dispatch(setCredentials({token, user: tokenData}));
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: 'primary.main' }}>
          <Paper elevation={10} sx={{ p: 5, textAlign: 'center', maxWidth: 400, borderRadius: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>Fitness Tracker</Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>Track progress, stay motivated.</Typography>
            
            <Button 
              variant="contained" 
              size="large" 
              fullWidth 
              onClick={() => logIn()}
            >
              Login
            </Button>
          </Paper>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #ddd' }}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">FITNESS PRO</Typography>
                <Button color="inherit" variant="outlined" size="small" onClick={() => logOut()}>Logout</Button>
              </Toolbar>
            </Container>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/activities" element={<ActivitiesPage />}/>
              <Route path="/activities/:id" element={<ActivityDetail />}/>
              <Route path="/" element={<Navigate to="/activities" replace/>} />
            </Routes>
          </Container>
        </Box>
      )}
    </Router>
  )
}
export default App;