"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CapaUpload({
  label = "IMAGEM DE CAPA",
  name = "coverImage", // 1. Garante que o FormData capture o arquivo
  onChange,
  initialPreview = null
}) {
  const [selectedImage, setSelectedImage] = useState(initialPreview);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImage({
        file,
        previewUrl,
        name: file.name
      });
      if (onChange) onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (selectedImage?.previewUrl && selectedImage.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(selectedImage.previewUrl);
    }
    setSelectedImage(null);

    // Limpa o valor no input nativo para permitir selecionar o mesmo arquivo se quiser
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onChange) onChange(null);
  };

  if (!isMounted) return null;

  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}

      {/* 2. O input agora fica SEMPRE presente no formulário, invisível */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <div style={styles.box}>
        {selectedImage ? (
          <div style={styles.previewContainer}>
            <img
              src={selectedImage.previewUrl}
              alt="Preview"
              style={styles.previewImage}
            />
            <span style={styles.fileName}>{selectedImage.name}</span>
            <button
              type="button"
              onClick={handleRemove}
              style={styles.removeButton}
              title="Remover imagem"
            >
              ✕
            </button>
          </div>
        ) : (
          /* Ao clicar nesta área, aciona o input escondido */
          <div
            style={styles.uploadArea}
            onClick={() => fileInputRef.current?.click()}
          >
            <span style={styles.uploadButton}>Escolher arquivo</span>
            <span style={styles.uploadText}>Nenhum arquivo escolhido</span>
          </div>
        )}
      </div>
    </div>
  );
}

// estilos mantidos iguais...

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
  label: {
    color: "#0c3110",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  box: {
    width: "100%",
    height: "52px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    boxSizing: "border-box",
  },
  uploadArea: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    cursor: "pointer",
  },
  uploadButton: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    padding: "5px 10px",
    borderRadius: "4px",
    fontSize: "13.33px",
    border: "1px solid #767676",
    fontWeight: "normal",
    userSelect: "none",
  },
  uploadText: {
    color: "#6b7280",
    fontSize: "15px",
    fontFamily: "inherit",
  },
  previewContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    position: "relative",
  },
  previewImage: {
    width: "38px",
    height: "38px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  fileName: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  removeButton: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: 1,
    transition: "background-color 0.2s",
  },
};