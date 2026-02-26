"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ListsPage() {
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("saved-companies") || "[]"
    )
    setSavedCompanies(stored)
  }, [])

  const removeCompany = (id: number) => {
    const updated = savedCompanies.filter(
      (company) => company.id !== id
    )
    localStorage.setItem("saved-companies", JSON.stringify(updated))
    setSavedCompanies(updated)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Saved Companies</h1>

      {savedCompanies.length === 0 ? (
        <p className="text-gray-400">No companies saved yet.</p>
      ) : (
        <div className="space-y-4">
          {savedCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-zinc-900 p-6 rounded flex justify-between items-center"
            >
              <Link
                href={`/companies/${company.id}`}
                className="text-lg font-semibold"
              >
                {company.name}
              </Link>

              <button
                onClick={() => removeCompany(company.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}