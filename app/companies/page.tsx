"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import companies from "@/data/companies.json"

export default function CompaniesPage() {
  const [search, setSearch] = useState("")
  const [savedSearches, setSavedSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("saved-searches") || "[]"
    )
    setSavedSearches(stored)
  }, [])

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  const saveSearch = () => {
    if (!search.trim()) {
      alert("Enter something to save")
      return
    }

    const existing = JSON.parse(
      localStorage.getItem("saved-searches") || "[]"
    )

    if (existing.includes(search)) {
      alert("Search already saved")
      return
    }

    const updated = [...existing, search]

    localStorage.setItem(
      "saved-searches",
      JSON.stringify(updated)
    )

    setSavedSearches(updated)

    alert("Search saved")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">VC Scout</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 bg-zinc-800 rounded"
        />

        <button
          onClick={saveSearch}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Save Search
        </button>
      </div>

      <div className="space-y-4">
        {filteredCompanies.length === 0 ? (
          <p className="text-gray-400">No companies found.</p>
        ) : (
          filteredCompanies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="block bg-zinc-900 p-6 rounded hover:bg-zinc-800"
            >
              <h2 className="text-xl font-semibold">
                {company.name}
              </h2>
              <p className="text-gray-400">
                {company.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}