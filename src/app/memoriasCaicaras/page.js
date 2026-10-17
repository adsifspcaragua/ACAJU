import React from "react";
import Link from "next/link";
import NavbarACAJU from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MemoriasPage() {
  const memorias = [
    {
      id: "seu-ze",
      nome: "Seu Zé do Rio",
      papel: "Ancião & Pescador Artesanal",
      citacao: "O rio conversa com a gente quando a gente aprende a escutar em silêncio.",
      resumo: "Nasceu às margens do Juqueriquerê e dedicou mais de 60 anos à pesca artesanal. Guardião dos saberes da lida com o tainhão e Mestre do arrasto caiçara.",
      foto: "/images/memorias/seu-ze.jpg",
    },
    {
      id: "dona-maria",
      nome: "Dona Maria Caiçara",
      papel: "Guardiã de Tradições & Culinarista",
      citacao: "A farinha boa é aquela feita com amor e cantoria no forno de lenha.",
      resumo: "Cresceu ouvindo as histórias do porto e aprendeu desde criança a fazer farinha de mandioca e bolo de tapioca. Fundou o grupo de folia de reis do bairro Porto Novo.",
      foto: "/images/memorias/dona-maria.jpg",
    },
    {
      id: "mestre-benedito",
      nome: "Mestre Benedito Canoeiro",
      papel: "Mestre Artesão de Canoas",
      citacao: "Cada guapuruvu tem uma canoa dentro dele; o artesão só tira o excesso.",
      resumo: "Escultor de canoas de um pau só, Mestre Benedito mantém viva a arte ancestral de esculpir embarcações em troncos caídos na mata.",
      foto: "/images/memorias/mestre-benedito.jpg",
    },
  ];

  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>DEPOIMENTOS & HISTÓRIAS VIVAS</span>
          <h1 style={styles.heroTitle}>Memórias Caiçaras</h1>
          <p style={styles.heroSubtitle}>
            Histórias, vozes e saberes daqueles que guardam a identidade do nosso território e do Rio Juqueriquerê.
          </p>
        </div>
      </section>

      <main style={styles.mainContent}>
        <div style={styles.gridContainer}>
          {memorias.map((p) => (
            <div key={p.id} style={styles.cardMemoria}>
              <div style={styles.avatarContainer}>
                <div 
                  style={{
                    ...styles.avatarImage,
                    backgroundImage: `url(${p.foto || '/images/avatar-placeholder.jpg'})`
                  }} 
                />
              </div>

              <div style={styles.cardHeader}>
                <span style={styles.papelBadge}>{p.papel}</span>
                <h2 style={styles.nomeText}>{p.nome}</h2>
              </div>

              <blockquote style={styles.quoteBox}>
                “{p.citacao}”
              </blockquote>

              <p style={styles.resumoText}>{p.resumo}</p>

              <Link href={`/memorias/${p.id}`} style={styles.btnOuvirHistoria}>
                Ouvir a história completa &rarr;
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f8f5f0",
    display: "flex",
    flexDirection: "column",
  },
  heroSection: {
    backgroundColor: "#740405",
    color: "#ffffff",
    textAlign: "center",
    paddingTop: "140px",
    paddingBottom: "60px",
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
    gap: "12px",
  },
  heroBadge: {
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "2px",
    color: "rgba(255, 255, 255, 0.8)",
  },
  heroTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  heroSubtitle: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "rgba(255, 255, 255, 0.9)",
    margin: 0,
    fontWeight: "300",
  },
  mainContent: {
    maxWidth: "1050px",
    width: "100%",
    margin: "0 auto",
    padding: "60px 20px 100px 20px",
    boxSizing: "border-box",
    flexGrow: 1,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
  },
  cardMemoria: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "36px 28px 28px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(116, 4, 5, 0.06)",
    border: "1px solid rgba(116, 4, 5, 0.08)",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  avatarContainer: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    padding: "4px",
    backgroundColor: "#ffffff",
    border: "2px solid #740405",
    marginBottom: "16px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#e5e7eb",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    marginBottom: "16px",
  },
  papelBadge: {
    fontSize: "11px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#740405",
    backgroundColor: "#f2e8e3",
    padding: "4px 12px",
    borderRadius: "12px",
  },
  nomeText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#222222",
    margin: "6px 0 0 0",
  },
  quoteBox: {
    fontSize: "15px",
    fontStyle: "italic",
    color: "#740405",
    lineHeight: "1.5",
    margin: "0 0 16px 0",
    padding: "0 10px",
    fontWeight: "500",
  },
  resumoText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#555555",
    margin: "0 0 24px 0",
    flexGrow: 1,
  },
  btnOuvirHistoria: {
    color: "#740405",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    borderBottom: "1.5px solid #740405",
    paddingBottom: "2px",
    transition: "opacity 0.2s",
  },
};