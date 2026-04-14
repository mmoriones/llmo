function ChatInput({
  input,
  setInput,
  sendMessage,
  stopStream,
  isStreaming
}) {

  return (
    <div className="flex gap-2 mt-4">

      <input
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      ) : (
        <button
          onClick={stopStream}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      )}

    </div>
  );
}

export default ChatInput;
