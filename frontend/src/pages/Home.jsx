import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import Siderbar from "../components/Home/Siderbar";
import HomeNavbar from "../components/Home/HomeNavbar";

export default function Home() {
  const username = localStorage.getItem("Name");

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HomeNavbar username={username} />
        <Siderbar />
      </Box>
      <Outlet />
    </>
  );
}
