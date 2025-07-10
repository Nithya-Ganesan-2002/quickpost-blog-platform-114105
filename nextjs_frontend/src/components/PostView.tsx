"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Post } from "@/hooks/usePosts";
import { useAuth } from "@/context/AuthContext";

type Props = {
  post: Post | null;
  onEdit?: (post: Post) => void;
};

export default function PostView({ post, onEdit }: Props) {
  const { user } = useAuth();
  if (!post)
    return (
      <div className="text-center text-gray-500 py-10">
        Select a post to view, or create a new post!
      </div>
    );
  return (
    <article className="w-full max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <div className="text-xs text-gray-400 mb-4">
        By {post.user_id.substring(0, 5)} • {new Date(post.created_at).toLocaleString()}
      </div>
      <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
      {user && user.id === post.user_id && onEdit && (
        <button
          className="mt-4 text-blue-600 border px-3 py-1 rounded hover:bg-blue-50 text-sm"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>
      )}
    </article>
  );
}
