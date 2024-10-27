import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function QuizDetails({ selectedId, setSelectedId, questions }) {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill("")); // Array to store user answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {questions.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            {questions[currentQuestionIndex].question}
          </Typography>

          <TextField
            label="Your Answer"
            variant="outlined"
            value={userAnswers[currentQuestionIndex]}
            onChange={handleAnswerChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </Box>
        </>
      )}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setSelectedId(null)}
          sx={{
            width: "100%",
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
