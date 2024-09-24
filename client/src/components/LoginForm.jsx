import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchLoginState } from "../redux/loginSlice";

function LoginForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const loginEndpoint = isAdminRoute ? "admin" : "user";

  const onSubmit = (data) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/${loginEndpoint}/login`,
        data,
        { withCredentials: true }
      )
      .then(() => {
        dispatch(switchLoginState());
        navigate(isAdminRoute ? "/admin" : "/");
      })
      .catch((error) => {
        console.error("ERROR!" + error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      <label htmlFor="email" className="sr-only">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email",
          },
        })}
        className="w-[calc(100%-1rem)] border-2 h-10 rounded-lg text-sm px-2 
          bg-light-button-background dark:bg-dark-button-background
          text-light-primary-text dark:text-dark-primary-text
          border-light-border dark:border-dark-border
          placeholder:text-light-secondary-text dark:placeholder:text-dark-secondary-text
          focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition duration-200"
        placeholder="Email"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}

      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="Password"
        {...register("password")} // Removed validation
        className="w-[calc(100%-1rem)] border-2 h-10 rounded-lg text-sm px-2 
          bg-light-button-background dark:bg-dark-button-background
          text-light-primary-text dark:text-dark-primary-text
          border-light-border dark:border-dark-border
          placeholder:text-light-secondary-text dark:placeholder:text-dark-secondary-text
          focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition duration-200"
        placeholder="Password"
      />

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-light-accent dark:bg-dark-accent 
          text-white text-base font-semibold mt-4 
          hover:bg-light-accent/80 dark:hover:bg-dark-accent/80 
          transition duration-200"
      >
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
