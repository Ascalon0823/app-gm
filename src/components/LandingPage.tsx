import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function LandingPage() {
  const [pageName, setPageName] = useState("login");
  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Welcome to My App</h1>
        <div className="text-center mb-4">
          <button
            onClick={() => setPageName("login")}
            className="btn btn-primary me-2"
          >
            Login
          </button>

          <button
            onClick={() => setPageName("register")}
            className="btn btn-primary me-2"
          >
            Register
          </button>
        </div>
        {pageName === "login" && <LoginPage />}
        {pageName === "register" && <RegisterPage />}
      </div>
    </>
  );
}

export default LandingPage;
