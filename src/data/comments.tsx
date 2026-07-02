import { useState, useEffect, useCallback } from "react";
import { getComments, addComment as apiAddComment, type Comment } from "../api/posts";

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const { data } = await getComments(postId);
      setComments(data);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (content: string) => {
    const { data } = await apiAddComment(postId, content);
    setComments(prev => [data, ...prev]);
    return data;
  };

  return { comments, setComments, addComment, loading, refetch: fetchComments };
}
