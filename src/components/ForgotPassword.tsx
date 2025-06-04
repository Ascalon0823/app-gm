import { useState } from "react";
import { apiUrl } from "../server";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(apiUrl("/password-forgot"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Forgot password request failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Forgot password request successful:", data);
          alert("Check your email for further instructions.");
        })
        .catch((error) => {
          console.error("Error during forgot password request:", error);
        });
    } catch (error) {
      console.error("Forgot password request failed:", error);
    }
  };

  return (
    <div className="mb-4" style={{ width: "350px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default ForgotPassword;
