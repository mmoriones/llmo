import { useState } from "react";
import axios from "axios";

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setInput(""); // clear textbox

    const newMessages = [
      ...messages,
      userMessage
    ];

    setMessages(newMessages);

    const res = await axios.post("http://localhost:8000/api/ai/chat", {
      messages: newMessages
    });

    const aiMessage = {
      role: "assistant",
      content: res.data.message
    };

    setMessages([...newMessages, aiMessage]);

  };


  return (
    <div style={{maxWidth:"800px", margin:"auto", padding:"20px"}}>

      <h2>LLMo Chat</h2>

      <div style={{border:"1px solid gray", padding:"10px", height:"400px", overflow:"auto"}}>

        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}

      </div>

      <div style={{marginTop:"10px"}}>

        <input
          style={{width:"80%"}}
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default App;
