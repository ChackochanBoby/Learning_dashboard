import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const loggedIn = useSelector(state => state.loginReducer.loggedIn)
  const navigate=useNavigate()
  useEffect(() => {
    if (loggedIn) {
      navigate("/")
    }
  },[loggedIn,navigate])

  return (
    <main className="container px-4 flex justify-center ">
          <section className="min-w-80 lg:w-96 mx-auto px-10 text-center flex flex-col gap-4 py-10">
          <h1 className="text-5xl text-center text-light-primary-text dark:text-dark-primary-text mb-4">Login</h1>
        <LoginForm />
      </section>
    </main>
  );
}

export default LoginPage;
