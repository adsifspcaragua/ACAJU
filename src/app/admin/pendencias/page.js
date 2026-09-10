"use client";

import React, { useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import CardPendencia from "../../../components/CardPendencia";
import ModalAnalisePublicacao from "../../../components/ModalAnalisePublicacao";
import '@/app/admin/page.admin.css';

const pendencias = [
  {
    id: 1,
    tipo: "NOTÍCIA",
    status: "AGUARDANDO",
    titulo: "Mutirão de Limpeza no Rio Juqueriquerê",
    autor: "Editor João",
    data: "10/10/2026",
    descricao: "Iniciativa comunitária para remoção de resíduos das margens do rio."
  },
  {
    id: 2,
    tipo: "PROJETO",
    status: "AGUARDANDO",
    titulo: "Reflorestamento de Restinga",
    autor: "Editora Maria",
    data: "11/10/2026",
    descricao: "Plantio de mudas nativas na orla da praia."
  }
];

export default function Pendencias() {
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAbrirAnalise = (item) => {
    setItemSelecionado(item);
    setIsModalOpen(true);
  };

  const handleFecharAnalise = () => {
    setIsModalOpen(false);
    setItemSelecionado(null);
  };

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Pendências</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <div style={styles.listContainer}>
          {pendencias.map((item) => (
            <CardPendencia 
              key={item.id} 
              item={item} 
              onAnalisar={() => handleAbrirAnalise(item)} 
            />
          ))}
        </div>

        <ModalAnalisePublicacao 
          isOpen={isModalOpen}
          onClose={handleFecharAnalise}
          item={itemSelecionado}
        />
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden", 
    margin: 0,
    backgroundColor: "transparent", 
  },
  mainContent: {
    flexGrow: 1,
    overflowY: "auto", 
    padding: "50px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "300px",
  },
  headerContainer: {
    width: "100%",
    maxWidth: "950px", 
    borderBottom: "1px solid rgba(255, 255, 255, 0.25)",
    marginBottom: "40px",
    paddingBottom: "15px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
  },
  pageTitle: {
    color: "#ffffff",
    fontSize: "36px", 
    fontWeight: "bold",
    margin: 0,
  },
  welcomeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    maxWidth: "950px",
    boxSizing: "border-box",
  },
};