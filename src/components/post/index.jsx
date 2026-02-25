import styles from "./styles.module.css";
import avatar from "../../assets/avatar.svg";

export default function Post({ post, onDelete }) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt="avatar" />
      <div>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>

      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </div>
  );
}