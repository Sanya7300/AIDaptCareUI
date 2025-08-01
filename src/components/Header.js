import React, { useEffect } from 'react';
import Logo from '../icons/logo.jpg'; // Assuming you have a logo image

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(90deg, #4f8cff 0%, #38e8ff 100%)',
    padding: '16px 32px',
    color: '#fff',
    height: '60px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const buttonStyle = {
    background: '#b6972aff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const logoStyle = {
    width: '40px',
    height: '40px',
    marginRight: '16px'
};

const centerContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
};
const username = localStorage.getItem("username");

const Header = ({ onLogout }) => {
    const [user, setUser] = React.useState(username);
    useEffect(() => {
        setUser(localStorage.getItem("username"));
    },[user]);
    return (
        <header style={headerStyle}>
            <img src={Logo} alt="Logo" style={logoStyle} />
            <div style={centerContainerStyle}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>AIDaptCare</span>
                <span
                    style={{
                        marginTop: '8px',
                        fontSize: '1rem',
                        display: 'none', // Hide by default (desktop)
                        marginLeft: '10px',
                    }}
                    className="header-username-mobile"
                >
                    {user}
                </span>
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                className="header-username-desktop"
            >
                <span style={{ marginRight: '16px', fontSize: '1rem' }}>Welcome, {user}</span>
            </div>
            <button
                style={buttonStyle}
                className="header-logout-btn"
                onClick={onLogout}
            >
                Logout
            </button>
            <style>
                {`
                    @media (max-width: 700px) {
                        .header-username-desktop {
                            display: none !important;
                        }
                        .header-username-mobile {
                            display: block !important;
                            text-align: center;
                        }
                        .header-logout-btn {
                            margin-left: 16px !important;
                        }
                    }
                    .header-username-mobile {
                        margin-top: 8px;
                    }
                `}
            </style>
        </header>
    );
};

export default Header;