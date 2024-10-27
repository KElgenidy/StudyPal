import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; 
import SchoolIcon from '@mui/icons-material/School'; // Import the School icon

const MenuBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Graduation cap icon before the "StudyPal" text */}
        <SchoolIcon style={{ marginRight: '10px', fontSize: '34px' }} /> 
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: '34px', textAlign: 'left' }}>
          StudyPal
        </Typography>
        <Button color="inherit" href="#courses">Courses</Button>
        <Button color="inherit" href="#demo">Demo</Button>
        <Button color="inherit" href="#about-us">About Us</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
