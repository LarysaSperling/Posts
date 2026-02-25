import { useCallback, useEffect, useState } from "react";
import Header from "./components/header";
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import { postsApi } from "./api/posts";
import styles from "./App.module.css";

export default function App() {
  const LIMIT = 3;

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  
  const sortKey = (p) => {
    if (p?.createdAt) return new Date(p.createdAt).getTime();
    if (p?.date) return Number(p.date);
    return Number(p?.id ?? 0);
  };

  const loadPosts = useCallback(
    async (p = page) => {
      setLoading(true);
      try {
        const res = await postsApi.getAll(p, LIMIT);

        const sorted = [...(res?.data ?? [])].sort(
          (a, b) => sortKey(b) - sortKey(a)
        );

        setPosts(sorted);
      } finally {
        setLoading(false);
      }
    },
    [LIMIT, page]
  );


  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  
  const handleCreated = (createdPost) => {
    setPage(1);

    setPosts((prev) => {
      const merged = [createdPost, ...prev];

      const uniq = Array.from(new Map(merged.map((p) => [p.id, p])).values());

      
      uniq.sort((a, b) => sortKey(b) - sortKey(a));

      return uniq.slice(0, LIMIT);
    });
  };

  const handleDelete = useCallback(
    async (id) => {
      await postsApi.remove(id);
      await loadPosts(page);
    },
    [loadPosts, page]
  );

  const handleNext = useCallback(async () => {
    const next = page + 1;
    setPage(next);
    await loadPosts(next);
  }, [loadPosts, page]);

  const handlePrev = useCallback(async () => {
    const prev = Math.max(1, page - 1);
    setPage(prev);
    await loadPosts(prev);
  }, [loadPosts, page]);

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
