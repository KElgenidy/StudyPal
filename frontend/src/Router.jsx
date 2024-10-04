import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Enroll from "./pages/Enroll";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  }, 
  {
    path: "/signup",
    element: <SignUp />,
  }, 
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "/home/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/home/courses",
        element: <Courses />,
      },
      {
        path: "/home/enrollments",
        element: <Enroll />,
      },
      {
        path: "/home/chat/:CRN",
        element: <Chat />,
      }
    ]
  },
]);

export default router;