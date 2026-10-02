import Footer from "@/components/Footer";
import NavbarACAJU from "@/components/Navbar";
import CardPublicacao from "@/components/CardPublicacao";

export default function NoticiasPage() {
  const noticiaExemplo = {
    id: "1",
    title: "ACAJU realiza mutirão de limpeza no Dia Internacional dos Oceanos",
    content: "A comunidade caiçara do Porto Novo se reuniu para recolher resíduos das margens do Rio Juqueriquerê...",
    coverImage: "",
  };

  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <main style={styles.mainContent}>
        <CardPublicacao item={noticiaExemplo} basePath="/noticias" />
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
    padding: "50px 20px 80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    boxSizing: "border-box",
    flexGrow: 1,
  },
};