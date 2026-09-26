import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f9f7f4", 
    margin: 0,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#333333",
  },
  
  secaoDestaque: {
    backgroundColor: "#8C1717", 
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

  bannerImageContainer: {
    width: "100%",
    marginBottom: "40px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },

  bannerImage: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
    maxHeight: "400px",
  },

  paragraph: {
    fontSize: "16px",
    lineHeight: "1.8",
    margin: "0 0 25px 0",
    color: "#4A4A4A",
    textAlign: "justify",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  },
  
  boldHighlight: {
    fontWeight: "bold",
    color: "#8C1717",
  },

  quoteBox: {
    backgroundColor: "#8C1717",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    margin: "20px 0 35px 0",
    boxShadow: "0 8px 24px rgba(140, 23, 23, 0.2)",
  },

  quoteText: {
    fontSize: "18px",
    fontStyle: "italic",
    lineHeight: "1.6",
    color: "#ffffff",
    margin: "0 0 20px 0",
  },

  quoteSource: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 0,
  },

  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    margin: "40px 0",
    justifyContent: "space-between",
  },

  infoCard: {
    flex: "1 1 250px",
    backgroundColor: "#ffffff",
    border: "1px solid #f0e6e6",
    borderRadius: "10px",
    padding: "30px 20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(140, 23, 23, 0.05)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cardIcon: {
    fontSize: "32px",
    marginBottom: "15px",
  },

  cardTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#8C1717",
    margin: "0 0 10px 0",
  },

  cardText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#666666",
    margin: 0,
  },

  buttonLink: {
    backgroundColor: "#b32d2d",
    color: "#ffffff",
    padding: "16px 32px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    transition: "background-color 0.2s",
  }
};

export default function MutiraoPlantio() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.secaoDestaque}>
        <div style={styles.subtituloDestaque}>RESTAURAÇÃO AMBIENTAL</div>
        <h1 style={styles.tituloDestaque}>Mutirão de Plantio</h1>
      </section>

      <main style={styles.mainContent}>
        
        {/* Substitua o src abaixo pelo caminho correto da sua imagem no Next.js (ex: /images/plantio-banner.jpg) */}
        <div style={styles.bannerImageContainer}>
          <img 
            src="/plantio-banner.jpg" 
            alt="Mãos segurando uma muda com terra" 
            style={styles.bannerImage} 
          />
        </div>

        <p style={styles.paragraph}>
          Recentemente, foi retomada a ação de plantio de mudas de espécies nativas, a partir do{' '}
          <strong style={styles.boldHighlight}>projeto Juqueriquerê Vivo da ACAJU</strong>. Para tanto, 
          realizamos um chamado por meio dos coletivos parceiros, como a RAPECCA, Associação Caraguatás, 
          Instituto Terra e Mar, LabTrop, Linhas do Mar e outros.
        </p>

        <p style={styles.paragraph}>
          Construímos como perspectiva que os biomas estão em plena conexão e as águas doces e 
          salgadas, confluindo ao sabor dos ventos, por isso entende-se que:
        </p>

        <div style={styles.quoteBox}>
          <p style={styles.quoteText}>
            "Também na praia se encontram as sementes que vieram de longe trazidas pelo mar 
            e aquelas sementes que vieram das matas e mangues, trazidas pelos ventos, águas, 
            aves e outros animais. No árido solo da praia estas sementes são selecionadas, 
            só germinam aquelas preparadas para este local. Assim, sementes de jundu, 
            coqueiros, marmeleiros, pitangueiras, araçás e toda a mata de restinga, repleta 
            de segredos se estabelece."
          </p>
          <p style={styles.quoteSource}>
            Cartilha "Rio Juqueriquerê: cultura, natureza e clima" — Silvia Regina Paes e Eduardo Gonçalves Ueda
          </p>
        </div>

        <p style={styles.paragraph}>
          Como vivemos um estágio de acelerada degradação ambiental, o mutirão de replantio de 
          espécies nativas busca realizar o contraponto do trabalho da natureza impactado com o 
          desenvolvimento econômico degradante.
        </p>

        <p style={styles.paragraph}>
          Em outras palavras, buscamos o espelhamento na experiência que a própria natureza 
          concede quanto ao processo de germinação e todos os seus agentes cultivadores, como as 
          aves e os ventos. Assim, geralmente, para que ocorra o mutirão pleiteamos a doação de 
          mudas dos hortos municipais e identificamos sementes e grãos que funcionem como adubo 
          verde — entre eles, destacamos o <strong style={styles.boldHighlight}>feijão guandu</strong> que 
          enriquece o solo com nitrogênio, melhora a sua fertilidade, controla gramíneas invasoras, 
          promove a descompactação do solo e reduz a erosão.
        </p>

        <div style={styles.cardsContainer}>
          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>🌿</div>
            <h3 style={styles.cardTitle}>Espécies nativas</h3>
            <p style={styles.cardText}>
              Restinga, mangue branco, erva baleeira e outras espécies da Mata Atlântica litorânea.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>🤝</div>
            <h3 style={styles.cardTitle}>Coletivos parceiros</h3>
            <p style={styles.cardText}>
              RAPECCA, Associação Caraguatás, Instituto Terra e Mar, LabTrop e Linhas do Mar.
            </p>
          </div>

          <div style={styles.infoCard}>
            <div style={styles.cardIcon}>🫘</div>
            <h3 style={styles.cardTitle}>Adubo verde</h3>
            <p style={styles.cardText}>
              Feijão guandu como aliado para melhorar o solo e apoiar o replantio.
            </p>
          </div>
        </div>

        <a href="/mutirao/limpeza" style={styles.buttonLink}>
          Ver também: Mutirão de Limpeza →
        </a>

      </main>

      <Footer />
    </div>
  );
}