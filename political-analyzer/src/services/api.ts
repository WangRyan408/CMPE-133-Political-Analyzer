import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Replace with your FastAPI backend URL

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // User data
  } catch (error: any) {
    console.error("Login failed:", error.response?.data?.detail || error.message);
    throw new Error(error.response?.data?.detail || "Login failed");
  }
};