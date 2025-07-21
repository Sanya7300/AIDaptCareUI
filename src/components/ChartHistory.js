import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const ChartHistory = ({ history }) => {
 const chartData = history.map((entry, index) => ({
   name: `#${index + 1}`,
   Disease: entry.disease,
   Count: entry.symptoms.length
 }));
 return (
<div style={{ marginTop: "2rem" }}>
<h3>Recent Analysis History</h3>
<ResponsiveContainer width="100%" height={300}>
<BarChart data={chartData}>
<XAxis dataKey="name" />
<YAxis />
<Tooltip
 cursor={{ fill: "rgba(25, 118, 210, 0.1)" }}
 allowEscapeViewBox={{ x: true, y: true }}
/>
<Bar dataKey="Count" fill="#1976d2" />
</BarChart>
</ResponsiveContainer>
</div>
 );
};
export default ChartHistory;