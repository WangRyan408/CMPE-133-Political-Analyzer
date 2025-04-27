"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AuthRouteGuard } from "@/components/auth-route-guard"
import { getPoliticalLeaningColor } from "@/lib/utils"

export default function SavedArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for saved articles
  const [savedArticles, setSavedArticles] = useState([
    {
      id: 1,
      title: "The Impact of New Tax Legislation",
      source: "Example News",
      url: "https://example.com/tax-legislation",
      date: "April 5, 2025",
      leaning: "Right",
    },
    {
      id: 2,
      title: "Climate Change Policy Developments",
      source: "News Example",
      url: "https://example.com/climate-policy",
      date: "April 3, 2025",
      leaning: "Left",
    },
    {
      id: 3,
      title: "Healthcare Reform Debate Continues",
      source: "Daily News",
      url: "https://example.com/healthcare-reform",
      date: "April 1, 2025",
      leaning: "Moderate",
    },
  ])

  const handleDelete = (id: number) => {
    setSavedArticles(savedArticles.filter((article) => article.id !== id))
    toast.success("Article removed", {
      description: "The article has been removed from your saved list",
    })
  }

  // Filter articles based on search term
  const filteredArticles = savedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.source.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AuthRouteGuard>
      <div className="container py-8 px-4 md:py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Saved Articles</h1>
          <p className="text-muted-foreground max-w-[700px] mb-6">View and manage your saved articles</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Input
              placeholder="Search saved articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>

          {filteredArticles.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-muted-foreground mb-4">No saved articles found</p>
              <Button asChild>
                <Link href="/">Analyze New Article</Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                        <CardDescription>
                          {article.source} • {article.date}
                        </CardDescription>
                      </div>
                      <Badge className={getPoliticalLeaningColor(article.leaning)}>{article.leaning}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Source
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/?url=${encodeURIComponent(article.url)}`}>Reanalyze</Link>
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm text-muted-foreground">Saved on {article.date}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthRouteGuard>
  )
}
