import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchLoginState } from "../redux/loginSlice";


function LoginForm() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/login`, data, { withCredentials: true })
      .then(() => {
        dispatch(switchLoginState())
        navigate("/")
      })
      .catch((error) => {
        console.error("ERROR!"+error)
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label htmlFor="email" className=" sr-only">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        {...register("email", { required: true })}
        className="w-full border-2 h-10 rounded-lg text-sm inline-flex items-center px-2"
        placeholder="Email"
      />

      <label htmlFor="password" className=" sr-only">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="Password"
        {...register("password", { required: true })}
        className="w-full border-2 h-10 rounded-lg text-sm inline-flex items-center px-2"
        placeholder="Password"
      />

      <button
        type="submit"
        className="px-3 py-2 w-full rounded-lg bg-blue-500 text-white text-base font-semibold mt-4"
      >
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
