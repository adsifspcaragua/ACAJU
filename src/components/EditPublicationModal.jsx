"use client";

import { useState, useTransition } from "react";
import { FiX } from "react-icons/fi";
import { updateAdminPublicationAction } from '@/actions/admActions';
import FormFeedback from '@/components/FormFeedback';

const fieldsByCategory = {
  'Notícia': [
    { name: 'title', label: 'Título da notícia', maxLength: 255 },
    { name: 'content', label: 'Conteúdo', multiline: true, minLength: 10 },
    { name: 'videoUrl', label: 'Link do vídeo', type: 'url', required: false },
  ],
  'Mutirão': [
    { name: 'name', label: 'Nome do mutirão', maxLength: 255 },
    { name: 'type', label: 'Tipo', type: 'select', options: [['limpeza', 'Limpeza'], ['plantio', 'Plantio'], ['outro', 'Outro']] },
    { name: 'date', label: 'Data', type: 'date' },
    { name: 'time', label: 'Horário', type: 'time' },
    { name: 'location', label: 'Local' },
    { name: 'environment', label: 'Ambiente', type: 'select', options: [['praia', 'Praia'], ['rio', 'Rio'], ['mangue', 'Mangue'], ['restinga', 'Restinga'], ['urbano', 'Urbano']] },
    { name: 'description', label: 'Descrição', multiline: true, minLength: 10 },
  ],
  'Projeto': [
    { name: 'title', label: 'Título do projeto', maxLength: 255 },
    { name: 'coordinator', label: 'Coordenador' },
    { name: 'objective', label: 'Objetivo', multiline: true, minLength: 10 },
    { name: 'bodyContent', label: 'Conteúdo detalhado', multiline: true, minLength: 20 },
    { name: 'videoUrl', label: 'Link do vídeo', type: 'url', required: false },
  ],
  'Memória Caiçara': [
    { name: 'title', label: 'Título ou homenageado', maxLength: 255 },
    { name: 'content', label: 'Conteúdo da memória', multiline: true, minLength: 15 },
    { name: 'videoUrl', label: 'Link do vídeo', type: 'url', required: false },
  ],
  'Mini-Museu': [
    { name: 'title', label: 'Título do item', maxLength: 255 },
    { name: 'description', label: 'Descrição', multiline: true, required: false },
  ],
  'Documentos': [
    { name: 'name', label: 'Nome do documento', maxLength: 255 },
    { name: 'description', label: 'Descrição', multiline: true, minLength: 10 },
  ],
};
const coverCategories = ['Notícia', 'Mutirão', 'Projeto', 'Memória Caiçara', 'Mini-Museu'];
const galleryCategories = ['Notícia', 'Projeto', 'Memória Caiçara'];

