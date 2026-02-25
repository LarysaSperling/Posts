import { useEffect, useState } from "react";
import Header from "./components/header";
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import { postsApi } from "./api/posts";
import styles from "./App.module.css"; // якщо у тебе App.css — заміни як казала раніше

export default function App() {
  const LIMIT = 3;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPosts = async (p = page) => {
    setLoading(true);
    try {
      const res = await postsApi.getAll(p, LIMIT);

      // ✅ гарантуємо, що нові зверху (навіть якщо mockAPI не відсортує)
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setPosts(sorted);
    } finally {
      setLoading(false);
    }
  };

  // первинне завантаження
  useEffect(() => {
    loadPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ після створення: одразу показати першим + перейти на 1 сторінку
  const handleCreated = (createdPost) => {
    setPage(1);

    setPosts((prev) => {
      const merged = [createdPost, ...prev];

      // прибираємо дублікати по id
      const uniq = Array.from(new Map(merged.map((p) => [p.id, p])).values());

      // сортуємо по даті (нові зверху)
      uniq.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // якщо хочеш жорстко LIMIT на сторінці — можна обрізати:
      return uniq.slice(0, LIMIT);
    });
  };

  // після видалення — оновлюємо поточну сторінку з сервера
  const handleDelete = async (id) => {
    await postsApi.remove(id);
    await loadPosts(page);
  };

  const handleNext = async () => {
    const next = page + 1;
    setPage(next);
    await loadPosts(next);
  };

  const handlePrev = async () => {
    const prev = Math.max(1, page - 1);
    setPage(prev);
    await loadPosts(prev);
  };

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <div className={styles.grid}>
          <PostList
            posts={posts}
            loading={loading}
            page={page}
            onDelete={handleDelete}
            onNext={handleNext}
            onPrev={handlePrev}
          />

          <PostForm onCreated={handleCreated} />
        </div>
      </main>
    </div>
  );
}
