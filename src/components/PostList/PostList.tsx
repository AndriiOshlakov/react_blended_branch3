import { Post } from "../../types/post";
import css from "./PostList.module.css";

interface PostListProps {
  items: Post[];
  toggleModal: () => void;
  toggleEditPost: (post: Post) => void;
}

export default function PostList({
  items,
  toggleModal,
  toggleEditPost,
}: PostListProps) {
  return (
    <ul className={css.list}>
      {items.map((item: Post) => (
        <li className={css.listItem} key={item.id}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.body}</p>
          <div className={css.footer}>
            <button
              className={css.edit}
              onClick={() => {
                toggleModal();
                toggleEditPost(item);
              }}
            >
              Edit
            </button>
            <button className={css.delete}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
