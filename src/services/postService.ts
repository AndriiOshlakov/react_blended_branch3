import axios from "axios";
import { CreatePost, EditPost, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsResponse {
  posts: Post[];
  totalCount: number;
}

export const fetchPosts = async (
  searchText: string,
  page: number,
  limit: number
): Promise<FetchPostsResponse> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      ...(searchText !== "" && { q: searchText }),
      _page: page,
      _limit: limit,
    },
  });
  console.log(response.data);
  return {
    posts: response.data,
    totalCount: Number(response.headers["x-total-count"]),
  };
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
