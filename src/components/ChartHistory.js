import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

const ChartHistory = ({ history }) => {
const chartData = history.map((entry, index) => ({
  name: `#${index + 1}`,
  Disease: entry.predictedCondition,
  Count: entry.count || 1,
  Symptoms: Array.isArray(entry.symptoms) ? entry.symptoms.join(", ") : entry.symptoms,
  Remedies: Array.isArray(entry.remedies) ? entry.remedies.join(", ") : entry.remedies
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
            fill="#43a047"
            label
          />
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
          <Bar dataKey="Count" fill="#43a047" />
        </BarChart>
      )}
    </ResponsiveContainer>
  </div>
);
};
export default ChartHistory;