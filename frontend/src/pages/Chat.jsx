import { Box, Button, Divider, Typography, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, Fragment } from "react";
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import api from "../api";

/*
  Chat Page
  - Chat with StudyPal
  - Implement New chat, creating a new chat by date
  - Implement Restore Last Chat, restoring the message of last chat by date

*/


const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant.",
  ],
  ["human", "{input}"],
]);

const llm = new ChatOllama({
    model: "llama3.2",
    temperature: 0.2,
})
const drawerWidth = 240;

export default function Chat() {
  const { CRN } = useParams();
  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [input, setInput] = useState('');
   const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: 'user' }]);

    // TODO: Send message to LLM API and get response
    // This is a placeholder for the API call
    const llmResponse = await LLMAPI(input);
    console.log(llmResponse)

    // Add LLM response to chat
    setMessages(prevMessages => [...prevMessages, { text: llmResponse, sender: 'llm' }]);

    // Clear input field
    setInput('');
  };

  // Mock LLM API function (replace with actual API call)
  const LLMAPI  = async (message) => {
    // Simulate API delay
    // const response = await llm.invoke(message);
    // console.log(response)
    // return response.content;

    // const chain = prompt.pipe(llm);
    // const response = await chain.invoke({
    //   input: message,
    // });
    try {
      const response = await api.post(`/chat/`, {
        query: message,
      });

      return response.data.response;
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleNewChat = () => {
    // TODO: Implement new chat
    console.log("New chat");
    setOldMessages(messages);
    setMessages([]);
  };

  const handleRestoreLastChat = () => {
    // TODO: Implement restore last chat
    console.log("Restore last chat");
    setMessages(oldMessages);
    setOldMessages([]);
  };

  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        mt: "65px",
        height: "calc(100vh - 65px)",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          Chat
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <Button variant="contained">
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
              onClick={handleNewChat}
            >
              New Chat
            </Typography>
          </Button>
          <Button variant="contained">
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
              }}
              onClick={handleRestoreLastChat}
            >
              Restore Last Chat
            </Typography>
          </Button>
        </Box>
      </Box>

      <Divider
        sx={{
          mt: "16px",
          mb: "16px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
          scrollBehavior: "smooth",
          height: "calc(100vh - 270px)",
          padding: "20px",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              maxWidth: "70%",
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                message.sender === "user" ? "#e3f2fd" : "#f5f5f5",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {message.text.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < message.text.split("\n").length - 1 && <br />}
                </Fragment>
              ))}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          mt: "16px",
        }}
      >
        <TextField
          placeholder="Chat with StudyPal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            padding: "10px 20px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Send
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}