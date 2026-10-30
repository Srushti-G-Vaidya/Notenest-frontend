
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getbyId,
    deletebyId,
    addeditor,
    addviewer,
    removeeditor,
    removeviewer,
    updateFile
} from "../services/api.service";

function NoteDetails() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [permission, setPermission] = useState("");

    const [editorUsername, setEditorUsername] = useState("");
    const [viewerUsername, setViewerUsername] = useState("");
    const [removeEditorUsername, setRemoveEditorUsername] = useState("");
    const [removeViewerUsername, setRemoveViewerUsername] = useState("");

    // Fetch note details
    async function fetchfile() {
        try {
            const res = await getbyId(id);

            setName(res.data.data.name);
            setContent(res.data.data.content);
            setPermission(res.data.data.permission);
        } catch (error) {
            console.error("Error fetching note:", error);
            alert("Unable to fetch note.");
        }
    }

    useEffect(() => {
        fetchfile();
    }, [id]);

    // Save changes to the backend
    const handleSave = async () => {
        try {
            await updateFile(id, { name, content });

            alert("Note updated successfully!");
            await fetchfile();
        } catch (error) {
            console.error(
                "Error updating note:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Unable to update note."
            );
        }
    };

    // Delete note
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }

        try {
            await deletebyId(id);
            alert("Note deleted successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error deleting note:", error);
            alert(
                error.response?.data?.message ||
                "Unable to delete note."
            );
        }
    };

    // Add editor
    const handleAddEditor = async () => {
        if (!editorUsername.trim()) {
            alert("Enter an editor username.");
            return;
        }

        try {
            await addeditor(id, { username: editorUsername.trim() });

            alert("Editor added successfully!");
            setEditorUsername("");
            await fetchfile();
        } catch (error) {
            console.error("Error adding editor:", error);
            alert(
                error.response?.data?.message ||
                "Unable to add editor."
            );
        }
    };

    // Add viewer
    const handleAddViewer = async () => {
        if (!viewerUsername.trim()) {
            alert("Enter a viewer username.");
            return;
        }

        try {
            await addviewer(id, { username: viewerUsername.trim() });

            alert("Viewer added successfully!");
            setViewerUsername("");
            await fetchfile();
        } catch (error) {
            console.error("Error adding viewer:", error);
            alert(
                error.response?.data?.message ||
                "Unable to add viewer."
            );
        }
    };

    // Remove editor
    const handleRemoveEditor = async () => {
        if (!removeEditorUsername.trim()) {
            alert("Enter the editor username.");
            return;
        }

        try {
            await removeeditor(id, {
                username: removeEditorUsername.trim()
            });

            alert("Editor removed successfully!");
            setRemoveEditorUsername("");
            await fetchfile();
        } catch (error) {
            console.error("Error removing editor:", error);
            alert(
                error.response?.data?.message ||
                "Unable to remove editor."
            );
        }
    };

    // Remove viewer
    const handleRemoveViewer = async () => {
        if (!removeViewerUsername.trim()) {
            alert("Enter the viewer username.");
            return;
        }

        try {
            await removeviewer(id, {
                username: removeViewerUsername.trim()
            });

            alert("Viewer removed successfully!");
            setRemoveViewerUsername("");
            await fetchfile();
        } catch (error) {
            console.error("Error removing viewer:", error);
            alert(
                error.response?.data?.message ||
                "Unable to remove viewer."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">

                <button
                    onClick={() => navigate("/")}
                    className="mb-6 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                >
                    ← Back to Home
                </button>

                <h1 className="mb-6 text-2xl font-bold">
                    Note Details
                </h1>

                <div className="mb-4">
                    <label className="mb-2 block font-semibold">
                        Note Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={permission === "viewer"}
                        className="w-full rounded border p-3 read-only:bg-gray-100"
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-2 block font-semibold">
                        Content
                    </label>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        readOnly={permission === "viewer"}
                        rows={12}
                        className="w-full rounded border p-3 read-only:bg-gray-100"
                    />
                </div>

                <p className="mb-4 text-sm text-gray-600">
                    Your permission: <strong>{permission}</strong>
                </p>

                {/* Owner and editor can save */}
                {permission !== "viewer" && (
                    <button
                        onClick={handleSave}
                        className="mb-6 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                )}

                {/* Owner-only actions */}
                {permission === "owner" && (
                    <div className="mt-4 border-t pt-6">
                        <h2 className="mb-4 text-xl font-bold">
                            Manage Note
                        </h2>

                        <button
                            onClick={handleDelete}
                            className="mb-6 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            Delete Note
                        </button>

                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold">
                                Add Editor
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    value={editorUsername}
                                    onChange={(e) =>
                                        setEditorUsername(e.target.value)
                                    }
                                    placeholder="Editor username"
                                    className="min-w-0 flex-1 rounded border p-2"
                                />

                                <button
                                    onClick={handleAddEditor}
                                    className="rounded bg-green-600 px-4 py-2 text-white"
                                >
                                    Add Editor
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold">
                                Add Viewer
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    value={viewerUsername}
                                    onChange={(e) =>
                                        setViewerUsername(e.target.value)
                                    }
                                    placeholder="Viewer username"
                                    className="min-w-0 flex-1 rounded border p-2"
                                />

                                <button
                                    onClick={handleAddViewer}
                                    className="rounded bg-green-600 px-4 py-2 text-white"
                                >
                                    Add Viewer
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="mb-2 font-semibold">
                                Remove Editor
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    value={removeEditorUsername}
                                    onChange={(e) =>
                                        setRemoveEditorUsername(e.target.value)
                                    }
                                    placeholder="Editor username"
                                    className="min-w-0 flex-1 rounded border p-2"
                                />

                                <button
                                    onClick={handleRemoveEditor}
                                    className="rounded bg-orange-600 px-4 py-2 text-white"
                                >
                                    Remove Editor
                                </button>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold">
                                Remove Viewer
                            </h3>

                            <div className="flex gap-2">
                                <input
                                    value={removeViewerUsername}
                                    onChange={(e) =>
                                        setRemoveViewerUsername(e.target.value)
                                    }
                                    placeholder="Viewer username"
                                    className="min-w-0 flex-1 rounded border p-2"
                                />

                                <button
                                    onClick={handleRemoveViewer}
                                    className="rounded bg-orange-600 px-4 py-2 text-white"
                                >
                                    Remove Viewer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NoteDetails;
