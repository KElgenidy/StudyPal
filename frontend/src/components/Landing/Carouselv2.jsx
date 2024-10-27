import {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, Typography } from "@mui/material";
import api from "../../api";

// npm install react-material-ui-carousel

export default function Carouselv2() {

const [courses, setCourses] = useState([]);

const getCourses = async () => {
    try {
      const response = await api.get("/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
}

useEffect(() => {
    getCourses();
}, []);

  return (
    <Carousel sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        margin: "20px",
        padding: "30px",
        width: "500px",
    }}>
      {courses.map((course) => (
        <Card
          key={course.id}
          sx={{
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "500px"
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {course.course_name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
}
