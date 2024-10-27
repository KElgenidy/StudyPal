import {
  Box,
  List,
  Pagination,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";


// export default function FlashList({ flashcards, setSelectedId }) {
//   const [page, setPage] = useState(1);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const startIndex = (page - 1) * ITEMS_PER_PAGE;
//   const endIndex = startIndex + ITEMS_PER_PAGE;
//   const displayedFlashcards = flashcards.slice(startIndex, endIndex);
const past_flashcards = [
  {
    id: 1,
    chapter: "Chapter 1",
    course: "SWE",
  },
  {
    id: 2,
    chapter: "Chapter 2",
    course: "SWE",
  },
];

const ITEMS_PER_PAGE = 5; // Adjust this value as needed

export default function FlashList({setSelectedId}) {
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedFlashcards = past_flashcards.slice(startIndex, endIndex);

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
        {displayedFlashcards.map((flashcard) => (
          <ListItemButton
            key={flashcard.id}
            onClick={() => setSelectedId(flashcard.id)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <ListItemText
              primary={flashcard.chapter}
              secondary={flashcard.course}
            />
          </ListItemButton>
        ))}
      </List>

      <Pagination
        count={Math.ceil(past_flashcards.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        sx={{ alignSelf: "center", mt: 2 }}
      />
    </Box>
  );
}
