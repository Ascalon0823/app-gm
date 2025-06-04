import { useEffect, useState } from "react";
import { apiUrl } from "./server";
import LandingPage from "./components/LandingPage";
import UserPage from "./components/UserPage";
import type { User } from "./user.ts";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(apiUrl("/me"), {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Authentication check failed");
        }
        return response.json();
      })
      .then((data: User) => {
        setUser(data);
        setAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error during authentication check:", error);
        setAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <Routes>
      <Route path="/password-forgot" element={<ForgotPassword />} />
      <Route path="/password-reset" element={<ResetPassword />} />
      <Route
        path="/"
        element={
          authenticated && user ? <UserPage user={user} /> : <LandingPage />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;
