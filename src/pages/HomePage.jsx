import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedin } from "../services/auth.service";
import { getfiles } from "../services/api.service";

function Home() {
    const [loginState] = useState(isLoggedin());
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    async function loadfiles() {
        try {
            const res = await getfiles();
            console.log(res.data);
            setNotes(res.data.files || res.data.data || []);
        } catch (error) {
            console.error("Error loading notes:", error);
        }
    }

    useEffect(() => {
        if (!loginState) {
            navigate("/login");
            return;
        }

        loadfiles();
    }, []);

   function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.clear()
    navigate("/login", { replace: true });
}

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
                {/* App Name */}
                <h1 className="text-2xl font-bold text-indigo-600">NoteNest</h1>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                        {username ? username.charAt(0).toUpperCase() : "U"}
                    </div>

                    <span className="font-medium text-gray-700">
                        {username || "User"}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-100 px-4 py-2 font-medium text-red-600 transition hover:bg-red-200"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="mx-auto max-w-6xl px-6 py-10">
                {/* Heading and Create Button */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            My Notes
                        </h2>

                        <p className="mt-2 text-gray-500">
                            All your thoughts, organized in one place.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/create")}
                        className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                        + Create New Note
                    </button>
                </div>

                {/* Notes Count */}
                <p className="mb-5 text-sm text-gray-500">
                    {notes.length} notes
                </p>

                {/* Notes List */}
                {notes.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
                        <h3 className="text-xl font-semibold text-gray-700">
                            No notes yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Create your first note to get started!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {notes.map((note) => (
                            <NavLink to={`/file/${note._id}`} key={note._id}>
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                    {/* Note Icon */}
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                                        📝
                                    </div>

                                    {/* Note Title */}
                                    <h3 className="mb-3 text-lg font-semibold text-gray-800">
                                        {note.name}
                                    </h3>

                                    {/* Note Date */}
                                    <p className="text-sm text-gray-400">
                                        Last updated: {note.updatedAt}
                                    </p>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
