import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import Siderbar from "../components/HomeV2/Siderbar";
import HomeNavbar from "../components/HomeV2/HomeNavbar";

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
