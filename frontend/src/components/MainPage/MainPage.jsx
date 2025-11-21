import React, { useState } from "react";

import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx";

function MainPage() {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [messages, setMessages] = useState([]); // [{ role: 'user' | 'assistant', content: string }]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Cuando el usuario envía un mensaje
  const handleSubmit = async (value) => {
    if (!value?.trim()) return;

    // 1) Añadimos el mensaje del usuario al chat
    const userMessage = { role: "user", content: value };
    const newHistory = [...messages, userMessage];
    setMessages(newHistory);

    setLoading(true);
    setError(null);

    try {
      // 2) Enviamos el mensaje (y el historial) al webhook de n8n
      const res = await fetch(import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          history: newHistory, // opcional, si tu flujo en n8n lo usa
        }),
      });

      if (!res.ok) {
        throw new Error("Error en el servidor de IA");
      }

      const data = await res.json(); // n8n debe devolver algo tipo { reply: "..." }

      // 3) Añadimos el mensaje del AGENTE al chat
      const assistantMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    // si quieres detectar "está escribiendo..." lo hacemos más tarde
  };

  const handleUpload = () => setUploadPopup(true);
  const handleCloseUpload = () => setUploadPopup(false);

  return (
    <div className="flex flex-col gap-4 p-4 h-screen">
      {/* 💬 ZONA DE CHAT */}
      <div className="flex-1 overflow-y-auto bg-gray-100 rounded-lg p-4">
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
          <p className="text-sm text-gray-500 mt-2">El agente está pensando...</p>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">Error: {error}</p>
        )}
      </div>

      {/* 📝 INPUT + BOTÓN DE SUBIDA */}
      <InputBar
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        UploadClick={handleUpload}
      />

      {/* 📎 POPUP DE SUBIDA DE DOCUMENTOS */}
      {uploadPopup && (
        <UploadPopup
          onClose={handleCloseUpload}
          onUploaded={() => {
            // aquí podrías mostrar un aviso tipo "Documentos indexados"
          }}
        />
      )}
    </div>
  );
}

export default MainPage;
