import React from 'react';
import Sidebar from '../components/Home/Sidebar'
import MenuBar from '../components/Home/MenuBar';
import { Container, Box, Typography } from '@mui/material';
import './HomePage.css';
import '../components/Home/ProgressBar.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="content">
        <MenuBar />
        <header>
          <Container maxWidth="lg">
            <Box my={4}>
              <Typography variant="h2" align="left" color="primary" gutterBottom>
                Welcome!
              </Typography>
            </Box>
          </Container>
        </header>
        <main>
          <Container maxWidth="lg">
            <Box my={4}>
              <Typography variant="body1" align="center" paragraph>
              <p style={{ fontWeight: 'bold', fontSize: '24px' }}>
            Looks like you haven't added any courses yet! Let's start exploring the available&nbsp;
            <Link to="/courses">courses</Link>
          </p>
          <p style={{ fontWeight: 'bold', fontSize: '24px' }}>
            or create a new course by clicking the button below.
          </p>
          
        </Typography>
        </Box>
        </Container>
        </main>
        </div>
        </div>
)
}

