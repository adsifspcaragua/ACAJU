"use client";

import { useState, useTransition } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { deleteAdminPublicationAction } from '@/actions/admActions';

export default function DeletePublicationDialog({ publication, onClose, onDeleted, onError }) {
  const [confirmation, setConfirmation] = useState('');
  const [isPending, startTransition] = useTransition();

  if (!publication) return null;

  const canDelete = confirmation === publication.title;

  const handleDelete = () => {
    if (!canDelete) return;

    startTransition(async () => {
      const result = await deleteAdminPublicationAction(publication.category, publication.recordId);
      if (!result.success) {
        onError(result.error);
        return;
      }

      onDeleted(publication.id);
      onClose();
    });
  };

  return (
    <div style={styles.overlay} role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="delete-title" style={styles.dialog}>
        <header style={styles.header}>
          <div style={styles.warningIcon} aria-hidden="true"><FiAlertTriangle size={22} /></div>
          <button type="button" aria-label="Fechar" onClick={onClose} disabled={isPending} style={styles.closeButton}>
            <FiX size={20} />
          </button>
        </header>

        <h2 id="delete-title" style={styles.title}>Excluir publicação?</h2>
        <p style={styles.description}>
          Esta ação é permanente. Para confirmar, digite exatamente o título da publicação:
        </p>
        <p style={styles.publicationTitle}>{publication.title}</p>

        <label htmlFor="delete-confirmation" style={styles.label}>Título da publicação</label>
        <input
          id="delete-confirmation"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder={publication.title}
          style={styles.input}
        />

        <footer style={styles.footer}>
          <button type="button" onClick={onClose} disabled={isPending} style={styles.cancelButton}>
            Cancelar
          </button>
          <button type="button" onClick={handleDelete} disabled={!canDelete || isPending} style={styles.deleteButton}>
            {isPending ? 'Excluindo...' : 'Excluir permanentemente'}
          </button>
        </footer>
      </section>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1100,
    display: "grid",
    placeItems: "center",
    padding: "20px",
    backgroundColor: "rgba(15, 23, 42, 0.62)",
  },
  dialog: {
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    padding: "28px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.24)",
    boxSizing: "border-box",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  warningIcon: {
    width: "42px",
    height: "42px",
    display: "grid",
    placeItems: "center",
    borderRadius: "50%",
    backgroundColor: "#fef2f2",
    color: "#b91c1c",
  },
  closeButton: {
    width: "34px",
    height: "34px",
    display: "grid",
    placeItems: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#64748b",
    cursor: "pointer",
  },
  title: { margin: 0, color: "#111827", fontSize: "21px" },
  description: { margin: 0, color: "#475569", fontSize: "14px", lineHeight: 1.5 },
  publicationTitle: {
    margin: 0,
    padding: "10px 12px",
    borderRadius: "5px",
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "700",
    overflowWrap: "anywhere",
  },
  label: { color: "#334155", fontSize: "13px", fontWeight: "700" },
  input: {
    width: "100%",
    height: "46px",
    padding: "11px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    color: "#1f2937",
    font: "inherit",
    boxSizing: "border-box",
  },
  footer: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" },
  cancelButton: {
    minHeight: "40px",
    padding: "0 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#334155",
    cursor: "pointer",
  },
  deleteButton: {
    minHeight: "40px",
    padding: "0 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#b91c1c",
    color: "#ffffff",
    cursor: "pointer",
  },
};
