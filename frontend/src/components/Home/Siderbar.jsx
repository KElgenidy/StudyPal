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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

const drawerWidth = 240;

export default function Siderbar() {
  const drawerItems = [
    {
      id: 0,
      text: "Dashboard",
      path: "/home/dashboard",
    },
    {
      id: 1,
      text: "Enrollments",
      path: "/home/enrollments",
    },
  ];

  const user_id = localStorage.getItem("UserId");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const getEnrolledCourses = async () => {
    try {
      const response = await api.get(`/enrollments/${user_id}`);
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
        },
      }}
    >
      <Toolbar
        sx={{
          color: "#071013",
        }}
      />
      <Box sx={{ overflow: "auto", color: "#071013" }}>
        <List sx={{ color: "#071013" }}>
          {drawerItems.map((item) => (
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
        <Accordion defaultExpanded sx={{ background: "transparent", boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                color: "#071013",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Course Chatrooms
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ color: "#071013", padding: 0 }}>
              {enrolledCourses.map((item) => (
                <ListItem key={item.CRN} disablePadding>
                  <ListItemButton
                    sx={{ color: "#071013" }}
                    selected={location.pathname.slice(10) === `/${item.CRN}`}
                    onClick={() => {
                      navigate(`/home/chat/${item.CRN}`);
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
                        {item.Name}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </Drawer>
  );
}
