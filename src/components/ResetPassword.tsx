import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../server.ts";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const password_reset_token = searchParams.get("token");
  const email = searchParams.get("email");
  const [new_password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(apiUrl("/password-reset"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password_reset_token, new_password }),
    });

    if (res.ok) {
      alert("Password reset successful!");
      navigate("/");
    } else {
      alert("Failed to reset password.");
    }
  };
  if (!email) return <div>Invalid email</div>;
  if (!password_reset_token) return <div>Invalid reset token</div>;

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New password"
          value={new_password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
}
export default ResetPassword;
