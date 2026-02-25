
  import Post from "../post";
import styles from "./styles.module.css";

export default function PostList({ posts, loading, page, onDelete, onNext, onPrev }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Список постов</h2>

      <div className={styles.list}>
        {loading && <p className={styles.info}>Загрузка...</p>}

        {!loading && posts.map((p) => (
          <Post key={p.id} post={p} onDelete={onDelete} />
        ))}

        {!loading && posts.length === 0 && <p className={styles.info}>Постов нет.</p>}
      </div>

      <div className={styles.bottom}>
        <button className={styles.navBtn} onClick={onPrev} disabled={loading || page === 1}>
          Назад
        </button>
        <button className={styles.navBtn} onClick={onNext} disabled={loading}>
          Далее
        </button>
      </div>
    </div>
  );
}