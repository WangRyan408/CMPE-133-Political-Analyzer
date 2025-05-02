import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function ArticleAnalysis() {
  // Mock data for the analysis
  const politicalLeaning = "Right"
  const leaningScore = 72
  const confidence = 85
  const keyTerms = [
    { term: "conservative", count: 8, leaning: "right" },
    { term: "traditional", count: 6, leaning: "right" },
    { term: "freedom", count: 5, leaning: "right" },
    { term: "progressive", count: 3, leaning: "left" },
    { term: "regulation", count: 2, leaning: "left" },
  ]

  // Helper function to determine badge color based on leaning
  const getBadgeVariant = (leaning: string) => {
    switch (leaning.toLowerCase()) {
      case "far left":
        return "bg-blue-900 text-white"
      case "left":
        return "bg-blue-600 text-white"
      case "moderate":
        return "bg-purple-500 text-white"
      case "right":
        return "bg-red-600 text-white"
      case "far right":
        return "bg-red-900 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  // Helper function for term badge color
  const getTermBadgeColor = (leaning: string) => {
    return leaning === "left" ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Political Leaning</h3>
          <Badge className={getBadgeVariant(politicalLeaning)}>{politicalLeaning}</Badge>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Far Left</span>
            <span>Moderate</span>
            <span>Far Right</span>
          </div>
          <div className="relative h-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 rounded-full" />
            <div
              className="absolute w-4 h-4 bg-white border-2 border-black rounded-full top-0 transform -translate-x-1/2"
              style={{ left: `${leaningScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Analysis Confidence</h3>
          <span className="text-sm font-medium">{confidence}%</span>
        </div>
        <Progress value={confidence} className="h-2" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Key Political Terms</h3>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Right-leaning Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {keyTerms
                    .filter((term) => term.leaning === "right")
                    .map((term) => (
                      <Badge key={term.term} variant="outline" className="bg-red-100 text-red-800">
                        {term.term} ({term.count})
                      </Badge>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Left-leaning Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {keyTerms
                    .filter((term) => term.leaning === "left")
                    .map((term) => (
                      <Badge key={term.term} variant="outline" className="bg-blue-100 text-blue-800">
                        {term.term} ({term.count})
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Source Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Publication</p>
            <p className="text-sm text-muted-foreground">Example News</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Known Bias</p>
            <p className="text-sm text-muted-foreground">Right-leaning</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Published Date</p>
            <p className="text-sm text-muted-foreground">April 9, 2025</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Author</p>
            <p className="text-sm text-muted-foreground">John Smith</p>
          </div>
        </div>
      </div>
    </div>
  )
}
