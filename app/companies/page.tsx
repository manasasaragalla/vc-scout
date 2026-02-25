"use client"

import companies from "../../data/companies.json"
import Link from "next/link"
import { useState } from "react"

export default function CompaniesPage() {

  const [search, setSearch] = useState("")

  const filtered = companies.filter((company:any) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"30px", fontWeight:"bold"}}>
        Companies
      </h1>

      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{padding:"10px", marginTop:"10px"}}
      />

      <div style={{marginTop:"20px"}}>

        {filtered.map((company:any)=>(
          <div key={company.id} style={{
            border:"1px solid gray",
            padding:"10px",
            marginTop:"10px"
          }}>
            <Link href={`/companies/${company.id}`}>
              <h2>{company.name}</h2>
            </Link>

            <p>{company.industry}</p>

          </div>
        ))}

      </div>

    </div>
  )
}