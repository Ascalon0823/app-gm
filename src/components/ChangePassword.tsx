import { useState } from "react";
import { API_BASE_URL } from "../server.ts";
function ChangePassword() {
  const [old_password, setOldPass] = useState("");
  const [new_password, setNewPass] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(API_BASE_URL + "/change-password", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ old_password, new_password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Change password failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Change password successful:", data);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error during change password:", error);
        });
    } catch (error) {
      console.error("Change password failed:", error);
    }
  };
  return (
    <div className="mb-4" style={{ width: "350px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="old_password" className="form-label">
            Old Password:
          </label>
          <input
            className="form-control"
            type="password"
            name={old_password}
            required
            onChange={(e) => setOldPass(e.target.value)}
            id="old_password"
            placeholder="Enter your old password"
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="new_password" className="form-label">
            New Password:
          </label>
          <input
            className="form-control"
            type="password"
            name={new_password}
            required
            onChange={(e) => setNewPass(e.target.value)}
            id="new_password"
            placeholder="Enter your new password"
          />
        </div>
        <br />
        <input
          type="submit"
          value="Confirm"
          className="btn btn-primary w-100"
        />
      </form>
    </div>
  );
}
export default ChangePassword;
