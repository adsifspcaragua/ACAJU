"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div style={styles.grid}>
          
          <div style={styles.section}>
            <div style={styles.logoRow}>
              <div style={styles.logoBadge}>AC</div>
              <span style={styles.logoText}>ACAJU</span>
            </div>
            <p style={styles.description}>
              Associação Caiçara Juqueriquerê — guardiões da cultura e do Rio Juqueriquerê desde 2000.
            </p>
            <div style={styles.socialDots}>
              <span style={{ ...styles.dot, backgroundColor: "#802d48" }} />
              <span style={{ ...styles.dot, backgroundColor: "#802d48" }} />
              <span style={{ ...styles.dot, backgroundColor: "#f2c9b1" }} />
              <span style={{ ...styles.dot, backgroundColor: "#802d48" }} />
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.columnTitle}>INSTITUCIONAL</h4>
            <ul style={styles.linkList}>
              <li><Link href="/quem-somos" style={styles.link}>Quem Somos</Link></li>
              <li><Link href="/projetos" style={styles.link}>Projetos</Link></li>
              <li><Link href="/mini-museu" style={styles.link}>Mini-Museu</Link></li>
              <li><Link href="/noticias" style={styles.link}>Notícias</Link></li>
              <li><Link href="/institucional" style={styles.link}>Institucional</Link></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.columnTitle}>PARTICIPE</h4>
            <ul style={styles.linkList}>
              <li><Link href="/doacoes" style={styles.link}>Doações</Link></li>
              <li><Link href="/inventario-participativo" style={styles.link}>Inventário Participativo</Link></li>
              <li><Link href="/trocas" style={styles.link}>Trocas</Link></li>
              <li><Link href="/mutirao-limpeza" style={styles.link}>Mutirão de Limpeza</Link></li>
              <li><Link href="/mutirao-plantio" style={styles.link}>Mutirão de Plantio</Link></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.columnTitle}>CONTATO</h4>
            <address style={styles.address}>
              Rua Izamira Pinto Santana, 560<br />
              Porto Novo — Caraguatatuba, SP
            </address>
            <div style={styles.contactLinks}>
              <Link href="/fale-conosco" style={styles.darkLink}>Fale Conosco →</Link>
              <Link href="/canal-denuncias" style={styles.darkLink}>Canal de Denúncias →</Link>
            </div>
          </div>

        </div>

        <hr style={styles.divider} />

        <div style={styles.bottomRow}>
          <span>© 2000–2026 ACAJU — Associação Caiçara Juqueriquerê</span>
          <span>Caraguatatuba, litoral norte paulista</span>
        </div>

      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#221319",
    color: "#bba8b0",
    padding: "48px 24px 32px 24px",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "36px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoBadge: {
    backgroundColor: "#802d48",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "20px",
    letterSpacing: "0.5px",
  },
  description: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#bba8b0",
    margin: 0,
    maxWidth: "280px",
  },
  socialDots: {
    display: "flex",
    gap: "8px",
    marginTop: "2px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  columnTitle: {
    color: "#f3c299",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    margin: 0,
    textTransform: "uppercase",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  link: {
    color: "#bba8b0",
    textDecoration: "none",
    fontSize: "13px",
  },
  address: {
    fontStyle: "normal",
    fontSize: "13px",
    color: "#bba8b0",
    lineHeight: "1.5",
  },
  contactLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    marginTop: "4px",
  },
  darkLink: {
    color: "#4e1d2b",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "500",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    margin: "8px 0 0 0",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#6e5d65",
    flexWrap: "wrap",
    gap: "12px",
  },
};