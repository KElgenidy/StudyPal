import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Divider, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

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
    {
      id: 2,
      text: "SWE",
      path: "/home/swe",
    },
    {
      id: 3,
      text: "Business Law",
      path: "/home/business-law",
    },
  ];

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
                sx={{ color: "#071013"}}
                selected={location.pathname.slice(5) === `/${item.text.toLowerCase()}`}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon sx={{ color: "#071013" }}>
                  {item.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
    </Drawer>
  );
}
