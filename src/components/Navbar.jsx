"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import '@/app/globals.css';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function NavbarACAJU() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [navJustify, setNavJustify] = useState("space-around");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setIsMobile(width < 1200);
      
      if (width >= 1200) {
        setIsMobileMenuOpen(false); 
      }

      if (width < 1400) {
        setNavJustify("space-between");
      } else {
        setNavJustify("space-around");
      }
    };
    
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  const toggleAccordion = (menu) => {
    setOpenAccordion(openAccordion === menu ? null : menu);
  };

  return (
    <div style={styles.wrapper}>
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
              <FaFacebook style={styles.icon} />
              <FaInstagram style={styles.icon} />
              <FaYoutube style={styles.icon} />
            </div>
          </div>
        </div>
      )}

      <header style={{ ...styles.navbar, justifyContent: navJustify }}>
        <Link href="/" style={styles.logoContainer}>
          <span style={styles.logoAc}>AC</span>
          <span style={styles.logoText}>ACAJU</span>
        </Link>

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
              <li style={styles.navItem}>
                <Link href="/quem-somos" style={styles.linkText}>Quem Somos</Link>
              </li>

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
                      <Link href="/miniMuseu" style={styles.linkText}>A Casa Caiçara</Link>
                    </li>
                    <li 
                      style={hoveredSubItem === 'inventario-mini' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('inventario-mini')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/inventario" style={styles.linkText}>Inventário</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li style={styles.navItem}>
                <Link href="/noticias" style={styles.linkText}>Notícias</Link>
              </li>
              <li style={styles.navItem}>
                <Link href="/projetos" style={styles.linkText}>Projetos</Link>
              </li>

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
                      <Link href="/mutirao/limpeza" style={styles.linkText}>Limpeza</Link>
                    </li>
                    <li 
                      style={hoveredSubItem === 'plantio' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('plantio')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/mutirao/plantio" style={styles.linkText}>Plantio</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li style={styles.navItem}>
                <Link href="/memorias" style={styles.linkText}>Memórias Caiçaras</Link>
              </li>
              <li style={styles.navItem}>
                <Link href="/institucional" style={styles.linkText}>Institucional</Link>
              </li>

              <li style={styles.navItemContainer}>
                <Link href="/fale-conosco" style={styles.linkText}>
                  <span style={styles.navItem}>Fale Conosco</span>
                </Link>
              </li>

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
                      <Link href="/doacoes" style={styles.linkText}>Doações</Link>
                    </li>
                    <li 
                      style={hoveredSubItem === 'inventario-part' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('inventario-part')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/inventario-participativo" style={styles.linkText}>Inventário Participativo</Link>
                    </li>
                    <li 
                      style={hoveredSubItem === 'trocas' ? { ...styles.dropdownItem, ...styles.dropdownItemHover } : styles.dropdownItem}
                      onMouseEnter={() => setHoveredSubItem('trocas')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/trocas" style={styles.linkText}>Trocas</Link>
                    </li>
                  </ul>
                )}
              </li>

            </ul>
          </nav>
        )}
      </header>

      {isMobile && isMobileMenuOpen && (
        <div style={styles.mobileOverlay}>
          <div style={styles.mobileHeader}>
            <div style={styles.logoAc}>AC</div>
            <div 
              style={styles.closeBtn} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </div>
          </div>

          <div style={styles.mobileNavList}>
            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/quem-somos" style={styles.linkText}>Quem Somos</Link>
            </div>
            
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
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/miniMuseu" style={styles.linkText}>A Casa Caiçara</Link>
                  </div>
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/inventario" style={styles.linkText}>Inventário</Link>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/noticias" style={styles.linkText}>Notícias</Link>
            </div>
            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/projetos" style={styles.linkText}>Projetos</Link>
            </div>

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
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/mutirao/limpeza" style={styles.linkText}>Limpeza</Link>
                  </div>
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/mutirao/plantio" style={styles.linkText}>Plantio</Link>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/memorias" style={styles.linkText}>Memórias Caiçaras</Link>
            </div>
            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/institucional" style={styles.linkText}>Institucional</Link>
            </div>

            <div style={styles.mobileNavItem} onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/fale-conosco" style={styles.linkText}>Fale Conosco</Link>
            </div>

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
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/doacoes" style={styles.linkText}>Doações</Link>
                  </div>
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/inventario-participativo" style={styles.linkText}>Inventário Participativo</Link>
                  </div>
                  <div style={styles.mobileSubItem} onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/trocas" style={styles.linkText}>Trocas</Link>
                  </div>
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
    gap: "14px",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    fontSize: "20px",
  },
  navbar: {
    backgroundColor: "#70233b", 
    color: "#ffffff",
    display: "flex",
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
    textDecoration: "none",
    color: "#ffffff",
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
    whiteSpace: "nowrap", 
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
    gap: "22px", 
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
    whiteSpace: "nowrap", 
  },
  linkText: {
    color: "inherit",
    textDecoration: "none",
    width: "100%",
    display: "block",
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
    whiteSpace: "nowrap",
  },
  dropdownItemHover: {
    backgroundColor: "#3a0e1a", 
  },
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#70233b", 
    zIndex: 100000, 
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
    borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
    cursor: "pointer",
  },
  accordionIcon: {
    fontSize: "12px",
    opacity: 0.8,
  },
  mobileSubList: {
    backgroundColor: "rgba(0, 0, 0, 0.1)", 
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