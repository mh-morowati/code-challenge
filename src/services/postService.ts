import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async (page: number, limit: number = 12) => {
  const response = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
  return response.data;
};
