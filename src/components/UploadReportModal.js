import React, { useState, useRef } from "react";
const UploadReportModal = ({ onClose }) => {
 const [file, setFile] = useState(null);
 const [status, setStatus] = useState("");
 const [isUploading, setIsUploading] = useState(false);
 const [diagnosis, setDiagnosis] = useState("");
 const fileInputRef = useRef();
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
     const response = await fetch("http://localhost:5000/api/report/upload", {
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
 return (
<div style={{
     position: "fixed",
     top: 0, left: 0, right: 0, bottom: 0,
     backgroundColor: "rgba(0,0,0,0.5)",
     display: "flex", alignItems: "center", justifyContent: "center",
     zIndex: 9999
   }}>
<div style={{
       backgroundColor: "#fff",
       borderRadius: "16px",
       padding: "2rem",
       width: "90%",
       maxWidth: "560px",
       boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
       position: "relative"
     }}>
<button
         onClick={onClose}
         style={{
           position: "absolute", top: "12px", right: "16px",
           background: "transparent",
           border: "none",
           fontSize: "1.5rem",
           cursor: "pointer",
           color: "#888"
         }}
         aria-label="Close"
>×</button>
<div style={{ textAlign: "center" }}>
<div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📄</div>
<h2 style={{
           marginBottom: "1rem",
           fontSize: "1.75rem",
           fontWeight: "600",
           color: "#2c3e50"
         }}>
           Upload Medical Report
</h2>
</div>
<input
         type="file"
         ref={fileInputRef}
         onChange={handleFileChange}
         style={{ display: "none" }}
       />
<div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
<button
           type="button"
           style={{
             backgroundColor: "#26a69a",
             color: "#fff",
             border: "none",
             padding: "10px 20px",
             borderRadius: "8px",
             cursor: "pointer",
             fontWeight: "500"
           }}
           onClick={handleFileButtonClick}
>
           Choose File
</button>
<form onSubmit={handleSubmit}>
<button
             type="submit"
             disabled={isUploading}
             style={{
               backgroundColor: "#3f51b5",
               color: "#fff",
               border: "none",
               padding: "10px 20px",
               borderRadius: "8px",
               cursor: isUploading ? "not-allowed" : "pointer",
               opacity: isUploading ? 0.7 : 1
             }}
>
             {isUploading ? "Uploading..." : "Upload"}
</button>
</form>
</div>
       {file && <p style={{ textAlign: "center", fontStyle: "italic", color: "#555", marginTop: "0.75rem" }}>{file.name}</p>}
       {status && (
<p style={{
           marginTop: "1rem",
           color: status.startsWith("Upload failed") || status.startsWith("An error") ? "#e53935" : "#388e3c",
           fontWeight: "bold",
           textAlign: "center"
         }}>
           {status}
</p>
       )}
       {diagnosis && (
<div style={{
           marginTop: "1.5rem",
           backgroundColor: "#f1f8e9",
           borderRadius: "8px",
           border: "1px solid #c5e1a5",
           padding: "1rem"
         }}>
<p style={{ fontWeight: "bold", color: "#2e7d32", marginBottom: "0.5rem" }}>Diagnosis:</p>
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
 );
};
export default UploadReportModal;