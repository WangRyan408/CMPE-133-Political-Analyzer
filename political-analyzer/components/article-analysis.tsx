import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Analysis = {
    prediction: number,
    authors: string,
    date: string
    publisher: string
  }

interface ArticleAnalysisProps {
  data: Analysis
}

export function ArticleAnalysis({ data }: ArticleAnalysisProps) {
  // Convert prediction (0-1) to political leaning category
  const getPoliticalLeaning = (prediction: number) => {
    if (prediction <= 0.2) return "Far Left";
    if (prediction <= 0.4) return "Left";
    if (prediction <= 0.6) return "Moderate";
    if (prediction <= 0.8) return "Right";
    return "Far Right";
  }
  
  // Calculate position for the indicator (0-100%)
  const getIndicatorPosition = (prediction: number) => {
    // Convert from 0-1 scale to 0-100% scale
    return prediction * 100;
  }
  
  // Calculate percentage leaning (with center at 0%)
  const getLeaningPercentage = (prediction: number) => {
    // 0.5 is center (0%)
    // 0 is far left (100% left)
    // 1 is far right (100% right)
    if (prediction === 0.5) return "0%";
    
    if (prediction < 0.5) {
      // Left leaning - calculate percentage from center
      const leftPercentage = Math.round((0.5 - prediction) * 200);
      return `${leftPercentage}% Left`;
    } else {
      // Right leaning - calculate percentage from center
      const rightPercentage = Math.round((prediction - 0.5) * 200);
      return `${rightPercentage}% Right`;
    }
  }
  
  const politicalLeaning = getPoliticalLeaning(data.prediction);
  const leaningPosition = getIndicatorPosition(data.prediction);
  const leaningPercentage = getLeaningPercentage(data.prediction);
  
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
          <h3 className="text-lg font-medium">Political Leaning Distribution</h3>
          <Badge className={getBadgeVariant(politicalLeaning)}>{politicalLeaning}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          Distribution of political leaning across analyzed articles
        </div>
        
        <div className="grid grid-cols-5 text-sm mt-4">
          <div>Far Left<br/>100%</div>
          <div>Left<br/>50%</div>
          <div className="text-center">Moderate<br/>0%</div>
          <div className="text-right">Right<br/>50%</div>
          <div className="text-right">Far Right<br/>100%</div>
        </div>
        
        <div className="relative h-4 mt-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 rounded-full" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-black rounded-full top-0 transform -translate-x-1/2 cursor-pointer"
                  style={{ left: `${leaningPosition}%` }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{leaningPercentage}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-5 text-sm mt-1">
          <div>Far Left</div>
          <div>Left</div>
          <div className="text-center">Moderate</div>
          <div className="text-right">Right</div>
          <div className="text-right">Far Right</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Source Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Publication</p>
            <p className="text-sm text-muted-foreground">{data.publisher}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Published Date</p>
            <p className="text-sm text-muted-foreground">{data.date}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Authors</p>
            <p className="text-sm text-muted-foreground">{data.authors}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
