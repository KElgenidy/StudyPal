import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Button,
  } from "@mui/material";
  import { useState } from "react";
  
  const courses = [
    {
      courseName: "SWE",
      courseChapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
    },
    {
      courseName: "CSE",
      courseChapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
    },
  ];
  
  export default function QuizForm() {
    const [courseName, setCourseName] = useState("");
    const [index, setIndex] = useState(-1);
    const [chapterName, setChapterName] = useState("");
    const [numQuestions, setNumQuestions] = useState(1); // Adjusted state variable for number of questions
  
    const handleChapterChange = (event) => {
      setChapterName(event.target.value);
    };
  
    const handleCourseChange = (event) => {
      setCourseName(event.target.value);
      const place = courses.findIndex(
        (course) => course.courseName === event.target.value
      );
      setIndex(place);
      setChapterName(courses[place].courseChapters[0]);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(courseName, chapterName, numQuestions);
      // Add your quiz creation logic here
    };
  
    return (
      <Box
        sx={{
          mt: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Typography variant="h4">Create Quiz</Typography>
        <Box
          component={"form"}
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              value={courseName}
              label="Course"
              onChange={handleCourseChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.courseName} value={course.courseName}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {index !== -1 && (
            <>
              <FormControl fullWidth>
                <InputLabel id="chapter-select-label">Chapter</InputLabel>
                <Select
                  labelId="chapter-select-label"
                  id="chapter-select"
                  value={chapterName}
                  label="Chapter"
                  onChange={handleChapterChange}
                >
                  {courses[index].courseChapters.map((chapter) => (
                    <MenuItem key={chapter} value={chapter}>
                      {chapter}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <TextField
                label="Number of Questions"
                type="number"
                variant="outlined"
                fullWidth
                inputProps={{ min: 1, max: 30 }}
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
              />
            </>
          )}
  
          <Button variant="contained" color="primary" type="submit">
            Create Quiz
          </Button>
        </Box>
      </Box>
    );
  }
  