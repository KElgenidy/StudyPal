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
import api from "../api";

const drawerWidth = 240;
// const courses = [
//   {
//     id: 1,
//     name: "Introduction to Computer Science",
//     instructor: "Dr. John Smith",
//     description: "An introduction to the fundamentals of computer science.",
//   },
//   {
//     id: 2,
//     name: "Data Structures and Algorithms",
//     instructor: "Dr. Jane Doe",
//     description: "An in-depth study of data structures and algorithms.",
//   },
//   {
//     id: 3,
//     name: "Web Development",
//     instructor: "Dr. Bob Johnson",
//     description:
//       "A course on building web applications using modern technologies.",
//   },
//   {
//     id: 4,
//     name: "Database Management",
//     instructor: "Dr. Sarah Lee",
//     description: "A course on designing and managing databases.",
//   },
//   {
//     id: 5,
//     name: "Artificial Intelligence",
//     instructor: "Dr. David Kim",
//     description: "An introduction to the field of artificial intelligence.",
//   },
// ];
export default function Enroll() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const CourseName = selectedCourse;
  const [courseList, setCourseList] = useState([]);
  const userId = localStorage.getItem("UserId");
  const [enrollError, setEnrollError] = useState("");
  const [courses, setCourses] = useState([]);

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
      const response = await api.get(`/enrollments/${userId}`);;
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
    const course = courses.find((course) => course.Name === selectedCourse);
      console.log(course);

    try {
      const response = await api.post(`/enrollments/enroll`, {
        CRN: course.CRN,
        UserId: userId,
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
      <Typography variant="h4" gutterBottom>
        Enroll in Courses
      </Typography>

      <Divider sx={{ marginBottom: "20px" }} />

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
        <Box
          component={"form"}
          onSubmit={handleEnroll}
        >
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
                <MenuItem key={course.CRN} value={course.Name}>
                  {course.Name}
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
                key={course.CRN}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={course.Name} />
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
