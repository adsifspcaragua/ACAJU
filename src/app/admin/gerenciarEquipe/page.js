"use client";

import React, { useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import '@/app/admin/page.admin.css';

import { useActionState } from 'react';
import { registerAction } from '@/actions/auth';
import Link from 'next/link';

export default function GestaoUsuarios() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  const [usuarios, setUsuarios] = useState([
    {
      id: "1",
      nome: "Ana Julia Santana",
      ultimoAcesso: "04/09/2026 18:30",
      totalPublicacoes: 12
    },
    {
      id: "2",
      nome: "João das Neves",
      ultimoAcesso: "02/09/2026 10:15",
      totalPublicacoes: 5
    }
  ]);

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>

        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Gestão de Usuários</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <div style={styles.cardsWrapper}>
          
          <form action={formAction} style={styles.card}>

            <h2 style={styles.cardTitle}>Novo Usuário</h2>

            {state?.message && (
              <p className={`text-sm text-center ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                {state.message}
              </p>
            )}

            <div style={styles.row}>
              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>NOME COMPLETO</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ex: Ana Julia Santana"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ex: anajulia@email.com"
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>SENHA PROVISÓRIA</label>
                <input
                  type="password"
                  name="pass"
                  placeholder="Digite uma senha inicial..."
                  style={styles.input}
                  required
                />
                {state?.errors?.pass && (
                  <span className="text-red-500 text-xs">{state.errors.pass[0]}</span>
                )}
              </div>
            </div>

            <button type="submit" disabled={isPending} style={styles.submitButton}>
              {isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>

          </form>

          <div style={styles.card}>
            <h2 style={styles.tableCardTitle}>MEMBROS DA EQUIPE</h2>

            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeaderRow}>
                    <th style={{...styles.th, textAlign: "left"}}>NOME</th>
                    <th style={{...styles.th, textAlign: "center"}}>ÚLTIMO ACESSO</th>
                    <th style={{...styles.th, textAlign: "center"}}>PUBLICAÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => (
                    <tr key={user.id} style={styles.tableBodyRow}>
                      <td style={styles.tdName}>{user.nome}</td>
                      <td style={styles.tdAccess}>{user.ultimoAcesso}</td>
                      <td style={styles.tdPublications}>
                        <Link 
                          href={`/admin/usuarios/${user.id}/publicacoes`} 
                          style={styles.linkPublications}
                        >
                          Ver publicações ({user.totalPublicacoes})
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

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
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    width: "100%",
    maxWidth: "950px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "40px 50px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    width: "100%",
    boxSizing: "border-box",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    color: "#0c3110",
    fontSize: "18px",
    fontWeight: "bold",
    alignSelf: "center",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  tableCardTitle: {
    margin: 0,
    color: "#0c3110",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  row: {
    display: "flex",
    gap: "28px",
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
    width: "fit-content",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "inherit",
  },
 
  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeaderRow: {
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    padding: "14px 16px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#6b7280",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  tableBodyRow: {
    borderBottom: "1px solid #f3f4f6",
  },
  tdName: {
    padding: "16px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
  },
  tdAccess: {
    padding: "16px",
    fontSize: "14px",
    color: "#6b7280",
    textAlign: "center",
  },
  tdPublications: {
    padding: "16px",
    textAlign: "center",
  },
  linkPublications: {
    color: "#4f46e5",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
  },
};