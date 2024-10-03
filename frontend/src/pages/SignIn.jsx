import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../api";
import { Box, TextField, Typography, Link, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await api.post("/signin/", {
        Email: email,
        Password: password,
      });

      console.log(response.data);
      localStorage.setItem("UserId", response.data.user_id);
      localStorage.setItem("Name", response.data.user_name);

      navigate("/home/dashboard");
    } catch (error) {
      alert("Sign in failed:", error);
    } finally {
      setLoading(false);
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
            height: "500px",

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

          <TextField
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: "100%",
              marginBottom: "15px",
            }}
          />
          <TextField
            label="Password"
            type="password"
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
            type="submit"
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
