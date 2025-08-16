// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import Loader from "../Loader/Loader";

import { ChangeEvent, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// import { useDebouncedCallback } from "use-debounce";

import { fetchPosts } from "../../services/postService";
import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
// import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";
import { useDebouncedCallback } from "use-debounce";

import { PacmanLoader } from "react-spinners";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";

const LIMIT = 10;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage, LIMIT),
    placeholderData: keepPreviousData,
  });

  const handleSearcChange = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    500
  );
  const toggleEditPost = (post: Post) => {
    setEditedPost(post);
  };

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / LIMIT) : 0;
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearcChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            forcePage={currentPage}
            onPageChange={handleChangePage}
          />
        )}
        <button
          className={css.button}
          onClick={() => setIsCreatePost(!isCreatePost)}
        >
          Create post
        </button>
      </header>
      {isPending && <PacmanLoader color="#3361d3" />}
      {isError && <ErrorMessage />}
      {isCreatePost && (
        <Modal onClose={() => setIsCreatePost(!isCreatePost)}>
          <CreatePostForm onCancel={() => setIsCreatePost(!isCreatePost)} />
        </Modal>
      )}
      {data && (
        <PostList
          items={data.posts}
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
