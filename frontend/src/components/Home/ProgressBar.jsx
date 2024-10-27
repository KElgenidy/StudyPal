import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './ProgressBar.css'; // Assuming this contains .progressbar styles

const ProgressBar = ({ progress }) => {
  return (
    <div className="progressbar">
      <CircularProgress variant="determinate" value={progress} size={60} thickness={5} />
    </div>
  );
};

export default ProgressBar;
