const fieldLabels = {
  title: "Título ou nome",
  content: "Conteúdo",
  coordinator: "Coordenador",
  objective: "Objetivo",
  bodyContent: "Texto detalhado",
  videoUrl: "Link do vídeo",
  requiresReview: "Solicitação de análise",
  name: "Nome",
  type: "Tipo",
  date: "Data",
  time: "Horário",
  location: "Local",
  environment: "Ambiente",
  description: "Descrição",
  coverImage: "Imagem de capa",
  file: "Arquivo PDF",
};

export default function FormFeedback({ state }) {
  const fieldErrors = Object.entries(state?.errors ?? {}).flatMap(([field, messages]) =>
    (Array.isArray(messages) ? messages : [messages]).filter(Boolean).map((message, index) => ({
      field,
      message,
      index,
    })),
  );
  const summary = state?.error || state?.message;

  if (!summary && fieldErrors.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        width: "100%",
        padding: "12px 16px",
        borderLeft: "4px solid #b91c1c",
        backgroundColor: "#fef2f2",
        color: "#7f1d1d",
        boxSizing: "border-box",
      }}
    >
      {summary && <p style={{ margin: 0 }}>{summary}</p>}
      {fieldErrors.length > 0 && (
        <ul style={{ margin: summary ? "8px 0 0" : 0, paddingLeft: "20px" }}>
          {fieldErrors.map(({ field, message, index }) => (
            <li key={`${field}-${index}`}>
              <strong>{fieldLabels[field] ?? field}:</strong> {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}