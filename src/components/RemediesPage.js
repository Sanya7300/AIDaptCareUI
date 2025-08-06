import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorList from "./DoctorList";
const RemediesPage = () => {
  const navigate = useNavigate();
  const [remedies, setRemedies] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showDoctors, setShowDoctors] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const lastResult = JSON.parse(localStorage.getItem("lastResult"));
  const cardImages = {
    "Condition": "https://media.istockphoto.com/id/1142528978/photo/online-healthcare-app-on-smartphone-screen.jpg?s=612x612&w=0&k=20&c=pInNKv-lTQtNrM2bp1hGgrwFs-GaHBv9_lS3l_COpdw=",
    "Home Remedies": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/04/Spoons_Spices_1296x728-header.jpg?h=1528",
    "Medicines": "https://thumbs.dreamstime.com/b/clean-informative-image-featuring-pill-bottle-capsules-spilling-out-background-completely-white-which-helps-to-378267684.jpg",
    "Tests": "https://oneaestheticsclinic.com/wp-content/uploads/2024/09/Untitled-design-2024-09-30T093840.756-1024x1024.webp",
    "Diagnosis": "https://media.licdn.com/dms/image/v2/C5112AQF3TYfMKPlJdQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1573310889137?e=2147483647&v=beta&t=MWUwApHhNhiKiayYi2FSCNjlcYd6bhy3xHYws4czXTA",
    " ": "https://www.theaestheticfoundation.org/_next/image?url=https:%2F%2Fimages.ctfassets.net%2Fazjqjrnb1bv8%2F3o8aaxRTjwYiT2hT9WWK7Z%2Fe5f0e6f5788f2fa6e7548bd834583df5%2FGettyImages-500536318.jpg&w=3840&q=75"
  };
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
  }
  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    recognition.start();
    recognition.onstart = () => {
      console.log("Voice recognition started...");
    };
    recognition.onspeechend = () => {
      recognition.stop();
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatInput(transcript);
    };
  };
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
          title: "Medicines",
          desc: Array.isArray(lastResult.medicines)
            ? lastResult.medicines.join(", ")
            : lastResult.medicines
        });
      }
      if (lastResult.recommendedTests && lastResult.recommendedTests.length > 0) {
        cards.push({
          title: "Tests",
          desc: Array.isArray(lastResult.recommendedTests)
            ? lastResult.recommendedTests.join(", ")
            : lastResult.recommendedTests
        });
      }
      if (lastResult.diagnosis || lastResult.treatment) {
        cards.push({
          title: "Diagnosis",
          desc: `${lastResult.diagnosis || ""}\n${lastResult.treatment || ""}`
        });
      }
      if (lastResult.researchLinks && lastResult.researchLinks.length > 0) {
        cards.push({
          title: "Research",
          desc: lastResult.researchLinks.map((link) => (
            <a key={link} href={link} target="_blank" rel="noreferrer">
              {link}
            </a>
          ))
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
      const response = await fetch(
        "https://aidaptcareapi.azurewebsites.net/api/symptom/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            symptoms: lastResult?.symptoms || [],
            condition: lastResult?.predictedCondition || "unknown",
            question
          })
        }
      );
      const data = await response.json();
      setChatMessages((prev) => [...prev, `🤖 Assistant: ${data.reply}`]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        "⚠️ AI Assistant failed. Try again."
      ]);
    } finally {
      setLoading(false);
    }
  };
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert("Speech Synthesis not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // Normal speed
    window.speechSynthesis.speak(utterance);
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
          fontWeight: "600"
        }}
      >
        ← Back
      </button>
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
          WebkitTextFillColor: "transparent"
        }}
      >
        {lastResult?.predictedCondition
          ? `Remedies & Recommendations for ${lastResult.predictedCondition}`
          : "Remedies & Recommendations"}
      </h2>
      {/* Card Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "2rem"
        }}
      >
        {remedies.map((card, idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              minHeight: "320px",
              border: "3px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(120deg, #1976d2, #43a047, #ffd600, #1976d2)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                speakText(
                  Array.isArray(card.desc)
                    ? card.desc.join(", ")
                    : typeof card.desc === "string"
                      ? card.desc
                      : ""
                );
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "50%",
                padding: "8px",
                cursor: "pointer",
                fontSize: "1.2rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            >
              🔊
            </button>
            <img
              src={cardImages[card.title] || cardImages.Condition}
              alt={card.title}
              style={{
                width: "100%",
                height: "260px",
                objectFit: "cover",
                filter: "brightness(0.85)"
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCard(card);
              }}
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "10px 24px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
              }}
            >
              {card.title}
            </button>
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedCard && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease"
          }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "25px",
              width: "90%",
              maxWidth: "550px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              border: "3px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(120deg, #1976d2, #43a047, #ffd600, #1976d2)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              animation: "scaleUp 0.3s ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: "15px", color: "#1976d2" }}>
              {selectedCard.title}
            </h3>
            <button
              onClick={() => {
                speakText(
                  Array.isArray(selectedCard.desc)
                    ? selectedCard.desc.join(", ")
                    : typeof selectedCard.desc === "string"
                      ? selectedCard.desc
                      : ""
                );
              }}
              style={{
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "6px 12px",
                marginBottom: "15px",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}
            >
              🔊 Listen
            </button>
            <div style={{ color: "#444", fontSize: "1rem" }}>
              {Array.isArray(selectedCard.desc) ? (
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  {selectedCard.desc.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "0.5em", lineHeight: "1.5" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : typeof selectedCard.desc === "string" ? (
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  {selectedCard.desc.split(/[\n,]/).map((line, idx) => (
                    <li key={idx} style={{ marginBottom: "0.5em", lineHeight: "1.5" }}>
                      {line.trim()}
                    </li>
                  ))}
                </ul>
              ) : (
                selectedCard.desc
              )}
            </div>
            <button
              onClick={() => setSelectedCard(null)}
              style={{
                marginTop: "20px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px 18px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Close
            </button>
          </div>
          {/* Animations */}
          <style>
            {`
       @keyframes fadeIn {
         from { opacity: 0; }
         to { opacity: 1; }
       }
       @keyframes scaleUp {
         from { transform: scale(0.8); opacity: 0; }
         to { transform: scale(1); opacity: 1; }
       }
     `}
          </style>
        </div>
      )}
      {/* Doctor & Chatbot Buttons */}
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
            boxShadow: "0 4px 10px rgba(67, 160, 71, 0.2)"
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
            boxShadow: "0 4px 10px rgba(2, 136, 209, 0.2)"
          }}
          onClick={() => setShowChat(true)}
        >
          Ask AI Assistant
        </button>
      </div>
      {showDoctors && <DoctorList onClose={() => setShowDoctors(false)} />}
      {/* Chatbot */}
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
            flexDirection: "column"
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
              fontWeight: "600"
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
                marginLeft: "8px"
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div style={{ flex: 1, padding: "16px", overflowY: "auto", color: "#333" }}>
            {chatMessages.length === 0 ? (
              <p>This is an AI assistant. Ask a health-related question!</p>
            ) : (chatMessages.map((msg, idx) => (
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
                  wordBreak: "break-word"
                }}
              >
                {msg}
              </div>
            ))
            )}
            {loading && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
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
              alignItems: "center"
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
                width: "65%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                marginRight: "8px"
              }}
              disabled={loading}
            />
            {/* Voice Button */}
            <button
              onClick={handleVoiceInput}
              style={{
                background: "#ff9800",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                marginRight: "8px",
                cursor: "pointer"
              }}
            >
              🎤
            </button>
            <button
              style={{
                background: "#0288d1",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
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