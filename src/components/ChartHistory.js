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
    "Kidney Disease": "#c2185b",
    "default": "#a2c22fff"
  };
  // Helper to normalize disease name for display and color
  
  // Chart mode: by Disease, Symptoms, or Remedies
  const [chartType, setChartType] = React.useState("pie");
  const [viewMode, setViewMode] = React.useState("disease"); // disease, symptoms, remedies

  // Prepare chart data according to viewMode
  let chartData = [];
  if (viewMode === "disease") {
    // Aggregate disease counts
    const diseaseMap = {};
    history.forEach(entry => {
      const disease = entry.predictedCondition;
      if (!disease) return;
      if (!diseaseMap[disease]) {
        diseaseMap[disease] = {
          Disease: disease,
          Count: 0,
          Symptoms: [],
          Remedies: [],
          fill: diseaseColors[disease] || diseaseColors.default
        };
      }
      diseaseMap[disease].Count += entry.count || 1;
      // Optionally aggregate symptoms/remedies for tooltip
      if (entry.symptoms) {
        if (Array.isArray(entry.symptoms)) {
          diseaseMap[disease].Symptoms.push(...entry.symptoms);
        } else {
          diseaseMap[disease].Symptoms.push(...entry.symptoms.split(","));
        }
      }
      if (entry.remedies) {
        if (Array.isArray(entry.remedies)) {
          diseaseMap[disease].Remedies.push(...entry.remedies);
        } else {
          diseaseMap[disease].Remedies.push(...entry.remedies.split(","));
        }
      }
    });
    chartData = Object.values(diseaseMap).map((d, idx) => ({
      name: d.Disease,
      Disease: d.Disease,
      Count: d.Count,
      Symptoms: d.Symptoms.join(", "),
      Remedies: d.Remedies.join(", "),
      fill: d.fill
    }));
  } else if (viewMode === "symptoms") {
    // Flatten all symptoms and count occurrences
    const symptomCounts = {};
    history.forEach(entry => {
      const arr = Array.isArray(entry.symptoms) ? entry.symptoms : (entry.symptoms ? entry.symptoms.split(",") : []);
      arr.forEach(sym => {
        const s = sym.trim();
        if (s) symptomCounts[s] = (symptomCounts[s] || 0) + 1;
      });
    });
    chartData = Object.entries(symptomCounts).map(([symptom, count], idx) => ({
      name: symptom,
      Count: count,
      fill: "#1976d2",
      Disease: "",
      Symptoms: symptom,
      Remedies: ""
    }));
  } else if (viewMode === "remedies") {
    // Flatten all remedies and count occurrences
    const remedyCounts = {};
    history.forEach(entry => {
      const arr = Array.isArray(entry.remedies) ? entry.remedies : (entry.remedies ? entry.remedies.split(",") : []);
      arr.forEach(rem => {
        const r = rem.trim();
        if (r) remedyCounts[r] = (remedyCounts[r] || 0) + 1;
      });
    });
    chartData = Object.entries(remedyCounts).map(([remedy, count], idx) => ({
      name: remedy,
      Count: count,
      fill: "#43a047",
      Disease: "",
      Symptoms: "",
      Remedies: remedy
    }));
  }

  // Responsive: stack chart and legend on mobile, fix color cell rendering
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;
  // Helper to format remedies: show up to 3, then "...more" if more exist
  const formatRemedies = (remedies) => {
    if (!remedies) return "";
    const arr = Array.isArray(remedies) ? remedies : remedies.split(",");
    const trimmed = arr.map(r => r.trim()).filter(Boolean);
    if (trimmed.length <= 3) {
      return (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {trimmed.map((rem, idx) => (
            <li key={idx}>{rem}</li>
          ))}
        </ul>
      );
    }
    return (
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {trimmed.slice(0, 3).map((rem, idx) => (
          <li key={idx}>{rem}</li>
        ))}
        <li style={{ color: "#1976d2", cursor: "pointer", listStyle: "none", paddingLeft: 0 }}>...more</li>
      </ul>
    );
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0 }}>Recent Analysis History</h3>
        <div style={{
          display: "flex",
          gap: isMobile ? "0.5rem" : "1.5rem",
          alignItems: "center",
          flexWrap: "wrap",
          width: isMobile ? "100%" : "auto",
          justifyContent: isMobile ? "flex-end" : "flex-start"
        }}>
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
                      console.log(data)
                      return (
                        <div
                          style={{
                            background: "#fff",
                            border: "1px solid #ccc",
                            padding: 12,
                            borderRadius: 8,
                            minWidth: 180,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              marginBottom: 8
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: 38,
                                height: 38,
                                borderRadius: "50%",
                                background: data.fill,
                                marginBottom: 6,
                                border: "2px solid #eee"
                              }}
                            />
                            <strong
                              style={{
                                fontSize: "1.1rem",
                                color: "#222",
                                background: `${data.fill}22`,
                                padding: "4px 12px",
                                borderRadius: 12,
                                marginBottom: 2
                              }}
                            >
                              {data.predictedCondition}
                            </strong>
                          </div>
                          <div><strong>Count:</strong> {data.Count}</div>
                          <div><strong>Symptoms:</strong> {data.Symptoms}</div>
                          <div><strong>Remedies:</strong> {formatRemedies(data.Remedies)}</div>
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
                  label={({ name, payload }) => payload.Disease || name}
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            ) : (
                <BarChart data={chartData}>
                  <XAxis dataKey="Disease" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #ccc",
                              padding: 12,
                              borderRadius: 8,
                              minWidth: 180,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: 8
                              }}
                            >
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 38,
                                  height: 38,
                                  borderRadius: "50%",
                                  background: data.fill,
                                  marginBottom: 6,
                                  border: "2px solid #eee"
                                }}
                              />
                              <strong
                                style={{
                                  fontSize: "1.1rem",
                                  color: "#222",
                                  background: `${data.fill}22`,
                                  padding: "4px 12px",
                                  borderRadius: 12,
                                  marginBottom: 2
                                }}
                              >
                                {data.Disease}
                              </strong>
                            </div>
                            <div><strong>Count:</strong> {data.Count}</div>
                            <div><strong>Symptoms:</strong> {data.Symptoms}</div>
                            <div><strong>Remedies:</strong> {formatRemedies(data.Remedies)}</div>
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
            {/* Dropdown below legend for desktop */}
                  <div style={{ marginTop: 18 }}>
                    <label htmlFor="chart-view-mode" style={{
                    fontWeight: 600,
                    color: "#1976d2",
                    marginBottom: "4px",
                    fontSize: "0.97rem",
                    display: "block"
                    }}>
                    Chart View:
                    </label>
              <select
                id="chart-view-mode"
                value={viewMode}
                onChange={e => {
                  setViewMode(e.target.value);
                }}
                style={{
                  borderRadius: "20px",
                  padding: "10px 18px",
                  border: "2px solid #1976d2",
                  fontWeight: "600",
                  fontSize: "1.08rem",
                  background: "#e3f2fd",
                  color: "#1976d2",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                  outline: "none",
                  minWidth: isMobile ? "100px" : "180px",
                  maxWidth: isMobile ? "100px" : undefined,
                  width: isMobile ? "100%" : undefined
                }}
              >
                <option value="disease">Disease</option>
                <option value="symptoms">Symptom</option>
                <option value="remedies">Remedy</option>
              </select>
                  </div>
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
            {/* Dropdown below legend for mobile */}
            <div style={{ marginTop: 18 }}>
              <label htmlFor="chart-view-mode" style={{
                fontWeight: 600,
                color: "#1976d2",
                marginBottom: "4px",
                fontSize: "0.97rem",
                display: "block"
              }}>
                Chart View:
              </label>
              <select
                id="chart-view-mode"
                value={viewMode}
                onChange={e => setViewMode(e.target.value)}
                style={{
                  borderRadius: "20px",
                  padding: "10px 18px",
                  border: "2px solid #1976d2",
                  fontWeight: "600",
                  fontSize: "1.08rem",
                  background: "#e3f2fd",
                  color: "#1976d2",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                  outline: "none",
                 
                }}
              >
                <option value="disease">Disease</option>
                <option value="symptoms">Symptom</option>
                <option value="remedies">Remedy</option>
              </select>
            </div>
          </div>
        )}
       

      </div>
    </div>
  );
};
export default ChartHistory;