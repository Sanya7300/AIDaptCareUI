import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
const ChartHistory = ({ history }) => {
 const chartData = history.map((entry, index) => ({
   name: `#${index + 1}`,
   Disease: entry.disease,
   Count: entry.symptoms.length
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
            backgroundColor: chartType === "pie" ? "#1976d2" : "#e0e0e0",
            color: chartType === "pie" ? "#fff" : "#333",
            border: "none",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer"
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
            cursor: "pointer"
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
          <Tooltip />
          <Pie
            data={chartData}
            dataKey="Count"
            nameKey="Disease"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#1976d2"
            label
          />
        </PieChart>
      ) : (
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Count" fill="#43a047" />
        </BarChart>
      )}
    </ResponsiveContainer>
  </div>
);
};
export default ChartHistory;