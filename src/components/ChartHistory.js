import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ChartHistory = ({ history }) => {
  // Disease color map
  // Map "Tension Headache" to "Headache" for display and color
  const diseaseColors = {
    "Diabetes": "#ff9800",
    "Hypertension": "#1976d2",
    "Anemia": "#8e24aa",
    "Headache": "#757575", // Use "Headache" instead of "Tension Headache"
    "Migraine": "#27b072ff",
    "default": "#a2c22fff"
  };
  // Helper to normalize disease name for display and color
  const getDisplayDisease = (disease) =>
    disease === "Tension Headache" ? "Headache" : disease;
  const chartData = history.map((entry, index) => ({
    name: `#${index + 1}`,
    Disease: entry.predictedCondition,
    Count: entry.count || 1,
    Symptoms: Array.isArray(entry.symptoms) ? entry.symptoms.join(", ") : entry.symptoms,
    Remedies: Array.isArray(entry.remedies) ? entry.remedies.join(", ") : entry.remedies,
    fill: diseaseColors[entry.predictedCondition] || diseaseColors.default
  }));
  const [chartType, setChartType] = React.useState("pie");

  // Responsive: stack chart and legend on mobile, fix color cell rendering
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>Recent Analysis History</h3>
        <div>
          <button
            style={{
              marginRight: "0.5rem",
              backgroundColor: chartType === "pie" ? "#43a047" : "#e0e0e0",
              color: chartType === "pie" ? "#fff" : "#333",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              opacity: chartType === "pie" ? 1 : 0.6
            }}
            onClick={() => setChartType("pie")}
          >
            Pie Chart
          </button>
          <button
            style={{
              backgroundColor: chartType === "bar" ? "#43a047" : "#e0e0e0",
              color: chartType === "bar" ? "#fff" : "#333",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              cursor: "pointer",
              opacity: chartType === "bar" ? 1 : 0.6
            }}
            onClick={() => setChartType("bar")}
          >
            Bar Chart
          </button>
        </div>
      </div>
      <div
        style={{
          display: isMobile ? "block" : "flex",
          flexDirection: isMobile ? undefined : "row",
          alignItems: isMobile ? undefined : "flex-start",
          marginTop: 16,
          gap: isMobile ? 0 : 0
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
            {chartType === "pie" ? (
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                          <strong>{data.Disease}</strong>
                          <div>Count: {data.Count}</div>
                          <div>Symptoms: {data.Symptoms}</div>
                          <div>Remedies: {data.Remedies}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="Count"
                  nameKey="Disease"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 70 : 100}
                  label
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}>
                          <strong>{data.Disease}</strong>
                          <div>Count: {data.Count}</div>
                          <div>Symptoms: {data.Symptoms}</div>
                          <div>Remedies: {data.Remedies}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="Count">
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-bar-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        {/* Legend for desktop (right side) */}
        {!isMobile && (
          <div style={{ minWidth: 180, marginLeft: 32 }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#333" }}>Legend</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {Object.entries(diseaseColors).filter(([k]) => k !== "default").map(([disease, color]) => (
                <li key={disease} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <span style={{
                    display: "inline-block",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: color,
                    marginRight: 10,
                    border: "1px solid #ccc"
                  }} />
                  <span style={{ fontSize: "0.97rem", color: "#222" }}>{disease}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Legend for mobile (below chart) */}
        {isMobile && (
          <div style={{ marginTop: 18 }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "1rem", color: "#333" }}>Legend</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap" }}>
              {Object.entries(diseaseColors).filter(([k]) => k !== "default").map(([disease, color]) => (
                <li key={disease} style={{ display: "flex", alignItems: "center", marginBottom: 0, marginRight: 16 }}>
                  <span style={{
                    display: "inline-block",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: color,
                    marginRight: 10,
                    border: "1px solid #ccc"
                  }} />
                  <span style={{ fontSize: "0.97rem", color: "#222" }}>{disease}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChartHistory;