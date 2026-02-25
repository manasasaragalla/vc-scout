export async function POST(req: Request){

  const body = await req.json()

  const website = body.website

  return Response.json({

    summary:
      website + " is a fast-growing technology startup providing digital solutions.",

    keywords:
      ["startup","technology","software"],

    sources:
      [website]

  })

}