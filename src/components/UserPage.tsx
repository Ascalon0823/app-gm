import { apiUrl } from "../server.ts";
import type { User } from "../user.ts";
import { useState } from "react";
import ChangePassword from "./ChangePassword.tsx";
import Profile from "./Profile.tsx";
function UserPage({ user }: { user: User | null }) {
  const handleLogout = async () => {
    try {
      await fetch(apiUrl("/logout"), {
        method: "POST",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          console.log("Logout successful");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const [page, setPage] = useState("dashboard");
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand">Welcome, {user?.email}</a>
            <button className="btn btn-outline-success" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
        <div className="flex-grow-1 d-flex">
          <div
            className="bg-light border-end p-3 d-none d-md-block"
            style={{ width: "250px" }}
          >
            <ul className="nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setPage("dashboard")}
                  href="#"
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setPage("profile")}
                  href="#"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => setPage("change-password")}
                  href="#"
                >
                  Change Password
                </a>
              </li>

              {/* Add more items as needed */}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-grow-1 p-4">
            {page === "profile" && <Profile user={user} />}
            {page === "change-password" && <ChangePassword />}
          </div>
        </div>
        <div
          className="bg-light border-top d-md-none px-2 py-2 d-flex justify-content-center"
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <a
            className="btn btn-outline-primary me-2"
            href="#"
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </a>
          <a
            className="btn btn-outline-primary me-2"
            href="#"
            onClick={() => setPage("profile")}
          >
            Profile
          </a>
          <a
            className="btn btn-outline-primary me-2"
            href="#"
            onClick={() => setPage("change-password")}
          >
            Change password
          </a>
        </div>
      </div>
    </>
  );
}
export default UserPage;
