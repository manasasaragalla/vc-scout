"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import companies from "@/data/companies.json";

type Company = {
  id: number;
  name: string;
  description: string;
  website: string;
};

export default function CompanyPage() {
  const params = useParams();
  const id = Number(params.id);

  const found = companies.find((c: any) => c.id === id);

  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");

  if (!found) {
    return <div style={{ padding: 40 }}>Company not found</div>;
  }

  const company: Company = found;

  // Load saved note
  useEffect(() => {
    const stored = localStorage.getItem(`note-${company.id}`);
    if (stored) {
      setSavedNote(stored);
    }
  }, [company.id]);

  // Save note
  const saveNote = () => {
    localStorage.setItem(`note-${company.id}`, note);
    setSavedNote(note);
    setNote("");
  };

  async function enrichCompany() {
    setLoading(true);

    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: company.website,
      }),
    });

    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{company.name}</h1>
      <p>{company.description}</p>

      {/* Enrich */}
      <button onClick={enrichCompany} style={{ marginTop: 20 }}>
        {loading ? "Enriching..." : "Enrich Company"}
      </button>

      {summary && (
        <div style={{ marginTop: 20 }}>
          <h3>AI Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      {/* Notes Section */}
      <div style={{ marginTop: 40 }}>
        <h3>Add Note</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your notes about this company..."
          style={{
            width: "100%",
            height: 100,
            padding: 10,
            marginTop: 10,
            borderRadius: 6,
          }}
        />

        <button onClick={saveNote} style={{ marginTop: 10 }}>
          Save Note
        </button>

        {savedNote && (
          <div style={{ marginTop: 20 }}>
            <h4>Saved Note:</h4>
            <p>{savedNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}