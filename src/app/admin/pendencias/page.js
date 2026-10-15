"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import CardPendencia from "../../../components/CardPendencia";
import ModalAnalisePublicacao from "../../../components/ModalAnalisePublicacao";
import { getAdminPendingPublicationsAction } from '@/actions/admActions';
import '@/app/admin/page.admin.css';

export default function Pendencias() {
  const [pendencias, setPendencias] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isActive = true;

    startTransition(async () => {
      try {
        const result = await getAdminPendingPublicationsAction();
        if (!isActive) return;
        setPendencias(result.publications ?? []);
        setLoadError(result.error ?? '');
      } catch {
        if (isActive) setLoadError('Não foi possível carregar as pendências. Atualize a página para tentar novamente.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const handleAbrirAnalise = (item) => {
    setItemSelecionado(item);
    setIsModalOpen(true);
  };

  const handleFecharAnalise = useCallback(() => {
    setIsModalOpen(false);
    setItemSelecionado(null);
  }, []);

  const handleReviewed = useCallback((id) => {
    setPendencias((current) => current.filter((item) => item.id !== id));
  }, []);

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

        {loadError && <p role="alert" style={styles.errorMessage}>{loadError}</p>}

        <div style={styles.listContainer}>
          {isLoading && <p style={styles.emptyMessage}>Carregando pendências...</p>}
          {!isLoading && !loadError && pendencias.length === 0 && (
            <p style={styles.emptyMessage}>Não há publicações aguardando análise.</p>
          )}
          {pendencias.map((item) => (
            <CardPendencia 
              key={item.id} 
              item={item} 
              onAnalisar={() => handleAbrirAnalise(item)} 
            />
          ))}
        </div>

        <ModalAnalisePublicacao 
          key={itemSelecionado?.id ?? 'review-modal'}
          isOpen={isModalOpen}
          onClose={handleFecharAnalise}
          onReviewed={handleReviewed}
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
  errorMessage: {
    width: "100%",
    maxWidth: "950px",
    padding: "12px 16px",
    borderLeft: "4px solid #b91c1c",
    backgroundColor: "#fef2f2",
    color: "#7f1d1d",
    boxSizing: "border-box",
  },
  emptyMessage: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    color: "#475569",
    textAlign: "center",
    boxSizing: "border-box",
  },
};