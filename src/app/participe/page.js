"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ComoApoiar() {
  const [abaAtiva, setAbaAtiva] = useState('pix');

  const renderizarConteudoDireita = () => {
    switch (abaAtiva) {
      case 'pix':
        return (
          <div style={styles.conteudoBox}>
            <h3 style={styles.conteudoTitle}>Doação Direta via PIX</h3>
            <p style={styles.conteudoText}>
              O valor arrecadado é revertido diretamente na compra de luvas para mutirões, alimentação comunitária e manutenção da estrutura de pau-a-pique.
            </p>
            <div style={styles.pixBox}>
              <span style={styles.pixLabel}>CHAVE PIX (CNPJ)</span>
              <strong style={styles.pixKey}>12.345.678/0001-99</strong>
              <span style={styles.pixName}>Associação Caiçara do Juqueriquerê</span>
            </div>
          </div>
        );
      case 'voluntariado':
        return (
          <div style={styles.conteudoBox}>
            <h3 style={styles.conteudoTitle}>Seja Guia ou Voluntário de Sede</h3>
            <p style={styles.conteudoText}>
              Se doe por algumas horas nos fins de semana para abrir as portas do Mini Museu ao público e dar suporte logístico para nossa comunidade.
            </p>
            <button style={styles.actionButton}>Quero me Cadastrar como Guia</button>
          </div>
        );
      case 'trocas':
        return (
          <div style={styles.conteudoBox}>
            <h3 style={styles.conteudoTitle}>Oficinas, Permutas e Troca de Saberes</h3>
            <p style={styles.conteudoText}>
              Ofereça aulas de artesanato, palestras ecológicas ou preste auxílio operacional para os caiçaras locais no estuário.
            </p>
            <button style={styles.actionButton}>Propor uma Oficina/Permuta</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.secaoDestaque}>
        <div style={styles.subtituloDestaque}>PARTICIPE</div>
        <h1 style={styles.tituloDestaque}>Como Apoiar a ACAJU</h1>
      </section>

      <main style={styles.mainContent}>
        
        <div style={styles.tagDestaque}>COMO FAZER A DIFERENÇA</div>
        <h2 style={styles.tituloSecao}>Como Apoiar a ACAJU</h2>
        <p style={styles.descricaoSecao}>
          A participação pode ser realizada de diferentes formas. Apoie doando via PIX, prestando serviços ou oferecendo cursos e horas voluntárias para a manutenção do mini-museu.
        </p>

        <div style={styles.gridInterativo}>
          
          <div style={styles.colunaAbas}>
            
            <div 
              style={{...styles.abaItem, ...(abaAtiva === 'pix' ? styles.abaItemAtiva : {})}}
              onClick={() => setAbaAtiva('pix')}
            >
              <h4 style={{...styles.abaTitle, ...(abaAtiva === 'pix' ? styles.abaTitleAtivo : {})}}>Doação via PIX</h4>
              <p style={styles.abaDesc}>Contribuições diretas para as ações da ONG.</p>
            </div>

            <div 
              style={{...styles.abaItem, ...(abaAtiva === 'voluntariado' ? styles.abaItemAtiva : {})}}
              onClick={() => setAbaAtiva('voluntariado')}
            >
              <h4 style={{...styles.abaTitle, ...(abaAtiva === 'voluntariado' ? styles.abaTitleAtivo : {})}}>Voluntariado de Horas</h4>
              <p style={styles.abaDesc}>Ajude no atendimento aos finais de semana.</p>
            </div>

            <div 
              style={{...styles.abaItem, ...(abaAtiva === 'trocas' ? styles.abaItemAtiva : {})}}
              onClick={() => setAbaAtiva('trocas')}
            >
              <h4 style={{...styles.abaTitle, ...(abaAtiva === 'trocas' ? styles.abaTitleAtivo : {})}}>Trocas & Cursos</h4>
              <p style={styles.abaDesc}>Ofereça palestras ou apoio operacional.</p>
            </div>

          </div>

          <div style={styles.colunaConteudo}>
            {renderizarConteudoDireita()}
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
    backgroundColor: "#fcfaf7", 
    margin: 0,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333333",
  },
  
  secaoDestaque: {
    backgroundColor: "#8C1717", 
    color: "#ffffff",
    textAlign: "center",
    padding: "100px 20px 80px 20px",
    marginTop: "70px", 
  },

  subtituloDestaque: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: "15px",
  },
  
  tituloDestaque: {
    fontSize: "46px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "-0.5px",
  },

  mainContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "1100px", 
    margin: "0 auto",
    padding: "60px 20px 80px 20px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },

  tagDestaque: {
    backgroundColor: "#f5e6e6",
    color: "#a32f2f",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "1px",
    display: "inline-block",
    alignSelf: "flex-start",
    marginBottom: "20px",
  },

  tituloSecao: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#222",
    margin: "0 0 15px 0",
  },

  descricaoSecao: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "40px",
    maxWidth: "850px",
  },

  gridInterativo: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap", 
  },

  colunaAbas: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    flex: "1 1 350px", 
  },

  abaItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  
  abaItemAtiva: {
    backgroundColor: "#f8ecec", 
    border: "1px solid #8C1717", 
  },

  abaTitle: {
    fontSize: "17px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
    color: "#222",
  },

  abaTitleAtivo: {
    color: "#8C1717",
  },

  abaDesc: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },

  colunaConteudo: {
    flex: "2 1 500px", 
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    overflow: "hidden", 
  },

  conteudoBox: {
    padding: "40px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },

  conteudoTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#8C1717", 
    margin: "0 0 15px 0",
  },

  conteudoText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    marginBottom: "30px",
  },


  pixBox: {
    backgroundColor: "#f9f6f1", 
    border: "1px solid #eadbc8",
    padding: "25px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "auto", 
  },

  pixLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
  },

  pixKey: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#222",
  },

  pixName: {
    fontSize: "14px",
    color: "#666",
  },

  
  actionButton: {
    backgroundColor: "#8C1717",
    color: "#ffffff",
    border: "none",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "auto",
    transition: "background-color 0.2s",
    width: "100%",
  }
};