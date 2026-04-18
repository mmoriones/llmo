import { useState } from "react";

export default function LoginModal({ onClose }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      {/* Modal Box */}
      <div className="bg-gray-800 rounded-xl px-8 py-12 w-full max-w-md min-h-[60vh] relative flex flex-col">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-center">
        Sign in
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8 flex-1 flex flex-col justify-center">

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10 focus:outline-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-md py-2 font-semibold transition mt-4"
        >
          Sign In
        </button>

      </form>

    </div>

    </div>
  );
}
