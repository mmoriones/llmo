function Header() {
  return (
    <div className="flex items-center p-3 pl-12 justify-between mb-2">

      <h2 className="text-2xl font-bold">
        LLMo Chat
      </h2>

      <div className="flex gap-4 pr-6">

        {/* Login */}
        <button className="
          px-6 py-2.5
          rounded-full
          bg-black text-white
          hover:bg-gray-800
          dark:bg-white dark:text-black
          dark:hover:bg-gray-200
          transition-colors duration-200
        ">
          Log in
        </button>

        {/* Signup */}
        <button className="
          px-6 py-2.5
          rounded-full
          border border-gray-400
          text-black
          hover:bg-gray-100
          dark:border-gray-500 dark:text-white
          dark:hover:bg-gray-800
          transition-colors duration-200
        ">
          Sign up
        </button>

      </div>
    </div>
  );
}

export default Header;
