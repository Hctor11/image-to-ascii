"use client";

import React, { useState } from "react";
import "./styles.sass";

const DragAndDrop = ({ onFileSelect }) => {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

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
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="drag-and-drop-container">
      <div
        className={`drop-zone ${dragging ? "dragging" : ""} w-4/6 h-96`}
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
    </div>
  );
};

export default DragAndDrop;
