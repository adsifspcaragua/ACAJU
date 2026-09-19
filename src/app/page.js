import Link from "next/link";
import Footer from "../components/Footer";
import NavbarACAJU from "../components/Navbar";

export default function Home() {
  return (
    <div style={styles.page}>
      <NavbarACAJU />
      
      <main style={styles.mainContent}>

      </main>

      <Footer />
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", 
    margin: 0,
    padding: 0, 
    boxSizing: "border-box",
  },
  mainContent: {
    flexGrow: 1, 
  },
};