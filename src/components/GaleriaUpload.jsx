"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

export default function GaleriaUpload({
  label = "IMAGENS ADICIONAIS (GALERIA DA NOTÍCIA)",
  titulo = "CLIQUE PARA SELECIONAR FOTOS ADICIONAIS",
  onChange,
}) {
  const [arquivos, setArquivos] = useState([]); // [{ id, file, name, previewUrl }]
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Notifica o formulário pai sempre que a lista de arquivos mudar
  const atualizarArquivos = (novaLista) => {
    setArquivos(novaLista);
    if (onChange) {
      onChange(novaLista.map((item) => item.file));
    }
  };

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    const novosItens = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));

    atualizarArquivos([...arquivos, ...novosItens]);

    // Reseta o input para permitir selecionar o mesmo arquivo novamente se quiser
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removerFoto = (idParaRemover) => {
    const itemParaRemover = arquivos.find((item) => item.id === idParaRemover);
    if (itemParaRemover?.previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(itemParaRemover.previewUrl);
    }
    const atualizados = arquivos.filter((item) => item.id !== idParaRemover);
    atualizarArquivos(atualizados);
  };

  const limparTudo = () => {
    arquivos.forEach((item) => {
      if (item.previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    atualizarArquivos([]);
  };

  if (!isMounted) {
    return (
      <div style={styles.inputGroupFull}>
        {label && <label style={styles.label}>{label}</label>}
        <div style={styles.selectBox}>
          <p style={styles.selectBoxTitle}>Carregando módulo de fotos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.inputGroupFull}>
      {label && <label style={styles.label}>{label}</label>}

      {/* Input nativo invisível acionado pelos botões */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
        style={{ display: "none" }}
      />

      <div style={styles.selectBox}>
        {arquivos.length === 0 ? (
          <div
            style={styles.placeholderContent}
            onClick={() => fileInputRef.current?.click()}
          >
            <span style={{ fontSize: "28px" }}>📸</span>
            <p style={styles.selectBoxTitle}>
              {titulo ? titulo.toUpperCase() : "CLIQUE PARA SELECIONAR FOTOS"}
            </p>
            <span style={styles.selectBoxSubtitle}>
              CLIQUE PARA ADICIONAR IMAGENS
            </span>
          </div>
        ) : (
          <div style={styles.innerContainer}>
            <div style={styles.previewContainer}>
              {arquivos.map((item) => (
                <div key={item.id} style={styles.previewCard}>
                  <button
                    type="button"
                    onClick={() => removerFoto(item.id)}
                    style={styles.removeSingleBtn}
                    title="Remover foto"
                  >
                    <FiX size={14} color="#ffffff" />
                  </button>
                  <img src={item.url || item.previewUrl} alt={item.name} style={styles.previewImage} />
                  <span style={styles.previewName}>{item.name}</span>
                </div>
              ))}
            </div>

            <div style={styles.actionsBar}>
              <button
                type="button"
                style={styles.btnAddMore}
                onClick={() => fileInputRef.current?.click()}
              >
                <FiPlus size={18} color="#085747" />
                <span>Adicionar mais fotos</span>
              </button>

              <button
                type="button"
                onClick={limparTudo}
                style={styles.btnClearAll}
              >
                <FiTrash2 size={16} color="#dc2626" />
                <span>Apagar todas</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  inputGroupFull: {
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
  selectBox: {
    width: "100%",
    minHeight: "160px",
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  placeholderContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    width: "100%",
    cursor: "pointer",
  },
  selectBoxTitle: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "4px 0 0 0",
    textAlign: "center",
  },
  selectBoxSubtitle: {
    fontSize: "11px",
    color: "#4b5563",
    fontWeight: "500",
    textAlign: "center",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },
  previewContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    justifyContent: "center",
    width: "100%",
  },
  previewCard: {
    position: "relative",
    width: "110px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "6px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  removeSingleBtn: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    zIndex: 10,
  },
  previewImage: {
    width: "100%",
    height: "85px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  previewName: {
    fontSize: "11px",
    color: "#374151",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    textAlign: "center",
  },
  actionsBar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btnAddMore: {
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "0 16px",
    height: "42px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#085747",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxSizing: "border-box",
  },
  btnClearAll: {
    backgroundColor: "#ffffff",
    border: "1px solid #fca5a5",
    borderRadius: "6px",
    padding: "0 16px",
    height: "42px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#dc2626",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxSizing: "border-box",
  },
};