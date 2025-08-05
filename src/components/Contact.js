import React from "react";

const backgroundStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
};

const cardStyle = {
    background: "rgba(255,255,255,0.85)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
    padding: "2.5rem 3rem",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
};

const headingStyle = {
    marginBottom: "1rem",
    color: "#2d3a4b",
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "1px",
};

const infoStyle = {
    margin: "0.5rem 0",
    color: "#3a506b",
    fontSize: "1.1rem",
};

const iconStyle = {
    marginRight: "0.5rem",
    color: "#66a6ff",
};

export default function Contact() {
    return (
        <>
            <style>
                {`
                @media (max-width: 700px) {
                    .contact-back-btn {
                        top: 8rem !important;
                        left: 1rem !important;
                        padding: 0.4rem 1rem !important;
                        font-size: 0.95rem !important;
                    }
                    .contact-card {
                        padding: 1.2rem 0.5rem !important;
                        max-width: 95vw !important;
                    }
                    .contact-heading {
                        font-size: 1.3rem !important;
                    }
                    .contact-info {
                        font-size: 1rem !important;
                    }
                }
                `}
            </style>
            <button
                className="contact-back-btn"
                style={{
                    position: "absolute",
                    top: "8rem",
                    left: "5rem",
                    background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
                    color: "#2d3a4b",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.5rem 1.2rem",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(31, 38, 135, 0.15)",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                    transition: "background 0.3s, color 0.3s",
                    zIndex: 2,
                }}
                onClick={() => window.history.back()}
            >
                ← Back
            </button>
            <div style={backgroundStyle}>
                <div className="contact-card" style={cardStyle}>
                    <h2 className="contact-heading" style={headingStyle}>Contact Us</h2>
                    <div className="contact-info" style={infoStyle}>
                        <span style={iconStyle}>📧</span>
                        aidaptcare@example.com
                    </div>
                    <div className="contact-info" style={infoStyle}>
                        <span style={iconStyle}>📞</span>
                        +1 (555) 123-4567
                    </div>
                    <div className="contact-info" style={infoStyle}>
                        <span style={iconStyle}>🏢</span>
                        123 Health St, Wellness City, USA
                    </div>
                </div>
            </div>
        </>
    );
}