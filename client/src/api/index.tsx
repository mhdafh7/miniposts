import axios from "axios";
import { PostType } from "../components/PostCard";
import { SignInFormValues } from "../pages/Signin";
import { SignUpFormValues } from "../pages/Signup";

const API = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") as string).token
    }`;
  }
  return req;
});

// Fetch all posts
export const fetchPosts = () => API.get("/posts");

// Create a post
export const createPost = (newPost: PostType) => API.post("/posts", newPost);

// Update a post
export const updatePost = (id: string, updatedPost: PostType) =>
  API.patch(`/posts/${id}`, updatedPost);

// Delete a post
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

// Auth
export const signIn = (formData: SignInFormValues) =>
  API.post("/user/signin", formData);
export const signUp = (formData: SignUpFormValues) =>
  API.post("/user/signup", formData);
