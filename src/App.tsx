import { useEffect, useState } from "react";
import { API_BASE_URL } from "./server";
import LandingPage from "./components/LandingPage";
import UserPage from "./components/UserPage";
import type { User } from "./user.ts";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    console.log(API_BASE_URL);
    fetch(API_BASE_URL + "/me", {
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
      });
  }, []);
  if (!authenticated) return <LandingPage />;

  return <UserPage user={user} />;
}
export default App;
