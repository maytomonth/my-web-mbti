"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ImageIcon } from "lucide-react"
import { questions, calculateMBTIType } from "@/lib/mbti-data"
import { AdPlaceholder } from "@/components/ad-placeholder"

const answerOptions = [
  { value: 4, label: "Strongly Agree" },
  { value: 3, label: "Agree" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" },
]

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        const mbtiType = calculateMBTIType(newAnswers)
        localStorage.setItem("mbtiResult", mbtiType)
        window.location.href = "/test/result"
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-8" />

      {/* Ad Placeholder */}
      {currentQuestion === 10 && <AdPlaceholder className="mb-8" />}

      {/* Question Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">{questions[currentQuestion].text}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Illustration Placeholder */}
          <div className="bg-muted rounded-lg p-8 mb-6 flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedAnswer === option.value ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedAnswer(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Button */}
      <div className="text-center">
        <Button onClick={handleNext} disabled={selectedAnswer === null} size="lg">
          {currentQuestion < questions.length - 1 ? "Next" : "Get Results"}
        </Button>
      </div>
    </div>
  )
}
