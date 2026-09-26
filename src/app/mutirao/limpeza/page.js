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

  definitionCard: {
    backgroundColor: "#8C1717",
    color: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    marginBottom: "40px",
    boxShadow: "0 8px 24px rgba(140, 23, 23, 0.2)",
  },

  definitionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 20px 0",
  },

  definitionText: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#ffffff",
    margin: "0 0 15px 0",
  },

  definitionSource: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },

  subtituloSecao: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#8C1717",
    margin: "40px 0 20px 0",
  },

  paragraph: {
    fontSize: "18px",
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

  borderedQuote: {
    backgroundColor: "#f2ebd9",
    padding: "35px 40px",
    borderLeft: "4px solid #8C1717",
    borderRadius: "0 8px 8px 0",
    margin: "15px 0 35px 0",
  },
  
  borderedQuoteText: {
    fontSize: "18px",
    fontStyle: "italic",
    color: "#8C1717",
    lineHeight: "1.6",
    margin: 0,
    textAlign: "justify",
  },

  referenceBox: {
    backgroundColor: "#faf6f7",
    padding: "30px",
    borderRadius: "8px",
    margin: "40px 0 30px 0",
  },

  referenceTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: "10px",
  },

  referenceText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#666666",
    margin: "0 0 5px 0",
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

export default function MutiraoLimpeza() {
  return (
    <div style={styles.container}>
      <Navbar />

      <section style={styles.secaoDestaque}>
        <div style={styles.subtituloDestaque}>AÇÃO COLETIVA</div>
        <h1 style={styles.tituloDestaque}>Mutirão de Limpeza</h1>
      </section>

      <main style={styles.mainContent}>
        
        <div style={styles.definitionCard}>
          <h2 style={styles.definitionTitle}>O que é Mutirão?</h2>
          <p style={styles.definitionText}>
            <strong>mu·ti·rão</strong> — substantivo masculino. Trabalho que se faz coletivamente, para ajudar de maneira 
            gratuita, especialmente no meio rural, buscando melhorias na comunidade.
          </p>
          <p style={styles.definitionSource}>
            Do Tupi-Guarani, da palavra <em>"motyrõ"</em>, que significa "reunião para a colheita ou construção" ou simplesmente 
            "trabalho em comum" (Carneiro, 1957).
          </p>
        </div>

        <p style={styles.paragraph}>
          A filosofia caiçara entende e ensina que os outros são seres humanos como nós. E além dos 
          humanos, são compreendidos como Outros, <em>"os bichos (insetos, peixes, camarões, gatos, 
          sapos, cachorros e muitos outros)"</em>. Os outros são também <em>"as plantas (árvores, flores, 
          vegetação de manguezais, vegetação de restinga, as matas e outras)"</em>.
        </p>

        <p style={styles.paragraph}>
          Uma maneira de se estabelecer essa relação entre nós e os outros é nos organizarmos em 
          mutirão. Mutirão é uma forma de organização utilizada pelas culturas tradicionais para 
          efetuar diferentes atividades. A ideia é juntar muita gente para um trabalho e festa coletiva. A 
          cultura caiçara sempre se utilizou do mutirão para fazer roça, construir casa, pescar, limpar 
          as ruas e organizar o seu lugar para a celebração da vida que ali é vivida.
        </p>

        <h2 style={styles.subtituloSecao}>Mutirão de Limpeza na ACAJU</h2>

        <p style={styles.paragraph}>
          Ao longo da história de vida da ACAJU muitos mutirões de limpeza foram organizados: de 
          limpeza de rio, de limpeza de mangue e de limpeza de praia. Por serem o que exigem menor 
          complexidade logística, os mutirões de limpeza de praia são os que ocorrem com maior 
          frequência.
        </p>

        <p style={styles.paragraph}>
          Geralmente fazemos um chamamento à comunidade e construímos juntos uma agenda a 
          atender diferentes setores — por exemplo, já virou tradição da comunidade caiçara do Porto 
          Novo (Caraguatatuba) e da Enseada (São Sebastião), com esforços da ACAJU e do Instituto 
          Terra e Mar, a participação do <strong style={styles.boldHighlight}>Dia Internacional de Limpeza dos Oceanos</strong>, geralmente 
          celebrado no terceiro sábado do mês de setembro.
        </p>

        <p style={styles.paragraph}>
          Com isso, as ações de limpeza da praia em direção à boca do rio Juqueriquerê ocorrem de 
          lado a lado, conectando e confluindo nosso modo de cuidar das águas beira mar, beira rio 
          que são os bens comuns do caiçara.
        </p>

        <div style={styles.borderedQuote}>
          <p style={styles.borderedQuoteText}>
            "Entendemos esse dia como uma oportunidade de promover a conscientização sobre a poluição 
            dos oceanos e a importância de remover lixos de rios e praias, e visibilizar o cotidiano da 
            população de modo a provocar governos para a implantação, garantia e ampliação de políticas 
            públicas de salvaguardo dos ecossistemas costeiros."
          </p>
        </div>

        <div style={styles.referenceBox}>
          <div style={styles.referenceTitle}>Referências</div>
          <p style={styles.referenceText}>
            CALDEIRA, Clóvis. <em>Mutirão: formas de ajuda mútua no meio rural</em>. São Paulo: Companhia Editora Nacional, 1956.
          </p>
          <p style={styles.referenceText}>
            CARNEIRO, Edson. <em>A Sabedoria Popular</em>. Rio de Janeiro: Instituto Nacional do Livro, 1957.
          </p>
        </div>

        <a href="/mutirao/plantio" style={styles.buttonLink}>
          Ver também: Mutirão de Plantio →
        </a>

      </main>

      <Footer />
    </div>
  );
}