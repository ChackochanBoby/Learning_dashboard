import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from "./routes/Root";
import ErrorPage from './ErrorPage';
import HomePage from './routes/HomePage';
import LoginPage from './routes/LoginPage';
import store from './redux/store'
import { Provider } from 'react-redux'
import { homeLoader } from './loaders/homeLoader';
import ProfilePage from './routes/ProfilePage';
import { profileLoader } from './loaders/profileLoader';
import CoursesPage from './routes/CoursesPage';
import { coursesLoader } from './loaders/coursesLoader';
import AdminRoot from './routes/AdminRoot';
import AdminHome from './routes/AdminHome';
import AdminLoginPage from './routes/AdminLoginPage';
import SingleCoursePage from './routes/SingleCoursePage';
import LessonPage from './routes/LessonPage';
import SignupPage from './routes/SignupPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element:<LoginPage/>
    },
      {
        path: "/signup",
        element:<SignupPage/>
    },
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader
      },
      {
        path: "/courses",
        element: <CoursesPage />,
        loader: coursesLoader,
      },
      {
        path: "/courses/:courseId",
        element:<SingleCoursePage/>
      },
      {
        path: "/:courseId/lesson/:lessonId",
        element:<LessonPage/>
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin/login",
        element:<AdminLoginPage/>
      },
      {
        path: "/admin",
        element:<AdminHome/>
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
