import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = ({ onLogin }) => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const handleLogin = (e) => {
   e.preventDefault();
   const users = JSON.parse(localStorage.getItem("users")) || [];
   const user = users.find(
     (u) => u.username === username && u.password === password
   );
   if (user) {
     onLogin(user);
   } else {
     alert("Invalid credentials. Please try again.");
   }
 };
 return (
<div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
<form className="form-container" onSubmit={handleLogin}>
<h2>AIDaptCare</h2>
<input
         type="text"
         placeholder="Username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         required
       />
<input
         type="password"
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
<button type="submit">Login</button>
<p style={{ marginTop: "1rem" }}>
         Don't have an account?{" "}
<span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/register")}>
           Register here
</span>
</p>
</form>
</div>
 );
};
export default LoginPage;