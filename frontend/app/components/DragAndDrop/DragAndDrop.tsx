"use client";

import React, { useState } from "react";
import "./styles.sass";

const DragAndDrop = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [asciiArt, setAsciiArt] = useState(""); // Para almacenar el resultado del backend
  const [loading, setLoading] = useState(false); // Para mostrar un estado de carga

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onFileSelect(file);
      uploadFile(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    setLoading(true); // Activar el estado de carga
    setAsciiArt(""); // Limpiar el arte ASCII anterior

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3333/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al procesar la imagen");
      }

      const data = await response.json();
      setAsciiArt(data.ascii); // Guardar el arte ASCII recibido del backend
    } catch (error) {
      console.error("Error:", error);
      setAsciiArt("Hubo un error procesando la imagen.");
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="drag-and-drop-container flex flex-col gap-6 justify-start">
      <div>
        <h1 className="text-3xl">Image to ASCII</h1>
        <p className="text-gray-500">Upload an image file to convert it to ASCII art</p>
      </div>
      <div
        className={`drop-zone ${dragging ? "dragging" : ""} w-4/6 xl:w-4/12 h-96`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {fileName ? (
          <p className="file-name">Selected File: {fileName}</p>
        ) : (
          <p>Drag and drop an image here, or click to browse</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="file-input"
        />
      </div>
      {loading ? (
        <p>Processing your image...</p>
      ) : (
        asciiArt && (
          <pre className="ascii-art mt-4 p-4 border rounded bg-gray-100 overflow-auto">
            {asciiArt}
          </pre>
        )
      )}
    </div>
  );
};

export default DragAndDrop;
