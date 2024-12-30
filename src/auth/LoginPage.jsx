import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/auth.jpg";
import "../styles/auth.css";
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      setError("No user found with this credentials.");
      return;
    }
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      setError("Incorrect email or password.");
      return;
    }
    onLogin(user);
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="login">
        <img src={logo} alt="Auth Logo" />
        <div>
          <h2 className="auth-title">Member Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn auth-btn">Login</button>
          </form>
          <div className="auth-footer">
            {error && <p className="error-msg">{error}</p>}
            <span>
              <Link>Forgot Password?</Link>
            </span>
            <span>
              Don&apos;t have an account?{" "}
              <Link to="/register">Create here</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
