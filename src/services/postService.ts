import axios from "axios";
import { CreatePost, EditPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>("/posts");
  console.log(response.data);
  return response.data;
};

export const createPost = async (newPost: CreatePost) => {
  const response = await axios.post<Post>("/posts", newPost);

  return response.data;
};

export const editPost = async (
  postId: number,
  newDataPost: EditPost
): Promise<Post> => {
  const response = await axios.patch(`/posts/${postId}`, newDataPost);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete<Post>(`/posts/${postId}`);
  return response.data;
};
