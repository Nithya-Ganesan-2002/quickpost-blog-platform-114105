"use client";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { Post } from "@/hooks/usePosts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string, id?: string) => void;
  editingPost?: Post | null;
};

export default function PostEditorModal({ isOpen, onClose, onSave, editingPost }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content, editingPost?.id);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={editingPost ? "Edit Post" : "New Post"}
      ariaHideApp={false}
      className="bg-white rounded-lg max-w-xl mx-auto mt-24 shadow-lg outline-none p-6 relative"
      overlayClassName="fixed inset-0 bg-black/40 flex items-start justify-center z-30"
    >
      <button
        className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 text-xl"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="font-bold text-lg mb-2">
          {editingPost ? "Edit Post" : "New Post"}
        </h2>
        <input
          type="text"
          placeholder="Post title"
          className="border rounded px-3 py-2"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your post in Markdown..."
          className="border rounded px-3 py-2 h-48 font-mono"
          value={content}
          required
          onChange={e => setContent(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600"
        >
          {editingPost ? "Update" : "Create"} Post
        </button>
      </form>
    </Modal>
  );
}
