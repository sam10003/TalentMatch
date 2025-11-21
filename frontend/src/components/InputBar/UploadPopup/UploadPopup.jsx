import React, { useState } from "react";

function UploadPopup({ onClose, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((file, idx) => {
      formData.append(`file${idx}`, file);
    });

    try {
      const res = await fetch(import.meta.env.VITE_N8N_UPLOAD_WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al subir los archivos");
      }

      await res.json(); // si tu webhook responde JSON

      if (onUploaded) onUploaded();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    "
    >
      <div
        className="
        bg-gray-300
        flex
        flex-col
        items-center
        justify-center
        w-[500px]
        h-[500px]
        max-w-[calc(120vw-2rem)]
        max-h-[calc(120vh-2rem)]
        rounded-lg
        p-6
      "
      >
        <h2 className="text-xl font-semibold mb-4">Subir documentos</h2>

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="mb-4"
        />

        {files.length > 0 && (
          <p className="text-sm text-gray-700 mb-2">
            {files.length} archivo(s) seleccionado(s)
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500 mb-2">
            {error}
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-purple-600 text-white rounded"
            onClick={handleUpload}
            disabled={loading || !files.length}
          >
            {loading ? "Subiendo..." : "Subir"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPopup;
