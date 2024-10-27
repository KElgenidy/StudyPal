import {
  AppBar,
  Box,
  Toolbar,
  Typography,
}
from "@mui/material";
import StudyIcon from "@mui/icons-material/School";
import PropTypes from "prop-types";
import AccountMenu from "./AccountMenu";
// import { useNavigate } from "react-router-dom";


export default function HomeNavbar({ username }) {
  

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFCF7",
        color: "#071013",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StudyIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div">
            StudyPal
          </Typography>
        </Box>

        <AccountMenu username={username} />
      </Toolbar>
    </AppBar>
  );
}
HomeNavbar.propTypes = {
  username: PropTypes.string.isRequired,
};