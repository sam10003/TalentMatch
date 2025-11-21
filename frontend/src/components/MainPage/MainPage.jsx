import React, { useState } from "react";
import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx";
import ParticleBackground from "./ParticleBackground.jsx";

function MainPage() {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [messages, setMessages] = useState([]);   // chat
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (value) => {
    if (!value?.trim()) return;

    // 1) Añadimos mensaje del usuario
    const userMessage = { role: "user", content: value };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setError(null);

    try {
      // 2) Llamamos al webhook de n8n
      console.log("Enviando a n8n:", value);

      const res = await fetch(import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });

      console.log("Status respuesta:", res.status);

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }

      const data = await res.json();
      console.log("Respuesta de n8n:", data);

      // 3) Añadimos mensaje del "agente"
      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error llamando al webhook:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    // Opcional, de momento no hace nada
  };

  const handleUpload = () => setUploadPopup(true);
  const handleCloseUpload = () => setUploadPopup(false);

  return (
    <div className="relative flex flex-col gap-4 p-4 h-screen">
      <ParticleBackground />
      {/* Chat */}
      <div className="relative flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4 z-10">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg max-w-[75%] break-words ${
                m.role === "user"
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-sm text-gray-500 mt-2">
            El agente está pensando...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">
            Error: {error}
          </p>
        )}
      </div>

      {/* Barra de entrada */}
      <InputBar
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        UploadClick={handleUpload}
      />

      {uploadPopup && <UploadPopup onClose={handleCloseUpload} />}
    </div>
  );
}

export default MainPage;
