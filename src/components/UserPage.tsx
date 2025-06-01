import { API_BASE_URL } from "../server.ts";
import type { User } from "../user.ts";
function UserPage({ user }: { user: User | null }) {
  const handleLogout = async () => {
    try {
      await fetch(API_BASE_URL + "/logout", {
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
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Welcome, {user?.email}</a>
          <button className="btn btn-outline-success" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div className="bg-light border-end p-3" style={{ width: "250px" }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Change Password
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4"></div>
      </div>
    </>
  );
}
export default UserPage;
