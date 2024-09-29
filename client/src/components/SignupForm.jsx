import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { switchLoginState } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupForm() {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [signupError,setSignupError]=useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signup`, data,{withCredentials:true})
      .then(() => {
        dispatch(switchLoginState())
        navigate("/"); 
      })
      .catch((error) => {
        console.error(error);
        setSignupError(error.response.data.message)
      });
  };

  // Watch password field for comparison with confirm password
  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto"
    >
      {signupError && <p className="text-red-500">{signupError}</p>}
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        {...register("name", { required: "Name is required" })}
        className="w-[calc(100%-1rem)] border-2 h-10 rounded-lg text-sm px-2 
          bg-light-button-background dark:bg-dark-button-background
          text-light-primary-text dark:text-dark-primary-text
          border-light-border dark:border-dark-border
          placeholder:text-light-secondary-text dark:placeholder:text-dark-secondary-text
          focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition duration-200"
        placeholder="Name"
      />
      {errors.name && (
        <span className="text-red-500 text-sm">{errors.name.message}</span>
      )}

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
        name="password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[|\\:;"'<>,.?/~`-]).+$/,
            message: "Password must contain at least one lower case letter one uppercase letter a special character and one number",
          },
          minLength: {
            value: 8,
            message: "Password must be at least characters long",
          },
        })}
        className="w-[calc(100%-1rem)] border-2 h-10 rounded-lg text-sm px-2 
          bg-light-button-background dark:bg-dark-button-background
          text-light-primary-text dark:text-dark-primary-text
          border-light-border dark:border-dark-border
          placeholder:text-light-secondary-text dark:placeholder:text-dark-secondary-text
          focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition duration-200"
        placeholder="Password"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      <label htmlFor="confirmPassword" className="sr-only">
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
        className="w-[calc(100%-1rem)] border-2 h-10 rounded-lg text-sm px-2 
          bg-light-button-background dark:bg-dark-button-background
          text-light-primary-text dark:text-dark-primary-text
          border-light-border dark:border-dark-border
          placeholder:text-light-secondary-text dark:placeholder:text-dark-secondary-text
          focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent transition duration-200"
        placeholder="Confirm Password"
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm">
          {errors.confirmPassword.message}
        </span>
      )}

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-light-accent dark:bg-dark-accent 
          text-white text-base font-semibold mt-4 
          hover:bg-light-accent/80 dark:hover:bg-dark-accent/80 
          transition duration-200"
      >
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
