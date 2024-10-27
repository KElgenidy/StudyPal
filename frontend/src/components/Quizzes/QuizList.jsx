import {
    Box,
    List,
    Pagination,
    ListItemButton,
    ListItemText,
  } from "@mui/material";
  import { useState } from "react";
  
  // Sample quiz data
  const past_quizzes = [
    {
      id: 1,
      title: "Quiz 1: Introduction to SWE",
      course: "Software Engineering",
    },
    {
      id: 2,
      title: "Quiz 2: Advanced SWE Topics",
      course: "Software Engineering",
    },
    // Add more quizzes as needed
  ];
  
  const ITEMS_PER_PAGE = 5; // Adjust this value as needed
  
  export default function QuizList({ setSelectedId }) {
    const [page, setPage] = useState(1);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedQuizzes = past_quizzes.slice(startIndex, endIndex);
  
    return (
      <Box
        sx={{
          width: "100%",
          mt: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
        }}
      >
        <List>
          {displayedQuizzes.map((quiz) => (
            <ListItemButton
              key={quiz.id}
              onClick={() => setSelectedId(quiz.id)} // This will set the selected quiz ID
              sx={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <ListItemText
                primary={quiz.title}
                secondary={quiz.course}
              />
            </ListItemButton>
          ))}
        </List>
  
        <Pagination
          count={Math.ceil(past_quizzes.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          sx={{ alignSelf: "center", mt: 2 }}
        />
      </Box>
    );
  }
  