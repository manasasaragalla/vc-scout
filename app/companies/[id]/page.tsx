"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
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

  if (!found) {
    return <div style={{ padding: 40 }}>Company not found</div>;
  }

  const company: Company = found; // 🔥 force proper typing

  async function enrichCompany() {
    setLoading(true);

    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: company.website, // now 100% safe
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