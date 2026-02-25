import { useState } from "react";
import Header from "./components/header";
import PostList from "./components/postList";
import PostForm from "./components/postForm";
import styles from "./App.css";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <div className={styles.grid}>
          <PostList refreshKey={refreshKey} />
          <PostForm onCreated={() => setRefreshKey((k) => k + 1)} />
        </div>
      </main>
    </div>
  );
}
