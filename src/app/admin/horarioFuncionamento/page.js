"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import SideBarAdmin from "../../../components/SideBarAdmin";
import '@/app/admin/page.admin.css';
import FormFeedback from '@/components/FormFeedback';
import { getOperatingHoursAction, saveOperatingHoursAction } from '@/actions/admActions';

export default function HorarioFuncionamento() {
  const [state, formAction, isPending] = useActionState(saveOperatingHoursAction, null);
  const [hours, setHours] = useState({
    currentStatus: 'ABERTO',
    openingTime: '08:00',
    closingTime: '17:00',
    additionalNotes: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isActive = true;

    startTransition(async () => {
      try {
        const result = await getOperatingHoursAction();
        if (!isActive) return;
        if (result.hours) setHours(result.hours);
        setLoadError(result.error ?? '');
      } catch {
        if (isActive) setLoadError('Não foi possível carregar o horário atual. Os valores exibidos são apenas sugestões até salvar.');
      } finally {
        if (isActive) setIsLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div style={styles.container}>
      <SideBarAdmin />

      <main style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <div style={styles.header}>
            <h1 style={styles.pageTitle}>Horário de Funcionamento</h1>
            <div style={styles.welcomeBadge}>BEM-VINDO, ADMINISTRADOR</div>
          </div>
        </div>

        <form style={styles.card} action={formAction}>
          {state?.success ? (
            <output style={styles.successMessage}>{state.message}</output>
          ) : (
            <FormFeedback state={state} />
          )}
          {loadError && <p role="alert" style={styles.errorMessage}>{loadError}</p>}

          <div style={styles.inputGroupFull}>
            <label htmlFor="operating-status" style={styles.label}>STATUS ATUAL</label>
            <select 
              id="operating-status"
              name="currentStatus"
              value={hours.currentStatus}
              onChange={(event) => setHours((current) => ({ ...current, currentStatus: event.target.value }))}
              style={styles.select}
              required
            >
              <option value="ABERTO">Aberto para visitação</option>
              <option value="FECHADO">Fechado temporariamente</option>
              <option value="MANUTENCAO">Em manutenção</option>
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label htmlFor="opening-time" style={styles.label}>HORÁRIO DE ABERTURA</label>
              <input 
                id="opening-time"
                type="time" 
                name="openingTime"
                value={hours.openingTime}
                onChange={(event) => setHours((current) => ({ ...current, openingTime: event.target.value }))}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroupHalf}>
              <label htmlFor="closing-time" style={styles.label}>HORÁRIO DE FECHAMENTO</label>
              <input 
                id="closing-time"
                type="time" 
                name="closingTime"
                value={hours.closingTime}
                onChange={(event) => setHours((current) => ({ ...current, closingTime: event.target.value }))}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroupFull}>
            <label htmlFor="additional-notes" style={styles.label}>OBSERVAÇÕES ADICIONAIS</label>
            <textarea
              id="additional-notes"
              name="additionalNotes"
              value={hours.additionalNotes}
              onChange={(event) => setHours((current) => ({ ...current, additionalNotes: event.target.value }))}
              style={styles.textarea}
              rows={5}
            />
          </div>

          <button type="submit" style={styles.submitButton} disabled={isPending || isLoading}>
            {isPending ? 'Salvando...' : 'Salvar horário'}
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
  select: {
    width: "100%",
    height: "52px",
    padding: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#374151",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "#ffffff",
    fontFamily: "inherit",
    cursor: "pointer",
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
  errorMessage: {
    margin: 0,
    padding: "12px 16px",
    borderLeft: "4px solid #b91c1c",
    backgroundColor: "#fef2f2",
    color: "#7f1d1d",
    fontSize: "14px",
  },
  successMessage: {
    margin: 0,
    padding: "12px 16px",
    borderLeft: "4px solid #15803d",
    backgroundColor: "#f0fdf4",
    color: "#166534",
    fontSize: "14px",
  },
};