import React from 'react';

const About = () => {
    return (
          <>
    <button
            onClick={() => window.history.back()}
           className='backBtn'
            aria-label="Go back"
        >
            <span style={{
                display: 'inline-block',
                marginRight: '8px',
                fontSize: '1.5rem',
                lineHeight: 1,
            }}>&larr;</span>
            Back
        </button>
        <div style={{
            maxWidth: '600px',
            margin: '40px auto',
            padding: '32px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
        }}>
            <h2 style={{ marginBottom: '16px', color: '#2d3748' }}>About Us</h2>
            <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '12px' }}>
                Welcome to AIDaptCare! We are dedicated to providing innovative solutions for adaptive care.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '12px' }}>
                Our mission is to empower individuals and caregivers with technology that makes daily life easier and more connected.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#4a5568' }}>
                Learn more about our team, values, and vision for the future of care.
            </p>
        </div>
        </>
    );
};

export default About;