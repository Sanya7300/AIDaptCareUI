import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import RegisterPage from "./components/RegisterPage";

import SymptomAnalyzer from "./components/SymptomAnalyzer";

import RemediesPage from "./components/RemediesPage";
import UploadReport from "./components/UploadReport";
import Header from "./components/Header";


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
      {user && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <SymptomAnalyzer user={user} onLogout={handleLogout} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/symptoms" element={<SymptomAnalyzer user={user} onLogout={handleLogout} />} />
        <Route path="/remedies/:disease" element={<RemediesPage />} />
        <Route path="/upload-report" element={<UploadReport />} />
      </Routes>
    </Router>
  );

}

export default App;
 