import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

const ChartHistory = ({ history }) => {
  // Disease color map
  const diseaseColors = {
    "Diabetes": "#ff9800",
    "Hypertension": "#1976d2",
    "Anemia": "#8e24aa",
    "Tension Headache": "#757575",
    "Migraine": "#27b072ff",
    "default": "#a2c22fff"
  };
  const chartData = history.map((entry, index) => ({
    name: `#${index + 1}`,
    Disease: entry.predictedCondition,
    Count: entry.count || 1,
    Symptoms: Array.isArray(entry.symptoms) ? entry.symptoms.join(", ") : entry.symptoms,
    Remedies: Array.isArray(entry.remedies) ? entry.remedies.join(", ") : entry.remedies,
    fill: diseaseColors[entry.predictedCondition] || diseaseColors.default
  }));
  const [chartType, setChartType] = React.useState("pie");

return (
  <div style={{ marginTop: "2rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
    <div style={{ display: "flex", alignItems: "flex-start", marginTop: 16 }}>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height={300}>
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
                outerRadius={100}
                label
              >
                {chartData.map((entry, idx) => (
                  <cell key={`cell-${idx}`} fill={entry.fill} />
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
                  <cell key={`cell-bar-${idx}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Legend */}
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
    </div>
  </div>
);
};
export default ChartHistory;