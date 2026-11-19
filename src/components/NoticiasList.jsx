"use client";

import { useState } from "react";
import CardPublicacao from "@/components/CardPublicacao";

const LIMITE_POR_PAGINA = 6;

export default function NoticiasList({ noticias = [] }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const totalPaginas = Math.ceil(noticias.length / LIMITE_POR_PAGINA);
  const inicio = paginaAtual * LIMITE_POR_PAGINA;
  const noticiasPagina = noticias.slice(inicio, inicio + LIMITE_POR_PAGINA);

  const irParaPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <>
      {noticiasPagina.map((item) => (
        <CardPublicacao key={item.id} item={item} basePath="/noticias" />
      ))}

      {noticias.length === 0 && (
        <p style={styles.emptyMessage}>Nenhuma notícia disponível no momento.</p>
      )}

      {totalPaginas > 1 && (
        <div style={styles.paginationContainer}>
          {paginaAtual > 0 && (
            <button
              type="button"
              style={styles.btnPagina}
              onClick={() => irParaPagina(paginaAtual - 1)}
            >
              ← Página anterior
            </button>
          )}

          {paginaAtual < totalPaginas - 1 && (
            <button
              type="button"
              style={styles.btnPagina}
              onClick={() => irParaPagina(paginaAtual + 1)}
            >
              Próxima página →
            </button>
          )}
        </div>
      )}
    </>
  );
}

const styles = {
  paginationContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    width: "100%",
  },
  btnPagina: {
    backgroundColor: "#8C1717",
    color: "#ffffff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
  },
  emptyMessage: {
    color: "#6b7280",
    padding: "40px 20px",
  },
};
