import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import RAGPage from "./pages/RAGPage";
import ImageChatPage from "./pages/ImageChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/rag" element={<RAGPage />} />
        <Route path="/img" element={<ImageChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
