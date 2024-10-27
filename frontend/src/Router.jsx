import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Landing from './pages/Landing.jsx'
import HomePage from './pages/HomePage.jsx'
import CoursePage from './pages/CoursePage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Chat from './pages/Chat.jsx'
import Courses from './pages/Courses.jsx'
import Enroll from './pages/Enroll.jsx'
import Profile from './pages/Profile.jsx'
import Flashcard from './pages/Flashcard.jsx'
import Quizzes from './pages/Quizzes.jsx';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/home/courses',
        element: <Courses />,
      },
      {
        path: '/home/enrollments',
        element: <Enroll />,
      },
      {
        path: '/home/profile',
        element: <Profile />,
      },
      {
        path: '/home/chat/:id',
        element: <Chat />,
      },
      {
        path: '/home/flashcards',
        element: <Flashcard />,
      },
      {
        path: '/home/quizzes', // New route for Quizzes
        element: <Quizzes />, // Component for Quizzes
      }
    ]
  },
  
]);

