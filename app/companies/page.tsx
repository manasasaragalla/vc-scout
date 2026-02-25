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
    <div style={{
      padding:"40px",
      maxWidth:"800px",
      margin:"auto"
    }}>

      <h1 style={{
        fontSize:"36px",
        fontWeight:"bold",
        marginBottom:"20px"
      }}>
        VC Scout
      </h1>

      <input
        type="text"
        placeholder="Search companies..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{
          padding:"12px",
          width:"100%",
          borderRadius:"8px",
          border:"1px solid gray",
          marginBottom:"20px"
        }}
      />

      {filtered.map((company:any)=>(
        <Link
          key={company.id}
          href={`/companies/${company.id}`}
          style={{textDecoration:"none"}}
        >
          <div style={{
            border:"1px solid #333",
            padding:"20px",
            borderRadius:"10px",
            marginBottom:"15px",
            cursor:"pointer",
            background:"#111"
          }}>

            <h2 style={{fontSize:"22px"}}>
              {company.name}
            </h2>

            <p style={{color:"gray"}}>
              {company.industry}
            </p>

          </div>
        </Link>
      ))}

    </div>
  )
}