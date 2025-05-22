import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [filteredPastes, setFilteredPastes] = useState(pastes);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredPastes(pastes);
  }, [pastes]);

  const removePaste = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };
  const handleWhatsAppShare = (paste) => {
    // 1. Prepare the message you want to share on WhatsApp
    const message = `*${paste.title}*\n${paste.content}\n\nShared via MyPasteApp`;

    // 2. Encode the message so it works safely in a URL
    const encodedMessage = encodeURIComponent(message);

    // 3. Create the WhatsApp share link with the encoded message
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // 4. Open a new browser tab/window with the WhatsApp URL to share the message
    window.open(whatsappUrl, "_blank");
  };

  const search = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredPastes(pastes);
    } else {
      const filtered = pastes.filter((paste) =>
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPastes(filtered);
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("🫡 Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-10 bg-gray-100 min-h-screen font-sans">
      {/* Search Bar */}
      <div className="mb-10 relative">
        <input
          type="text"
          onChange={(e) => search(e.target.value)}
          placeholder="Search pastes..."
          className="w-full px-6 py-3 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-800 text-base placeholder-gray-500 transition"
        />
      </div>

      {/* Paste List */}
      {filteredPastes.map((paste) => (
        <div
          key={paste._id}
          className="bg-white border border-gray-300 shadow-md rounded-lg p-7 mb-10 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide">
            {paste.title}
          </h3>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap leading-relaxed text-lg">
            {paste.content}
          </p>

          <p className="text-sm text-gray-500 mb-7 italic tracking-tight">
            Created at: {new Date(paste.createAt).toLocaleString()}
          </p>

          <div className="flex flex-wrap gap-5">
          <Link to={`/?pasteId=${paste._id}`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition">
              Edit
            </button>
          </Link>

            <Link
              to={`/paste/${paste._id}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition"
              
            >
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition">
                View
              </button>
            </Link>

            <button
              onClick={() => removePaste(paste._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition"
            >
              Delete
            </button>
            <button
              onClick={() => copyToClipboard(paste.content)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition"
            >
              Copy
            </button>
            <button
              onClick={() => handleWhatsAppShare(paste)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md text-sm font-semibold shadow-md transition"
            >
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Paste;
