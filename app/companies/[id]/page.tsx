"use client"

import companies from "../../../data/companies.json"
import { useParams } from "next/navigation"
import { useState } from "react"

export default function CompanyProfile() {

  const params = useParams()

  const company:any = companies.find(
    (c:any)=> c.id == params.id
  )

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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
    <div style={{padding:"40px"}}>

      <h1 style={{fontSize:"30px"}}>
        {company.name}
      </h1>

      <p>
        {company.description}
      </p>

      <button
        onClick={enrich}
        style={{
          padding:"10px",
          background:"white",
          color:"black",
          marginTop:"10px"
        }}
      >
        ENRICH
      </button>

      {loading && <p>Loading...</p>}

      {data && (
        <div>

          <h3>Summary:</h3>

          <p>{data.summary}</p>

        </div>
      )}

    </div>
  )
}