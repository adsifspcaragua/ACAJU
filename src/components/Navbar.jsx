"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import '@/app/globals.css';

export default function NavbarACAJU() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  
  // Estados para controle de responsividade e menu mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Monitora o tamanho da tela para alternar entre Desktop e Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setIsMobileMenuOpen(false); // Fecha o menu mobile se voltar para desktop
      }
    };
    
    // Executa na montagem
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Manipuladores para os menus desktop
  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  // Manipulador para o sanfona (accordion) do mobile
  const toggleAccordion = (menu) => {
    setOpenAccordion(openAccordion === menu ? null : menu);
  };

  return (
    <div style={styles.wrapper}>
      {/* BARRA SUPERIOR (TOP BAR) - Oculta no mobile para evitar quebra de layout */}
      {!isMobile && (
        <div style={styles.topBar}>
          <div style={styles.topBarLeft}>
            <span style={styles.topBarItem}>
              📞 12 3897-5660
            </span>
            <span style={styles.topBarItem}>
              🕒 Segunda à Sexta — 9h às 17h
            </span>
          </div>
          <div style={styles.topBarRight}>
             <Link href="/admin/login" style={styles.topBarItem}>
              <span style={styles.servidorText}>SERVIDOR</span>
            </Link>
            <span style={styles.divider}>|</span>
            <div style={styles.socialIcons}>
              <span style={styles.icon}>f</span>
              <span style={styles.icon}>📷</span>
              <span style={styles.icon}>▶</span>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR PRINCIPAL (Base) */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoAc}>AC</span>
          <span style={styles.logoText}>ACAJU</span>
        </div>

        {/* CONTROLE DE EXIBIÇÃO: Desktop (Lista) ou Mobile (Hambúrguer) */}
        {isMobile ? (
          <div 
            style={styles.hamburgerBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </div>
        ) : (
          <nav>
            <ul style={styles.navList}>
              <li style={styles.navItem}>Quem Somos</li>

              {/* MINI-MUSEU DESKTOP */}
              <li 
                style={styles.navItemContainer}
                onMouseEnter={() => handleMouseEnter('mini-museu')}
                onMouseLeave={handleMouseLeave}
              >
                <span style={styles.navItem}>Mini-Museu ˅</span>
                {activeMenu === 'mini-museu' && (
                  <ul style={styles.dropdownMenu}>
                    <li 
                      style={hoveredSubItem === 'casa' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('casa')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      A Casa Caiçara
                    </li>
                    <li 
                      style={hoveredSubItem === 'inventario-mini' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('inventario-mini')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Inventário
                    </li>
                  </ul>
                )}
              </li>

              <li style={styles.navItem}>Notícias</li>
              <li style={styles.navItem}>Projetos</li>

              {/* MUTIRÃO DESKTOP */}
              <li 
                style={styles.navItemContainer}
                onMouseEnter={() => handleMouseEnter('mutirao')}
                onMouseLeave={handleMouseLeave}
              >
                <span style={styles.navItem}>Mutirão ˅</span>
                {activeMenu === 'mutirao' && (
                  <ul style={styles.dropdownMenu}>
                    <li 
                      style={hoveredSubItem === 'limpeza' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('limpeza')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Limpeza
                    </li>
                    <li 
                      style={hoveredSubItem === 'plantio' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('plantio')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Plantio
                    </li>
                  </ul>
                )}
              </li>

              <li style={styles.navItem}>Memórias Caiçaras</li>
              <li style={styles.navItem}>Institucional</li>

              {/* FALE CONOSCO DESKTOP */}
              <li 
                style={styles.navItemContainer}
                onMouseEnter={() => handleMouseEnter('fale-conosco')}
                onMouseLeave={handleMouseLeave}
              >
                <span style={styles.navItem}>Fale Conosco ˅</span>
              </li>

              {/* PARTICIPE DESKTOP */}
              <li 
                style={styles.navItemContainer}
                onMouseEnter={() => handleMouseEnter('participe')}
                onMouseLeave={handleMouseLeave}
              >
                <span style={styles.navItem}>Participe ˅</span>
                {activeMenu === 'participe' && (
                  <ul style={styles.dropdownMenu}>
                    <li 
                      style={hoveredSubItem === 'doacoes' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('doacoes')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Doações
                    </li>
                    <li 
                      style={hoveredSubItem === 'inventario-part' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('inventario-part')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Inventário Participativo
                    </li>
                    <li 
                      style={hoveredSubItem === 'trocas' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('trocas')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      Trocas
                    </li>
                  </ul>
                )}
              </li>

            </ul>
          </nav>
        )}
      </header>

      {/* OVERLAY DO MENU MOBILE (Tela Cheia) */}
      {isMobile && isMobileMenuOpen && (
        <div style={styles.mobileOverlay}>
          {/* Cabeçalho do Mobile */}
          <div style={styles.mobileHeader}>
            <div style={styles.logoAc}>AC</div>
            <div 
              style={styles.closeBtn} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </div>
          </div>

          {/* Lista Vertical de Links Mobile */}
          <div style={styles.mobileNavList}>
            <div style={styles.mobileNavItem}>Quem Somos</div>
            
            {/* MINI-MUSEU MOBILE */}
            <div style={styles.mobileAccordionGroup}>
              <div 
                style={styles.mobileNavItem} 
                onClick={() => toggleAccordion('mini-museu')}
              >
                <span>Mini-Museu</span>
                <span style={styles.accordionIcon}>{openAccordion === 'mini-museu' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'mini-museu' && (
                <div style={styles.mobileSubList}>
                  <div style={styles.mobileSubItem}>A Casa Caiçara</div>
                  <div style={styles.mobileSubItem}>Inventário</div>
                </div>
              )}
            </div>

            <div style={styles.mobileNavItem}>Notícias</div>
            <div style={styles.mobileNavItem}>Projetos</div>

            {/* MUTIRÃO MOBILE */}
            <div style={styles.mobileAccordionGroup}>
              <div 
                style={styles.mobileNavItem} 
                onClick={() => toggleAccordion('mutirao')}
              >
                <span>Mutirão</span>
                <span style={styles.accordionIcon}>{openAccordion === 'mutirao' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'mutirao' && (
                <div style={styles.mobileSubList}>
                  <div style={styles.mobileSubItem}>Limpeza</div>
                  <div style={styles.mobileSubItem}>Plantio</div>
                </div>
              )}
            </div>

            <div style={styles.mobileNavItem}>Memórias Caiçaras</div>
            <div style={styles.mobileNavItem}>Institucional</div>

            {/* FALE CONOSCO MOBILE */}
            <div style={styles.mobileAccordionGroup}>
              <div 
                style={styles.mobileNavItem} 
                onClick={() => toggleAccordion('fale-conosco')}
              >
                <span>Fale Conosco</span>
                <span style={styles.accordionIcon}>{openAccordion === 'fale-conosco' ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* PARTICIPE MOBILE */}
            <div style={styles.mobileAccordionGroup}>
              <div 
                style={styles.mobileNavItem} 
                onClick={() => toggleAccordion('participe')}
              >
                <span>Participe</span>
                <span style={styles.accordionIcon}>{openAccordion === 'participe' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'participe' && (
                <div style={styles.mobileSubList}>
                  <div style={styles.mobileSubItem}>Doações</div>
                  <div style={styles.mobileSubItem}>Inventário Participativo</div>
                  <div style={styles.mobileSubItem}>Trocas</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    zIndex: 9999,
    fontFamily: "'Poppins', sans-serif", 
  },
  topBar: {
    backgroundColor: "#5a1b2d",
    color: "#e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 50px",
    fontSize: "12px",
    letterSpacing: "0.5px",
    width: "100%",
    boxSizing: "border-box",
  },
  topBarLeft: {
    display: "flex",
    gap: "24px",
  },
  topBarItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none", 
    color: "inherit",
  },
  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  servidorText: {
    fontWeight: "600",
    cursor: "pointer",
  },
  divider: {
    color: "#9ca3af",
  },
  socialIcons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    fontSize: "14px",
  },
  navbar: {
    backgroundColor: "#70233b", 
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 50px",
    height: "70px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  logoAc: {
    backgroundColor: "#ffffff",
    color: "#70233b",
    padding: "4px 6px",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  logoText: {
    letterSpacing: "1px",
  },
  hamburgerBtn: {
    fontSize: "26px",
    color: "#ffffff",
    cursor: "pointer",
    userSelect: "none",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    alignItems: "center",
    gap: "28px",
  },
  navItemContainer: {
    position: "relative",
    height: "70px", 
    display: "flex",
    alignItems: "center",
  },
  navItem: {
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "opacity 0.2s",
  },
  dropdownMenu: {
    position: "absolute",
    top: "70px", 
    left: "0",
    backgroundColor: "#541527", 
    minWidth: "220px",
    listStyle: "none",
    margin: 0,
    padding: "10px 0",
    borderRadius: "0 0 6px 6px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
    zIndex: 100,
  },
  dropdownItem: {
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  dropdownItemHover: {
    backgroundColor: "#3a0e1a", 
  },
  
  // ==========================================
  // ESTILOS DO MENU MOBILE (OVERLAY TELA CHEIA)
  // ==========================================
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#70233b", // Fundo igual à referência
    zIndex: 100000, // Z-index máximo para cobrir toda a interface
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  mobileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
  },
  closeBtn: {
    fontSize: "26px",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mobileNavList: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 24px 40px 24px",
  },
  mobileAccordionGroup: {
    display: "flex",
    flexDirection: "column",
  },
  mobileNavItem: {
    padding: "20px 0",
    fontSize: "15px",
    fontWeight: "600",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)", // Linha separadora sutil
    cursor: "pointer",
  },
  accordionIcon: {
    fontSize: "12px",
    opacity: 0.8,
  },
  mobileSubList: {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Fundo levemente escurecido para submenus
    padding: "10px 20px",
    borderRadius: "8px",
    marginTop: "5px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  mobileSubItem: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#e5e7eb",
    cursor: "pointer",
  },
};