import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { url } = await req.json()

  const now = new Date().toISOString()

  return NextResponse.json({
    summary: `${url} is a fast-growing technology company focused on scalable digital solutions.`,

    whatTheyDo: [
      "Builds scalable web and SaaS products",
      "Provides API-based developer tools",
      "Offers cloud-native infrastructure solutions",
      "Focuses on automation and productivity"
    ],

    keywords: [
      "SaaS",
      "API",
      "Cloud",
      "Startup",
      "Technology",
      "Automation"
    ],

    signals: [
      "Careers page detected",
      "Recently updated blog",
      "Hiring for engineering roles",
      "Strong developer focus"
    ],

    sources: [
      {
        url: url,
        scrapedAt: now
      }
    ]
  })
}