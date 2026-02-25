import styles from "./styles.module.css";
import avatar from "../../assets/avatar.svg";

export default function Post({ post, onDelete }) {
  const postText = post.text || post.content || post.body || "";

  return (
    <article className={styles.card}>
    
      <div className={styles.left}>
        <img src={avatar} className={styles.avatar} alt="User avatar" />
        <span className={styles.userLogo}>User logo</span>
      </div>

    
      <div className={styles.divider} />

     
      <div className={styles.center}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.text}>{postText}</p>
      </div>

      
      <div className={styles.right}>
        <div className={styles.postId}>id post {post.id}</div>

        <button className={styles.deleteBtn} onClick={() => onDelete(post.id)}>
          Удалить
        </button>
      </div>
    </article>
  );
}