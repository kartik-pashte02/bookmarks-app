
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
}

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [editingId, setEditingId] = useState("");
const [editTitle, setEditTitle] = useState("");
const [editUrl, setEditUrl] = useState("");

async function fetchBookmarks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("Logged In User:", user);

  if (!user) {
    console.log("No user found");
    return;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  console.log("Fetched Data:", data);
  console.log("Fetch Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  setBookmarks(data || []);

}

  async function addBookmark() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("Current User ID:", user?.id);
    console.log("Current Email:", user?.email);

    if (!user) {
      alert("Please login");
      return;
    }

    if (!title.trim() || !url.trim()) {
      alert("Please enter title and URL");
      return;
    }

    const { error } = await supabase.from("bookmarks").insert([
      {
        user_id: user.id,
        title: title.trim(),
        url: url.trim(),
        is_public: isPublic,
      },
    ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    setTitle("");
    setUrl("");
    setIsPublic(false);

    fetchBookmarks();
  }

async function deleteBookmark(id: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this bookmark?"
  );

  if (!confirmDelete) {
    return;
  }

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  alert("Bookmark deleted successfully");

  fetchBookmarks();
}

  useEffect(() => {
    fetchBookmarks();
  }, []);

  async function updateBookmark() {
  const { error } = await supabase
    .from("bookmarks")
    .update({
      title: editTitle,
      url: editUrl,
    })
    .eq("id", editingId);

  if (error) {
    alert(error.message);
    return;
  }

  setEditingId("");
  setEditTitle("");
  setEditUrl("");

  fetchBookmarks();
}

  
  return (
<div className="max-w-6xl mx-auto p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your personal bookmarks.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-fit">
          <h2 className="text-xl font-semibold mb-5">
            Add Bookmark
          </h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 p-3 rounded-lg mb-4"
          />

          <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
           className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg mb-4 outline-none focus:border-blue-500"></input>

          <label className="flex gap-2 mb-5">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Public Bookmark
          </label>

          <button
            onClick={addBookmark}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
          >
            Add Bookmark
          </button>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-5">
            My Bookmarks
          </h2>

          {editingId && (
  <div className="bg-zinc-800 p-4 rounded-lg mb-4">

    <h3 className="font-bold mb-3">
      Edit Bookmark
    </h3>

    <input
      type="text"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)}
      className="w-full bg-zinc-700 p-2 rounded mb-2"
    />

    <input
      type="text"
      value={editUrl}
      onChange={(e) => setEditUrl(e.target.value)}
      className="w-full bg-zinc-700 p-2 rounded mb-3"
    />

    <button
      onClick={updateBookmark}
      className="bg-green-600 px-4 py-2 rounded"
    >
      Save Changes
    </button>

  </div>
)}

          <div className="grid gap-4">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {bookmark.title}
                    </h3>

                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400"
                    >
                      {bookmark.url}
                    </a>
                  </div>

                <span className={`px-3 py-1 rounded-full text-sm ${
  bookmark.is_public
    ? "bg-green-500/20 text-green-400"
    : "bg-red-500/20 text-red-400"
}`}>
  {bookmark.is_public ? "Public" : "Private"}
</span>
                </div>
<div className="flex gap-3 mt-4">

  <button
    onClick={() => {
      setEditingId(bookmark.id);
      setEditTitle(bookmark.title);
      setEditUrl(bookmark.url);
    }}
    className="bg-yellow-500 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteBookmark(bookmark.id)}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4"
  >
    Delete
  </button>

</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}