"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios";


type User = {
  id: string
  name: string
  email: string
  role: boolean
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, secretKey: string) => Promise<boolean>
  logout: () => void
  isAdmin: () => boolean
  updateUser: (userData: Partial<User>) => void
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
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Run immediately
    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    try {
      const response = await axios.get(`/api/login?user_email=${email}&user_password=${password}`);
      const responseData = response.data;
      
      if (!responseData || !responseData.id) {
        console.error("Login failed: Invalid response data", responseData);
        setIsLoading(false);
        return false;
      }

      const userData = {
        id: responseData.id,
        name: responseData.name,
        email: responseData.email,
        role: responseData.isAdmin
      };
      // Change later
      setUser(userData);

      console.log(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;

    } catch (error) {
      console.error("Login failed:", error)
      setIsLoading(false)
      return false
    }

  }

  const register = async (name: string, email: string, password: string, secretKey: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          secret_key: secretKey
        })
      });
      
      const responseData = await response.json();
      console.log("Registration API response:", responseData);
      console.log("isAdmin value in response:", responseData.isAdmin);
      console.log("Type of isAdmin:", typeof responseData.isAdmin);
      console.log(responseData);

      if (responseData && responseData.id) {
        const userData = {
          id: responseData.id,
          name: responseData.name,
          email: responseData.email,
          role: responseData.isAdmin
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Registration failed:", error)
      setIsLoading(false);
      return false;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const isAdmin = () => {
    return user?.role ?? false;
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }

  const saveArticle = async (pred: number, authors: string, date: string, publisher: string) => {

  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin, updateUser }}>
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
