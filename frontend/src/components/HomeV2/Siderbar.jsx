import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemIcon,
  Icon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatIcon from '@mui/icons-material/Chat';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import QuizIcon from '@mui/icons-material/Quiz'; // Assuming you're using an icon for Quizzes


const drawerWidth = 240;

export default function Siderbar() {
  const drawerItems = [
    {
      id: 0,
      text: "Dashboard",
      path: "/home/dashboard",
      icon: <DashboardIcon />
    },
    {
      id: 1,
      text: "Enrollments",
      path: "/home/enrollments",
      icon: <LibraryAddIcon />
    },
    {
      id: 2,
      text: "Flashcards",
      path: "/home/flashcards",
      icon: <ViewCarouselIcon />
    },
    {
      id: 3, // Updated ID for Quizzes
      text: "Quizzes", // New Quizzes tab
      path: "/home/quizzes", // Path for Quizzes
      icon: <QuizIcon /> // Use an appropriate icon for Quizzes
    },
    {
      id: 4,
      text: "Profile",
      path: "/home/profile",
      icon: <AccountBoxIcon />
    },
    {
      id: 5,
      text: "Logout",
      path: "/signin",
      icon: <LogoutIcon />
    }
  ];

  const user_id = localStorage.getItem("UserId");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getEnrolledCourses = async () => {
    try {
      const response = await api.get(`/enrollment/${user_id}`);
      console.log(response.data);
      setEnrolledCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Drawer
    
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paperAnchorLeft": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#FFFCF7",
          color: "#071013",
          borderRight: "1px solid #071013",
          mt: "70px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100vh - 65px)",
        },
      }}
    >
      <Box>
        <Box sx={{ overflow: "auto", color: "#071013" }}>
          <List sx={{ color: "#071013" }}>
            {drawerItems.slice(0,4).map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  sx={{ color: "#071013" }}
                  selected={
                    location.pathname.slice(5) === `/${item.text.toLowerCase()}`
                  }
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#071013" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#071013",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />
        {enrolledCourses && (
          <Accordion sx={{ background: "transparent", boxShadow: "none" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => {
                getEnrolledCourses();
              }}
            >
              <ListItemIcon sx={{  
                color: "#071013",
              }}>
                <ChatIcon sx={{
                  color: "#071013",
                }} />
              </ListItemIcon>
              <Typography
                sx={{
                  color: "#071013",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Course Chats
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ color: "#071013", padding: 0 }}>
                {enrolledCourses.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      sx={{ color: "#071013" }}
                      selected={location.pathname.slice(10) === `/${item.id}`}
                      onClick={() => {
                        navigate(`/home/chat/${item.id}`);
                      }}
                    >
                      <ListItemText sx={{ color: "#071013" }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#071013",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          {item.course_name}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>

      <Box>
      <Box sx={{ overflow: "auto", color: "#071013" }}>
          <List sx={{ color: "#071013" }}>
            {drawerItems.slice(4,6).map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  sx={{ color: "#071013" }}
                  selected={
                    location.pathname.slice(5) === `/${item.text.toLowerCase()}`
                  }
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#071013" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#071013",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {item.text}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
 
    </Drawer>
  );
}

