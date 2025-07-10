"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export type Post = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at?: string;
};

export const usePosts = (userOnly: boolean = false, userId?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // PUBLIC_INTERFACE
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (userOnly && userId) {
      query = query.eq("user_id", userId);
    }
    const { data, error } = await query;
    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  }, [userOnly, userId]);

  // PUBLIC_INTERFACE
  const createPost = async (title: string, content: string, user_id: string) => {
    const { data, error } = await supabase.from("posts").insert([{ title, content, user_id }]);
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const updatePost = async (id: string, title: string, content: string) => {
    const { data, error } = await supabase.from("posts").update({ title, content, updated_at: new Date().toISOString() }).eq("id", id);
    return { data, error };
  };

  // PUBLIC_INTERFACE
  const deletePost = async (id: string) => {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    return { error };
  };

  // Real-time subscribe to post changes
  useEffect(() => {
    fetchPosts();

    const channel = supabase.channel("realtime-posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  return { posts, loading, fetchPosts, createPost, updatePost, deletePost };
};
