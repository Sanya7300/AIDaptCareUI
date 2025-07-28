import React from "react";
import DoctorList from "./DoctorList";
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
  const [showChat, setShowChat] = React.useState(false);
  const [showDoctors, setShowDoctors] = React.useState(false);
  const [chatMessages, setChatMessages] = React.useState([]);
  const [chatInput, setChatInput] = React.useState("");

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
    <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
      <button
        style={{
          backgroundColor: "#43a047",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
          boxShadow: "0 4px 10px rgba(67, 160, 71, 0.2)",
        }}
        onClick={() => setShowDoctors(true)}
      >
        Consult a Doctor
      </button>
      <button
        style={{
          backgroundColor: "#0288d1",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem",
          boxShadow: "0 4px 10px rgba(2, 136, 209, 0.2)",
        }}
        onClick={() => setShowChat(true)}
      >
        Live Chat
      </button>
    </div>
    {showDoctors && <DoctorList onClose={() => setShowDoctors(false)} />}
    {showChat && (
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "340px",
          height: "420px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            background: "#0288d1",
            color: "white",
            padding: "12px 16px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "600",
          }}
        >
          Live Chat
          <button
            onClick={() => setShowChat(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.2rem",
              cursor: "pointer",
              marginLeft: "8px",
            }}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div style={{ flex: 1, padding: "16px", overflowY: "auto", color: "#333" }}>
          {chatMessages.length === 0 ? (
            <p>This is a demo chatbox. Start your conversation here.</p>
          ) : (
            chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f0f0f0",
                  color: "#333",
                  borderRadius: "12px",
                  padding: "8px 14px",
                  marginBottom: "10px",
                  alignSelf: "flex-start",
                  maxWidth: "85%",
                  wordBreak: "break-word",
                }}
              >
                {msg}
              </div>
            ))
          )}
        </div>
        <div style={{ padding: "12px 16px", borderTop: "1px solid #eee", background: "#fafafa", display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Type your message..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && chatInput.trim()) {
                setChatMessages([...chatMessages, chatInput.trim()]);
                setChatInput("");
              }
            }}
            style={{
              width: "80%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              marginTop: "8px",
              marginRight: "12px",
            }}
          />
          <button
            style={{
              background: "#0288d1",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "8px 14px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px",
            }}
            onClick={() => {
              if (chatInput.trim()) {
                setChatMessages([...chatMessages, chatInput.trim()]);
                setChatInput("");
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    )}
  </div>
);
};
export default RemediesPage;