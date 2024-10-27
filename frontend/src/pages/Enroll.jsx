import {
  Box,
  Divider,
  Select,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const drawerWidth = 240;

export default function Enroll() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const CourseName = selectedCourse;
  const [courseList, setCourseList] = useState([]);
  const userId = localStorage.getItem("UserId");
  const [enrollError, setEnrollError] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    try {
      const response = await api.get("/courses/");
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const getEnrollments = async () => {
    try {
      const response = await api.get(`/enrollment/${userId}`);
      console.log(response.data);

      setCourseList(response.data);
    } catch (error) {
      console.log(error);
      setEnrollError("You have not yet enrolled in any courses");
    }
  };

  useEffect(() => {
    getEnrollments();
  }, []);

  const handleEnroll = async (e) => {
    e.preventDefault();
    const course = courses.find((course) => course.course_name === selectedCourse);
    console.log(course);

    try {
      const response = await api.post(`/enrollment/enroll/`, {
        course_id: course.id,
        user_id: userId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedCourse("");
      getEnrollments();
    }

    // if (selectedCourse) {
    //   // Add the selected course to the course list
    //   const course = courses.find((course) => course.name === selectedCourse);
    //   console.log(course);
    //   setCourseList([...courseList, course]);
    //   console.log(courseList);
    // }
  };

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
          mt: "20px",
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
          Enroll in Courses
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home/courses")}
        >
          Available Courses
        </Button>
      </Box>

      <Divider sx={{
        marginTop: "20px",
        marginBottom: "20px" }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
          scrollBehavior: "smooth",
          height: "calc(100vh - 200px)",
          padding: "20px",
        }}
      >
        <Box component={"form"} onSubmit={handleEnroll}>
          <Typography variant="h6" gutterBottom>
            Select Your Courses:
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={CourseName}
              label="Courses"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.course_name}>
                  {course.course_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Enroll
            </Button>
          </Box>
        </Box>

        <Divider sx={{ marginTop: "10px", marginBottom: "10px" }} />

        <Typography variant="h6" gutterBottom>
          Your Courses:
        </Typography>

        {courseList.length > 0 ? (
          <List>
            {courseList.map((course) => (
              <ListItem
                key={course.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={course.course_name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">{enrollError}</Typography>
        )}
      </Box>
    </Box>
  );
}
