"use client"

import { useState } from "react"
import { BookmarkPlus, ExternalLink } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleAnalysis } from "@/components/article-analysis"

export default function Home() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAnalyze = () => {
    if (!url) {
      toast.error("Error", {
        description: "Please enter a URL to analyze",
      })
      return
    }

    setIsAnalyzing(true)

    // ENTER ANALYSIS STUFF HERE

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="container py-8 px-4 md:py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Political News Analyzer</h1>
        <p className="text-muted-foreground max-w-[700px] mb-6">
          Analyze the political leaning of news articles. Enter a URL below to get started.
        </p>
        <div className="grid w-full max-w-2xl gap-2">
          <Label htmlFor="url">Article URL</Label>
          <div className="flex w-full items-center space-x-2">
            <Input
              id="url"
              placeholder="https://example.com/news-article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={isAnalyzing}>
              {isAnalyzing ? "Analyzing..." : "Analyze"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Supported sites: CNN, Fox News, New York Times, Washington Post, BBC, etc.
          </p>
        </div>
      </div>

      {showResults && (
        <div className="mt-8">
          <Tabs defaultValue="analysis">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="article">Article Content</TabsTrigger>
            </TabsList>
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Analysis Results</CardTitle>
                      <CardDescription>Political leaning analysis for the provided article</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast.success("Article saved", {
                            description: "The article has been saved to your account",
                          })
                        }}
                      >
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save Article
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Source
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ArticleAnalysis />
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <h3 className="font-semibold mb-2">Discussion</h3>
                  <div className="w-full p-4 border rounded-md bg-muted/50">
                    <p className="text-center text-muted-foreground">
                      Disqus comments would be embedded here for registered users
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="article">
              <Card>
                <CardHeader>
                  <CardTitle>Article Content</CardTitle>
                  <CardDescription>Content with politically charged words highlighted</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h2>Sample Article Title</h2>
                    <p>
                      This is a sample article content. Words like{" "}
                      <span className="bg-red-100 px-1 rounded">controversial</span> and{" "}
                      <span className="bg-blue-100 px-1 rounded">progressive</span> would be highlighted based on their
                      political leaning. The system analyzes the{" "}
                      <span className="bg-red-100 px-1 rounded">conservative</span> or{" "}
                      <span className="bg-blue-100 px-1 rounded">liberal</span> nature of the content.
                    </p>
                    <p>
                      Further paragraphs would contain more{" "}
                      <span className="bg-blue-100 px-1 rounded">left-leaning</span> or{" "}
                      <span className="bg-red-100 px-1 rounded">right-leaning</span> terminology that would be
                      highlighted accordingly. The intensity of the highlighting might vary based on how strongly the
                      word is associated with a particular political stance.
                    </p>
                    <p>
                      The full article would be displayed here with all politically charged words highlighted for easy
                      identification of potential bias in the reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
