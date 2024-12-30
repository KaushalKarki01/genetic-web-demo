import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import Register from "./auth/Register";
import AppLayout from "./components/AppLayout";
import ChatBox from "./features/Chat/ChatBox";
import Profile from "./features/profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
  }
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute user={user}>
          <AppLayout onLogout={handleLogout} user={user} />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard/profile",
          element: <Profile />,
        },

        {
          path: "/dashboard/chat",
          element: <ChatBox />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage onLogin={handleLogin} />,
    },

    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