export default function EditPublicationModal({ publication, onClose, onUpdated }) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState(null);

  if (!publication) return null;

  const handleSave = (formData) => {
    setFeedback(null);
    startTransition(async () => {
      const result = await updateAdminPublicationAction(null, formData);
      if (!result.success) {
        setFeedback(result);
        return;
      }

      onUpdated(result.publication);
      onClose();
    });
  };

  return (
    <div style={styles.overlay}>
      <form action={handleSave} style={styles.modal}>
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Editar publicação</h2>
            <p style={styles.category}>{publication.category}</p>
          </div>
          <button type="button" aria-label="Fechar" onClick={onClose} style={styles.closeButton}>
            <FiX size={20} />
          </button>
        </header>

        <FormFeedback state={feedback} />
        <input type="hidden" name="id" value={publication.recordId} />
        <input type="hidden" name="category" value={publication.category} />

        {(fieldsByCategory[publication.category] ?? []).map((field) => (
          <div key={field.name} style={styles.field}>
            <label htmlFor={`publication-${field.name}`} style={styles.label}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={`publication-${field.name}`}
                name={field.name}
                defaultValue={publication.fields?.[field.name] ?? ''}
                required={field.required !== false}
                style={styles.input}
              >
                {field.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            ) : field.multiline ? (
              <textarea
                id={`publication-${field.name}`}
                name={field.name}
                defaultValue={publication.fields?.[field.name] ?? ''}
                required={field.required !== false}
                minLength={field.minLength}
                rows={field.name === 'description' ? 4 : 6}
                style={styles.textarea}
              />
            ) : (
              <input
                id={`publication-${field.name}`}
                name={field.name}
                type={field.type ?? 'text'}
                defaultValue={publication.fields?.[field.name] ?? ''}
                required={field.required !== false}
                minLength={field.minLength ?? (field.type ? undefined : 3)}
                maxLength={field.maxLength}
                style={styles.input}
              />
            )}
          </div>
        ))}

        {coverCategories.includes(publication.category) && (
          <div style={styles.field}>
            <label htmlFor="publication-cover" style={styles.label}>
              {publication.category === 'Mini-Museu' ? 'Imagem do item' : 'Imagem de capa'}
            </label>
            {(publication.media?.coverImage || publication.media?.imageUrl) && (
              <a
                href={publication.media.coverImage ?? publication.media.imageUrl}
                target="_blank"
                rel="noreferrer"
                style={styles.currentFile}
              >
                Ver imagem atual
              </a>
            )}
            <input
              id="publication-cover"
              type="file"
              name="coverImage"
              accept="image/*"
              style={styles.fileInput}
            />
          </div>
        )}

        {galleryCategories.includes(publication.category) && (
          <div style={styles.field}>
            <label htmlFor="publication-gallery" style={styles.label}>Galeria de imagens</label>
            {publication.media?.galleryImages?.length > 0 && (
              <div style={styles.gallery}>
                {publication.media.galleryImages.map((imageUrl) => (
                  <a key={imageUrl} href={imageUrl} target="_blank" rel="noreferrer">
                    <img src={imageUrl} alt="Imagem atual da galeria" style={styles.thumbnail} />
                  </a>
                ))}
              </div>
            )}
            <input
              id="publication-gallery"
              type="file"
              name="galleryImages"
              accept="image/*"
              multiple
              style={styles.fileInput}
            />
            <span style={styles.helpText}>Selecionar arquivos substitui a galeria atual. Deixe vazio para mantê-la.</span>
          </div>
        )}

        {publication.category === 'Documentos' && (
          <div style={styles.field}>
            <label htmlFor="publication-document" style={styles.label}>Arquivo PDF</label>
            {publication.media?.fileUrl && (
              <a href={publication.media.fileUrl} target="_blank" rel="noreferrer" style={styles.currentFile}>
                Abrir PDF atual
              </a>
            )}
            <input
              id="publication-document"
              type="file"
              name="file"
              accept=".pdf,application/pdf"
              style={styles.fileInput}
            />
          </div>
        )}

        <footer style={styles.footer}>
          <button type="button" onClick={onClose} disabled={isPending} style={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" disabled={isPending} style={styles.saveButton}>
            {isPending ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </footer>
      </form>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "rgba(15, 23, 42, 0.58)",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "680px",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "28px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  },
  title: { margin: 0, color: "#111827", fontSize: "20px" },
  category: { margin: "6px 0 0", color: "#64748b", fontSize: "13px" },
  closeButton: {
    width: "36px",
    height: "36px",
    display: "grid",
    placeItems: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    background: "#ffffff",
    color: "#475569",
    cursor: "pointer",
  },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "#334155", fontSize: "13px", fontWeight: "700" },
  input: {
    width: "100%",
    height: "48px",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    color: "#1f2937",
    backgroundColor: "#ffffff",
    font: "inherit",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "180px",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    color: "#1f2937",
    font: "inherit",
    resize: "vertical",
    boxSizing: "border-box",
  },
  fileInput: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#334155",
    boxSizing: "border-box",
  },
  currentFile: {
    width: "fit-content",
    color: "#075e4d",
    fontSize: "13px",
    textDecoration: "underline",
  },
  gallery: { display: "flex", flexWrap: "wrap", gap: "8px" },
  thumbnail: {
    width: "88px",
    height: "64px",
    objectFit: "cover",
    border: "1px solid #cbd5e1",
    borderRadius: "4px",
  },
  helpText: { color: "#64748b", fontSize: "12px" },
  footer: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelButton: {
    minHeight: "40px",
    padding: "0 14px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#334155",
    cursor: "pointer",
  },
  saveButton: {
    minHeight: "40px",
    padding: "0 16px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#085747",
    color: "#ffffff",
    cursor: "pointer",
  },
};