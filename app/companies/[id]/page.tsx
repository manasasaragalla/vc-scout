"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import companies from "@/data/companies.json";

export default function CompanyPage() {
  const params = useParams();
  const id = Number(params.id);

  const company = companies.find((c: any) => c.id === id);

  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!company) {
    return <div style={{ padding: 40 }}>Company not found</div>;
  }

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

      <button onClick={enrichCompany} style={{ marginTop: 20 }}>
        {loading ? "Enriching..." : "Enrich Company"}
      </button>

      {summary && (
        <div style={{ marginTop: 30 }}>
          <h3>AI Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}