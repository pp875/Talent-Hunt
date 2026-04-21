import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    role: "",
    skills: "",
    experience: "",
    location: "",
    notes: ""
  });

  const [editableJD, setEditableJD] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // generate JD from form
  const generateJD = () => {
    const jd = `
Role: ${form.role}
Skills: ${form.skills}
Experience: ${form.experience}
Location: ${form.location}
Notes: ${form.notes}
    `;
    setEditableJD(jd);
  };

  // search using editable JD
  const handleSearch = async () => {
    if (!editableJD) return;

    setLoading(true);

    try {
      const res = await axios.post("https://talent-hunt-production.up.railway.app/search", {
        description: editableJD,
      });

      setProfiles(res.data.profiles);
    } catch (err) {
      console.error(err);
      alert("Error fetching profiles");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">

        <h1 className="text-2xl font-bold text-center mb-6">
          AI Talent Hunt 🔍
        </h1>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          <input
            name="role"
            placeholder="Role (Java Developer)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="skills"
            placeholder="Skills (Java, Spring Boot)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="experience"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Experience</option>
            <option>0-2 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>

          <input
            name="location"
            placeholder="Location (India, Bangalore)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

        </div>

        {/* Notes */}
        <textarea
          name="notes"
          rows="3"
          placeholder="Additional Requirements..."
          className="w-full border p-3 rounded mt-4"
          onChange={handleChange}
        />

        {/* Generate JD Button */}
        <button
          onClick={generateJD}
          className="w-full mt-4 bg-gray-700 text-white py-2 rounded-lg"
        >
          Generate JD
        </button>

        {/* Editable JD */}
        {editableJD && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Editable JD</h2>
            <textarea
              value={editableJD}
              onChange={(e) => setEditableJD(e.target.value)}
              className="w-full border p-3 rounded"
              rows="6"
            />
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Searching..." : "Search Profiles"}
        </button>

        {/* RESULTS */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Results</h2>

          {profiles.length === 0 ? (
            <p className="text-gray-500">No results yet</p>
          ) : (
            <div className="grid gap-3">
              {profiles.map((link, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:shadow-md"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 break-all"
                  >
                    🔗 {link}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;