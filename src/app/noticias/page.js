import Footer from "@/components/Footer";
import NavbarACAJU from "@/components/Navbar";
import CardPublicacao from "@/components/CardPublicacao";

export default function NoticiasPage() {

  const noticias = [
    {
      id: "1",
      title: "ACAJU realiza mutirão de limpeza no Dia Internacional dos Oceanos",
      content: "A comunidade caiçara do Porto Novo se reuniu para recolher resíduos das margens do Rio Juqueriquerê...",
      coverImage: "",
    },
  ];

  const LIMITE_POR_PAGINA = 6;

  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <main style={styles.mainContent}>
        {noticias.map((item) => (
          <CardPublicacao key={item.id} item={item} basePath="/noticias" />
        ))}

        {noticias.length > LIMITE_POR_PAGINA && (
          <div style={styles.paginationContainer}>
            <button style={styles.btnProximaPagina}>
              Próxima página &rarr;
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#faf8f5",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    maxWidth: "950px",
    width: "100%",
    margin: "0 auto",
    padding: "130px 20px 80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    boxSizing: "border-box",
    flexGrow: 1,
  },
  paginationContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  btnProximaPagina: {
    backgroundColor: "#8C1717",
    color: "#ffffff",
    border: "none",
    padding: "12px 28px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
};