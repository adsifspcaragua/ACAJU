"use client";

import { useActionState, useEffect, useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import GaleriaUpload from "@/components/GaleriaUpload"; 
import CapaUpload from "@/components/CapaUpload";
import FormFeedback from "@/components/FormFeedback";
import '@/app/admin/page.admin.css';
import { postProjectAction } from '@/actions/admActions';

export default function GerenciarProjetos() {
  const [state, formAction, isPending] = useActionState(postProjectAction, null);
  const [solicitarAnalise, setSolicitarAnalise] = useState(false);
  const [galeriaFotos, setGaleriaFotos] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmitWithFiles = (formData) => {
    galeriaFotos.forEach((file) => {
      formData.append('galleryImages', file);
    });
    formAction(formData);
  };

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Gerenciar Projeto</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <form style={styles.card} action={handleSubmitWithFiles}>
          <FormFeedback state={state} />

          <div style={styles.inputGroupFull}>
            <label htmlFor="project-title" style={styles.label}>TÍTULO DO PROJETO</label>
            <input 
              type="text" 
              id="project-title"
              name="title"
              placeholder="Ex: Preservação do Rio Juqueriquerê" 
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroupFull}>
            <label htmlFor="project-coordinator" style={styles.label}>COORDENADOR</label>
            <input 
              type="text" 
              id="project-coordinator"
              name="coordinator"
              placeholder="Nome do coordenador" 
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroupFull}>
            <label htmlFor="project-objective" style={styles.label}>OBJETIVO</label>
            <textarea 
              id="project-objective"
              name="objective"
              placeholder="Descreva de forma breve o objetivo..." 
              style={{...styles.textarea, height: "80px"}} 
              required
            />
          </div>

          <div style={styles.inputGroupFull}>
            <label htmlFor="project-content" style={styles.label}>CORPO DO PROJETO (TEXTO DETALHADO)</label>
            <textarea id="project-content" name="content" style={styles.textarea} required />
          </div>

          <div style={styles.row}>

            <div style={styles.inputGroupHalf}>
              {isMounted ? (
                <CapaUpload 
                  label="IMAGEM DE CAPA" 
                />
              ) : (
                <div style={styles.inputGroupHalf}>
                  <span style={styles.label}>IMAGEM DE CAPA</span>
                  <div style={styles.loadingContainer}>
                    <span style={styles.loadingText}>Carregando...</span>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.inputGroupHalf}>
              <label htmlFor="project-video" style={styles.label}>VÍDEO</label>
              <input 
                type="text" 
                id="project-video"
                name="videoUrl"
                placeholder="insira aqui seu link do youtube" 
                style={styles.input}
              />
            </div>
          </div>

          <GaleriaUpload 
            label="FOTOS DO PROJETO"
            titulo="CLIQUE PARA SELECIONAR FOTOS DO PROJETO"
            onChange={setGaleriaFotos}
          />

          <div style={styles.switchContainer}>
            <button
              type="button"
              role="switch"
              aria-checked={solicitarAnalise}
              aria-label="Solicitar análise para aprovação"
              onClick={() => setSolicitarAnalise(!solicitarAnalise)}
              style={{
                ...styles.switchTrack,
                backgroundColor: solicitarAnalise ? "#085747" : "#e5e7eb"
              }}
            >
              <div style={{
                ...styles.switchThumb,
                transform: solicitarAnalise ? "translateX(20px)" : "translateX(0px)"
              }} />
            </button>
            <span style={styles.switchLabel}>Solicitar análise para aprovação</span>
          </div>
          <input
            type="hidden"
            name="requiresReview"
            value={solicitarAnalise ? "on" : "off"}
          />

          <button type="submit" className="admin-submit-btn" disabled={isPending}>
            {isPending ? "Publicando..." : "Publicar"}
          </button>

        </form>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "50px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    width: "100%",
    maxWidth: "950px",
    boxSizing: "border-box",
  },
  row: {
    display: "flex",
    gap: "28px",
    width: "100%",
    boxSizing: "border-box",
  },
  inputGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
  inputGroupHalf: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
    boxSizing: "border-box",
  },
  label: {
    color: "#0c3110",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    height: "52px",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#374151",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "inherit",
  },
  textarea: {
    width: "100%",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#374151",
    boxSizing: "border-box",
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "56px",
    padding: "0 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  loadingText: {
    color: "#9ca3af",
    fontSize: "14px",
    fontFamily: "inherit",
  },
  switchContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  switchTrack: {
    width: "44px",
    height: "24px",
    borderRadius: "12px",
    padding: "2px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
    display: "flex",
    alignItems: "center",
  },
  switchThumb: {
    width: "20px",
    height: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    alignSelf: "center",
    transition: "transform 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  switchLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: "#085747",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "16px 36px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    alignSelf: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "inherit",
  },
};