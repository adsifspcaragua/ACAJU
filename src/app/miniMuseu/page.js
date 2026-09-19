import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f8f5f0", 
    margin: 0,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333333",
  },
  
  secaoDestaque: {
    backgroundColor: "#6A3143", 
    color: "#ffffff",
    textAlign: "center",
    padding: "120px 20px",
  },

  subtituloDestaque: {
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: "15px",
    marginTop: "5%"
  },
  
  tituloDestaque: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "-0.5px",
  },

  mainContent: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "900px", 
    margin: "0 auto",
    padding: "50px 20px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  },
  
  imagemDestaque: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "20px",
    display: "block",
  },

  paragraph: {
    fontSize: "16px",
    lineHeight: "1.8",
    margin: "0 0 25px 0",
    color: "#4A4A4A",
    textAlign: "justify",
  },
  
  boldHighlight: {
    fontWeight: "bold",
    color: "#6A3143",
  },

  quoteBox: {
    backgroundColor: "#f2ebd9",
    padding: "35px 40px",
    borderRadius: "8px",
    margin: "10px 0 30px 0",
  },
  
  quoteText: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#6A3143",
    lineHeight: "1.6",
    margin: 0,
  },

  actionCard: {
    backgroundColor: "#6A3143",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    marginTop: "20px",
    boxShadow: "0 8px 24px rgba(106, 49, 67, 0.15)",
  },
  
  actionTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    margin: "0 0 15px 0",
  },
  
  actionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "30px",
    margin: "0 0 30px 0",
  },
  
  actionLink: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#ffffff",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  }
};

export default function CasaCaicara() {
  return (
    <div style={styles.container}>

      <Navbar />

      <section style={styles.secaoDestaque}>
        <div style={styles.subtituloDestaque}>PATRIMÔNIO CAIÇARA</div>
        <h1 style={styles.tituloDestaque}>Casa Caiçara Mini Museu</h1>
      </section>

      <main style={styles.mainContent}>
        
        <img 
          src="/image_402602.jpg" 
          alt="Mãos segurando terra e muda" 
          style={styles.imagemDestaque} 
        />

        <p style={styles.paragraph}>
          A <strong style={styles.boldHighlight}>Casa Caiçara Mini Museu</strong> é um dos projetos da ACAJU com objetivo de salvaguardar as
          narrativas históricas e antropológicas da comunidade do Porto Novo e do modo de vida
          caiçara do litoral norte paulista. Tal como o nome sugere, a Casa Caiçara é um museu
          pequenino, ao mesmo tempo familiar e comunitário. Nasceu dos sonhos, mutirões, causos e
          festas das famílias beiradeiras do rio Juqueriquerê.
        </p>

        <p style={styles.paragraph}>
          Do ponto de vista da pesquisa ação, a Casa Caiçara Mini Museu é também uma experiência
          de museologia social, dialógica, compartilhada, viva e horizontalizada, onde a comunidade
          se reconhece e se compromete a participar do inventário de sua própria experiência de vida.
          Com isso, o museu pretende contar e recontar causos, arcabouço da filosofia caiçara e de
          envolvimento do povo com a natureza, de intimidade com a cultura local e relacionada com
          os bichos, plantas, pedras e outras gentes de muito valor.
        </p>

        <div style={styles.quoteBox}>
          <p style={styles.quoteText}>
            "Avizinhado à Casa Caiçara vivem os guaiamuns, as garças, os socós, as saracuras, as
            galinhas do mangue, os cachorros do mato, as capivaras, e tantos outros mais que
            humanos."
          </p>
        </div>

        <p style={styles.paragraph}>
          Outro ilustre vizinho e idealizador do nosso pequenino museu é o <strong style={styles.boldHighlight}>mestre caiçara Seu Pedro
          Paes</strong>, responsável pelo plantio de mangue branco e de erva baleeira, e outras espécies
          nativas que ajudam a compor a paisagem que avistamos da porta da Casa Caiçara.
        </p>

        <p style={styles.paragraph}>
          O projeto em execução desde setembro de 2025 foi possível porque houve muito trabalho e
          reconhecimento desse trabalho junto ao <strong style={styles.boldHighlight}>Fundo Brasileiro de Educação Ambiental (Funbea)</strong>,
          que apoiou a ACAJU com formação e recursos financeiros por meio da Chamada Pública de
          2024: Justiça e Educação Ambiental Climática.
        </p>

        <div style={styles.actionCard}>
          <h2 style={styles.actionTitle}>Inventário Participativo</h2>
          <p style={styles.actionText}>
            O Inventário Participativo é um registro coletivo do patrimônio cultural imaterial caiçara, feito pela
            comunidade, para a comunidade. Fundamentado na museologia social, é uma das práticas
            centrais da Casa Caiçara Mini Museu.
          </p>
          <a href="#" style={styles.actionLink}>
            Participar do Inventário <span>→</span>
          </a>
        </div>
      </main>

      <Footer />

    </div>
  );
}