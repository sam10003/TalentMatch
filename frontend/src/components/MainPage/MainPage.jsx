import React, { useState } from "react";
import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx";
import ParticleBackground from "./ParticleBackground.jsx";

// Logo
import logo from "../../assets/talentmatch-logo.png";

function MainPage() {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (value) => {
    if (!value?.trim()) return;

    const userMessage = { role: "user", content: value };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(import.meta.env.VITE_N8N_CHAT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value }),
      });

      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

      const data = await res.json();

      const assistantMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => setUploadPopup(true);
  const handleCloseUpload = () => setUploadPopup(false);
  
  const handleCompanyClick = () => {
    console.log("Company button clicked");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(to bottom, rgb(250,245,255), rgb(255,255,255))",
        padding: "1.5rem 1.5rem 2.5rem",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <ParticleBackground />
      
      {/* Company button - upper right corner */}
      <button
        onClick={handleCompanyClick}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "rgba(147, 51, 234, 0.5)",
          fontSize: "0.95rem",
          fontWeight: 400,
          cursor: "pointer",
          padding: "0.5rem 0.75rem",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          zIndex: 10,
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "rgba(147, 51, 234, 0.8)";
          e.target.style.backgroundColor = "rgba(147, 51, 234, 0.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "rgba(147, 51, 234, 0.5)";
          e.target.style.backgroundColor = "transparent";
        }}
      >
        are you a company?
      </button>
      
      {/* CONTENEDOR PRINCIPAL */}
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          margin: "0 auto",
          paddingBottom: "8rem",
        }}
      >
        {/* 🔹 ESTADO INICIAL — LOGO MÁS GRANDE Y CENTRADO */}
        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "6rem", // deja hueco visual para la barra fija
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "-4rem", // corrige el empuje hacia arriba y lo centra
              }}
            >
              <img
                src={logo}
                alt="TalentMatch logo"
                style={{
                  width: "420px", // grande
                  maxWidth: "70vw",
                  marginBottom: "0.5rem",
                }}
              />

              <p
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  marginTop: -100,
                  color: "rgb(88,28,135)",
                }}
              >
                Reinventamos la forma de buscar trabajo
              </p>
            </div>
          </div>
        )}

        {/* 🔹 MENSAJES DEL CHAT */}
        {messages.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              padding: "0.5rem 3rem",
              boxSizing: "border-box",
            }}
          >
            {messages.map((m, i) => {
              const isUser = m.role === "user";

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Avatar del agente */}
                  {!isUser && (
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        backgroundImage: `url(${logo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        marginRight: "1rem",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "1rem 1.4rem",
                      borderRadius: "1.25rem",
                      whiteSpace: "pre-line",
                      wordBreak: "break-word",
                      fontSize: "1.15rem",
                      lineHeight: 1.65,
                      background: isUser
                        ? "linear-gradient(to right, rgb(147,51,234), rgb(126,34,206))"
                        : "white",
                      color: isUser ? "white" : "#111827",
                      border: isUser
                        ? "none"
                        : "1px solid rgba(196,181,253,0.5)",
                      boxShadow: isUser
                        ? "0 14px 28px rgba(147,51,234,0.22)"
                        : "0 10px 24px rgba(15,23,42,0.08)",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div style={{ fontSize: "1rem", color: "#6b7280" }}>
                El agente está pensando…
              </div>
            )}

            {error && (
              <div style={{ fontSize: "1rem", color: "#dc2626" }}>
                Error: {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Barra inferior fija */}
      <InputBar onSubmit={handleSubmit} UploadClick={handleUpload} />

      {uploadPopup && <UploadPopup onClose={handleCloseUpload} />}
    </div>
  );
}

export default MainPage;
