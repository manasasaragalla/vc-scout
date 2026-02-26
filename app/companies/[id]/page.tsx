"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import companies from "@/data/companies.json"

export default function CompanyProfile() {
  const { id } = useParams()
  const company = companies.find((c) => c.id === Number(id))

  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem(`notes-${id}`)
      if (saved) {
        setNotes(saved)
      }
    }
  }, [id])

  const saveNotes = () => {
    localStorage.setItem(`notes-${id}`, notes)
    alert("Notes saved")
  }

  const saveToList = () => {
  const existing = JSON.parse(localStorage.getItem("saved-companies") || "[]")

  const alreadySaved = existing.find(
    (item: any) => item.id === company.id
  )

  if (alreadySaved) {
    alert("Already saved to list")
    return
  }

  const updated = [...existing, company]

  localStorage.setItem("saved-companies", JSON.stringify(updated))

  alert("Company saved to list")
}
  if (!company) {
    return <div className="text-white">Company not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{company.name}</h1>
      <p className="text-gray-400">{company.description}</p>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notes</h2>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write notes about this company..."
          className="w-full p-3 bg-zinc-800 rounded min-h-[120px]"
        />

        <button
          onClick={saveNotes}
          className="mt-3 bg-blue-600 px-4 py-2 rounded"
        >
          Save Notes
        </button>
        <button
  onClick={saveToList}
  className="mt-3 ml-3 bg-green-600 px-4 py-2 rounded"
>
  Save to List
</button>
      </div>
    </div>
  )
}