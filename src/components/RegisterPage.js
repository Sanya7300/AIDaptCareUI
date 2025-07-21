import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();
 const handleRegister = (e) => {
   e.preventDefault();
   const users = JSON.parse(localStorage.getItem("users")) || [];
   if (users.find((u) => u.username === username)) {
     alert("User already exists.");
   } else {
     const newUser = { username, password, history: [] };
     localStorage.setItem("users", JSON.stringify([...users, newUser]));
     alert("Registration successful! Please log in.");
     navigate("/");
   }
 };
 return (
<div className="page-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
<form className="form-container" onSubmit={handleRegister}>
<h2>Create Account</h2>
<input
         type="text"
         placeholder="Choose a username"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         required
       />
<input
         type="password"
         placeholder="Choose a password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
<button type="submit">Register</button>
<p style={{ marginTop: "1rem" }}>
         Already have an account?{" "}
<span style={{ color: "#1976d2", cursor: "pointer" }} onClick={() => navigate("/")}>
           Login
</span>
</p>
</form>
</div>
 );
};
export default RegisterPage;