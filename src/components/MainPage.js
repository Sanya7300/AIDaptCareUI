import React from 'react';
import { useNavigate } from 'react-router-dom';

// Example AIDaptCard component
const AIDaptCard = ({ name, info }) => (
    <div style={{
        background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        padding: '24px',
        maxWidth: '350px',
        margin: 'auto'
    }}>
        <h2 style={{ color: '#1976d2', marginBottom: '12px' }}>{name}</h2>
        <p style={{ color: '#333' }}>{info}</p>
    </div>
);

const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#f5f6fa',
                fontFamily: 'Segoe UI, Arial, sans-serif',
            }}
        >
            {/* Header */}
            <header
                style={{
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    padding: '24px 0',
                    marginBottom: '32px',
                }}
            >
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 32px',
                    }}
                >
                    <div style={{ fontWeight: 700, fontSize: 28, color: '#1976d2', letterSpacing: 1 }}>
                        AIDaptCare
                    </div>
                    <nav>
                        <a href="/contact" style={{ color: '#333', margin: '0 18px', textDecoration: 'none', fontWeight: 500 }}>Home</a>
                        <a href="/contact" style={{ color: '#333', margin: '0 18px', textDecoration: 'none', fontWeight: 500 }}>About</a>
                        <a href="/contact" style={{ color: '#333', margin: '0 18px', textDecoration: 'none', fontWeight: 500 }}>Services</a>
                        <a href="/contact" style={{ color: '#1976d2', margin: '0 18px', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
                    </nav>
                </div>
            </header>

           { /* Hero Section */}
            <section
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '32px',
                    background: '#fff',
                    borderRadius: '18px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div style={{ flex: 1, paddingRight: 48 }}>
                    <h1 style={{ fontSize: 40, color: '#1976d2', marginBottom: 18, fontWeight: 700 }}>
                        Empowering Adaptive Care with AI
                    </h1>
                    <p style={{ fontSize: 20, color: '#444', marginBottom: 28 }}>
                        Personalized medical information and adaptive care recommendations for everyone. Discover how AI can support your health journey.
                    </p>
                    <button
                        style={{
                            background: '#1976d2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 6,
                            padding: '14px 36px',
                            fontSize: 18,
                            fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(25,118,210,0.08)',
                        }}
                        onClick={()=>navigate("/symptoms")}
                    >
                        Get Started
                    </button>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <AIDaptCard
                        name="How to Use AIDaptCare"
                        info={
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)',
                                borderRadius: '12px',
                                boxShadow: '0 2px 8px rgba(25,118,210,0.07)',
                                fontSize: 16,
                                color: '#333'
                            }}>
                                <li style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <strong>1.</strong> Sign up or log in to your account.
                                </li>
                                <li style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <strong>2.</strong> Enter your health preferences and needs.
                                </li>
                                <li style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <strong>3.</strong> Explore personalized care recommendations powered by AI.
                                </li>
                                <li style={{ padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                                    <strong>4.</strong> Connect with healthcare professionals for further guidance.
                                </li>
                                <li style={{ padding: '10px 0' }}>
                                    <strong>5.</strong> Track your progress and update your information anytime.
                                </li>
                            </ul>
                        }
                    />
                </div>
            </section>
            <footer
                style={{
                    marginTop: 64,
                    background: '#fff',
                    borderTop: '1px solid #e0e0e0',
                    padding: '32px 0',
                    textAlign: 'center',
                    color: '#888',
                    fontSize: 16,
                }}
            >
                &copy; {new Date().getFullYear()} AIDaptCare. All rights reserved.
            </footer>
        </div>
    );
};

export default MainPage;