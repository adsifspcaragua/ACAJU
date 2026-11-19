"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorMessage =
    error instanceof Error && error.message
      ? error.message
      : "Não foi possível concluir a ação solicitada.";

  return (
    <main style={styles.page}>
      <section style={styles.card} role="alert">
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Erro"
          role="img"
          style={styles.icon}
        >
          <circle cx="48" cy="48" r="44" stroke="#740405" strokeWidth="6" />
          <circle cx="35" cy="39" r="4" fill="#740405" />
          <circle cx="61" cy="39" r="4" fill="#740405" />
          <path
            d="M31 68C34.2 61.9 40.2 58.8 48 58.8C55.8 58.8 61.8 61.9 65 68"
            stroke="#740405"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        <div style={styles.badge}>Ops!</div>
        <h1 style={styles.title}>Algo deu errado</h1>
        <p style={styles.message}>{errorMessage}</p>

        <div style={styles.actions}>
          {typeof retry === "function" && (
            <button type="button" onClick={retry} style={styles.retryButton}>
              Tentar novamente
            </button>
          )}
          <Link href="/" prefetch={false} style={styles.homeLink}>
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f8f5f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "560px",
    backgroundColor: "#ffffff",
    borderTop: "6px solid #740405",
    borderRadius: "6px",
    boxShadow: "0 12px 32px rgba(116, 4, 5, 0.12)",
    padding: "48px 36px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxSizing: "border-box",
  },
  icon: {
    marginBottom: "18px",
  },
  badge: {
    color: "#740405",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  title: {
    color: "#740405",
    fontSize: "32px",
    lineHeight: "1.2",
    margin: "0 0 14px",
  },
  message: {
    color: "#4b5563",
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    marginTop: "28px",
  },
  retryButton: {
    backgroundColor: "#ffffff",
    color: "#740405",
    border: "1.5px solid #740405",
    borderRadius: "4px",
    padding: "12px 22px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
  homeLink: {
    backgroundColor: "#740405",
    color: "#ffffff",
    borderRadius: "4px",
    padding: "12px 22px",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
  },
};