import { useState } from "react";
import { API_BASE_URL } from "../server.ts";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(API_BASE_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("register failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("register successful:", data);
          // Handle successful login, e.g., redirect or store token
        })
        .catch((error) => {
          console.error("Error during register:", error);
        });
    } catch (error) {
      console.error("register failed:", error);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div
          className="p-4 rounded shadow-sm bg-light"
          style={{ width: "350px" }}
        >
          <form onSubmit={handleSubmit}>
            <label className="h1 mb-4">Register</label>
            <br />
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                email:
              </label>
              <input
                className="form-control"
                type="email"
                name={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                id="emailInput"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
            <br />
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                password:
              </label>
              <input
                className="form-control"
                type="password"
                name={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                id="passwordInput"
                placeholder="Enter your password"
              />
            </div>
            <br />
            <input
              type="submit"
              value="Register"
              className="btn btn-primary w-100"
            />
          </form>
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
