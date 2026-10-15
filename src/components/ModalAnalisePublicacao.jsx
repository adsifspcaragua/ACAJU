"use client";

import { useActionState, useEffect, useState } from "react";
import { reviewAdminPublicationAction } from '@/actions/admActions';
import FormFeedback from '@/components/FormFeedback';

export default function ModalAnalisePublicacao({ isOpen, onClose, onReviewed, item }) {
  const [mostrarRejeicao, setMostrarRejeicao] = useState(false);
  const [reviewState, reviewAction, isPending] = useActionState(reviewAdminPublicationAction, null);

  useEffect(() => {
    if (!reviewState?.success || !item) return;
    onReviewed(item.id);
    setMostrarRejeicao(false);
    onClose();
  }, [reviewState, item, onReviewed, onClose]);

  if (!isOpen || !item) return null;

  const isProjeto = item.tipo?.toUpperCase() === "PROJETO";

  const handleCloseModal = () => {
    setMostrarRejeicao(false);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.cardModal}>

        <div style={styles.headerRow}>
          <span style={styles.typeBadge}>
            {isProjeto ? "PROJETO" : "NOTÍCIA"} (AGUARDANDO ANÁLISE)
          </span>
          <button type="button" onClick={handleCloseModal} style={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div style={styles.titleSection}>
          <h2 style={styles.mainTitle}>{item.titulo}</h2>
          <p style={styles.metaInfo}>
            Enviado por: <strong>{item.autor}</strong> em {new Intl.DateTimeFormat('pt-BR').format(new Date(item.data))}
          </p>
        </div>

        <div style={styles.verticalContentFlow}>

          {isProjeto && (
            <>
              <div style={styles.sectionGroup}>
                <span style={styles.fieldLabel}>COORDENADOR</span>
                <div style={styles.fieldValue}>{item.coordenador || "Não informado"}</div>
              </div>

              <div style={styles.sectionGroup}>
                <span style={styles.fieldLabel}>OBJETIVO</span>
                <div style={styles.fieldValue}>{item.objetivo || "Sem objetivo cadastrado."}</div>
              </div>
            </>
          )}

          <div style={styles.sectionGroup}>
            <span style={styles.fieldLabel}>
              {isProjeto ? "CORPO DO PROJETO (TEXTO DETALHADO)" : "CONTEÚDO PRINCIPAL"}
            </span>
            <div 
              style={styles.contentBox}
            >
              {item.conteudo || item.descricao || "Sem conteúdo inserido."}
            </div>
          </div>

          <div style={styles.sectionGroup}>
            <span style={styles.fieldLabel}>IMAGEM DE CAPA</span>
            {item.imagemCapa ? (
              <img src={item.imagemCapa} alt="Capa" style={styles.coverImage} />
            ) : (
              <div style={styles.imagePlaceholder}>🖼️ Nenhuma imagem anexada</div>
            )}
          </div>

          <div style={styles.sectionGroup}>
            <span style={styles.fieldLabel}>VÍDEO (LINK DO YOUTUBE)</span>
            {item.videoUrl ? (
              <a 
                href={item.videoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.videoLink}
              >
                ▶️ {item.videoUrl}
              </a>
            ) : (
              <div style={styles.emptyLink}>Nenhum vídeo fornecido</div>
            )}
          </div>

          <div style={styles.sectionGroup}>
            <span style={styles.fieldLabel}>
              {isProjeto ? "FOTOS DO PROJETO" : "FOTOS DA NOTÍCIA"} (GALERIA)
            </span>
            {item.galeria && item.galeria.length > 0 ? (
              <div style={styles.galleryGrid}>
                {item.galeria.map((imgSrc) => (
                  <img key={imgSrc} src={imgSrc} alt="Imagem da publicação" style={styles.galleryImg} />
                ))}
              </div>
            ) : (
              <div style={styles.emptyGallery}>
                Nenhuma imagem adicional enviada na galeria.
              </div>
            )}
          </div>

        </div>

        <hr style={styles.divider} />

        <FormFeedback state={reviewState} />

        <form action={reviewAction} style={styles.reviewForm}>
          <input type="hidden" name="id" value={item.recordId} />
          <input type="hidden" name="category" value={item.category} />
          {mostrarRejeicao && (
            <div style={styles.rejeicaoBox}>
              <label htmlFor="review-reason" style={styles.labelRejeicao}>JUSTIFICATIVA DA REJEIÇÃO (OBRIGATÓRIA)</label>
              <textarea
                id="review-reason"
                name="reason"
                required
                minLength={5}
                placeholder="Explique o motivo da rejeição..."
                style={styles.textarea}
              />
            </div>
          )}
          <div style={styles.buttonGroup}>
            <button type="submit" name="decision" value="APPROVED" disabled={isPending} style={styles.btnAprovar}>
              {isPending ? 'Salvando...' : 'Aprovar'}
            </button>
            {mostrarRejeicao ? (
              <button type="submit" name="decision" value="REJECTED" disabled={isPending} style={styles.btnRejeitar}>
                Confirmar rejeição
              </button>
            ) : (
              <button type="button" onClick={() => setMostrarRejeicao(true)} style={styles.btnRejeitar}>
                Rejeitar
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  cardModal: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    width: "100%",
    maxWidth: "750px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    backgroundColor: "#fef08a",
    color: "#854d0e",
    padding: "4px 10px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#6b7280",
    fontWeight: "bold",
  },
  titleSection: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  mainTitle: {
    fontSize: "24px",
    color: "#111827",
    margin: 0,
    fontWeight: "bold",
  },
  metaInfo: {
    fontSize: "13px",
    color: "#6b7280",
    margin: 0,
  },

  verticalContentFlow: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  sectionGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  fieldLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#374151",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  fieldValue: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#1f2937",
    width: "100%",
    boxSizing: "border-box",
  },
  contentBox: {
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: "14px",
    fontSize: "14px",
    color: "#1f2937",
    lineHeight: "1.6",
    minHeight: "100px",
    width: "100%",
    boxSizing: "border-box",
  },
  coverImage: {
    width: "100%",
    maxHeight: "320px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  imagePlaceholder: {
    height: "120px",
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#9ca3af",
    fontSize: "13px",
    border: "1px dashed #cbd5e1",
    width: "100%",
  },
  videoLink: {
    display: "block",
    padding: "12px",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
    borderRadius: "6px",
    fontSize: "13px",
    wordBreak: "break-all",
    textDecoration: "none",
    border: "1px solid #bfdbfe",
    width: "100%",
    boxSizing: "border-box",
  },
  emptyLink: {
    padding: "12px",
    backgroundColor: "#f9fafb",
    color: "#9ca3af",
    borderRadius: "6px",
    fontSize: "13px",
    border: "1px solid #e5e7eb",
    width: "100%",
    boxSizing: "border-box",
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
    gap: "12px",
    width: "100%",
  },
  galleryImg: {
    width: "100%",
    height: "85px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
  },
  emptyGallery: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    color: "#9ca3af",
    borderRadius: "6px",
    fontSize: "13px",
    textAlign: "center",
    border: "1px dashed #e5e7eb",
    width: "100%",
    boxSizing: "border-box",
  },
  divider: {
    margin: "10px 0 0 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
  },
  reviewForm: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  btnAprovar: {
    backgroundColor: "#058339",
    color: "white",
    padding: "12px 36px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  btnRejeitar: {
    backgroundColor: "#eb3636",
    color: "white",
    padding: "12px 36px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  rejeicaoBox: {
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#FFFF",     
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  labelRejeicao: {
    fontWeight: "bold",
    fontSize: "12px",
    color: "#374151",
  },
  textarea: {
    width: "100%",
    height: "90px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  btnConfirmar: {
    backgroundColor: "#991b1b",
    color: "white",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },
};