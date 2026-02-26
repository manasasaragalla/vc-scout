"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import companies from "@/data/companies.json"

export default function CompanyPage() {
  const params = useParams()
  const id = Number(params.id)

  const company = companies.find((c: any) => c.id === id)

  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!company) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        Company not found
      </div>
    )
  }

  async function enrichCompany() {
    setLoading(true)

    const res = await fetch("/api/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: company?.website, // ✅ SAFE ACCESS
      }),
    })

    const data = await res.json()
    setSummary(data.summary)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-400 mb-6">{company.description}</p>

      <button
        onClick={enrichCompany}
        className="bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        {loading ? "Enriching..." : "Enrich Company"}
      </button>

      {summary && (
        <div className="mt-8 bg-zinc-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">AI Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}