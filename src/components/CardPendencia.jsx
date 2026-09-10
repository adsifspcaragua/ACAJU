"use client";

import React from "react";

export default function CardPendencia({ item, onAnalisar }) {
  return (
    <div style={styles.card}>
      <div style={styles.infoContainer}>
        <span style={styles.categoryBadge}>
          {item.tipo} ({item.status})
        </span>
        <h2 style={styles.itemTitle}>{item.titulo}</h2>
        <span style={styles.metaText}>
          Enviado por: {item.autor} em {item.data}
        </span>
      </div>

      <button onClick={onAnalisar} style={styles.actionButton}>
        Analisar publicação
      </button>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px 32px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    border: "2px solid #facc15",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  categoryBadge: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  itemTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  metaText: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  actionButton: {
    backgroundColor: "#085747",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "12px 24px",
    fontSize: "13px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
};