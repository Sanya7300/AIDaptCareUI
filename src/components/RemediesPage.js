import React from "react";
import { useParams, useNavigate } from "react-router-dom";
const remediesData = {
 Diabetes: [
   { title: "Cinnamon Tea", desc: "May help improve insulin sensitivity." },
   { title: "Fenugreek Seeds", desc: "Rich in soluble fiber, helps control blood sugar." },
   { title: "Exercise", desc: "Regular activity helps control blood glucose levels." },
 ],
 Hypertension: [
   { title: "Garlic", desc: "Can help lower blood pressure naturally." },
   { title: "Potassium-Rich Foods", desc: "Helps balance sodium levels." },
   { title: "Relaxation Techniques", desc: "Reduces stress and lowers blood pressure." },
 ],
 "Kidney Disorder": [
   { title: "Stay Hydrated", desc: "Drinking water supports kidney function." },
   { title: "Avoid Excess Salt", desc: "Reduces kidney workload." },
   { title: "Eat Antioxidant-Rich Foods", desc: "Helps protect kidney cells." },
 ],
};
const RemediesPage = () => {
 const { disease } = useParams();
 const navigate = useNavigate();
 const remedies = remediesData[disease] || [];
 return (
<div className="page-container" style={{ maxWidth: "700px", margin: "2rem auto" }}>
<button
       onClick={() => navigate(-1)}
       style={{
         marginBottom: "1.5rem",
         backgroundColor: "#1976d2",
         color: "white",
         border: "none",
         padding: "8px 16px",
         borderRadius: "8px",
         cursor: "pointer",
         boxShadow: "0 4px 10px rgba(25, 118, 210, 0.4)",
         fontWeight: "600",
       }}
>
       ← Back
</button>
<h2 style={{ color: "#1976d2", marginBottom: "1.5rem", textAlign: "center" }}>
       Home Remedies for {disease}
</h2>
<div
       style={{
         display: "grid",
         gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
         gap: "1.5rem",
       }}
>
       {remedies.length === 0 && <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No remedies found.</p>}
       {remedies.map(({ title, desc }) => (
<div
           key={title}
           style={{
             backgroundColor: "white",
             borderRadius: "12px",
             padding: "20px",
             boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
             transition: "transform 0.3s ease, box-shadow 0.3s ease",
             cursor: "default",
           }}
           className="remedy-card"
>
<h3 style={{ color: "#1565c0", marginBottom: "8px" }}>{title}</h3>
<p style={{ color: "#555", fontSize: "0.95rem", lineHeight: "1.4" }}>{desc}</p>
</div>
       ))}
</div>
</div>
 );
};
export default RemediesPage;