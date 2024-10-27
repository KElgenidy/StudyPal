import { Box, Typography, Divider } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import QuizForm from "../components/Quizzes/QuizForm"; // Adjust the import path as needed
import { useState } from "react";
import QuizList from "../components/Quizzes/QuizList"; // Adjust the import path as needed
import QuizDetails from "../components/Quizzes/QuizDetails"; // Adjust the import path as needed

const drawerWidth = 240;

export default function Quizzes() {
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
        Quizzes
      </Typography>

      <Divider />

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="quizzes tabs example">
            <Tab label="Create Quiz" value="1" />
            <Tab label="Quiz List" value="2" />
            <Tab label="" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <QuizForm />
        </TabPanel>
        <TabPanel value="2">
          {selectedId == null ? (
            <QuizList setSelectedId={setSelectedId} />
          ) : (
            <QuizDetails selectedId={selectedId} setSelectedId={setSelectedId} />
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
