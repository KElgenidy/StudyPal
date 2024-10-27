import { Typography, Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const drawerWidth = 240;
export default function Dashboard() {
  const user = localStorage.getItem("Name");
  const user_id = localStorage.getItem("UserId");
  const [enrollments, setEnrollments] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getEnrollments = async () => {
    try {
      const response = await api.get(`/enrollment/${user_id}`);
      if (response.data.length != 0) {
        setEnrollments(true);
      }
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments(false);
      setCourses([]);
    }
  };

  useEffect(() => {
    getEnrollments();
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
        border: "1px solid #ccc",
      }}
    >
      
        {
          enrollments ? (
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              overflow: "auto",
            }}>
              <Typography variant="h4" gutterBottom>
                Dashboard
              </Typography>

              <List>
                {courses.map((course) => (
                  <ListItem key={course.id} sx={{
                    borderBottom: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f5f5f5",
                    width: "400px",
                    textAlign: "center",
                  }}>
                    <ListItemText primary={course.course_name} />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Box sx={{
              mt: "20px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              padding: "20px",
            }}>
              <Typography variant="h4" gutterBottom
                sx={{
                  fontSize: "2rem",
                }}
              >
                Welcome {user},
              </Typography>
              <Typography variant="body1" gutterBottom
               sx={{
                fontSize: "1.2rem",
              }}
              >
                It seems that you have not enrolled in any courses yet.
                Click the button below to explore our courses and enroll in one.
              </Typography>
              <Button variant="contained" color="primary"
                sx={{
                  fontSize: "1.2rem",
                  marginTop: "1rem",
                }}
                onClick={() => navigate("/home/courses")}
              >
                Explore Courses
              </Button>
            </Box>
          )
        }

      
    </Box>
  );
}
