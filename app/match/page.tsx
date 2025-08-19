"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, Heart } from "lucide-react"

const mbtiTypes = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
]

export default function MatchPage() {
  const [userType, setUserType] = useState("")
  const [partnerType, setPartnerType] = useState("")

  const handleCheckCompatibility = () => {
    if (userType && partnerType) {
      // In a real app, you'd pass these as URL params or store in state
      window.location.href = `/match/result?user=${userType}&partner=${partnerType}`
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-center">Check Compatibility</h1>
        <p className="text-muted-foreground text-center mt-2">Select both MBTI types to see how compatible they are</p>
      </div>

      {/* User Type Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Your MBTI Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={userType} onValueChange={setUserType}>
            <SelectTrigger>
              <SelectValue placeholder="Select your MBTI type" />
            </SelectTrigger>
            <SelectContent>
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Partner Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Partner's MBTI Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={partnerType} onValueChange={setPartnerType}>
            <SelectTrigger>
              <SelectValue placeholder="Select partner's MBTI type" />
            </SelectTrigger>
            <SelectContent>
              {mbtiTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Check Compatibility Button */}
      <div className="text-center">
        <Button onClick={handleCheckCompatibility} disabled={!userType || !partnerType} size="lg">
          Check Compatibility
        </Button>
      </div>
    </div>
  )
}
