import React from 'react';

const services = [
    {
        title: 'Personalized Care',
        description: 'Tailored healthcare plans to meet individual needs and preferences.',
    },
    {
        title: '24/7 Support',
        description: 'Round-the-clock assistance from our dedicated care team.',
    },
    {
        title: 'Medication Management',
        description: 'Ensuring timely and accurate medication administration.',
    },
    {
        title: 'Health Monitoring',
        description: 'Continuous tracking of vital signs and health status.',
    },
];

const Services = () => (
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
    
    <section style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '32px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        position: 'relative',
    }}>
        <h2 style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1976d2',
            fontWeight: 700,
            fontSize: '2rem',
        }}>
            Our Services
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {services.map((service, idx) => (
                <li key={idx} style={{
                    marginBottom: '24px',
                    padding: '20px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    background: '#f9f9f9',
                }}>
                    <h3 style={{
                        margin: '0 0 8px 0',
                        color: '#1976d2',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                    }}>
                        {service.title}
                    </h3>
                    <p style={{
                        margin: 0,
                        color: '#333',
                        fontSize: '1rem',
                    }}>
                        {service.description}
                    </p>
                </li>
            ))}
        </ul>
    </section>
    </>
);

export default Services;