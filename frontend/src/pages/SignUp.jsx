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
  Alert
} from "@mui/material";
import api from "../api";
import { LoadingButton } from "@mui/lab";

export default function SignUp() {
  localStorage.clear();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [id, setId] = useState("");
  const [idError, setIdError] = useState(false);
  const [idErrorMsg, setIdErrorMsg] = useState("");

  const [type, setType] = useState("Student");

  const [major, setMajor] = useState("");
  const [majorError, setMajorError] = useState(false);
  const [majorErrorMsg, setMajorErrorMsg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;
    if (firstName === "") {
      setFirstNameError(true);
      setFirstNameErrorMsg("First name is required");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMsg("");
    }
    if (lastName === "") {
      setLastNameError(true);
      setLastNameErrorMsg("Last name is required");
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMsg("");
    }

    if (email === "") {
      setEmailError(true);
      setEmailErrorMsg("Email is required");
      isValid = false;
    } else if (!email.includes("@")) {
      setEmailError(true);
      setEmailErrorMsg("Email is invalid");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg("");
    }

    if (id === "") {
      setIdError(true);
      setIdErrorMsg("ID is required");
      isValid = false;
    } else {
      setIdError(false);
      setIdErrorMsg("");
    }

    if (type === "Student" && major === "") {
      setMajorError(true);
      setMajorErrorMsg("Major is required");
      isValid = false;
    } else {
      setMajorError(false);
      setMajorErrorMsg("");
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(true);
      setPasswordErrorMsg("Password must be at least 8 characters");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMsg("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      await api.post("/signup/", {
        id: Number(id),
        firstname: firstName,
        lastname: lastName,
        email: email,
        type: type,
        major: major,
        password: password,
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
            height: "820px",
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
              value={firstName}
              error={firstNameError}
              helperText={firstNameErrorMsg}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                width: "100%",
              }}
            />

            <TextField
              label="Last Name"
              value={lastName}
              error={lastNameError}
              helperText={lastNameErrorMsg}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
          </Box>

          <TextField
            label="Email"
            type="email"
            value={email}
            error={emailError}
            helperText={emailErrorMsg}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%",
            }}
          />

          <TextField
            label="AUC ID"
            type="text"
            value={id}
            error={idError}
            helperText={idErrorMsg}
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
              value={major}
              error={majorError}
              helperText={majorErrorMsg}
              onChange={(e) => setMajor(e.target.value)}
              sx={{
                width: "100%",
              }}
            />
          )}

          <TextField
            label="Password"
            type="password"
            value={password}
            error={passwordError}
            helperText={passwordErrorMsg}
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
