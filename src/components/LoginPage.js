import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
<div
     className="page-container"
     style={{
       minHeight: "100vh",
       display: "flex",
       alignItems: "center",
       justifyContent: "center"
     }}
>
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
<p>
         Don't have an account?{" "}
<span onClick={() => navigate("/register")} style={{ color: "blue", cursor: "pointer" }}>
           Register
</span>
</p>
</form>
</div>
 );
};
export default LoginPage;