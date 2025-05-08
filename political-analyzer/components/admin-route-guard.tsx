"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "sonner"

export function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const { isLoading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAdmin()) {
      toast.error("Access Denied", {
        description: "You don't have permission to access this page",
      })
      router.push("/")
    }
  }, [isLoading, isAdmin, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not admin, children won't be rendered due to the redirect
  return isAdmin() ? <>{children}</> : null
}
