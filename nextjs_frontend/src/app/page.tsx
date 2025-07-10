"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostEditorModal from "@/components/PostEditorModal";
import PostView from "@/components/PostView";
import { useState } from "react";
import { usePosts, Post } from "@/hooks/usePosts";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const { posts, createPost, updatePost, loading } = usePosts(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleStartNewPost = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

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
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onStartNewPost={handleStartNewPost}
          posts={posts}
          onSelectPost={handleSelectPost}
        />
        <main className="flex-1 overflow-auto p-8 flex justify-center">
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
