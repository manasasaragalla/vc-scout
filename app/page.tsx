"use client";

import { useState } from "react";
import Link from "next/link";
import companies from "@/data/companies.json";

export default function Home() {
  const [search, setSearch] = useState("");

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
          marginBottom: 30,
          border: "1px solid #ccc",
          borderRadius: 6,
        }}
      />

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