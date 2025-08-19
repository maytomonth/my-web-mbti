"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, Heart, Users, ThumbsUp, ThumbsDown } from "lucide-react"
import { mbtiTypes, getCompatibilityScore, getCompatibilityAnalysis, getTopMatches } from "@/lib/mbti-data"
import { AdPlaceholder } from "@/components/ad-placeholder"

export default function MatchResultPage() {
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<string>("")
  const [partnerType, setPartnerType] = useState<string>("")

  useEffect(() => {
    const userParam = searchParams.get("user")
    const partnerParam = searchParams.get("partner")

    if (userParam && partnerParam) {
      setUserType(userParam)
      setPartnerType(partnerParam)
    } else {
      // Fallback to localStorage or default
      const storedResult = localStorage.getItem("mbtiResult")
      if (storedResult) {
        setUserType(storedResult)
        setPartnerType("ENFJ") // Default for demo
      }
    }
  }, [searchParams])

  if (!userType || !partnerType || !mbtiTypes[userType] || !mbtiTypes[partnerType]) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <p>Invalid MBTI types. Please try again.</p>
        <Button asChild className="mt-4">
          <Link href="/match">Check Compatibility</Link>
        </Button>
      </div>
    )
  }

  const compatibilityScore = getCompatibilityScore(userType, partnerType)
  const { pros, cons } = getCompatibilityAnalysis(userType, partnerType)
  const userInfo = mbtiTypes[userType]
  const partnerInfo = mbtiTypes[partnerType]
  const topMatches = getTopMatches(userType)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid gap-6">
        {/* User Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Type: {userInfo.type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-lg">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">{userInfo.title}</h3>
                <p className="text-sm text-muted-foreground">{userInfo.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatibility Score Card */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              Compatibility Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-4xl font-bold text-primary mb-2">{compatibilityScore}%</div>
              <Progress value={compatibilityScore} className="w-full max-w-xs mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                  Strengths
                </h4>
                <ul className="text-sm space-y-2">
                  {pros.map((pro, index) => (
                    <li key={index} className="text-muted-foreground text-left">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <ThumbsDown className="h-4 w-4 text-orange-600" />
                  Challenges
                </h4>
                <ul className="text-sm space-y-2">
                  {cons.map((con, index) => (
                    <li key={index} className="text-muted-foreground text-left">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Placeholder */}
        <AdPlaceholder />

        {/* Partner Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Partner Type: {partnerInfo.type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-4 rounded-lg">
                <Heart className="h-8 w-8 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold">{partnerInfo.title}</h3>
                <p className="text-sm text-muted-foreground">{partnerInfo.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Matches Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top 3 Matches for {userType}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMatches.map((match, index) => (
                <div key={match.type} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <Badge variant="outline">{match.type}</Badge>
                    <span className="text-sm text-muted-foreground">{mbtiTypes[match.type]?.title}</span>
                  </div>
                  <div className="text-sm font-medium">{match.score}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link href="/match">Try Another Match</Link>
          </Button>
          <Button asChild>
            <Link href="/test">Take Test Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
