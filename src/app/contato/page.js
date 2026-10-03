"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import NavbarACAJU from '@components/NavbarACAJU';
import Footer from '@components/Footer';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Mapa = dynamic(() => import('@components/Mapa'), { 
  ssr: false,
  loading: () => <div style={styles.mapLoading}>Carregando mapa...</div>
});

export default function Contato() {
  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <section style={styles.heroSection}>
        <div style={styles.heroSubtitle}>FALE CONOSCO</div>
        <h1 style={styles.heroTitle}>Contato</h1>
      </section>

      <main style={styles.mainContent}>
        <div style={styles.contentGrid}>
          
          <div style={styles.infoColumn}>
            <div style={styles.badge}>CONTATO DIRETO</div>
            <h2 style={styles.sectionTitle}>Fale com a Gente</h2>
            <p style={styles.descriptionText}>
              Dúvidas sobre o museu, agendamento de grupos ou envio de propostas. Estamos abertos para ouvir.
            </p>

            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <FaPhoneAlt style={styles.icon} />
                </div>
                <div>
                  <div style={styles.itemTitle}>Telefone & WhatsApp</div>
                  <div style={styles.itemText}>(12) 99765-4321</div>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <FaEnvelope style={styles.icon} />
                </div>
                <div>
                  <div style={styles.itemTitle}>E-mail Institucional</div>
                  <div style={styles.itemText}>contato@acajujuqueriquere.org.br</div>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <FaMapMarkerAlt style={styles.icon} />
                </div>
                <div>
                  <div style={styles.itemTitle}>Sede da Casa Caiçara</div>
                  <div style={styles.itemText}>
                    Av. Rio Juqueriquerê, s/n - Porto Novo, Caraguatatuba - SP
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.mapColumn}>
            <div style={styles.mapWrapper}>
              <Mapa />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f9f7f4",
    margin: 0,
    fontFamily: "'Poppins', 'Inter', sans-serif",
  },
  heroSection: {
    backgroundColor: "#740405",
    color: "#ffffff",
    textAlign: "center",
    padding: "140px 20px 80px 20px", 
  },
  heroSubtitle: {
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  mainContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 20px",
    boxSizing: "border-box",
  },
  contentGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "50px",
    justifyContent: "space-between",
  },
  infoColumn: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  badge: {
    backgroundColor: "#f5e1e1", 
    color: "#740405",
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    alignSelf: "flex-start",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#222222",
    margin: "0 0 15px 0",
  },
  descriptionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555555",
    margin: "0 0 40px 0",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  iconBox: {
    backgroundColor: "#740405",
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  icon: {
    color: "#ffffff",
    fontSize: "20px",
  },
  itemTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "4px",
  },
  itemText: {
    fontSize: "15px",
    color: "#666666",
    lineHeight: "1.4",
  },
  mapColumn: {
    flex: "1 1 500px",
    display: "flex",
  },
  mapWrapper: {
    width: "100%",
    minHeight: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    border: "4px solid #ffffff",
    position: "relative",
  },
  mapLoading: {
    width: "100%",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
    fontWeight: "500",
  }
};