import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import RegisterPage from "./components/RegisterPage";

import SymptomAnalyzer from "./components/SymptomAnalyzer";

import RemediesPage from "./components/RemediesPage";
import UploadReport from "./components/UploadReport";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Contact from "./components/Contact";
import "./App.css"; // Import your CSS file for global styles
import Services from "./components/Services";
import About from "./components/About";


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (storedUser) {

      setUser(storedUser);

    }

  }, []);

  const handleLogin = (user) => {

    setUser(user);

    localStorage.setItem("currentUser", JSON.stringify(user));

  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  return (
    <Router>
      {user && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        {!user ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route path="/mainpage" element={<MainPage />} />
            <Route path="/symptoms" element={<SymptomAnalyzer />} />
            <Route path="/remedies/:disease" element={<RemediesPage />} />
            <Route path="/upload-report" element={<UploadReport />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<MainPage />} />
          </>
        )}
      </Routes>
    </Router>
  );

}

export default App;
 