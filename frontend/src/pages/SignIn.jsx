import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api";
import { Box, TextField, Typography, Link, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const validateInputs = () => {
    let isValid = true;

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

    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMsg("Password is required");
      isValid = false;
    }
    //  else if (password.length < 8) {
    //   setPasswordError(true);
    //   setPasswordErrorMsg("Password must be at least 8 characters");
    //   isValid = false;
    // }
    else {
      setPasswordError(false);
      setPasswordErrorMsg("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/signin/", {
        email: email,
        password: password,
      });

      console.log(response.data);
      localStorage.setItem("UserId", response.data.user_id);
      localStorage.setItem("Name", response.data.firstname);
      

      navigate("/home/dashboard");
    } catch (error) {
      setError(error.response.data.detail);
      
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        margin: "10px",
        padding: "10px",
      }}
      >
        <Button sx={{
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
            height: "600px",

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
            Sign In
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#071013",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.2rem",
              marginBottom: "20px",
            }}
          >
            Please sign in to continue.
          </Typography>

          {
            error && (
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  fontWeight: "500",
                  textAlign: "center",
                  fontSize: "1rem",
                }}
              >
                {error}
              </Typography>
            )
          }

          <TextField
            label="Email"
            type="email"
            value={email}
            error={emailError}
            helperText={emailErrorMsg}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "15px",
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            error={passwordError}
            helperText={passwordErrorMsg}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "15px",
              borderRadius: "20x",
            }}
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "100%",
              marginBottom: "15px",
            }}
          >
            Sign In
          </LoadingButton>

          <Typography
            sx={{
              color: "#071013",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// text color #071013
