import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getbyId } from "../services/api.service";
import { deletebyId } from "../services/api.service";
function NoteDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    // Sample existing note
    const [name, setName] = useState();
    const [content, setContent] = useState();
    async function fetchfile() {
      console.log(id)
        let res = await getbyId(id);
        console.log(res.data)
        setName(res.data.data.name);
        setContent(res.data.data.content);
    }

    useEffect(() => {fetchfile()}, []);

    const handleSave = () => {
        console.log("Updated Name:", name);
        console.log("Updated Content:", content);

        alert("Note saved successfully!");
    };

    const handleDelete = async  () => {
      
       await deletebyId(id)
       navigate("/")
      
    }

    const handleAddViewer = () => {
        const viewer = window.prompt("Enter viewer's email:");

        if (viewer) {
            console.log("Viewer added:", viewer);
            alert(`Viewer added: ${viewer}`);
        }
    };

    const handleAddEditor = () => {
        const editor = window.prompt("Enter editor's email:");

        if (editor) {
            console.log("Editor added:", editor);
            alert(`Editor added: ${editor}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">
                {/* Top Bar */}
                <div className="mb-8 flex items-center justify-between gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600"
                    >
                        ← Back to Notes
                    </button>

                    <button
                        onClick={handleDelete}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                        Delete Note
                    </button>
                </div>

                {/* Heading */}
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Note Details
                </h1>

                {/* Note Name */}
                <div className="mb-5">
                    <label className="mb-2 block font-medium text-gray-700">
                        Note Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter note name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                {/* Note Content */}
                <div className="mb-6">
                    <label className="mb-2 block font-medium text-gray-700">
                        Note Content
                    </label>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here..."
                        rows={10}
                        className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="mb-8 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                    Save Changes
                </button>

                {/* Sharing Section */}
                <div className="border-t border-gray-200 pt-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Manage Access
                    </h2>

                    <p className="mb-5 text-sm text-gray-500">
                        Invite people to view or edit this note.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Add Viewer */}
                        <button
                            onClick={handleAddViewer}
                            className="flex-1 rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
                        >
                            + Add Viewer
                        </button>

                        {/* Add Editor */}
                        <button
                            onClick={handleAddEditor}
                            className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700"
                        >
                            + Add Editor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteDetails;
