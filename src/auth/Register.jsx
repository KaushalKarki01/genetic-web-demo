import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/auth.jpg";
import "../styles/auth.css";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !role) {
      setError("Please enter necessary fileds");
      return;
    }
    const users = JSON.parse(localStorage?.getItem("users")) || [];
    const userAlreadyExists = users.some((user) => user.email === email);
    if (userAlreadyExists) {
      setError("User already exists");
      return;
    }
    const newUser = {
      id: Date.now(),
      email: email,
      password: password,
      role: role,
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    navigate("/login");
  }
  return (
    <div className="auth-container">
      <div className="register">
        <img src={logo} alt="Auth Logo" />
        <div>
          <h2 className="auth-title">Member Registration</h2>
          <form action="POST" onSubmit={handleSubmit}>
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
            <div className="member-role">
              <span>Role:</span>
              <span>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option>Select role</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </span>
            </div>
            <button className="btn auth-btn">Register</button>
          </form>
          <div className="auth-footer">
            {error && <p className="error-msg">{error}</p>}
            <span>
              Already have an account? <Link to="/login">Login here</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
