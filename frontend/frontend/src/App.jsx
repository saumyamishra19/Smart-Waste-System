import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    const res = await axios.get("http://localhost:5000/api/reports");
    setReports(res.data);
  };

  const submitReport = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reports", { title, description: desc });
    setTitle("");
    setDesc("");
    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Waste Collection</h1>
      <form onSubmit={submitReport}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <br />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
        <br />
        <button type="submit">Submit Report</button>
      </form>

      <h2>Reports</h2>
      <ul>
        {reports.map((r) => (
          <li key={r.id}>{r.title} - {r.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

