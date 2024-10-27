import React, { useState } from 'react';
import './CoursePage.css';  // Import the CSS file
import { Container, Typography, Box, IconButton, Snackbar } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuBar from '../components/Home/MenuBar';  // Import the MenuBar
import api from "../api";

const drawerWidth = 240;

export default function CoursePage() {
  const [courses, setCourses] = useState([
    {
      title: 'Business Law',
      description: 'The nature, formation, and application of the law. Topics include: law and the Egyptian business environment, contracts, agency, forms of business organization, fiscal policy, taxation, commercial transaction, and governmental regulation of business',
      professor: 'Dr. Randa El Bedawy',
    },
    {
      title: 'Software Engineering',
      description: 'Basic concepts of software engineering project management, ethical and social issues as well as the software development life cycle. Techniques for software specification, design, implementation, validation, verification and documentation. State-of-the art tools for computer-aided software engineering (CASE tools) are used to support term projects.',
      professor: 'Prof. Sherif Aly',
    },
    {
      title: 'Applied Banking',
      description: 'Measuring returns and risks in banking, evaluation of a bank’s performance, introduction to lending techniques and risk rating methods. Analyzing creditworthiness of business firms and financial institutions. Credit-management techniques such as asset protection, asset conversion and cash-flow analysis are introduced',
      professor: 'Dr. Emily Johnson',
    },
  ])
  const [enrolledCourse, setEnrolledCourse] = useState(null);  // Track which course the user enrolled in
  const [openSnackbar, setOpenSnackbar] = useState(false);  // For the enrollment message
  /*const handleEnroll = async (courseTitle) => {
    try {
      // Fetch course ID using the course title
      const response = await api.get(`/courses/${courseTitle}`);
      //console.log(response.data);
      if (response.status === 200) {
        const courseId = response.data.courseId; // Assuming the response contains the course ID
        console.log('Fetched Course ID:', courseId);
        // Now proceed to enroll the user using the course ID
        const userId = localStorage.getItem("UserId"); // Assuming the user ID is stored in local storage
        const response = await api.post("/enrollment/enroll/", {
          courseId: courseId,
          userId: userId,
        });
        console.log('Enrollment response:', enrollResponse);

        if (enrollResponse.status === 200) {
          setEnrolledCourse(courseTitle);
          setOpenSnackbar(true); // Open the enrollment confirmation message
        } else {
          alert('Enrollment failed.1 Please try again.');
        }
      } else {
        alert('Course not found. Please try again.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Enrollment failed. Please try again.');
    }
  };*/
  /*
  const handleEnroll = (courseTitle) => {
      setEnrolledCourse(courseTitle);
      setOpenSnackbar(true);  // Open the enrollment confirmation message
  }*/
      const handleEnroll = async (courseTitle) => {
        try {
          // Fetch course ID using the course title
//
          // const response = await api.get(`/courses/${courseTitle}`); // Fixed string interpolation
        // console.log('Course fetch response:', response);
          const response = await api.get(`/courses?title=${encodeURIComponent(courseTitle)}`);

          console.log('Course fetch response:', response);
          console.log('Course data:', response.data);
      
          if (response.status === 200) {
            // const courseId = response.data[0].id; // Ensure this is correct

  // Find the course object that matches the course title
          const course = response.data.find(course => course.course_name === courseTitle);
          const courseId = course ? course.id : undefined; // Retrieve course ID

          if (courseId) {
            console.log('Fetched Course ID:', courseId);
            console.log('Fetched Course ID:', courseId);
      
         
          }
         // Now proceed to enroll the user using the course ID
         const userId = localStorage.getItem("UserId"); // Assuming the user ID is stored in local storage
         console.log('Fetched user ID:', userId);
          //  // Check for a valid userId
          //   if (!userId || isNaN(parseInt(userId))) {
          //     alert('Invalid user ID. Please check the value.');
          //     return;
          //   }
            // if (response.data.length > 0) {
            //   const courseId = response.data[0].courseId; // Ensure there is a course before accessing
            //   console.log('I am trying to find Course ID:', courseId);
            // } else {
            //   console.error('No courses found for the given title');
            //   alert('Course not found. Please try again.');
            // }
            
            // Check for a valid courseId
            if (!courseId || isNaN(parseInt(courseId))) {
              alert('Invalid course ID. Please check the value.');
              return;
            }
            const enrollPayload = {
              course_id: parseInt(courseId), // Ensure this is an integer
              user_id: parseInt(userId), // Ensure this is an integer
            };
            
            console.log('Enrollment Payload:', enrollPayload);

            const enrollResponse = await api.post("/enrollment/enroll/", {
              // courseId: courseId,
              // userId: userId,
              course_id: parseInt(courseId), // Ensure this is an integer
              user_id: parseInt(userId), // Ensure this is an integer
            });
       
            
            console.log('Enrollment response:', enrollResponse);
      
            if (enrollResponse.status === 200) {
              setEnrolledCourse(courseTitle);
              setOpenSnackbar(true); 
            } else {
              alert('Enrollment failed. Please try again.');
            }
          } else {
            alert('Course not found. Please try again.');
          }
        } catch (error) {
          console.error('Error enrolling in course:', error);
          alert('Enrollment failed. Please try again.');
        }
      };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
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
      {/* Include MenuBar at the top */}
      <MenuBar />
      <Container maxWidth="lg" className="courses-page">
        <Box my={4}>
          <Typography variant="h2" className="page-heading" gutterBottom>
            Available Courses
          </Typography>
          <Box>
            {courses.map((course, index) => (
              <Box key={index} className="course-card" sx={{
                backgroundColor: 'white',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
              }}>
                <Typography variant="h4">{course.title}</Typography>
                <Typography variant="body1" paragraph>{course.description}</Typography>
                <Typography className="instructor">Instructor: {course.professor}</Typography>
                {/* Enroll button */}
                <IconButton 
                  color="primary" 
                  aria-label="enroll" 
                  labelColor = "black"
                  onClick={() => handleEnroll(course.title)}
                >
                  <AddCircleOutlineIcon />
                    
                  <Typography variant="body2" sx={{ color: 'black', marginLeft: '8px' }}>
                    Enroll
                  </Typography>
                </IconButton>
                <Typography variant="caption">Enroll</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
        {/* Snackbar for the enrollment confirmation */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={`You have enrolled in ${enrolledCourse}`}
        />
      </Container>
    </Box>
  );
}