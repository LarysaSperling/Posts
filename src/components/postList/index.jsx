import Post from "../post";
import styles from "./styles.module.css";

export default function PostList({
  posts,
  loading,
  page,
  hasMore,
  info,
  onDelete,
  onNext,
  onPrev,
}) {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Список постов</h2>

      <div className={styles.list}>
        {loading && <p className={styles.info}>Загрузка...</p>}

        {!loading && posts.length === 0 && (
          <p className={styles.info}>Постов нет.</p>
        )}

        {!loading &&
          posts.map((post) => (
            <Post
              key={post.id}          
              post={post}
              onDelete={onDelete}
            />
          ))}
      </div>

      {info && <p className={styles.info}>{info}</p>}

      <div className={styles.bottom}>
        <button
          className={styles.navBtn}
          onClick={onPrev}
          disabled={loading || page === 1}
        >
          Назад
        </button>

        <button
          className={styles.navBtn}
          onClick={onNext}
          disabled={loading || !hasMore}
        >
          Далее
        </button>
      </div>
    </section>
  );
}