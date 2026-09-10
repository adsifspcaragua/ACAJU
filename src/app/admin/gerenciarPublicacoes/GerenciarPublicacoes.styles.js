export const getBadgeStyle = (cat) => {
  const baseStyle = {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  };

  switch (cat) {
    case 'Notícia':
      return { ...baseStyle, backgroundColor: '#e0f2fe', color: '#0369a1' };
    case 'Mutirão':
      return { ...baseStyle, backgroundColor: '#dcfce7', color: '#15803d' };
    case 'Projeto':
      return { ...baseStyle, backgroundColor: '#f3e8ff', color: '#7e22ce' };
    case 'Memória Caiçara':
      return { ...baseStyle, backgroundColor: '#fae8ff', color: '#a21caf' };
    case 'Mini-Museu':
      return { ...baseStyle, backgroundColor: '#ffedd5', color: '#c2410c' };
    case 'Documentos':
      return { ...baseStyle, backgroundColor: '#f1f5f9', color: '#475569' };
    default:
      return { ...baseStyle, backgroundColor: '#f3f4f6', color: '#374151' };
  }
};


export const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    margin: 0
  },
  mainContent: {
    flexGrow: 1,
    padding: "32px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  headerTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    width: "100%",
  },
  pageTitle: {
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "15px",
    margin: "6px 0 0 0",
  },
  welcomeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  tabsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: "8px",
    borderRadius: "10px",
    backdropFilter: "blur(8px)",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  filterIcon: {
    color: "rgba(255,255,255,0.7)",
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
  },
  tab: {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontWeight: "500",
    padding: "10px 18px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    fontSize: "14px",
  },
  tabActive: {
    background: "#f97316",
    border: "none",
    color: "#ffffff",
    fontWeight: "600",
    padding: "10px 18px",
    cursor: "pointer",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)",
    fontSize: "14px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
    width: "100%",
    maxWidth: "1200px",
    overflowX: "auto",
    boxSizing: "border-box",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  },
  th: {
    textAlign: "left",
    padding: "16px",
    borderBottom: "2px solid #e2e8f0",
    color: "#475569",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  thCenter: {
    textAlign: "center",
    padding: "16px",
    borderBottom: "2px solid #e2e8f0",
    color: "#475569",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
    transition: "background-color 0.2s ease",
  },
  tdTitle: {
    padding: "16px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
  },
  tdCenter: {
    padding: "16px",
    textAlign: "center",
  },
  tdCenterText: {
    padding: "16px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
  },
  actionBtnEdit: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    backgroundColor: "#f1f5f9",
    color: "#175d52",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  actionBtnDelete: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "38px",
    height: "38px",
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  actionGroup: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
};