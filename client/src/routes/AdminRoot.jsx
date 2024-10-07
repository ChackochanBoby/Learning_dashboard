import { useNavigate, Outlet, useLocation } from "react-router-dom";
import PrimaryNavigation from "../components/PrimaryNavigation";
import { useEffect } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { useDispatch, useSelector } from "react-redux";
import { switchAdminLoginState, setAdmin } from "../redux/adminLoginSlice";
import axios from "axios";

function AdminRoot() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminLoggedIn = useSelector((state) => state.adminLoginReducer.adminLoggedIn);
  const admin = useSelector((state) => state.adminLoginReducer.admin);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/checkadmin`, {
        withCredentials: true,
      })
      .then((response) => {
        const adminData = response.data.data;

        // Dispatch Redux actions to update login and user state
        if (!adminLoggedIn) {
          dispatch(switchAdminLoginState());
        }
        if (!admin) {
          dispatch(setAdmin(adminData));
        }
      })
      .catch((error) => {
        console.log(error);
        // Redirect if the user is not logged in
        if (location.pathname !== "/admin/login") {
          navigate("/admin/login");
        }
      });
  }, [dispatch, navigate, location.pathname, adminLoggedIn, admin]);
  // Conditional Rendering
  const isAuthPage =
    location.pathname === "/admin/login" || location.pathname === "/admin/signup";

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
      {location.pathname==="/admin"? (
        <footer className="h-36 bg-white">
          Footer
        </footer>
      ):null}
    </div>
  );
}

export default AdminRoot;
