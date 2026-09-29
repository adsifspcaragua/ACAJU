"use client";

import React from "react";
import Link from "next/link";

export default function CardPublicacao({ item, basePath = "/noticias" }) {
  const {
    id = "",
    title = "",
    content = "",
    coverImage = "",
  } = item || {};

  return (
    <article style={styles.card} className="card-publicacao">

      <div style={styles.imageWrapper}>
        {coverImage ? (
          <img src={coverImage} alt={title} style={styles.image} />
        ) : (
          <div style={styles.imagePlaceholder} />
        )}
      </div>

      <div style={styles.contentWrapper}>
        <h3 style={styles.title}>{title}</h3>

        <p style={styles.description}>{content}</p>

        <Link href={`${basePath}/${id}`} style={styles.button}>
          Leia mais →
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .card-publicacao {
            flex-direction: column !important;
          }
          .card-publicacao > div:first-child {
            width: 100% !important;
            height: 220px !important;
          }
        }
      `}</style>
    </article>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
    width: "100%",
    maxWidth: "950px",
    border: "1px solid #f0f0f0",
    boxSizing: "border-box",
  },
  imageWrapper: {
    width: "280px",
    minWidth: "280px",
    height: "auto",
    backgroundColor: "#e5e7eb",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d1d5db",
  },
  contentWrapper: {
    padding: "32px 36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 1,
    gap: "16px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    margin: 0,
    lineHeight: "1.3",
  },
  description: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.6",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#420008",
    color: "#ffffff",
    padding: "10px 22px",
    borderRadius: "4px",
    fontSize: "13px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "8px",
  },
};