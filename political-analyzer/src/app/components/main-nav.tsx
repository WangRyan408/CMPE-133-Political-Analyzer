"use client"

import type React from "react"
import Link from "next/link"
import { BarChart3, BookMarked, Home, Settings } from "lucide-react"
import { useAuth } from "@/context/auth-context"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { isAdmin } = useAuth()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">Political Analyzer</span>
      </Link>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/" className="flex items-center text-sm font-medium">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/savedArticles" className="flex items-center text-sm font-medium">
          <BookMarked className="mr-2 h-4 w-4" />
          Saved Articles
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/account" className="flex items-center text-sm font-medium">
          <Settings className="mr-2 h-4 w-4" />
          Account
        </Link>
      </Button>
      {isAdmin() && (
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin" className="flex items-center text-sm font-medium">
            <BarChart3 className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      )}
    </nav>
  )
}
