import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoctorList from "./DoctorList";
const RemediesPage = () => {
  const { disease } = useParams();
  const navigate = useNavigate();
  const [remedies, setRemedies] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const lastResult = JSON.parse(localStorage.getItem("lastResult"));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (lastResult?.condition === disease && lastResult?.remedies?.length > 0) {
      setRemedies(
        lastResult.remedies.map((r) => ({
          title: r,
          desc: "This remedy is suggested based on your symptom analysis."
        }))
      );
    }
  }, [disease, lastResult]);
  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const question = chatInput.trim();
    setChatMessages((prev) => [...prev, `🧑 You: ${question}`]);
    setChatInput("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://aidaptcareapi.azurewebsites.net/api/symptom/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symptoms: lastResult?.symptoms || [],
          condition: lastResult?.condition || "unknown",
          question,
        }),
      });
      const data = await response.json();
      setChatMessages((prev) => [...prev, `🤖 Assistant: ${data.reply}`]);
    } catch (err) {
      setChatMessages((prev) => [...prev, "⚠️ AI Assistant failed. Try again."]);
    } finally {
      setLoading(false);
    }
  };
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
        {remedies.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
            No remedies found. Please analyze symptoms first.
          </p>
        )}
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
          Ask AI Assistant
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
            AI Assistant
            <button
              onClick={() => {
                setChatMessages([]);
                setShowChat(false);
              }}
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
              <p>This is an AI assistant. Ask a health-related question!</p>
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
            {loading && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                  {/* Animated loader icon */}
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 50 50"
                    style={{ marginBottom: "8px" }}
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#0288d1"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="31.4 94.2"
                      strokeDashoffset="0"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid #eee",
              background: "#fafafa",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Ask something..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              style={{
                width: "80%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                marginRight: "12px",
              }}
              disabled={loading}
            />
            <button
              style={{
                background: "#0288d1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
              onClick={handleSend}
              disabled={loading}
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