import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import abtM from "./assets/about-male.jpg";
import abtF from "./assets/about-female.jpg";
export default function About() {
  const aboutStyles = {
    wrapper: {
      height: "105vh",
      backgroundColor: "#FFFCF7",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "column",
      color: "#071013",
    },
    box: {
      display: "flex",
      gap: "20px",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      height: "250px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "300px",
      height: "250px",
    },
    cardMedia: {
      width: "150px",
      height: "150px",
    },
  };
  return (
    <Box id="about" sx={aboutStyles.wrapper}>
      <Typography variant="h4" sx={{ fontWeight: 700, mt: 10 }}>
        About Us
      </Typography>
      <Typography
        variant="body1"
        sx={{ width: "50%", textAlign: "justify", fontSize: "1.1rem" }}
      >
        Welcome to StudyPal, your ultimate destination for mastering concepts of
        university course. We are a team of passionate developers who have
        developed this amazing platform to help you excel in your studies. Our
        mission is to provide you with the best learning experience with the
        help of AI teaching assistant.
      </Typography>
      <Typography
        variant="body1"
        sx={{ width: "50%", textAlign: "center", fontSize: "1.3rem" }}
      >
        Our team comprises of six developers:
      </Typography>

      <Box sx={aboutStyles.box}>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtM}
              alt="about-male"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Karim</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtM}
              alt="about-male"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Youssef</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtM}
              alt="about-male"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Abdullah</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={aboutStyles.box}>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtF}
              alt="about-female"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Farah</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtF}
              alt="about-female"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Rana</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
        <Card sx={aboutStyles.card}>
          <CardMedia>
            <img
              src={abtF}
              alt="about-male"
              style={{ width: "150px", height: "150px" }}
            />
          </CardMedia>

          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5">Carol</Typography>
            <Typography variant="body2" color="text.secondary">
              Developer
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
