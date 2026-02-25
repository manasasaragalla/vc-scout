"use client"

import companies from "../../../data/companies.json"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function CompanyProfile(){

  const params = useParams()

  const company:any = companies.find(
    (c:any)=> c.id == params.id
  )

  const [data,setData] = useState<any>(null)
  const [loading,setLoading] = useState(false)

  async function enrich(){

    setLoading(true)

    const res = await fetch("/api/enrich",{
      method:"POST",
      body: JSON.stringify({
        website: company.website
      })
    })

    const result = await res.json()

    setData(result)

    setLoading(false)
  }

  return(
    <div style={{
      padding:"40px",
      maxWidth:"700px",
      margin:"auto"
    }}>

      <h1 style={{
        fontSize:"32px",
        marginBottom:"10px"
      }}>
        {company.name}
      </h1>

      <p style={{color:"gray"}}>
        {company.description}
      </p>

      <button
        onClick={enrich}
        disabled={loading}
        style={{
          marginTop:"20px",
          padding:"12px 20px",
          borderRadius:"8px",
          border:"none",
          background:"#4CAF50",
          color:"white",
          cursor:"pointer"
        }}
      >
        {loading ? "Enriching..." : "Enrich Company"}
      </button>

      {data && (
        <div style={{
          marginTop:"30px",
          padding:"20px",
          background:"#111",
          borderRadius:"10px"
        }}>

          <h3>AI Summary</h3>

          <p>{data.summary}</p>

        </div>
      )}

    </div>
  )
}