import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { switchLoginState, setUser} from "../redux/loginSlice";
import { switchAdminLoginState,setAdmin } from "../redux/adminLoginSlice";

const LogoutButton = () => {
    const dispatch=useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin") ? true : false;
  const onLogoutClick = () => {
    console.log(
      "Logging out from:",
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/${
        isAdmin ? "admin" : "user"
      }/logout`
    );
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/${
          isAdmin ? "admin" : "user"
        }/logout`,{},{withCredentials:true}
      )
        .then(() => {
            if (isAdmin) {
                dispatch(switchAdminLoginState())
                dispatch(setAdmin(null))
            }
            else {
                dispatch(switchLoginState())
                dispatch(setUser(null))
            }
        navigate(isAdmin ? "/admin/login" : "/login");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  return (
    <button
      onClick={onLogoutClick}
      className="px-4 py-2 rounded transition-colors duration-200 
        bg-red-600 hover:bg-red-800 text-dark-primary-text"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
