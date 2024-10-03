import { Box } from "@mui/material";

const drawerWidth = 240;
export default function Enroll() {
  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        mt: "65px",
        height: "calc(100vh - 65px)",
        padding: "20px",
      }}
    >
      <h1>Enroll</h1>
    </Box>
  );
}
