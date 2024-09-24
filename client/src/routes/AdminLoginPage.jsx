import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const adminLoggedIn = useSelector(state => state.adminLoginReducer.loggedIn)
  const navigate=useNavigate()
  useEffect(() => {
    if (adminLoggedIn) {
      navigate("/admin")
    }
  },[adminLoggedIn,navigate])

  return (
    <main className="container px-4 flex justify-center bg-light-background dark:bg-dark-background">
      <section className="w-full max-w-md lg:max-w-96 mx-auto px-4 lg:px-10 text-center flex flex-col gap-4 py-10">
        <h1 className="text-5xl text-center text-light-primary-text dark:text-dark-primary-text mb-4">
          Login
        </h1>
        <div className="w-full">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

export default AdminLoginPage;
