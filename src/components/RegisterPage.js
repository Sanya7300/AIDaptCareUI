import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {

    e.preventDefault();

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
<div

      className="page-container"

      style={{

        minHeight: "100vh",

        display: "flex",

        alignItems: "center",

        justifyContent: "center"

      }}
>
<form className="form-container" onSubmit={handleRegister}>
<h2>Register</h2>
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
<button type="submit">Register</button>
<p>

          Already have an account?{" "}
<span onClick={() => navigate("/")} style={{ color: "blue", cursor: "pointer" }}>

            Login
</span>
</p>
</form>
</div>

  );

};

export default RegisterPage;
 