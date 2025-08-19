"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users } from "lucide-react"
import { mbtiTypes, getTopMatches } from "@/lib/mbti-data"
import { AdPlaceholder } from "@/components/ad-placeholder"

export default function TestResultPage() {
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const mbtiResult = localStorage.getItem("mbtiResult")
    setResult(mbtiResult)
  }, [])

  if (!result || !mbtiTypes[result]) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>No test result found. Please take the test first.</p>
        <Button asChild className="mt-4">
          <Link href="/test">Take Test</Link>
        </Button>
      </div>
    )
  }

  const mbtiData = mbtiTypes[result]
  const compatibleTypes = getTopMatches(result)

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Result Card */}
      <Card className="mb-8 text-center">
        <CardHeader>
          <div className="mb-4">
            <Brain className="h-16 w-16 mx-auto text-primary mb-4" />
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-2">
              {mbtiData.type}
            </Badge>
            <CardTitle className="text-2xl">{mbtiData.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{mbtiData.description}</p>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {mbtiData.keywords.map((keyword) => (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="hidden">
        <AdPlaceholder className="mb-8" />
      </div>

      {/* Compatible Types */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top 3 Compatible Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {compatibleTypes.map((match) => (
              <div key={match.type} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Badge variant="secondary">{match.type}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{mbtiTypes[match.type]?.title}</p>
                  <p className="text-xs text-muted-foreground">{match.score}% compatibility</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/match">Check Compatibility</Link>
        </Button>
      </div>
    </div>
  )
}
