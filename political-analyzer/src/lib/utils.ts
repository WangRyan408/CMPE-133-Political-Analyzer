import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * This allows for conditional classes and prevents class conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a more readable format
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Truncate a string to a specified length and add ellipsis
 */
export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Get the political leaning badge color based on the leaning value
 */
export function getPoliticalLeaningColor(leaning: string): string {
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
