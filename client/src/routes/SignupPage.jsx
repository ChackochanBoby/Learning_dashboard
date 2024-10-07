import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  const loggedIn = useSelector((state) => state.loginReducer.loggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <main className="container px-4 flex flex-col justify-center bg-light-background dark:bg-dark-background">
      <section className="w-full max-w-md lg:max-w-96 mx-auto px-4 lg:px-10 text-center flex flex-col gap-4 py-10">
        <h1 className="text-5xl text-center text-light-primary-text dark:text-dark-primary-text mb-4">
          Signup
        </h1>
        <div className="w-full">
          <SignupForm />
        </div>
      </section>
      <section className="w-full max-w-md lg:max-w-96 mx-auto px-4 lg:px-10 text-center flex flex-col gap-4">
        <div className="mt-4 text-center">
          <p className="text-sm text-light-secondary-text dark:text-dark-secondary-text">
            Already have an account?
          </p>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-light-accent dark:text-dark-accent font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
