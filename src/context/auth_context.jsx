import { createContext, useEffect, useState } from "react";

// WORK IN PROGRESS

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(function () {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUser(JSON.parse(storedUsers));
    }
  }, []);

  function handleLogin(user) {
    // successful login with token
    const token = "45Xj8Y";
    user.token = token;
    setUser(user);
    localStorage.setItem("users", JSON.stringify(user));
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("users");
  }
  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
