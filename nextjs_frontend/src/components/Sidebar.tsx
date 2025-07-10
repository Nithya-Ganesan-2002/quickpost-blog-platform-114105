"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Post } from "@/hooks/usePosts";

type SidebarProps = {
  onStartNewPost: () => void;
  posts: Post[];
  onSelectPost: (post: Post) => void;
  recentCount?: number;
};

export default function Sidebar({ onStartNewPost, posts, onSelectPost, recentCount = 5 }: SidebarProps) {
  const { user } = useAuth();
  return (
    <aside className="w-full sm:w-64 bg-gray-50 border-r border-gray-200 min-h-[200px] px-4 py-6 flex flex-col gap-6">
      <div>
        {user ? (
          <button
            className="w-full bg-blue-500 text-white rounded py-2 text-sm font-semibold hover:bg-blue-600 transition mb-6"
            onClick={onStartNewPost}
          >
            + New Post
          </button>
        ) : (
          <div className="py-2 text-center text-gray-400 text-sm">
            Log in to create posts
          </div>
        )}
      </div>
      <div>
        <h2 className="font-bold text-gray-600 mb-2 text-xs uppercase tracking-widest">
          Recent Posts
        </h2>
        <ul className="text-sm space-y-2">
          {posts.slice(0, recentCount).map(post => (
            <li key={post.id}>
              <button
                onClick={() => onSelectPost(post)}
                className="text-blue-600 hover:underline truncate w-full text-left"
              >
                {post.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
