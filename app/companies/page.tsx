"use client";

import Link from "next/link";
import companies from "@/data/companies.json";

export default function CompaniesPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>VC Scout</h1>

      {companies.map((company: any) => (
        <div
          key={company.id}
          style={{
            border: "1px solid gray",
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