"use client";

import React from "react";
import SideBarAdmin from './SideBarAdmin';
import '@/app/admin/page.admin.css';

import { useActionState } from 'react';
import { updateProfileAction, changePasswordAction } from '@/actions/auth';

export default function GerenciarUsuario({ admin }) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, null);
  const [passState, passAction, isPendingPass] = useActionState(changePasswordAction, null);

  const dataCadastroFormatada = admin?.createdAt
    ? new Date(admin.createdAt).toLocaleDateString('pt-BR')
    : 'N/A';

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>

        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Meu Perfil</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <div style={styles.cardsWrapper}>

          <form action={formAction} style={styles.card}>
            <h2 style={styles.cardTitle}>Informações do Usuário</h2>

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
                {state?.errors?.name && (
                  <span className="text-red-500 text-xs">{state.errors.name[0]}</span>
                )}
              </div>

              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ex: admin@acaju.org"
                  style={styles.input}
                />
                {state?.errors?.email && (
                  <span className="text-red-500 text-xs">{state.errors.email[0]}</span>
                )}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>PERFIL DE ACESSO</label>
                <input
                  type="text"
                  placeholder="Ex: Administrador"
                  style={styles.input}
                  disabled
                />
              </div>

              <div style={styles.inputGroupHalf}>
                <label style={styles.label}>DATA DE CADASTRO</label>
                <input
                  type="text"
                  value={dataCadastroFormatada}
                  placeholder="Ex: 15/01/2024"
                  style={styles.input}
                  disabled
                />
              </div>
            </div>

            <button type="submit" disabled={isPending} className="admin-submit-btn">
              {isPending ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </form>

          <form style={styles.card} action={passAction}>
            <h2 style={styles.cardTitle}>Alterar senha</h2>

            {passState?.message && (
              <p style={{ color: passState.success ? 'green' : 'red', fontWeight: 'bold' }}>
                {passState.message}
              </p>
            )}

            <div style={styles.row3Cols}>
              <div style={styles.inputGroupThird}>
                <label style={styles.label}>SENHA ATUAL</label>
                <input
                  type="password"
                  name="currentPass"
                  placeholder="••••••••"
                  style={styles.input}
                  required
                />
                {passState?.errors?.currentPass && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {passState.errors.currentPass[0]}
                  </span>
                )}
              </div>

              <div style={styles.inputGroupThird}>
                <label style={styles.label}>NOVA SENHA</label>
                <input
                  type="password"
                  name="newPass"
                  placeholder="Mínimo 8 caracteres"
                  style={styles.input}
                  required
                />
                {passState?.errors?.newPass && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {passState.errors.newPass[0]}
                  </span>
                )}
              </div>

              <div style={styles.inputGroupThird}>
                <label style={styles.label}>CONFIRMAR NOVA SENHA</label>
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Mínimo 8 caracteres"
                  style={styles.input}
                  required
                />
                {passState?.errors?.confirmPass && (
                  <span style={{ color: 'red', fontSize: '12px' }}>
                    {passState.errors.confirmPass[0]}
                  </span>
                )}  
              </div>
            </div>

            <button type="submit" disabled={isPendingPass} className="admin-submit-btn">
              {isPendingPass ? 'Alterando...' : 'Alterar Senha'}
            </button>
          </form>

          <div style={styles.card}>
            <p style={styles.deleteNoticeText}>
              Ao excluir sua conta, você perderá permanentemente o acesso ao painel administrativo da ACAJU. Esta ação não poderá ser desfita.
            </p>

            <button type="button" className="admin-danger-btn">Excluir Conta</button>
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
    gap: "28px",
    width: "100%",
    maxWidth: "950px",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px 50px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    boxSizing: "border-box",
  },
  cardTitle: {
    margin: 0,
    alignSelf: "center",
    color: "#024039",
    fontSize: "18px",
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    width: "100%",
    boxSizing: "border-box",
  },
  row3Cols: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
  inputGroupThird: {
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
  deleteNoticeText: {
    color: "#4b5563",
    fontSize: "14px",
    lineHeight: "1.6",
    textAlign: "center",
    margin: "10px 0 0 0",
  },
};