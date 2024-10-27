// import { Box, Typography, TextField, Button, Divider } from "@mui/material";
// import { useState, useEffect } from "react";

// const drawerWidth = 240;

// export default function Profile() {
//   const [editMode, setEditMode] = useState(false);

//   return (
//     <Box
//       sx={{
//         width: `calc(100% - ${drawerWidth}px)`,
//         ml: `${drawerWidth}px`,
//         mt: "65px",
//         height: "calc(100vh - 65px)",
//         padding: "20px",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mt: "20px",
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             color: "#071013",
//             fontWeight: "bold",
//             fontSize: "1.5rem",
//           }}
//         >
//           Profile
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => setEditMode(!editMode)}
//         >
//           Edit Profile
//         </Button>
//       </Box>

//       <Divider
//         sx={{
//           marginTop: "20px",
//           marginBottom: "20px",
//         }}
//       />

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           border: "1px solid #ccc",
//           boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
//           padding: "20px",
//           marginTop: "20px",
//           borderRadius: "5px",
//          width: "50%",
//           margin: "0 auto",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: "#071013",
//               fontSize: "1.2rem",
//               marginRight: "20px",
//             }}
//           >
//             First Name:
//           </Typography>
//           {editMode ? (
//             <TextField
//               variant="outlined"
//               type="text"
//               value="John"
//             />
//           ) : (
//             <Typography
//               variant="body1"
//               sx={{
//                 color: "#071013",
//                 fontSize: "1.2rem",

//               }}
//             >
//               John
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from "@mui/material";

// Custom Profile Component
const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);

  const [user, setUser] = useState({
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    major: "Computer Engineering",
    phone: "+20 123 456 7890",
    courses: [
      "Algorithms and Data Structures",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    profilePic: "https://via.placeholder.com/150", // Placeholder for user profile picture
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      sx={{
        width: "100%",
        mt: "65px",
        height: "calc(100vh - 65px)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={user.profilePic}
          alt="User Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%", marginBottom: "20px" }}
        />
        <Typography variant="h4" sx={{ color: "#333", marginBottom: "10px" }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Box>
          <Typography variant="body1" sx={{ marginBottom: "5px" }}>
            <strong>Email:</strong> {editMode ? (
              <TextField
                variant="outlined"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            ) : user.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "5px" }}>
            <strong>Major:</strong> {editMode ? (
              <TextField
                variant="outlined"
                name="major"
                type="text"
                value={user.major}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            ) : user.major}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "5px" }}>
            <strong>Phone:</strong> {editMode ? (
              <TextField
                variant="outlined"
                name="phone"
                type="text"
                value={user.phone}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
            ) : user.phone}
          </Typography>
        </Box>

        <Divider sx={{ marginY: "20px" }} />

        <Typography variant="h6" sx={{ color: "#333", marginBottom: "10px" }}>
          Enrolled Courses
        </Typography>
        <Box>
          {user.courses.map((course, index) => (
            <Typography
              key={index}
              sx={{
                backgroundColor: "#e0e7ff",
                padding: "10px",
                margin: "5px 0",
                borderRadius: "6px",
              }}
            >
              {course}
            </Typography>
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
