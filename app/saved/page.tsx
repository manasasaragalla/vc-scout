"use client"

import { useEffect, useState } from "react"

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<string[]>([])

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("saved-searches") || "[]"
    )
    setSavedSearches(stored)
  }, [])

  const removeSearch = (index: number) => {
    const updated = savedSearches.filter((_, i) => i !== index)
    localStorage.setItem("saved-searches", JSON.stringify(updated))
    setSavedSearches(updated)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Saved Searches</h1>

      {savedSearches.length === 0 ? (
        <p className="text-gray-400">No saved searches yet.</p>
      ) : (
        <div className="space-y-4">
          {savedSearches.map((search, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-6 rounded flex justify-between items-center"
            >
              <span>{search}</span>

              <button
                onClick={() => removeSearch(index)}
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