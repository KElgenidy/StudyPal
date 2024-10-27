import { Box, Typography, Divider } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FlashForm from "../components/Flashcards/FlashForm";
import { useState } from "react";
import FlashList from "../components/Flashcards/FlashList";
import FlashDetails from "../components/Flashcards/FlashDetails";

const drawerWidth = 240;
export default function Flashcard() {
    const [value, setValue] = useState('1');
    const [selectedId, setSelectedId] = useState(null);

    const handleChange = (event, newValue) => {
     
      setSelectedId(null);
      setValue(newValue);
    };
  

  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        mt: "66px",
        height: "calc(100vh - 66px)",
        padding: "20px",
        border: "2px solid #ccc",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Flashcards
      </Typography>

      <Divider />

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Generate" value="1" />
            <Tab label="FlashCard" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><FlashForm /></TabPanel>
        <TabPanel value="2">
            {selectedId == null ? <FlashList setSelectedId={setSelectedId} /> : <FlashDetails selectedId={selectedId} setSelectedId={setSelectedId} />}
        </TabPanel>
      </TabContext>
      
    </Box>
  );
}

{
  /* <Box sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <FlashcardArray cards={cards}
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
        </Box> */
}
