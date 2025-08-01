import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Background gradient animation (same as LoginPage)
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
if (!document.getElementById("register-shineBG")) {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.id = "register-shineBG";
  styleSheet.innerText = `
    @keyframes shineBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(styleSheet);
}
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(40, 60, 90, 0.65)",
  zIndex: 1,
};
const loginWrapperStyle = {
  display: "flex",
  flexDirection: "row",
  background: "rgba(255,255,255,0.95)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  overflow: "hidden",
  width: "90%",
  maxWidth: "900px",
  zIndex: 2,
};
const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
const formSectionStyle = {
  flex: 1,
  padding: isMobile ? "2.5rem" : "2.5rem 2.5rem 2.5rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: isMobile ? 0 : "-24px"
};
const imageSectionStyle = {
  flex: 1,
  backgroundImage: `url('https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-medical-app-3d-character-illustration-png-image_11568845.png')`,
  backgroundSize: isMobile ? "contain" : "cover",
  backgroundRepeat: isMobile ? "no-repeat" : undefined,
  backgroundPosition: "center",
  minHeight: isMobile ? "220px" : "400px",
  height: isMobile ? "220px" : undefined,
};
const inputStyle = {
  margin: "0.75rem 0",
  padding: isMobile ? "0.6rem 0.7rem" : "0.9rem 1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  width: "100%",
  fontSize: isMobile ? "0.95rem" : "1rem",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
};
const buttonStyle = {
  marginTop: "1rem",
  padding: "0.9rem",
  borderRadius: "10px",
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

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("https://aidaptcareapi.azurewebsites.net/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error("Registration failed");
      alert("Registration successful! You can now log in.");
      navigate("/");
    } catch (err) {
      alert("User already exists or registration failed.");
    }
  };
  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div style={loginWrapperStyle}>
        <div style={imageSectionStyle}></div>
        <form style={formSectionStyle} onSubmit={handleRegister}>
          <h2
            style={{
              marginBottom: "2rem",
              color: "#2575fc",
              fontSize: "2rem",
              textAlign: "center"
            }}
          >
            {isMobile ? "Register for AIDaptCare" : (<><span>Register for</span><br /><span>AIDaptCare</span></>)}
          </h2>
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
          <input
            type="password"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Register</button>
          <p style={{ marginTop: "1rem", textAlign: "center" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/")} style={linkStyle}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
 