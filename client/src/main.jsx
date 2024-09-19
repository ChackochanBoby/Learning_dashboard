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
        path: "/",
        element: <HomePage />,
        loader: homeLoader
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
