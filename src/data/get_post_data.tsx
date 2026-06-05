import { useState, useEffect } from "react";
import { getPostById, type Post } from "../api/posts";

export function usePost(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPostById(id)
      .then(({ data }) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  return { post, loading, setPost };
}
