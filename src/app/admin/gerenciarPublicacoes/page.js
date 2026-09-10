"use client";

"use client";

import React, { useState } from "react";
import SideBarAdmin from "@/components/SideBarAdmin";
import EditModal from "@/components/EditModal";
import { FiFilter, FiEdit, FiTrash2 } from "react-icons/fi";
import { getBadgeStyle, styles } from "./GerenciarPublicacoes.styles";
import '@/app/admin/page.admin.css'; 

const mockPublications = [
  { id: 1, titulo: "Nova espécie de caranguejo catalogada", categoria: "Notícia", autor: "Ana Julia Santana", data: "25/08/2026" },
  { id: 2, titulo: "Limpeza do Rio Juqueriquerê", categoria: "Mutirão", autor: "João das Neves", data: "28/08/2026" },
  { id: 3, titulo: "Preservação da Restinga", categoria: "Projeto", autor: "Ana Julia Santana", data: "10/08/2026" },
  { id: 4, titulo: "Mestre João Pescador", categoria: "Memória Caiçara", autor: "João das Neves", data: "20/08/2026" },
  { id: 5, titulo: "Artefatos de Pesca Antigos", categoria: "Mini-Museu", autor: "João das Neves", data: "05/08/2026" },
  { id: 6, titulo: "Estatuto ACAJU 2026", categoria: "Documentos", autor: "Ana Julia Santana", data: "15/08/2026" },
];

const tabs = ["Todas", "Notícia", "Mutirão", "Projeto", "Memória Caiçara", "Mini-Museu", "Documentos"];

export default function GerenciarPublicacoes() {
  const [activeTab, setActiveTab] = useState("Todas");
  const [publications, setPublications] = useState(mockPublications);
  const [editingItem, setEditingItem] = useState(null);

  const filteredPublications = activeTab === "Todas" 
    ? publications 
    : publications.filter(p => p.categoria === activeTab);

  const handleDelete = (id) => {
    if(window.confirm("Tem certeza que deseja excluir esta publicação?")) {
      setPublications(publications.filter(p => p.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <div style={styles.headerTitleRow}>
            <div>
              <h1 style={styles.pageTitle}>Gerenciar Publicações</h1>
              <p style={styles.pageSubtitle}>Controle total sobre o conteúdo veiculado no site.</p>
            </div>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>

          <div style={styles.tabsContainer}>
            <span style={styles.filterIcon}><FiFilter size={18}/></span>
            {tabs.map(tab => (
              <button 
                key={tab} 
                style={activeTab === tab ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>TÍTULO DA PUBLICAÇÃO</th>
                <th style={styles.thCenter}>CATEGORIA</th>
                <th style={styles.thCenter}>AUTOR</th>
                <th style={styles.thCenter}>DATA</th>
                <th style={styles.thCenter}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublications.map(pub => (
                <tr key={pub.id} style={styles.tr}>
                  <td style={styles.tdTitle}>{pub.titulo}</td>
                  <td style={styles.tdCenter}>
                    <span style={{...styles.badge, ...getBadgeStyle(pub.categoria)}}>
                      {pub.categoria}
                    </span>
                  </td>
                  <td style={styles.tdCenterText}>{pub.autor}</td>
                  <td style={styles.tdCenterText}>{pub.data}</td>
                  <td style={styles.tdCenter}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button style={styles.actionBtnEdit} onClick={() => setEditingItem(pub)}>
                        <FiEdit size={16} />
                      </button>
                      <button style={styles.actionBtnDelete} onClick={() => handleDelete(pub.id)}>
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPublications.length === 0 && (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>Nenhuma publicação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <EditModal 
        editingItem={editingItem} 
        onClose={() => setEditingItem(null)} 
      />
    </div>
  );
}

