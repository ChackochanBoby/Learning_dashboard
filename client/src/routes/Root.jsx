import { useNavigate, Outlet, useLocation } from "react-router-dom";
import PrimaryNavigation from "../components/PrimaryNavigation";
import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { switchLoginState, setUser } from "../redux/loginSlice";

function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loggedIn = useSelector(state => state.loginReducer.loggedIn);
  const user = useSelector(state => state.loginReducer.user);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/checkuser`, { withCredentials: true })
      .then((response) => {
        const userData = response.data.data;
        
        // Dispatch Redux actions to update login and user state
        if (!loggedIn) {
          dispatch(switchLoginState());
        }
        if (!user) {
          dispatch(setUser(userData));
        }
      })
      .catch(error => {
        console.log(error);
        // Redirect if the user is not logged in
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
          navigate("/login");
        }
      });
  }, [dispatch, navigate, location.pathname, loggedIn, user]);

  // Conditional Rendering
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="bg-light-background dark:bg-dark-background grid min-h-screen grid-rows-[min-content_1fr_min-content]">
      {isAuthPage ? (
        <div className="ml-auto mr-4 mt-4">
          <ThemeToggle />
        </div>
      ) : (
        <header className="border-b-2 bg-light-navbar-background border-light-navbar-border dark:bg-dark-navbar-background dark:border-dark-navbar-border">
          <PrimaryNavigation />
        </header>
      )}
      <Outlet />
      {location.pathname==="/"? (
        <footer className="h-36 bg-white">
          Footer
        </footer>
      ):null}
    </div>
  );
}

export default Root;
