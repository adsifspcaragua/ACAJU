"use client";

import { useState, useTransition } from "react";
import SideBarAdmin from "@/components/SideBarAdmin";
import EditPublicationModal from "@/components/EditPublicationModal";
import { deleteAdminPublicationAction } from '@/actions/admActions';
import { FiEdit, FiFilter, FiTrash2 } from "react-icons/fi";
import { getBadgeStyle, styles } from "./GerenciarPublicacoes.styles";
import '@/app/admin/page.admin.css';

const tabs = ["Todas", "Notícia", "Mutirão", "Projeto", "Memória Caiçara", "Mini-Museu", "Documentos"];
const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });

export default function GerenciarPublicacoesClient({ initialPublications, warnings, loadError }) {
  const [activeTab, setActiveTab] = useState("Todas");
  const [publications, setPublications] = useState(initialPublications);
  const [actionError, setActionError] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleting, startDeleteTransition] = useTransition();

  const filteredPublications = activeTab === "Todas"
    ? publications
    : publications.filter((publication) => publication.category === activeTab);

  const handleDelete = (publication) => {
    if (!window.confirm(`Excluir a publicação "${publication.title}"? Esta ação não pode ser desfeita.`)) return;

    setActionError('');
    startDeleteTransition(async () => {
      const result = await deleteAdminPublicationAction(publication.category, publication.recordId);
      if (!result.success) {
        setActionError(result.error);
        return;
      }

      setPublications((current) => current.filter((item) => item.id !== publication.id));
    });
  };

  const handleUpdated = (updatedPublication) => {
    setPublications((current) => current.map((publication) => (
      publication.id === updatedPublication.id
        ? {
            ...publication,
            title: updatedPublication.title,
            content: updatedPublication.content,
            fields: updatedPublication.fields,
            media: { ...publication.media, ...updatedPublication.media },
          }
        : publication
    )));
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
            <span style={styles.filterIcon}><FiFilter size={18} /></span>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                style={activeTab === tab ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loadError && <p role="alert" style={styles.errorMessage}>{loadError}</p>}
        {actionError && <p role="alert" style={styles.errorMessage}>{actionError}</p>}
        {warnings.map((warning) => <output key={warning} style={styles.warningMessage}>{warning}</output>)}

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
              {filteredPublications.map((publication) => (
                <tr key={publication.id} style={styles.tr}>
                  <td style={styles.tdTitle}>{publication.title}</td>
                  <td style={styles.tdCenter}>
                    <span style={{ ...styles.badge, ...getBadgeStyle(publication.category) }}>
                      {publication.category}
                    </span>
                  </td>
                  <td style={styles.tdCenterText}>{publication.author}</td>
                  <td style={styles.tdCenterText}>{dateFormatter.format(new Date(publication.createdAt))}</td>
                  <td style={styles.tdCenter}>
                    <div style={styles.actionGroup}>
                      <button
                        type="button"
                        aria-label={`Editar ${publication.title}`}
                        title="Editar publicação"
                        style={styles.actionBtnEdit}
                        onClick={() => setEditingItem(publication)}
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Excluir ${publication.title}`}
                        title="Excluir publicação"
                        style={styles.actionBtnDelete}
                        disabled={isDeleting}
                        onClick={() => handleDelete(publication)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPublications.length === 0 && (
                <tr>
                  <td colSpan={5} style={styles.emptyCell}>Nenhuma publicação encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <EditPublicationModal
        publication={editingItem}
        onClose={() => setEditingItem(null)}
        onUpdated={handleUpdated}
      />
    </div>
  );
}