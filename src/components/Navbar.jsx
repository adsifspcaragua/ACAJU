"use client";

import React, { useState } from "react";
import Link from "next/link";
import '@/app/globals.css';

export default function NavbarACAJU() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);

  const handleMouseEnter = (menu) => setActiveMenu(menu);
  const handleMouseLeave = () => setActiveMenu(null);

  return (
    <div style={styles.wrapper}>
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

      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoAc}>AC</span>
          <span style={styles.logoText}>ACAJU</span>
        </div>

        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Quem Somos</li>

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

            <li 
              style={styles.navItemContainer}
              onMouseEnter={() => handleMouseEnter('fale-conosco')}
              onMouseLeave={handleMouseLeave}
            >
              <span style={styles.navItem}>Fale Conosco ˅</span>
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
      </header>
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
  },
  logoText: {
    letterSpacing: "1px",
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
  }
};