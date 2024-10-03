import { Box, Typography, Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const drawerWidth = 240;
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#071013",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          Available Courses
        </Typography>

        <Button variant="contained" color="primary" onClick={() => navigate("/home/enroll")}>
          Enroll
        </Button>
      </Box>

      <Divider
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
          scrollBehavior: "smooth",
          height: "calc(100vh - 200px)",
        }}
      >
        {courses.map((course) => (
          <Box
            key={course.CRN}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "blue",
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "20px",
              }}
            >
              {course.Name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#071013",
                fontWeight: "bold",
                fontSize: "1.3rem",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {course.Description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
