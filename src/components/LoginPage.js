import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/aidaptcare.png"; // Import your image

// Background gradient animation
const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
const backgroundStyle = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${backgroundImage})`, // Use backgroundImage
  backgroundSize: "cover", // Or "contain" depending on your needs
  backgroundRepeat: "no-repeat",
  position: "relative",
};

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
// Overlay blur
const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(40, 60, 90, 0.65)",
  zIndex: 1,
};

// Container layout
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
// Form section
const formSectionStyle = {
  flex: 1,
  padding: isMobile ? "2.5rem" : "2.5rem 2.5rem 2.5rem 1.2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: isMobile ? 0 : "-24px"
};

// Image section
const imageSectionStyle = {
  flex: 1,
  backgroundImage: `url('https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-medical-app-3d-character-illustration-png-image_11568845.png')`,
  backgroundSize: isMobile ? "contain" : "cover",
  backgroundRepeat: isMobile ? "no-repeat" : undefined,
  backgroundPosition: "center",
  minHeight: isMobile ? "220px" : "400px",
  height: isMobile ? "220px" : undefined,
};
// Input
const inputStyle = {
  margin: "0.75rem 0",
  padding: "0.9rem 1rem",
  borderRadius: "8px",
  border: "1px solid #a0a0a0", // Improved border color
  width: "100%",
  fontSize: "1rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // More subtle shadow
  transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  "&:focus": {
    borderColor: "#007bff",
    outline: 0,
    boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
  },
};


const headingStyle = {
  backgroundImage: "linear-gradient(90deg, #80cc08 0%, #2575fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};
// Button
const buttonStyle = {
 marginTop: "1rem",
 padding: "0.9rem",
 borderRadius: "10px",
 border: "none",
 background: "linear-gradient(90deg, #80cc08 0%, #2575fc 100%)",
 color: "#fff",
 fontWeight: "bold",
 fontSize: "1rem",
 cursor: "pointer",
 width: "100%",
 transition: "background 0.3s",
};
// Link
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
     navigate("/mainpage")
    // navigate("/symptoms");
   } catch (err) {
     alert("Invalid credentials. Please try again.");
   }
 };
return (
  <div style={backgroundStyle}>
    <div style={overlayStyle}></div>
    <div style={loginWrapperStyle}>
      <div style={imageSectionStyle}></div>
      <form style={formSectionStyle} onSubmit={handleLogin}>
        <h2
          style={{
            marginBottom: "2rem",
            color: "#2575fc",
            fontSize: "2rem",
            textAlign: "center"
          }}
        >
          {isMobile ? "Welcome to AIDaptCare" : (<><span style={headingStyle}>Welcome to</span>
                <br />
                <span style={headingStyle}>AIDaptCare</span></>)}
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
        <button type="submit" style={buttonStyle}>Login</button>
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} style={linkStyle}>
            Register
          </span>
        </p>
      </form>
    </div>
  </div>
);
};
export default LoginPage;