function ChatInput({
  input,
  setInput,
  sendMessage,
  stopStream,
  isStreaming
}) {

  return (
    <div className="flex gap-2 mt-4
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-lg p-2">

      <input
        className="flex-1 border border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-800
        text-black dark:text-white
        rounded px-3 py-2
        focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500
"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Type a message..."
      />

      {!isStreaming ? (
        <button
          onClick={sendMessage}
          className="bg-blue-500 
                    hover:bg-blue-600
                    dark:bg-blue-600 dark:hover:bg-blue-700
                    text-white px-4 py-2 rounded"
        >
          Send
        </button>
      ) : (
        <button
          onClick={stopStream}
          className="bg-red-500 hover:bg-red-600
                    dark:bg-red-600 dark:hover:bg-red-700
                    text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      )}

    </div>
  );
}

export default ChatInput;
