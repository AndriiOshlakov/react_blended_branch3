import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { useDebouncedCallback } from "use-debounce";

import { fetchPosts } from "../../services/postService";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState();
  const [search, setSearch] = useState("");

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
  });

  const toggleEditPost = (post: Post) => {
    setEditedPost(post);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {/* <Pagination /> */}
        <button
          className={css.button}
          onClick={() => setIsCreatePost(!isCreatePost)}
        >
          Create post
        </button>
      </header>
      {isCreatePost && (
        <Modal onClose={() => setIsCreatePost(!isCreatePost)}>
          <CreatePostForm onCancel={() => setIsCreatePost(!isCreatePost)} />
        </Modal>
      )}
      {posts && (
        <PostList
          items={posts}
          toggleModal={() => setIsEditPost(!isEditPost)}
          toggleEditPost={toggleEditPost}
        />
      )}
      {isEditPost && editedPost && (
        <Modal onClose={() => setIsCreatePost(!isCreatePost)}>
          <EditPostForm
            onCancel={() => setIsEditPost(!isEditPost)}
            post={editedPost}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
