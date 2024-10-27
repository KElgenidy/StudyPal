import { FlashcardArray } from "react-quizlet-flashcard";
import { useState } from "react";
import { Box, Button } from "@mui/material";
//import StudyPal from "../../../../backend/temp/studypal.py";
export default function FlashDetails({ selectedId, setSelectedId }) {
    
  const cards = [
    {
      id: 1,
      frontHTML: (
        <div>
          What is the capital of <u>Alaska</u>?
        </div>
      ),
      backHTML: <>Juneau</>,
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    },
    {
      id: 3,
      frontHTML: <>What is the capital of New York?</>,
      backHTML: <>Albany</>,
    },
    {
      id: 4,
      frontHTML: <>What is the capital of Florida?</>,
      backHTML: <>Tallahassee</>,
    },
    {
      id: 5,
      frontHTML: <>What is the capital of Texas?</>,
      backHTML: <>Austin</>,
    },
    {
      id: 6,
      frontHTML: <>What is the capital of New Mexico?</>,
      backHTML: <>Santa Fe</>,
    },
    {
      id: 7,
      frontHTML: <>What is the capital of Arizona?</>,
      backHTML: <>Phoenix</>,
    },
  ];
  //const Cards_2 = StudyPal.flashcard_tool(self, query);
  //const [cards, setCards] = useState(Cards_2);
  //const [currentCardIndex, setCurrentCardIndex] = useState(0);
  //const currentCard = cards[currentCardIndex];
  //const handleNextCard = () => {
  //  setCurrentCardIndex((prevIndex) => prevIndex + 1);
  //};
  //const handlePrevCard = () => {
  //  setCurrentCardIndex((prevIndex) => prevIndex - 1);
  //};
  //const handleFirstCard = () => {
  //  setCurrentCardIndex(0);
  //};
  //const handleLastCard = () => {
  //  setCurrentCardIndex(cards.length - 1);
  //};
  //const handleRandomCard = () => {
  //  const randomIndex = Math.floor(Math.random() * cards.length);
  //  setCurrentCardIndex(randomIndex);
  //};

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
      <FlashcardArray
        cards={cards}
        frontContentStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        backContentStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" 
        onClick={() => setSelectedId(null)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
/*
export default function FlashDetails({ selectedId, setSelectedId }) {
  const cards = [
    {
      id: 1,
      frontHTML: (
        <div>
          What is the capital of <u>Alaska</u>?
        </div>
      ),
      backHTML: <>Juneau</>,
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    },
    {
      id: 3,
      frontHTML: <>What is the capital of New York?</>,
      backHTML: <>Albany</>,
    },
    {
      id: 4,
      frontHTML: <>What is the capital of Florida?</>,
      backHTML: <>Tallahassee</>,
    },
    {
      id: 5,
      frontHTML: <>What is the capital of Texas?</>,
      backHTML: <>Austin</>,
    },
    {
      id: 6,
      frontHTML: <>What is the capital of New Mexico?</>,
      backHTML: <>Santa Fe</>,
    },
    {
      id: 7,
      frontHTML: <>What is the capital of Arizona?</>,
      backHTML: <>Phoenix</>,
    },
  ];
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
      <FlashcardArray
        cards={cards}
        frontContentStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        backContentStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" 
        onClick={() => setSelectedId(null)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
*/