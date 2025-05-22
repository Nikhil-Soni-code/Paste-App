import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

useEffect(() => {
  if (!pasteId) {
    setTitle("");
    setContent("");
    return;
  }

  const paste = allPastes.find((p) => p._id === pasteId);
  if (paste) {
    setTitle(paste.title);
    setContent(paste.content);
  }
}, [pasteId, allPastes]);



  const createPaste = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both title and content");
      return;
    }

    const paste = {
      title,
      content,
      _id: pasteId || new Date().getTime().toString(), // unique ID
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Clear form and search params after submit
    setTitle("");
    setContent("");
    setSearchParams({});
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6">
      {/* Title and Submit */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all"
        />
        <button
          onClick={createPaste}
          className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          {pasteId ? "Update" : "Submit"}
        </button>
      </div>

      {/* Content textarea */}
      <div>
        <textarea
          placeholder="Paste your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 resize-none px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 transition-all"
        />
      </div>
    </div>
  );
};

export default Home;
