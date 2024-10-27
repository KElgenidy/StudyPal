import { Box } from "@mui/material";
import Intro from "../components/Landing/Intro";
import Navbar from "../components/Landing/Navbar";
import About from "../components/Landing/About";
import Courses from "../components/Landing/Courses";

export default function Landing() {
  return (
    <>
      <Box component={"header"}>
        <Navbar />
      </Box>

      <Box component={"main"}>
        <Intro />
        <About />
        <Courses />
      </Box>
    </>
  );
}