import React from "react";
import Link from "next/link";
import NavbarACAJU from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function QuemSomosPage() {
  return (
    <div style={styles.container}>
      <NavbarACAJU />

      <section style={styles.heroSection}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroTitleContainer}>
          <h1 style={styles.heroTitle}>Quem Somos</h1>
        </div>
      </section>

      <main style={styles.mainContent}>
        <div style={styles.quoteCardHeader}>
          <h2 style={styles.quoteHeaderTitle}>"Arrelá, primas! Arrelá, primos!"</h2>
          <p style={styles.quoteHeaderSubtitle}>Antiga e afetuosa saudação caiçara</p>
        </div>

        <div style={styles.textBlock}>
          <p style={styles.paragraph}>
            Com essa antiga e afetuosa saudação caiçara, abrimos as portas de casa e nossos corações para contar quem são os caiçaras beiradeiros do maior rio navegável do litoral norte paulista.
          </p>
          <p style={styles.paragraph}>
            Somos a <strong style={styles.highlightText}>ASSOCIAÇÃO CAIÇARA JUQUERIQUERÊ (ACAJU)</strong>, uma entidade civil, dotada de personalidade jurídica de direito privado, destinada a fins de interesse da cultura caiçara e do Rio Juqueriquerê, sem fins lucrativos, fundada no dia <strong style={styles.highlightText}>22 de maio de 2000</strong>, com sede na Rua Izamira Pinto Santana, nº 560, no bairro Porto Novo, em Caraguatatuba, estado de São Paulo.
          </p>
          <p style={styles.paragraph}>
            Constituída por prazo indeterminado, sem fins econômicos, sem cunho político partidário, com a finalidade de atender a todos a que a ela se associem, independente da classe social, nacionalidade, sexo, raça, cor e crença.
          </p>
        </div>

        <div style={styles.quoteCardSide}>
          <p style={styles.quoteSideText}>
            "Somos, também, sonhadores. Sonhamos com uma sociedade mais justa e integrada com a natureza. Espalhamos os conhecimentos caiçara sobre seus territórios para protegê-los e cuidá-los."
          </p>
        </div>
        <p style={styles.captionText}>
          Texto retirado da cartilha de Educação Ambiental, <em>"Rio Juqueriquerê: cultura, natureza e clima"</em> — editada pela ACAJU e produzida pelos pesquisadores Silvia Regina Paes e Eduardo Gonçalves Ueda.
        </p>

        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.infoCardLabel}>FUNDAÇÃO</span>
            <span style={styles.infoCardValue}>22 de maio de 2000</span>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoCardLabel}>SEDE</span>
            <span style={styles.infoCardValue}>Porto Novo, Caraguatatuba — SP</span>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoCardLabel}>NATUREZA JURÍDICA</span>
            <span style={styles.infoCardValue}>Entidade civil sem fins lucrativos</span>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.infoCardLabel}>ATUAÇÃO</span>
            <span style={styles.infoCardValue}>Cultura caiçara e Rio Juqueriquerê</span>
          </div>
        </div>

        <div style={styles.certificacoesSection}>
          <h2 style={styles.sectionTitle}>Certificações Federais</h2>
          <p style={styles.paragraph}>
            A ACAJU, enquanto organização civil, também tem certificação do governo federal como <strong>Ponto de Cultura</strong> e <strong>Ponto de Memória</strong>:
          </p>

          <div style={styles.certCard}>
            <h3 style={styles.certCode}>PdC</h3>
            <h4 style={styles.certName}>Ponto de Cultura</h4>
            <p style={styles.certText}>
              Os Pontos de Cultura constituem o eixo estruturante da Política Nacional de Cultura Viva (PNCV). São initiatives culturais de base comunitária reconhecidas pelo Estado por sua atuação contínua nos territórios, por sua capacidade de articulação social e por sua contribuição para a garantia dos direitos culturais.
            </p>
            <p style={styles.certText}>
              A política beneficia a sociedade em geral e, prioritariamente, povos, grupos, comunidades e populações em situação de vulnerabilidade social, com acesso reduzido aos meios de produção, registro, fruição e difusão cultural, especialmente quando seus direitos humanos, sociais, culturais ou sua identidade cultural estão ameaçados.
            </p>
          </div>

          <div style={styles.certCard}>
            <h3 style={styles.certCode}>PdM</h3>
            <h4 style={styles.certName}>Ponto de Memória</h4>
            <p style={styles.certText}>
              A certificação como Ponto de Memória é a titulação concedida pelo Instituto Brasileiro de Museus (Ibram), nos termos da Portaria Ibram nº 4.037, de 5 de maio de 2026, a entidades e coletivos culturais que atendam aos requisitos do Programa Pontos de Memória.
            </p>
            <p style={styles.certText}>
              Podem ser certificados grupos que atuem na identificação, no registro, na pesquisa, na preservação e na difusão do patrimônio e das referências culturais de diferentes comunidades, contribuindo para a valorização da memória social por meio de ações de museologia social, gestão participativa e vínculo com seu território.
            </p>
            <p style={styles.certText}>
              Os certificados passam a integrar o Cadastro Nacional de Pontos de Memória, ficam habilitados a participar das políticas públicas vinculadas ao programa e ampliam suas possibilidades de articulação com outras instituições e redes de museologia social.
            </p>
          </div>
        </div>

        <div style={styles.actionsContainer}>
          <Link href="/projetos" style={styles.btnPrimary}>
            Ver nossos projetos
          </Link>
          <Link href="/miniMuseu/casa-caicara" style={styles.btnOutline}>
            Visitar o Mini-Museu
          </Link>
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
    position: "relative",
    width: "100%",
    height: "360px",
    backgroundImage: "url('/images/barcos-caicara.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "105px",
    boxSizing: "border-box",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    zIndex: 1,
  },
  heroTitleContainer: {
    position: "relative",
    zIndex: 2,
    backgroundColor: "#740405",
    padding: "16px 48px",
    borderRadius: "2px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  heroTitle: {
    fontSize: "38px",
    fontWeight: "bold",
    color: "#ffffff",
    margin: 0,
    letterSpacing: "-0.5px",
    textAlign: "center",
  },
  mainContent: {
    maxWidth: "860px",
    width: "100%",
    margin: "0 auto",
    padding: "60px 20px 100px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    boxSizing: "border-box",
    color: "#2c2c2c",
    fontFamily: "'Poppins', sans-serif",
  },
  quoteCardHeader: {
    backgroundColor: "#740405",
    color: "#ffffff",
    padding: "36px 24px",
    textAlign: "center",
    borderRadius: "2px",
  },
  quoteHeaderTitle: {
    fontSize: "26px",
    fontStyle: "italic",
    fontWeight: "500",
    margin: "0 0 8px 0",
  },
  quoteHeaderSubtitle: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: 0,
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#333333",
    margin: 0,
  },
  highlightText: {
    color: "#740405",
  },
  quoteCardSide: {
    backgroundColor: "#f2e8e3",
    borderLeft: "4px solid #740405",
    padding: "24px 28px",
    borderRadius: "0 4px 4px 0",
    marginTop: "8px",
  },
  quoteSideText: {
    fontSize: "16px",
    fontStyle: "italic",
    color: "#740405",
    lineHeight: "1.6",
    margin: 0,
    fontWeight: "500",
  },
  captionText: {
    fontSize: "12px",
    color: "#666666",
    marginTop: "-16px",
    lineHeight: "1.5",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "16px",
    marginBottom: "24px",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: "20px 24px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  },
  infoCardLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "#740405",
  },
  infoCardValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#222222",
  },
  certificacoesSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginTop: "16px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#740405",
    margin: 0,
  },
  certCard: {
    backgroundColor: "#f2e8e3",
    borderLeft: "4px solid #740405",
    padding: "32px 36px",
    borderRadius: "0 4px 4px 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  certCode: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#740405",
    margin: 0,
  },
  certName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#740405",
    margin: "0 0 8px 0",
  },
  certText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#740405",
    margin: 0,
  },
  actionsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
  },
  btnPrimary: {
    backgroundColor: "#740405",
    color: "#ffffff",
    padding: "12px 28px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#740405",
    border: "1.5px solid #740405",
    padding: "12px 28px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block",
  },
};