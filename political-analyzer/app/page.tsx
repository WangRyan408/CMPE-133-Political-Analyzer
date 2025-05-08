"use client"

import { useState } from "react"
import { BookmarkPlus, ExternalLink } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArticleAnalysis } from "@/components/article-analysis"
import { useAuth } from "@/contexts/auth-context"

type Analysis = {
  "prediction": number,
  "authors": string,
  "date": string
  "publisher": string,
  "title": string,
}


export default function Home() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisData, setAnalysisData] = useState<Analysis>({
    prediction: 0,
    authors: "",
    date: "",
    publisher: "",
    title: "",
  });

  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  
  const { user } = useAuth();


  const handleAnalyze = async () => {
    if (!url) {
      toast.error("Error", {
        description: "Please enter a URL to analyze",
      })
      return
    }

    if (!urlRegex.test(url)) {
      toast.error("Error", {
        description: "Invalid URL",
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analysis", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: url
        })
      });
  
      const responseData = await response.json();
      console.log(responseData);
      setAnalysisData(responseData);

      if (analysisData.title == "")
      {
        toast.error("Error", {
          description: "Invalid URL",
        })
        setIsAnalyzing(false);
        return
      }
      
      setShowResults(true);
      setIsAnalyzing(false);
    } catch (error) {
      console.log("Error Analyzing Article:", error);
      setIsAnalyzing(false);
    }
  }

  const saveArticle = async () => {

    // "title": "string",
    // "user_id": 0,
    // "prediction": 0,
    // "authors": "string",
    // "date": "string",
    // "publisher": "string",
    // "url": "string"
    const saveArticleData = {
        title: analysisData.title,
        user_id: user?.id,
        prediction: analysisData.prediction,
        authors: analysisData.authors,
        date: analysisData.date,
        publisher: analysisData.publisher,
        url: url
    }
    
    console.log(saveArticleData);
    const createArticle = await fetch("/api/create", {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveArticleData)
    });

    const articleResponse = await createArticle.json();
    console.log(articleResponse);

    toast.success("Article saved", {
      description: "The article has been saved to your account",
    })
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
            Supported sites: CNN, Fox News, NPR, MSNBC, BBC, etc.
          </p>
        </div>
      </div>

      {showResults && (
        <div className="mt-8">
          <Tabs defaultValue="analysis">
            <TabsList className="w-full">
              <TabsTrigger value="analysis" className="w-full">Analysis</TabsTrigger>
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
                        onClick={saveArticle}
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
                  <ArticleAnalysis data={analysisData}/>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
