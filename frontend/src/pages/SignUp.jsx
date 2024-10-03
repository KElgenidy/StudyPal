import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import api from "../api";
import { LoadingButton } from "@mui/lab";

export default function SignUp() {
  localStorage.clear();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("Student");
  const [major, setMajor] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/signup/", {
        ID: Number(id),
        Name: `${firstName} ${lastName}`,
        Email: email,
        Type: type,
        Major: major,
        Password: password,
      });
      navigate("/signin");
    } catch (error) {
      alert("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "10px",
          padding: "10px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#071013",
            color: "#FFFCF7",
            borderRadius: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFFCF7",
              color: "#071013",
              border: "1px solid #071013",
            },
          }}
          onClick={() => navigate("/")}
        >
          Back to Landing Page
        </Button>
      </Box>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backdropFilter: "blur(1500px)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFCF7",
            padding: "40px",
            borderRadius: "15px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid #071013",
            width: "500px",
            height: "710px",
            gap: "20px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#071013",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Sign Up
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#071013",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              marginBottom: "5px",
            }}
          >
            Please enter your details to sign up.
          </Typography>

          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "20px",
            }}
          >
            <TextField
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                width: "100%",
              }}
            />

            <TextField
              label="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%",
            }}
          />

          <TextField
            label="AUC ID"
            type="text"
            onChange={(e) => setId(e.target.value)}
            sx={{
              width: "100%",
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Instructor">Instructor</MenuItem>
            </Select>
          </FormControl>

          {type === "Student" && (
            <TextField
              label="Major"
              type="text"
              onChange={(e) => setMajor(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
          )}

          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "100%",
              borderRadius: "20x",
            }}
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              marginBottom: "5px",
            }}
          >
            Sign Up
          </LoadingButton>

          <Typography
            sx={{
              color: "#071013",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
              marginBottom: "5px",
            }}
          >
            Already have an account?{" "}
            <Link component={RouterLink} to="/signin">
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
