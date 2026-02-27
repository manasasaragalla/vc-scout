"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import companies from "@/data/companies.json";

export default function Home() {
  const [search, setSearch] = useState("");
  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  // Load saved searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("savedSearches");
    if (stored) {
      setSavedSearches(JSON.parse(stored));
    }
  }, []);

  // Save search
  const saveSearch = () => {
    if (!search.trim()) return;

    if (!savedSearches.includes(search)) {
      const updated = [...savedSearches, search];
      setSavedSearches(updated);
      localStorage.setItem("savedSearches", JSON.stringify(updated));
    }
  };

  const filteredCompanies = companies.filter((company: any) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>VC Scout</h1>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: "100%",
          maxWidth: 400,
          marginBottom: 10,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

      <button onClick={saveSearch} style={{ marginBottom: 20 }}>
        Save Search
      </button>

      {/* 📌 Saved Searches */}
      {savedSearches.length > 0 && (
        <div style={{ marginBottom: 30 }}>
          <h3>Saved Searches:</h3>
          {savedSearches.map((term, index) => (
            <button
              key={index}
              onClick={() => setSearch(term)}
              style={{
                marginRight: 10,
                marginTop: 5,
                padding: "5px 10px",
                borderRadius: 6,
                border: "1px solid #888",
              }}
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Company List */}
      {filteredCompanies.map((company: any) => (
        <div
          key={company.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginBottom: 15,
            borderRadius: 8,
          }}
        >
          <h2>{company.name}</h2>
          <p>{company.description}</p>

          <Link href={`/companies/${company.id}`}>
            <button style={{ marginTop: 10 }}>View Company</button>
          </Link>
        </div>
      ))}
    </div>
  );
}