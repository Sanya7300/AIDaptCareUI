import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import DoctorList from "./DoctorList";
const RemediesPage = () => {
  const navigate = useNavigate();
  const [remedies, setRemedies] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const lastResult = JSON.parse(localStorage.getItem("lastResult"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (lastResult) {
    const cards = [];

     if (lastResult.condition && lastResult.condition.length > 0) {
      cards.push({
        title: "Condition",
        desc: Array.isArray(lastResult.condition)
          ? lastResult.condition.join(", ")
          : lastResult.condition
      });
    }

    if (lastResult.remedies && lastResult.remedies.length > 0) {
      cards.push({
        title: "Home Remedies",
        desc: Array.isArray(lastResult.remedies)
          ? lastResult.remedies.join(", ")
          : lastResult.remedies
      });
    }

    if (lastResult.medicines && lastResult.medicines.length > 0) {
      cards.push({
        title: "Recommended Medicines",
        desc: Array.isArray(lastResult.medicines)
          ? lastResult.medicines.join(", ")
          : lastResult.medicines
      });
    }

    if (lastResult.recommendedTests && lastResult.recommendedTests.length > 0) {
      cards.push({
        title: "Recommended Tests",
        desc: Array.isArray(lastResult.recommendedTests)
          ? lastResult.recommendedTests.join(", ")
          : lastResult.recommendedTests
      });
    }

    setRemedies(cards);
  } 
  }, [lastResult]);



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
    <div className="page-container" style={{ maxWidth: "1100px", margin: "2rem auto" }}>
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
      {/* Rendering all cards here */}
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
          textAlign: "center",
          color: "#1976d2",
          fontWeight: "700",
          fontSize: "2rem",
          letterSpacing: "1px",
          marginBottom: "1.5rem",
          background: "linear-gradient(90deg, #1976d2 0%, #43a047 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
            }}
          >
            {lastResult?.predictedCondition
          ? `Remedies & Recommendations for ${lastResult.predictedCondition}`
          : "Remedies & Recommendations"}
          </h2>
          <div
            className="remedies-grid"
            style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          minHeight: 400,
          maxWidth: 900,
          margin: "0 auto",
            }}
          >
            {remedies.map(({ title, desc }) => (
          <div
            key={title}
            className="remedy-card"
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "28px 24px",
              boxShadow: "0 8px 24px rgba(25, 118, 210, 0.10)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              minHeight: "unset",
              border: "3px solid transparent",
              backgroundImage:
            "linear-gradient(white, white), linear-gradient(120deg, #1976d2, #43a047, #ffd600, #1976d2)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              transition: "box-shadow 0.2s",
              height: "auto",
            }}
          >
            <h3
              style={{
            color: "#1976d2",
            marginBottom: "12px",
            fontWeight: "600",
            fontSize: "1.2rem",
            letterSpacing: "0.5px",
              }}
            >
              {title}
            </h3>
            {Array.isArray(desc) ? (
              <ul style={{ color: "#444", fontSize: "1rem", paddingLeft: "1.2rem", margin: 0 }}>
            {desc.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "0.5em" }}>
                {item}
              </li>
            ))}
              </ul>
            ) : (
              <ul style={{ color: "#444", fontSize: "1rem", paddingLeft: "1.2rem", margin: 0 }}>
            {desc
              .split(",")
              .map((item, idx) => (
                <li key={idx} style={{ marginBottom: "0.5em" }}>
              {item.trim()}
                </li>
              ))}
              </ul>
            )}
          </div>
            ))}
          </div>
          <style>
            {`
          @media (max-width: 700px) {
            .remedies-grid {
              grid-template-columns: 1fr !important;
              gap: 1.2rem !important;
              max-width: 98vw !important;
            }
            .remedy-card {
              padding: 18px 10px !important;
              font-size: 0.98rem !important;
            }
            h2 {
              font-size: 1.3rem !important;
            }
          }
          .remedy-card {
            border: 3px solid transparent;
            background-image: linear-gradient(white, white), linear-gradient(120deg, #1976d2, #43a047, #ffd600, #1976d2);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            box-shadow: 0 8px 24px rgba(25, 118, 210, 0.10);
            transition: box-shadow 0.2s;
          }
          .remedy-card:hover {
            box-shadow: 0 12px 32px rgba(25, 118, 210, 0.18);
          }
            `}
          </style>
        </div>
        {/* Doctor list */}
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