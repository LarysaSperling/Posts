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

 
  const [hasMore, setHasMore] = useState(true);
  const [info, setInfo] = useState(""); 


  const sortKey = (p) => {
    if (p?.createdAt) return new Date(p.createdAt).getTime();
    if (p?.date) return Number(p.date);
    return Number(p?.id ?? 0);
  };

  const loadPosts = useCallback(async (p = 1) => {
    setLoading(true);
    setInfo("");
    try {
      const res = await postsApi.getAll(p, LIMIT);
      const data = Array.isArray(res.data) ? res.data : [];

   
      const sorted = [...data].sort((a, b) => sortKey(b) - sortKey(a));

      setPosts(sorted);

      
      setHasMore(data.length === LIMIT);

      return data;
    } finally {
      setLoading(false);
    }
  }, [LIMIT]);

  
  useEffect(() => {
    setPage(1);
    loadPosts(1);
  }, [loadPosts]);

  
  const handleCreated = (createdPost) => {
    setPage(1);
    setInfo("");

    setPosts((prev) => {
      const merged = [createdPost, ...prev];
      const uniq = Array.from(new Map(merged.map((p) => [p.id, p])).values());
      uniq.sort((a, b) => sortKey(b) - sortKey(a));
      return uniq.slice(0, LIMIT);
    });

    
    setHasMore(true);
  };

 
  const handleDelete = async (id) => {
    await postsApi.remove(id);

    
    const data = await loadPosts(page);
    if (page > 1 && data.length === 0) {
      const prev = page - 1;
      setPage(prev);
      await loadPosts(prev);
    }
  };

  const handleNext = async () => {
    if (!hasMore || loading) return;

    const next = page + 1;
    setLoading(true);
    setInfo("");
    try {
      const res = await postsApi.getAll(next, LIMIT);
      const data = Array.isArray(res.data) ? res.data : [];

      if (data.length === 0) {
     
        setHasMore(false);
        setInfo("Постов больше нет");
        return;
      }

      const sorted = [...data].sort((a, b) => sortKey(b) - sortKey(a));
      setPosts(sorted);
      setPage(next);
      setHasMore(data.length === LIMIT);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = async () => {
    if (loading) return;
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
            hasMore={hasMore}
            info={info}
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
