"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    // Simulate checking for a stored session
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, admin@example.com with any password logs in as admin
      if (email === "admin@example.com" && password === '1234') {
        const adminUser = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          password: "1234",
          role: "admin" as const,
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return true
      }
      // Any other email logs in as regular user
      else if (email) {
        const regularUser = {
          id: "2",
          name: "Regular User",
          email: email,
          role: "user" as const,
        }
        setUser(regularUser)
        localStorage.setItem("user", JSON.stringify(regularUser))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser = {
        id: "3",
        name: name,
        email: email,
        password: password,
        role: "user" as const,
      }

      // Don't auto-login after registration
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  const isAdmin = useCallback(() => {
    return user?.role === "admin"
  }, [user?.role])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

