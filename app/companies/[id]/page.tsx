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

  const [lists, setLists] = useState<string[]>([]);
  const [newList, setNewList] = useState("");

  if (!found) {
    return <div style={{ padding: 40 }}>Company not found</div>;
  }

  const company: Company = found;

  // Load saved note
  useEffect(() => {
    const storedNote = localStorage.getItem(`note-${company.id}`);
    if (storedNote) setSavedNote(storedNote);

    const storedLists = localStorage.getItem(`lists-${company.id}`);
    if (storedLists) setLists(JSON.parse(storedLists));
  }, [company.id]);

  // Save note
  const saveNote = () => {
    localStorage.setItem(`note-${company.id}`, note);
    setSavedNote(note);
    setNote("");
  };

  // Add list
  const addToList = () => {
    if (!newList.trim()) return;

    if (!lists.includes(newList)) {
      const updated = [...lists, newList];
      setLists(updated);
      localStorage.setItem(
        `lists-${company.id}`,
        JSON.stringify(updated)
      );
    }

    setNewList("");
  };

  async function enrichCompany() {
    setLoading(true);

    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

      {/* Notes */}
      <div style={{ marginTop: 40 }}>
        <h3>Add Note</h3>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write notes..."
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

      {/* Lists */}
      <div style={{ marginTop: 40 }}>
        <h3>Add To List</h3>

        <input
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
          placeholder="Enter list name..."
          style={{
            padding: 8,
            marginRight: 10,
            borderRadius: 6,
          }}
        />

        <button onClick={addToList}>Add</button>

        {lists.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h4>Lists:</h4>
            {lists.map((list, index) => (
              <span
                key={index}
                style={{
                  marginRight: 10,
                  padding: "5px 10px",
                  border: "1px solid #888",
                  borderRadius: 6,
                }}
              >
                {list}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}