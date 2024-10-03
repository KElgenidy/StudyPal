import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const drawerWidth = 240;

export default function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const user_id = localStorage.getItem("UserId");
  const user_name = localStorage.getItem("Name");
  const navigate = useNavigate();

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

  return (
    <Box
      component="main"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        mt: "65px",
        height: "calc(100vh - 65px)",
        padding: "20px",
      }}
    >
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((course) => (
          <Box
            key={course.course_id}
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
            <Typography variant="h6" sx={{
              color: "#071013",
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginBottom: "20px",
            }}>
              {course.Name}
            </Typography>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            margin: "20px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{
            color: "#071013",
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}>
           Welcome {user_name}, you have not enrolled in any courses yet.
          </Typography>
          <Typography variant="h6" sx={{
            color: "#071013",
            fontWeight: "bold",
            fontSize: "1.3rem",
            marginBottom: "20px",
          }}>
            Please check out our courses by clicking the button below.
          </Typography>
          <Button variant="contained" color="primary" sx={{
            marginTop: "10px",
          }}
          onClick={() => navigate("/home/courses")}
          >
            Explore Courses
          </Button>
        </Box>
      )}
    </Box>
  );
}