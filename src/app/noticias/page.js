import Footer from "@/components/Footer";
import NavbarACAJU from "@/components/Navbar";
import NoticiasList from "@/components/NoticiasList";
import { getAllNoticias } from "@/services/admServies";

export default async function NoticiasPage() {
  const noticias = await getAllNoticias();

  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>FIQUE POR DENTRO</span>
          <h1 style={styles.heroTitle}>Notícias</h1>
        </div>
      </section>

      <main style={styles.mainContent}>
        <NoticiasList noticias={noticias} />
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
  heroSection: {
    backgroundColor: "#740405",
    color: "#ffffff",
    textAlign: "center",
    paddingTop: "125px",
    paddingBottom: "42px",
    paddingLeft: "20px",
    paddingRight: "20px",
    width: "100%",
    boxSizing: "border-box",
  },
  heroContent: {
    maxWidth: "700px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  heroBadge: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "700",
    margin: 0,
  },
  mainContent: {
    maxWidth: "950px",
    width: "100%",
    margin: "0 auto",
    padding: "36px 20px 80px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    boxSizing: "border-box",
    flexGrow: 1,
  },
};