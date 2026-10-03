"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import '@/app/globals.css';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from './NavbarACAJU.module.css';

export default function NavbarACAJU() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [navJustify, setNavJustify] = useState("space-around");
  
  const [hoveredMobileItem, setHoveredMobileItem] = useState(null);

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
    <div className={styles.wrapper}>
      {!isMobile && (
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <span className={styles.topBarItem}>
              📞 12 3897-5660
            </span>
            <span className={styles.topBarItem}>
              🕒 Segunda à Sexta — 9h às 17h
            </span>
          </div>
          <div className={styles.topBarRight}>
             <Link href="/admin/login" className={styles.topBarItem}>
              <span className={styles.servidorText}>SERVIDOR</span>
            </Link>
            <span className={styles.divider}>|</span>
            <div className={styles.socialIcons}>
              <Link href="https://www.facebook.com/tudapaes" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaFacebook className={styles.icon} />
              </Link>
              <Link href="https://www.instagram.com/acajucaraguatatuba/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaInstagram className={styles.icon} />
              </Link>
              <Link href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <FaYoutube className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <header className={styles.navbar} style={{ justifyContent: navJustify }}>
        <Link href="/" className={styles.logoContainer}>
          <Image 
            src="/logo-only.svg" 
            alt="Logo ACAJU" 
            width={42} 
            height={42} 
            priority
          />
          <span className={styles.logoText}>ACAJU</span>
        </Link>

        {isMobile ? (
          <div 
            className={styles.hamburgerBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </div>
        ) : (
          <nav>
            <ul className={styles.navList}>
              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'quem-somos' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('quem-somos')}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/quem-somos" className={styles.linkText}>
                  <span className={styles.navItem}>Quem Somos</span>
                </Link>
              </li>

              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'mini-museu' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('mini-museu')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles.navItem}>Mini-Museu ˅</span>
                {activeMenu === 'mini-museu' && (
                  <ul className={styles.dropdownMenu}>
                    <li 
                      className={`${styles.dropdownItem} ${hoveredSubItem === 'casa' ? styles.dropdownItemHover : ''}`}
                      onMouseEnter={() => setHoveredSubItem('casa')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/miniMuseu" className={styles.linkText}>Casa Caiçara</Link>
                    </li>
                    <li 
                      className={`${styles.dropdownItem} ${hoveredSubItem === 'inventario-mini' ? styles.dropdownItemHover : ''}`}
                      onMouseEnter={() => setHoveredSubItem('inventario-mini')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/inventario" className={styles.linkText}>Acervo</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'noticias' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('noticias')}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/noticias" className={styles.linkText}>
                  <span className={styles.navItem}>Notícias</span>
                </Link>
              </li>
              
              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'projetos' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('projetos')}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/projetos" className={styles.linkText}>
                  <span className={styles.navItem}>Projetos</span>
                </Link>
              </li>

              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'mutirao' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('mutirao')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles.navItem}>Mutirão ˅</span>
                {activeMenu === 'mutirao' && (
                  <ul className={styles.dropdownMenu}>
                    <li 
                      className={`${styles.dropdownItem} ${hoveredSubItem === 'limpeza' ? styles.dropdownItemHover : ''}`}
                      onMouseEnter={() => setHoveredSubItem('limpeza')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/mutirao/limpeza" className={styles.linkText}>Limpeza</Link>
                    </li>
                    <li 
                      className={`${styles.dropdownItem} ${hoveredSubItem === 'plantio' ? styles.dropdownItemHover : ''}`}
                      onMouseEnter={() => setHoveredSubItem('plantio')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/mutirao/plantio" className={styles.linkText}>Plantio</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'memorias' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('memorias')}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/memorias" className={styles.linkText}>
                  <span className={styles.navItem}>Memórias Caiçaras</span>
                </Link>
              </li>
              
              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'institucional' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('institucional')}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/institucional" className={styles.linkText}>
                  <span className={styles.navItem}>Institucional</span>
                </Link>
              </li>

              <li 
                className={`${styles.navItemContainer} ${activeMenu === 'fale-conosco' ? styles.navItemContainerHover : ''}`}
                onMouseEnter={() => handleMouseEnter('fale-conosco')}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles.navItem}>Fale Conosco ˅</span>
                {activeMenu === 'fale-conosco' && (
                  <ul className={styles.dropdownMenu}>
                    <li 
                      className={`${styles.dropdownItem} ${hoveredSubItem === 'contato' ? styles.dropdownItemHover : ''}`}
                      onMouseEnter={() => setHoveredSubItem('contato')}
                      onMouseLeave={() => setHoveredSubItem(null)}
                    >
                      <Link href="/contato" className={styles.linkText}>Contato</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={styles.participeContainer}>
                <Link 
                  href="/participe" 
                  className={`${styles.participeButton} ${activeMenu === 'participe' ? styles.participeButtonHover : ''}`}
                  onMouseEnter={() => handleMouseEnter('participe')}
                  onMouseLeave={handleMouseLeave}
                >
                  Participe
                </Link>
              </li>

            </ul>
          </nav>
        )}
      </header>

      {isMobile && isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileHeader}>
            <Image 
              src="/logo-only.svg" 
              alt="Logo ACAJU" 
              width={38} 
              height={38} 
            />
            <div 
              className={styles.closeBtn} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </div>
          </div>

          <div className={styles.mobileNavList}>
            <div 
              className={`${styles.mobileNavItem} ${hoveredMobileItem === 'quem-somos' ? styles.mobileNavItemHover : ''}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredMobileItem('quem-somos')}
              onMouseLeave={() => setHoveredMobileItem(null)}
            >
              <Link href="/quem-somos" className={styles.linkText}>Quem Somos</Link>
            </div>
            
            <div className={styles.mobileAccordionGroup}>
              <div 
                className={`${styles.mobileNavItem} ${hoveredMobileItem === 'mini-museu' ? styles.mobileNavItemHover : ''}`} 
                onClick={() => toggleAccordion('mini-museu')}
                onMouseEnter={() => setHoveredMobileItem('mini-museu')}
                onMouseLeave={() => setHoveredMobileItem(null)}
              >
                <span>Mini-Museu</span>
                <span className={styles.accordionIcon}>{openAccordion === 'mini-museu' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'mini-museu' && (
                <div className={styles.mobileSubList}>
                  <div 
                    className={`${styles.mobileSubItem} ${hoveredMobileItem === 'sub-casa' ? styles.mobileSubItemHover : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileItem('sub-casa')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                  >
                    <Link href="/miniMuseu" className={styles.linkText}>Casa Caiçara</Link>
                  </div>
                  <div 
                    className={`${styles.mobileSubItem} ${hoveredMobileItem === 'sub-acervo' ? styles.mobileSubItemHover : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileItem('sub-acervo')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                  >
                    <Link href="/inventario" className={styles.linkText}>Acervo</Link>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.mobileNavItem} ${hoveredMobileItem === 'noticias' ? styles.mobileNavItemHover : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredMobileItem('noticias')}
              onMouseLeave={() => setHoveredMobileItem(null)}
            >
              <Link href="/noticias" className={styles.linkText}>Notícias</Link>
            </div>
            
            <div 
              className={`${styles.mobileNavItem} ${hoveredMobileItem === 'projetos' ? styles.mobileNavItemHover : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredMobileItem('projetos')}
              onMouseLeave={() => setHoveredMobileItem(null)}
            >
              <Link href="/projetos" className={styles.linkText}>Projetos</Link>
            </div>

            <div className={styles.mobileAccordionGroup}>
              <div 
                className={`${styles.mobileNavItem} ${hoveredMobileItem === 'mutirao' ? styles.mobileNavItemHover : ''}`} 
                onClick={() => toggleAccordion('mutirao')}
                onMouseEnter={() => setHoveredMobileItem('mutirao')}
                onMouseLeave={() => setHoveredMobileItem(null)}
              >
                <span>Mutirão</span>
                <span className={styles.accordionIcon}>{openAccordion === 'mutirao' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'mutirao' && (
                <div className={styles.mobileSubList}>
                  <div 
                    className={`${styles.mobileSubItem} ${hoveredMobileItem === 'sub-limpeza' ? styles.mobileSubItemHover : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileItem('sub-limpeza')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                  >
                    <Link href="/mutirao/limpeza" className={styles.linkText}>Limpeza</Link>
                  </div>
                  <div 
                    className={`${styles.mobileSubItem} ${hoveredMobileItem === 'sub-plantio' ? styles.mobileSubItemHover : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileItem('sub-plantio')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                  >
                    <Link href="/mutirao/plantio" className={styles.linkText}>Plantio</Link>
                  </div>
                </div>
              )}
            </div>

            <div 
              className={`${styles.mobileNavItem} ${hoveredMobileItem === 'memorias' ? styles.mobileNavItemHover : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredMobileItem('memorias')}
              onMouseLeave={() => setHoveredMobileItem(null)}
            >
              <Link href="/memorias" className={styles.linkText}>Memórias Caiçaras</Link>
            </div>
            
            <div 
              className={`${styles.mobileNavItem} ${hoveredMobileItem === 'institucional' ? styles.mobileNavItemHover : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={() => setHoveredMobileItem('institucional')}
              onMouseLeave={() => setHoveredMobileItem(null)}
            >
              <Link href="/institucional" className={styles.linkText}>Institucional</Link>
            </div>

            <div className={styles.mobileAccordionGroup}>
              <div 
                className={`${styles.mobileNavItem} ${hoveredMobileItem === 'fale-conosco' ? styles.mobileNavItemHover : ''}`} 
                onClick={() => toggleAccordion('fale-conosco')}
                onMouseEnter={() => setHoveredMobileItem('fale-conosco')}
                onMouseLeave={() => setHoveredMobileItem(null)}
              >
                <span>Fale Conosco</span>
                <span className={styles.accordionIcon}>{openAccordion === 'fale-conosco' ? '▲' : '▼'}</span>
              </div>
              {openAccordion === 'fale-conosco' && (
                <div className={styles.mobileSubList}>
                  <div 
                    className={`${styles.mobileSubItem} ${hoveredMobileItem === 'sub-contato' ? styles.mobileSubItemHover : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    onMouseEnter={() => setHoveredMobileItem('sub-contato')}
                    onMouseLeave={() => setHoveredMobileItem(null)}
                  >
                    <Link href="/contato" className={styles.linkText}>Contato</Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/participe" 
              className={styles.mobileParticipeButton}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Participe
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}