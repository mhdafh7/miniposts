import axios from "axios";
import { PostType } from "../components/PostCard";
import { SignInFormValues } from "../pages/Signin";
import { SignUpFormValues } from "../pages/Signup";

const url = axios.create({ baseURL: "http://localhost:5000" });

url.interceptors.request.use((req) => {
  const profileString = localStorage.getItem("profile");
  if (profileString !== null) {
    const profile = JSON.parse(profileString);
    req.headers.Authorization = `Bearer ${profile.token}`;
  }

  return req;
});

export const fetchPosts = () => url.get("/posts");
export const createPost = (newPost: PostType) => url.post("/posts", newPost);
export const likePost = (id: any) => url.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: PostType) =>
  url.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => url.delete(`/posts/${id}`);

export const signIn = (formData: SignInFormValues) =>
  url.post("/user/signin", formData);
export const signUp = (formData: SignUpFormValues) =>
  url.post("/user/signup", formData);
