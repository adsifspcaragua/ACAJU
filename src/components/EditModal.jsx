
"use client";

import React, { useState, useEffect } from "react";
import { FiX, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";
import Uploady, { useBatchAddListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { styles } from "./EditModal.styles"; // importa os estilos

function GaleriaConteudo({ titulo, label }) {
  const [arquivos, setArquivos] = useState([]);

  useBatchAddListener((batch) => {
    const novosArquivos = batch.items.map((item) => ({
      id: item.id,
      name: item.file.name,
      url: URL.createObjectURL(item.file),
    }));
    setArquivos((prev) => [...prev, ...novosArquivos]);
  });

  const removerFoto = (idParaRemover) => {
    setArquivos((prev) => prev.filter((item) => item.id !== idParaRemover));
  };

  const limparTudo = () => {
    setArquivos([]);
  };

  return (
    <div style={styles.inputGroupFull}>
      {label && <label style={styles.label}>{label}</label>}

      <div style={styles.selectBox}>
        {arquivos.length === 0 ? (
          <UploadButton
            className="galeria-upload-btn"
            style={styles.uploadButtonInvisible}
          >
            <span style={styles.placeholderContent}>
              <span style={{ fontSize: "28px", marginBottom: "4px" }}>📸</span>
              <span style={styles.selectBoxTitle}>
                {titulo ? titulo : "CLIQUE PARA SELECIONAR FOTOS"}
              </span>
              <span style={styles.selectBoxSubtitle}>
                ou arraste os ficheiros para cá
              </span>
            </span>
          </UploadButton>
        ) : (
          <div style={styles.innerContainer}>
            <div style={styles.previewContainer}>
              {arquivos.map((item) => (
                <div key={item.id} style={styles.previewCard}>
                  <button
                    type="button"
                    onClick={() => removerFoto(item.id)}
                    style={styles.removeSingleBtn}
                    title="Remover foto"
                  >
                    <FiX size={14} color="#ffffff" />
                  </button>
                  <img
                    src={item.url}
                    alt={item.name}
                    style={styles.previewImage}
                  />
                  <span style={styles.previewName}>{item.name}</span>
                </div>
              ))}
            </div>

            <div style={styles.actionsBar}>
              <UploadButton
                className="btn-adicionar-mais"
                style={styles.btnAddMore}
              >
                <FiPlus size={18} color="#085747" />
                <span>Adicionar mais fotos</span>
              </UploadButton>

              <button
                type="button"
                onClick={limparTudo}
                style={styles.btnClearAll}
              >
                <FiTrash2 size={16} color="#dc2626" />
                <span>Apagar todas</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GaleriaUpload({
  label = "FOTOS DO PROJETO",
  titulo = "Clique para selecionar novas fotos",
  destinationUrl = "https://meu-servidor.com/upload",
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={styles.inputGroupFull}>
        {label && <label style={styles.label}>{label}</label>}
        <div style={styles.selectBox}>
          <p style={styles.selectBoxTitle}>Carregando módulo de upload...</p>
        </div>
      </div>
    );
  }

  return (
    <Uploady destination={{ url: destinationUrl }} multiple>
      <GaleriaConteudo titulo={titulo} label={label} />
    </Uploady>
  );
}

export default function EditModal({ editingItem, onClose }) {
  if (!editingItem) return null;

  const { categoria } = editingItem;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Editar {categoria}</h2>
          <button style={styles.closeBtn} onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div style={styles.modalBody}>
          <div style={styles.formGrid}>
            {/* CABEÇALHO PADRÃO */}
            <div style={styles.row3}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CATEGORIA</label>
                <input
                  type="text"
                  value={categoria}
                  disabled
                  style={styles.inputDisabled}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>AUTOR (INALTERÁVEL)</label>
                <input
                  type="text"
                  value={editingItem.autor || "João das Neves"}
                  disabled
                  style={styles.inputDisabled}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>DATA INCLUSÃO</label>
                <input
                  type="text"
                  value={editingItem.data || "05/08/2026"}
                  disabled
                  style={styles.inputDisabled}
                />
              </div>
            </div>

            {categoria === "Notícia" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>TÍTULO DA PUBLICAÇÃO</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>CONTEÚDO PRINCIPAL</label>
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    defaultValue="Cientistas locais descobriram uma nova espécie de crustáceo nas áreas de mangue..."
                  />
                </div>
                <div style={styles.row2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>ALTERAR IMAGEM DE CAPA</label>
                    <input type="file" style={styles.fileInput} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      IMAGENS ADICIONAIS (GALERIA)
                    </label>
                    <input type="file" multiple style={styles.fileInput} />
                  </div>
                </div>
              </>
            )}

            {categoria === "Memória Caiçara" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>TÍTULO DA PUBLICAÇÃO</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    CONTEÚDO DA MEMÓRIA (TEXTO)
                  </label>
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    defaultValue="Mestre João conta suas histórias de décadas no mar..."
                  />
                </div>
                <div style={styles.row2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>ALTERAR IMAGEM DE CAPA</label>
                    <input type="file" style={styles.fileInput} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>
                      IMAGENS ADICIONAIS (GALERIA)
                    </label>
                    <input type="file" multiple style={styles.fileInput} />
                  </div>
                </div>
              </>
            )}

            {categoria === "Mini-Museu" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>TÍTULO DO ÁLBUM</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>

                <GaleriaUpload
                  label="ADICIONAR / REMOVER FOTOS"
                  titulo="Clique para selecionar novas fotos"
                />

                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    TÍTULO OU DESCRIÇÃO DO ÁLBUM
                  </label>
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    defaultValue="Acervo fotográfico e histórico dos antigos artefatos (redes, covos, remos) utilizados pelas famílias tradicionais."
                  />
                </div>
              </>
            )}

            {categoria === "Mutirão" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>NOME DO MUTIRÃO</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>DESCRIÇÃO / OBJETIVO</label>
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    defaultValue="Mutirão para limpeza das margens e plantio de mudas nativas."
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>ANEXAR FOTOS DO MUTIRÃO</label>
                  <input type="file" multiple style={styles.fileInput} />
                </div>
              </>
            )}

            {categoria === "Documentos" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>TÍTULO DO DOCUMENTO</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>DESCRIÇÃO BREVE</label>
                  <textarea
                    style={styles.textarea}
                    rows={3}
                    defaultValue="Relatório anual de impacto ambiental da região estuarina."
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    SUBSTITUIR ARQUIVO (PDF, DOCX)
                  </label>
                  <input type="file" style={styles.fileInput} />
                </div>
              </>
            )}

            {categoria === "Projeto" && (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>TÍTULO DO PROJETO</label>
                  <input
                    type="text"
                    defaultValue={editingItem.titulo}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>DETALHES DO PROJETO</label>
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    defaultValue="Iniciativa voltada para a conscientização sobre pesca predatória."
                  />
                </div>
                <div style={styles.row2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>IMAGEM DE DESTAQUE</label>
                    <input type="file" style={styles.fileInput} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>ARQUIVOS COMPLEMENTARES</label>
                    <input type="file" multiple style={styles.fileInput} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={onClose}>
            Cancelar
          </button>
          <button style={styles.btnSave} onClick={onClose}>
            <FiSave size={18} /> Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}