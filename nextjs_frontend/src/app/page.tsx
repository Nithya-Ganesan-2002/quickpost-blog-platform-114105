"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostEditorModal from "@/components/PostEditorModal";
import PostView from "@/components/PostView";
import { useState, useEffect, useCallback } from "react";
import { usePosts, Post } from "@/hooks/usePosts";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const { posts, createPost, updatePost, loading } = usePosts(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Provide a callback so Navbar can access this function via window prop
  // This is hacky but avoids rewiring layout; for a robust solution, recommend state management.
  const handleStartNewPost = useCallback(() => {
    setEditingPost(null);
    setModalOpen(true);
  }, []);

  // Type safe augmentation of window for QuickPostNavbarProps
  interface QuickPostNavbarPropsShape {
    onStartNewPost?: () => void;
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as Window & { QuickPostNavbarProps?: QuickPostNavbarPropsShape }).QuickPostNavbarProps = {
        onStartNewPost: handleStartNewPost,
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as Window & { QuickPostNavbarProps?: QuickPostNavbarPropsShape }).QuickPostNavbarProps;
      }
    };
  }, [handleStartNewPost]);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleSavePost = async (title: string, content: string, id?: string) => {
    if (id && editingPost) {
      await updatePost(id, title, content);
    } else if (user) {
      await createPost(title, content, user.id);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar now can trigger modal via window.QuickPostNavbarProps */}
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onStartNewPost={handleStartNewPost}
          posts={posts}
          onSelectPost={handleSelectPost}
        />
        <main className="flex-1 overflow-auto p-8 flex flex-col items-center justify-center">
          {/* Show central "Create New Post" if no post is selected, no posts exist, or for extra prominence at top */}
          {user && !loading && posts.length === 0 && (
            <button
              className="mb-8 px-6 py-3 rounded bg-blue-500 text-white font-bold text-lg shadow-sm hover:bg-blue-600 transition"
              onClick={handleStartNewPost}
            >
              + Create Your First Post
            </button>
          )}
          {user && !loading && posts.length > 0 && !selectedPost && (
            <button
              className="mb-8 px-5 py-2 rounded bg-blue-500 text-white font-semibold shadow-sm hover:bg-blue-600 transition"
              onClick={handleStartNewPost}
            >
              + New Post
            </button>
          )}
          {loading ? (
            <div className="m-auto text-gray-400">Loading posts…</div>
          ) : (
            <PostView
              post={selectedPost || posts[0] || null}
              onEdit={handleEdit}
            />
          )}
        </main>
      </div>
      <PostEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePost}
        editingPost={editingPost}
      />
    </div>
  );
}
