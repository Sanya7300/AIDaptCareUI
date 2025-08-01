import React, { useState, useRef } from "react";
import {  useNavigate } from "react-router-dom";
const UploadReport = () => {
 const [file, setFile] = useState(null);
 const [status, setStatus] = useState("");
 const [isUploading, setIsUploading] = useState(false);
 const [diagnosis, setDiagnosis] = useState("");
 const fileInputRef = useRef();
 const navigate = useNavigate();
 const handleFileChange = (e) => {
   setFile(e.target.files[0]);
   setStatus("");
   setDiagnosis("");
 };
 const handleFileButtonClick = () => {
   fileInputRef.current.click();
 };
 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!file) {
     setStatus("Please select a file to upload.");
     return;
   }
   const formData = new FormData();
   formData.append("file", file);
   try {
     setIsUploading(true);
     setStatus("Uploading and analyzing...");
     const response = await fetch("https://aidaptcareapi.azurewebsites.net/api/researchdocument/upload", {
       method: "POST",
       body: formData,
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
     });
     const data = await response.json();
     if (response.ok) {
       setStatus("Analysis completed successfully!");
       setDiagnosis(data.diagnosis || "No diagnosis returned.");
     } else {
       setStatus(`Upload failed: ${data.message || "Unknown error"}`);
     }
   } catch (error) {
     console.error(error);
     setStatus("An error occurred during upload.");
   } finally {
     setIsUploading(false);
   }
 };

 const containerStyle = {
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   minHeight: "100vh",
   background: "linear-gradient(to right, #fdfbfb, #ebedee)",
   fontFamily: "Segoe UI, sans-serif",
   padding: "2rem",
 };
 const cardStyle = {
   backgroundColor: "#fff",
   padding: "2rem",
   borderRadius: "16px",
   boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
   width: "100%",
   maxWidth: "520px",
   textAlign: "center",
   transition: "all 0.3s ease",
 };
 const headingStyle = {
   marginBottom: "1rem",
   fontSize: "1.75rem",
   fontWeight: "600",
   color: "#2c3e50",
 };
 const fileNameStyle = {
   marginBottom: "1rem",
   color: "#777",
   fontSize: "0.95rem",
   fontStyle: "italic",
 };
 const buttonStyleBase = {
   padding: "0.7rem 1.5rem",
   color: "#fff",
   border: "none",
   borderRadius: "8px",
   cursor: "pointer",
   fontSize: "1rem",
   transition: "background-color 0.3s ease",
   marginTop: "0.5rem",
   marginBottom: "1rem",
 };
 const chooseButtonStyle = {
   ...buttonStyleBase,
   backgroundColor: "#26a69a",
 };
 const uploadButtonStyle = {
   ...buttonStyleBase,
   backgroundColor: "#3f51b5",
   opacity: isUploading ? 0.7 : 1,
 };
 const statusStyle = {
   marginTop: "1rem",
   color: status.startsWith("Upload failed") || status.startsWith("An error")
     ? "#e53935"
     : "#388e3c",
   fontWeight: "bold",
   fontSize: "1rem",
 };
 const diagnosisBoxStyle = {
   marginTop: "1.5rem",
   textAlign: "left",
   padding: "1rem",
   backgroundColor: "#f1f8e9",
   borderRadius: "8px",
   border: "1px solid #c5e1a5",
 };
 const diagnosisTitleStyle = {
   fontWeight: "bold",
   marginBottom: "0.5rem",
   color: "#2e7d32",
   fontSize: "1.1rem",
 };
 const iconStyle = {
   fontSize: "2.5rem",
   color: "#42a5f5",
   marginBottom: "1rem",
 };
 return (
  <>
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
          top: "2rem",
          left: "4rem",
          position: "relative",
          marginRight: "1rem",
          boxShadow: "0 4px 10px rgba(25, 118, 210, 0.4)",
          fontWeight: "600",
        }}
      >
        ← Back
      </button>
<div style={{ ...containerStyle, alignItems: "flex-start", justifyContent: "flex-start", paddingLeft: "5vw", paddingTop: "5vh" }}>
<div style={cardStyle}>
<div style={iconStyle}>📄</div>
<h2 style={headingStyle}>Upload Medical Report</h2>
       {/* Hidden File Input */}
<input
         type="file"
         ref={fileInputRef}
         onChange={handleFileChange}
         style={{ display: "none" }}
       />
       {/* Choose File Button */}
<button
         type="button"
         style={chooseButtonStyle}
         onClick={handleFileButtonClick}
>
         Choose File
</button>
       {/* Selected File Name */}
       {file && <p style={fileNameStyle}>{file.name}</p>}
       {/* Upload Button */}
<form onSubmit={handleSubmit}>
<button type="submit" style={uploadButtonStyle} disabled={isUploading}>
           {isUploading ? "Uploading..." : "Upload"}
</button>
</form>
       {/* Upload Status */}
       {status && <p style={statusStyle}>{status}</p>}
       {/* Diagnosis Result */}
       {diagnosis && (
<div style={diagnosisBoxStyle}>
<p style={diagnosisTitleStyle}>Diagnosis:</p>
<ul style={{ paddingLeft: "1.2rem", color: "#33691e", margin: 0 }}>
             {diagnosis
               .split(/\n|(?<=\d\.)/)
               .map((item, index) => {
                 const clean = item.trim().replace(/^[-•\d.\s]*/, "");
                 return clean ? <li key={index}>{clean}</li> : null;
               })}
</ul>
</div>
       )}
</div>
</div>
</>
 );
};
export default UploadReport;