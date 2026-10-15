"use client";

import { useActionState, useEffect, useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import '@/app/admin/page.admin.css';
import { getTeamMembersAction, registerAction } from '@/actions/auth';

function formatLastAccess(value) {
  if (!value) return 'Nunca acessou';

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function GestaoUsuarios() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [membersError, setMembersError] = useState('');

  useEffect(() => {
    let isActive = true;

    getTeamMembersAction()
      .then((result) => {
        if (!isActive) return;
        setUsuarios(result.members);
        setMembersError(result.error ?? '');
      })
      .catch(() => {
        if (isActive) setMembersError('Não foi possível carregar a equipe. Tente atualizar a página.');
      })
      .finally(() => {
        if (isActive) setIsLoadingMembers(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!state?.member) return;

    setUsuarios((currentMembers) => {
      if (currentMembers.some((member) => member.id === state.member.id)) {
        return currentMembers;
      }

      return [...currentMembers, state.member].sort((first, second) =>
        first.name.localeCompare(second.name, 'pt-BR'),
      );
    });
  }, [state]);

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
              <p
                role={state.success ? 'status' : 'alert'}
                style={state.success ? styles.successMessage : styles.errorMessage}
              >
                {state.message}
              </p>
            )}

            <div style={styles.row}>
              <div style={styles.inputGroupHalf}>
                <label htmlFor="admin-name" style={styles.label}>NOME COMPLETO</label>
                <input
                  id="admin-name"
                  type="text"
                  name="name"
                  placeholder="Ex: Ana Julia Santana"
                  style={styles.input}
                  required
                />
                {state?.errors?.name && <span style={styles.fieldError}>{state.errors.name[0]}</span>}
              </div>

              <div style={styles.inputGroupHalf}>
                <label htmlFor="admin-email" style={styles.label}>E-MAIL</label>
                <input
                  id="admin-email"
                  type="email"
                  name="email"
                  placeholder="Ex: anajulia@email.com"
                  style={styles.input}
                  required
                />
                {state?.errors?.email && <span style={styles.fieldError}>{state.errors.email[0]}</span>}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroupHalf}>
                <label htmlFor="admin-pass" style={styles.label}>SENHA PROVISÓRIA</label>
                <input
                  id="admin-pass"
                  type="password"
                  name="pass"
                  placeholder="Digite uma senha inicial..."
                  style={styles.input}
                  required
                />
                {state?.errors?.pass && <span style={styles.fieldError}>{state.errors.pass[0]}</span>}
              </div>
            </div>

            <button type="submit" disabled={isPending} style={styles.submitButton}>
              {isPending ? 'Cadastrando...' : 'Cadastrar'}
            </button>

          </form>

          <div style={styles.card}>
            <h2 style={styles.tableCardTitle}>MEMBROS DA EQUIPE</h2>
            {membersError && <p role="alert" style={styles.errorMessage}>{membersError}</p>}

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
                  {isLoadingMembers ? (
                    <tr><td colSpan={3} style={styles.tdAccess}>Carregando equipe...</td></tr>
                  ) : membersError ? null : usuarios.length === 0 ? (
                    <tr><td colSpan={3} style={styles.tdAccess}>Nenhum administrador cadastrado.</td></tr>
                  ) : usuarios.map((user) => (
                    <tr key={user.id} style={styles.tableBodyRow}>
                      <td style={styles.tdName}>{user.name}</td>
                      <td style={styles.tdAccess}>{formatLastAccess(user.lastAccess)}</td>
                      <td style={styles.tdPublications}>{user.totalPublications}</td>
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
  successMessage: {
    margin: 0,
    color: "#166534",
    textAlign: "center",
    fontSize: "14px",
  },
  errorMessage: {
    margin: 0,
    padding: "12px 16px",
    borderLeft: "4px solid #b91c1c",
    backgroundColor: "#fef2f2",
    color: "#7f1d1d",
    fontSize: "14px",
  },
  fieldError: {
    color: "#b91c1c",
    fontSize: "12px",
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