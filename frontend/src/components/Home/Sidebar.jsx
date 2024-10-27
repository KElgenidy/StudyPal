import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import './Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <List>
        <ListItem button component="a" href="#home">
          <ListItemIcon>
            <HomeIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button component="a" href="#progress">
          <ListItemIcon>
            <BarChartIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Progress" />
        </ListItem>

        <ListItem button component="a" href="#quiz">
          <ListItemIcon>
            <HomeIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {/* Chat Room with Collapsible Courses */}
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ChatIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Chat Room" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component="a" href="#course-1" style={{ paddingLeft: '30px', paddingTop: '0', paddingBottom: '0' }}>
              <ListItemText primary="Course 1" />
            </ListItem>
            <ListItem button component="a" href="#course-2" style={{ paddingLeft: '30px', paddingTop: '0', paddingBottom: '0' }}>
              <ListItemText primary="Course 2" />
            </ListItem>
            <ListItem button component="a" href="#course-3" style={{ paddingLeft: '30px', paddingTop: '0', paddingBottom: '0' }}>
              <ListItemText primary="Course 3" />
            </ListItem>
          </List>
        </Collapse>

        {/* Log out option with reduced space */}
        <ListItem button component="a" href="#log-out" style={{ marginTop: open ? '5px' : '0px' }}>
          <ListItemIcon>
            <LogoutIcon style={{ color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
