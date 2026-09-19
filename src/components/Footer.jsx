"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        <div className="footer-grid" style={styles.grid}>
          
          <div style={styles.brandColumn}>
            <div style={styles.logoRow}>
              <div style={styles.logoBadge}>AC</div>
              <span style={styles.logoText}>ACAJU</span>
            </div>
            <p style={styles.description}>
              Associação Caiçara Juqueriquerê — guardiões da cultura e do Rio Juqueriquerê desde 2000.
            </p>
            <div style={styles.socialDots}>
              <span style={{ ...styles.dot, backgroundColor: "#782846" }} />
              <span style={{ ...styles.dot, backgroundColor: "#782846" }} />
              <span style={{ ...styles.dot, backgroundColor: "#e8c3ad" }} />
              <span style={{ ...styles.dot, backgroundColor: "#782846" }} />
            </div>
          </div>

          <div style={styles.navColumn}>
            <h4 style={styles.columnTitle}>INSTITUCIONAL</h4>
            <ul style={styles.linkList}>
              <li><Link href="/quem-somos" style={styles.link}>Quem Somos</Link></li>
              <li><Link href="/projetos" style={styles.link}>Projetos</Link></li>
              <li><Link href="/mini-museu" style={styles.link}>Mini-Museu</Link></li>
              <li><Link href="/noticias" style={styles.link}>Notícias</Link></li>
              <li><Link href="/institucional" style={styles.link}>Institucional</Link></li>
            </ul>
          </div>

          <div style={styles.navColumn}>
            <h4 style={styles.columnTitle}>PARTICIPE</h4>
            <ul style={styles.linkList}>
              <li><Link href="/doacoes" style={styles.link}>Doações</Link></li>
              <li><Link href="/inventario-participativo" style={styles.link}>Inventário Participativo</Link></li>
              <li><Link href="/trocas" style={styles.link}>Trocas</Link></li>
              <li><Link href="/mutirao-limpeza" style={styles.link}>Mutirão de Limpeza</Link></li>
              <li><Link href="/mutirao-plantio" style={styles.link}>Mutirão de Plantio</Link></li>
            </ul>
          </div>

          <div style={styles.contactColumn}>
            <h4 style={styles.columnTitle}>CONTATO</h4>
            <address style={styles.address}>
              Rua Izamira Pinto Santana, 560<br />
              Porto Novo — Caraguatatuba, SP
            </address>
            <div style={styles.contactLinks}>
              <Link href="/fale-conosco" style={styles.arrowLink}>Fale Conosco →</Link>
              <Link href="/canal-denuncias" style={styles.arrowLink}>Canal de Denúncias →</Link>
            </div>
          </div>

        </div>

        <hr style={styles.divider} />

        <div className="footer-bottom" style={styles.bottomRow}>
          <span>© 2000–2026 ACAJU — Associação Caiçara Juqueriquerê</span>
          <span>Caraguatatuba, litoral norte paulista</span>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#21151b",
    color: "#c9b8be",
    padding: "48px 24px 30px 24px",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: "1140px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px",
    marginBottom: "40px",
  },
  brandColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoBadge: {
    backgroundColor: "#782846",
    color: "#ffffff",
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontSize: "20px",
    letterSpacing: "1px",
  },
  description: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#a39399",
    margin: 0,
    maxWidth: "280px",
  },
  socialDots: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  navColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  contactColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  columnTitle: {
    color: "#f5e6eb",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    margin: 0,
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#a39399",
    textDecoration: "none",
    fontSize: "14px",
  },
  address: {
    fontStyle: "normal",
    fontSize: "14px",
    color: "#a39399",
    lineHeight: "1.5",
  },
  contactLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "4px",
  },
  arrowLink: {
    color: "#572132",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    margin: "0 0 25px 0",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "12px",
    color: "#7a6b71",
  },
};