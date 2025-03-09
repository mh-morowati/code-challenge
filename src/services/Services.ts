import { User } from "@/app/api/auth/login/types";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

 const fetchPosts = async (page: number, limit: number = 12) => {
  const response = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
  return response.data;
};

// Function to fetch users
const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const ApiService = {
  fetchPosts,
  getUsers
}