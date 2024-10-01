// import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid2";
// import api from "../api";
const courses = [
  {
    id: "course-1",
    title: "Introduction to React",
    description: "Learn the basics of React.",
    image: "https://via.placeholder.com/300", // Replace with actual image URL
  },
  {
    id: "course-2",
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts.",
    image: "https://via.placeholder.com/300",
  },
  {
    id: "course-3",
    title: "Full-Stack Development",
    description: "Master front-end and back-end development.",
    image: "https://via.placeholder.com/300",
  },
  // Add more courses as needed
  {
    id: "course-3",
    title: "Full-Stack Development",
    description: "Master front-end and back-end development.",
    image: "https://via.placeholder.com/300",
  },
];

export default function Carousel() {
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await api.get("/courses/list/");
  //       setCourses(response.data);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid size={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor: {course.instructor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
