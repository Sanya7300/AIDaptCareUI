import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const backgroundStyle = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 40%, #00c3ff 80%, #fff200 100%)",
  backgroundSize: "400% 400%",
  animation: "shineBG 10s ease-in-out infinite",
  position: "relative",
};

// Add this global style for the shining animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes shineBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;
document.head.appendChild(styleSheet);

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(40, 60, 90, 0.65)",
  zIndex: 1,
};

const formContainerStyle = {
  position: "relative",
  zIndex: 2,
  background: "rgba(255,255,255,0.95)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  padding: "2.5rem 2rem",
  minWidth: "320px",
  maxWidth: "90vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const inputStyle = {
  margin: "0.5rem 0",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: "1rem",
};

const buttonStyle = {
  marginTop: "1rem",
  padding: "0.75rem",
  borderRadius: "8px",
  border: "none",
  background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  width: "100%",
  transition: "background 0.3s",
};

const linkStyle = {
  color: "#2575fc",
  cursor: "pointer",
  textDecoration: "underline",
};

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://aidaptcareapi.azurewebsites.net/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      onLogin({ username });
      navigate("/symptoms");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <form style={formContainerStyle} onSubmit={handleLogin}>
        <h2 style={{ marginBottom: "1.5rem", color: "#2575fc" }}>AIDaptCare</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
        <p style={{ marginTop: "1rem" }}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} style={linkStyle}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};
export default LoginPage;