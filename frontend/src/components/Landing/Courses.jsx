import { Box, Typography } from "@mui/material";
import Carousel from "./Carousel";
import Carouselv2 from "./Carouselv2";


        // backgroundColor: "#F7FFF7",

export default function Courses() {
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#FFFCF7",
      }}
      id="course"
    >
      <Box
        sx={{
          textAlign: "justify",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "300px",
          width: "50%",
          mb: 5,
          mt: 10,
        }}
      >
        <Typography variant="h1">Courses</Typography>
        <Typography variant="h4">Explore Our Courses</Typography>
        <Typography variant="body1">
          Explore our comprehensive course catalog, covering a wide range of
          subjects and topics. Whether you&apos;re looking to enhance your
          skills, pursue a new hobby, or expand your knowledge, we have
          something for everyone.
        </Typography>
      </Box>

      <Carouselv2 />
    </Box>
  );
}
