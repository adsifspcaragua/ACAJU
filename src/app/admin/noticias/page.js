"use client";

import React, { useState, useEffect } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import AdminEditor from "@/components/AdminEditor";
import GaleriaUpload from "@/components/GaleriaUpload";
import CapaUpload from "@/components/CapaUpload";
import '@/app/admin/page.admin.css';

import { useActionState } from 'react';
import { postNewsActions } from '@/actions/admActions';

export default function PublicarNoticia() {
  const [state, formAction, isPending] = useActionState(postNewsActions, null);
  const [editorContent, setEditorContent] = useState('');
  const [galeriaFotos, setGaleriaFotos] = useState([]);
  const [solicitarAnalise, setSolicitarAnalise] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Intercepta a submissão para anexar os arquivos de fotos adicionais
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
            <h1 style={styles.pageTitle}>Gerenciar Notícias</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <form style={styles.card} action={handleSubmitWithFiles}>

          {/* Feedback de erro retornado pela Action */}
          {state?.error && (
            <div style={styles.errorAlert}>
              {state.error}
            </div>
          )}

          {/* TÍTULO */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>TÍTULO DA NOTÍCIA</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Ex: Resultado do último mutirão..."
              style={styles.input}
              required
            />
            {state?.errors?.title && (
              <span style={styles.errorText}>{state.errors.title}</span>
            )}
          </div>

          {/* CONTEÚDO PRINCIPAL */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>CONTEÚDO PRINCIPAL</label>
            <AdminEditor onChange={(html) => setEditorContent(html)} />
            <input
              type="hidden"
              name="content"
              value={editorContent}
            />
            {state?.errors?.content && (
              <span style={styles.errorText}>{state.errors.content}</span>
            )}
          </div>

          {/* ROW: CAPA E VÍDEO */}
          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              {isMounted ? (
                <CapaUpload
                  label="IMAGEM DE CAPA"
                  name="coverImage"
                />
              ) : (
                <div style={styles.uploadContainer}>
                  <span style={styles.uploadText}>Carregando...</span>
                </div>
              )}
              {state?.errors?.coverImage && (
                <span style={styles.errorText}>{state.errors.coverImage}</span>
              )}
            </div>

            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>VÍDEO</label>
              <input
                type="text"
                name="videoUrl"
                id="videoUrl"
                placeholder="insira aqui seu link do youtube"
                style={styles.input}
              />
            </div>
          </div>

          {/* GALERIA DE FOTOS ADICIONAIS */}
          <GaleriaUpload
            label="IMAGENS ADICIONAIS (GALERIA DA NOTÍCIA)"
            titulo="CLIQUE PARA SELECIONAR FOTOS ADICIONAIS"
            onChange={(files) => setGaleriaFotos(files)}
          />

          {/* SWITCH DE STATUS */}
          <div style={styles.switchContainer}>
            <div
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
            </div>
            
            {/* Input oculto para o FormData registrar o estado da alternância */}
            <input 
              type="hidden" 
              name="requiresReview" 
              value={solicitarAnalise ? "on" : "off"} 
            />

            <span style={styles.switchLabel}>Solicitar análise para aprovação</span>
          </div>

          <button 
            type="submit" 
            className="admin-submit-btn" 
            style={styles.submitButton}
            disabled={isPending}
          >
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
  uploadContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    width: "100%",
    height: "52px",
    padding: "0 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  uploadText: {
    color: "#9ca3af",
    fontSize: "14px",
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
    transition: "transform 0.2s",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  switchLabel: {
    fontSize: "14px",
    color: "#374151",
    fontWeight: "500",
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