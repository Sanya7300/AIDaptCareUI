import React from "react";
import { useState } from "react";

const doctors = [
  { name: "Dr. Asha Mehta", specialty: "Endocrinologist", experience: 12, contact: "asha.mehta@hospital.com" },
  { name: "Dr. Rajiv Kumar", specialty: "Nephrologist", experience: 15, contact: "rajiv.kumar@hospital.com" },
  { name: "Dr. Priya Singh", specialty: "Cardiologist", experience: 10, contact: "priya.singh@hospital.com" },
  { name: "Dr. Sunil Patel", specialty: "General Physician", experience: 8, contact: "sunil.patel@hospital.com" },
];

const availableSlots = {
    "Dr. Asha Mehta": [
        { date: "2024-06-20", times: ["10:00", "11:00", "15:00"] },
        { date: "2024-06-21", times: ["09:00", "13:00"] },
    ],
    "Dr. Rajiv Kumar": [
        { date: "2024-06-20", times: ["12:00", "16:00"] },
        { date: "2024-06-22", times: ["10:30", "14:00"] },
    ],
    "Dr. Priya Singh": [
        { date: "2024-06-21", times: ["11:00", "12:30"] },
        { date: "2024-06-23", times: ["09:30", "15:30"] },
    ],
    "Dr. Sunil Patel": [
        { date: "2024-06-20", times: ["10:00", "13:00"] },
        { date: "2024-06-22", times: ["11:00", "16:00"] },
    ],
};

const CalendarModal = ({ doctor, onClose, onSelect }) => {
    const slots = availableSlots[doctor.name] || [];
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.25)",
                zIndex: 11000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                    padding: "28px 20px 20px 20px",
                    minWidth: "320px",
                    maxWidth: "90vw",
                    position: "relative",
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 14,
                        background: "transparent",
                        border: "none",
                        color: "#1976d2",
                        fontSize: "1.3rem",
                        cursor: "pointer",
                    }}
                    aria-label="Close calendar"
                >
                    ×
                </button>
                <h3 style={{ color: "#1976d2", marginBottom: "1rem", textAlign: "center" }}>
                    Book Appointment with {doctor.name}
                </h3>
                <div>
                    <label style={{ fontWeight: 500 }}>Select Date:</label>
                    <select
                        style={{ width: "100%", margin: "8px 0 16px 0", padding: "6px" }}
                        value={selectedDate}
                        onChange={e => {
                            setSelectedDate(e.target.value);
                            setSelectedTime("");
                        }}
                    >
                        <option value="">-- Choose Date --</option>
                        {slots.map(slot => (
                            <option key={slot.date} value={slot.date}>
                                {slot.date}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedDate && (
                    <div>
                        <label style={{ fontWeight: 500 }}>Select Time:</label>
                        <select
                            style={{ width: "100%", margin: "8px 0 16px 0", padding: "6px" }}
                            value={selectedTime}
                            onChange={e => setSelectedTime(e.target.value)}
                        >
                            <option value="">-- Choose Time --</option>
                            {(slots.find(s => s.date === selectedDate)?.times || []).map(time => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button
                    style={{
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 18px",
                        cursor: selectedDate && selectedTime ? "pointer" : "not-allowed",
                        width: "100%",
                        marginTop: "8px",
                        opacity: selectedDate && selectedTime ? 1 : 0.6,
                    }}
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => {
                        if (selectedDate && selectedTime) {
                            onSelect({ doctor, date: selectedDate, time: selectedTime });
                        }
                    }}
                >
                    Confirm Appointment
                </button>
            </div>
        </div>
    );
};

const DoctorList = ({ onClose, onAppointment }) => {
    const [calendarDoctor, setCalendarDoctor] = useState(null);

    const handleBookClick = (doc) => {
        setCalendarDoctor(doc);
    };

    const handleCalendarClose = () => {
        setCalendarDoctor(null);
    };

    const handleCalendarSelect = (appointment) => {
        setCalendarDoctor(null);
        if (onAppointment) onAppointment(appointment);
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
                        padding: "32px 24px 24px 24px",
                        minWidth: "420px",
                        maxWidth: "90vw",
                        maxHeight: "80vh",
                        overflowY: "auto",
                        position: "relative",
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
                    <h2 style={{ color: "#1976d2", marginBottom: "1.5rem", textAlign: "center" }}>Available Doctors</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f5f5f5" }}>
                                <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Name</th>
                                <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Specialty</th>
                                <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Experience (yrs)</th>
                                <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Contact</th>
                                <th style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "left" }}>Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc, idx) => (
                                <tr key={idx}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.name}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.specialty}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.experience}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{doc.contact}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                                        <button
                                            style={{
                                                background: "#1976d2",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "4px",
                                                padding: "6px 14px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleBookClick(doc)}
                                        >
                                            Book
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {calendarDoctor && (
                <CalendarModal
                    doctor={calendarDoctor}
                    onClose={handleCalendarClose}
                    onSelect={handleCalendarSelect}
                />
            )}
        </>
    );
};

export default DoctorList;
