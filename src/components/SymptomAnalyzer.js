import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChartHistory from "./ChartHistory";
const symptomsList = [
 "fatigue", "frequent urination", "blurred vision", "weight loss",
 "swelling", "shortness of breath", "dizziness", "high BP", "headache"
];
const SymptomAnalyzer = ({ user, onLogout }) => {
 const [selected, setSelected] = useState([]);
 const [predicted, setPredicted] = useState("");
 const [history, setHistory] = useState([]);
 const [warning, setWarning] = useState("");
 const navigate = useNavigate();
 useEffect(() => {
   const fetchHistory = async () => {
     const username = localStorage.getItem("username");
     const token = localStorage.getItem("token");
     try {
       const response = await fetch(`https://aidaptcareapi.azurewebsites.net/api/symptom/history/${username}`, {
         headers: {
           Authorization: `Bearer ${token}`
         }
       });
       if (!response.ok) throw new Error("Failed to fetch history");
       const data = await response.json();
       setHistory(data.slice(-5));
     } catch (error) {
       console.error("Error fetching history:", error);
     }
   };
   fetchHistory();
 }, []);
 const handleCheck = (symptom) => {
   setSelected((prev) =>
     prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
   );
   setWarning("");
 };
 const predictDisease = async () => {
   if (selected.length === 0) {
     setWarning("Please select at least one symptom to analyze.");
     return;
   }
   const token = localStorage.getItem("token");
   const username = localStorage.getItem("username");
   try {
     const response = await fetch("https://aidaptcareapi.azurewebsites.net/api/symptom/analyze", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify({
         username,
         symptoms: selected
       })
     });
     if (!response.ok) throw new Error("Failed to analyze");
     const data = await response.json();
     setPredicted(data.condition);
     setHistory(data.history.slice(-5)); // use updated history
     localStorage.setItem("lastResult", JSON.stringify(data));
   } catch (err) {
     console.error("Prediction error:", err);
     setWarning("Failed to analyze symptoms. Please try again.");
   }
 };
 return (
<div className="page-container">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<h2>Symptom Analyzer</h2>
<button
         onClick={onLogout}
         style={{
           background: "#e53935",
           color: "#fff",
           borderRadius: "6px",
           border: "none",
           padding: "8px 12px",
           cursor: "pointer"
         }}
>
         Logout
</button>
</div>
     {warning && (
<div
         style={{
           backgroundColor: "#ffebee",
           color: "#c62828",
           padding: "10px 14px",
           borderRadius: "8px",
           marginTop: "1rem",
           fontWeight: "600",
           textAlign: "center"
         }}
>
         {warning}
</div>
     )}
<div
       style={{
         marginTop: "1.5rem",
         display: "grid",
         gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
         gap: "1rem"
       }}
>
       {symptomsList.map((symptom) => (
<label key={symptom} className="symptom-card">
<input
             type="checkbox"
             checked={selected.includes(symptom)}
             onChange={() => handleCheck(symptom)}
           />
           {symptom}
</label>
       ))}
</div>
<button
       onClick={predictDisease}
       style={{
         marginTop: "1.5rem",
         backgroundColor: "#1976d2",
         color: "#fff",
         border: "none",
         padding: "12px 20px",
         borderRadius: "8px",
         fontSize: "1.1rem",
         cursor: "pointer",
         boxShadow: "0 6px 12px rgba(25, 118, 210, 0.3)",
         transition: "background-color 0.3s ease"
       }}
       onMouseEnter={(e) => (e.target.style.backgroundColor = "#155a9a")}
       onMouseLeave={(e) => (e.target.style.backgroundColor = "#1976d2")}
>
       Analyze Symptoms
</button>
     {predicted && (
<div className="tag" style={{ marginTop: "1.2rem" }}>
         Predicted Condition: <strong>{predicted}</strong>
         {predicted !== "Unknown" && (
<button
             style={{
               marginLeft: 12,
               padding: "6px 14px",
               cursor: "pointer",
               borderRadius: "20px",
               border: "none",
               backgroundColor: "#0288d1",
               color: "white",
               fontWeight: "600",
               boxShadow: "0 4px 10px rgba(2, 136, 209, 0.6)"
             }}
             onClick={() => navigate(`/remedies/${predicted}`)}
>
             View Remedies
</button>
         )}
</div>
     )}
     {history.length > 0 && (
<div className="chart-container">
<ChartHistory history={history} />
</div>
     )}
</div>
 );
};
export default SymptomAnalyzer;