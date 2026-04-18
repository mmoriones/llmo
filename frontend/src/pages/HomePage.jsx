import { Link } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LogInModal";

function HomePage() {

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-white">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
            <h1 className="text-2xl font-bold">AI Playground</h1>

            <div className="space-x-4">
                <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                onClick={() => setIsLoginOpen(true)}
                >
                Login
                </button>

                <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition">
                Sign Up
                </button>
            </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore AI Tools in One Place
            </h2>
            <p className="text-gray-400 mb-12 max-w-xl">
            Chat with AI, query documents using RAG, and perform web seacrh —
            all in one unified platform.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <Link to="/chat">
                <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 hover:bg-gray-700 transition cursor-pointer">
                <h3 className="text-2xl font-semibold mb-2">💬 Chat</h3>
                <p className="text-gray-400">
                    Talk with the AI assistant
                </p>
                </div>
            </Link>

            <Link to="/rag">
                <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 hover:bg-gray-700 transition cursor-pointer">
                <h3 className="text-2xl font-semibold mb-2">📚 RAG</h3>
                <p className="text-gray-400">
                    Query PDF documents
                </p>
                </div>
            </Link>

            <Link to="/img">
                <div className="p-8 bg-gray-800 rounded-xl hover:scale-105 hover:bg-gray-700 transition cursor-pointer">
                <h3 className="text-2xl font-semibold mb-2">🖼️ Image</h3>
                <p className="text-gray-400">
                    Ask AI about the Image
                </p>
                </div>
            </Link>

            </div>
        </div>

        {/* Modal */}
        {isLoginOpen && (
            <LoginModal onClose={() => setIsLoginOpen(false)} />
        )}

        </div>
    );
    }

export default HomePage;
