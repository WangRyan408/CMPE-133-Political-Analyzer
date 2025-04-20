"use client"

import type React from "react"
import Link from "next/link"
import { BarChart3, BookMarked, Home, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { user, isAdmin, isLoading } = useAuth()
  const isLoggedIn = !!user

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

      {isLoading ? (
        // Show skeleton loaders while checking auth state
        <>
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </>
      ) : (
        <>
          {isLoggedIn && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/saved" className="flex items-center text-sm font-medium">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Saved Articles
                </Link>
              </Button>
            </>
          )}

          {isAdmin() && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin" className="flex items-center text-sm font-medium">
                <BarChart3 className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </Button>
          )}
        </>
      )}
    </nav>
  )
}
