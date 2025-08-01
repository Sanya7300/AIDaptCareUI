import React from "react";
import { useState } from "react";

const doctors = [
  { specialty: "Gynecologist", experience: 12, contact: "asha.mehta@hospital.com" },
  { specialty: "General Physician", experience: 8, contact: "sunil.patel@hospital.com" },
  { specialty: "Dermatologist", experience: 5, contact: "anjali.verma@hospital.com" },
  { specialty: "Orthopedic", experience: 20, contact: "rohan.gupta@hospital.com" },
  { specialty: "Pediatrician", experience: 7, contact: "neha.sharma@hospital.com" }
];

const DoctorList = ({ onClose, onAppointment }) => {
    
    const [city, setCity] = useState("Bangalore");

    // Get user's city using geolocation and reverse geocoding
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Use OpenStreetMap Nominatim API for reverse geocoding
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data && data.address) {
                                const { city: detectedCity, town, village, state, county } = data.address;
                                // Prefer city, fallback to town/village/county/state if city not found
                                const resolvedCity = detectedCity || town || village || county || state;
                                if (resolvedCity) setCity(resolvedCity);

                                // Optionally, you can store latitude and longitude if needed
                                // setLatLng({ lat: latitude, lng: longitude });
                            }
                        })
                        .catch(() => {});
                },
                () => {},
                { timeout: 5000 }
            );
        }
    }, []);

    

    const getPractoSearchLink = (specialization) => {
      const queryObject = [
        {
          word: specialization,
          autocompleted: true,
          category: "subspeciality",
        },
      ];
      const query = encodeURIComponent(JSON.stringify(queryObject));
    return `https://www.practo.com/search/doctors?results_type=doctor&q=${query}&city=${encodeURIComponent(city)}`;
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.25)",
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        borderRadius: "16px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        padding: "32px 12px 24px 12px",
                        minWidth: "0",
                        width: "100%",
                        maxWidth: "480px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        position: "relative",
                        margin: "0 8px",
                        // Responsive: override for mobile
                        ...(window.innerWidth <= 600
                            ? {
                                  padding: "16px 4px 12px 4px",
                                  borderRadius: "0",
                                  maxWidth: "100vw",
                                  maxHeight: "100vh",
                              }
                            : {}),
                    }}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 16,
                            background: "transparent",
                            border: "none",
                            color: "#1976d2",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                        }}
                        aria-label="Close doctor list"
                    >
                        ×
                    </button>
                    <h2 style={{ color: "#1976d2", marginBottom: "1.5rem", textAlign: "center", fontSize: "1.2rem" }}>Available Doctors</h2>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.98rem" }}>
                            <thead>
                                <tr style={{ background: "#f5f5f5" }}>
                                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Specialty</th>
                                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Experience (yrs)</th>
                                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Contact</th>
                                    <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>More Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doc, idx) => (
                                    <tr key={idx}>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.specialty}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.experience}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #eee", wordBreak: "break-all" }}>{doc.contact}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                            <a
                                                href={getPractoSearchLink(doc.specialty)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "#1976d2", textDecoration: "underline", fontSize: "0.97rem" }}
                                            >
                                                Practo
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorList;
