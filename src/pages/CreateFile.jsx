
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFile } from "../services/api.service";

function CreateNote() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    console.log("Note Name:", name);
    console.log("Note Content:", content);
    try{

        const res = await createFile({name, content});
    }catch{

    }finally{
        
    }


    // Navigate back to home after saving
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Create New Note
        </h1>

        {/* Name Input */}
        <div className="mb-5">
          <label className="mb-2 block font-medium text-gray-700">
            Note Name
          </label>

          <input
            type="text"
            placeholder="Enter note name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Content Textarea */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Note Content
          </label>

          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Save Note
        </button>

      </div>

    </div>
  );
}

export default CreateNote;
