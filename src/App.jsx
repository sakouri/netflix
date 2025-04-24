import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import Content from './components/content/Content';
import './App.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Netflix
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => navigate('/content')}
          sx={{ mr: 2 }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => navigate('/content/add')}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Container>
          <Routes>
            <Route path="/content/*" element={<Content />} />
            <Route path="/" element={<Content />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
