"use client";

import React, { useState } from 'react';

const styles = {
  sectionContainer: {
    margin: '60px 0',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333333',
    margin: 0,
  },
  navButtonsContainer: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    backgroundColor: '#6b0f0f',
    color: '#ffffff',
    border: 'none',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '18px',
    transition: 'background-color 0.2s',
  },
  navButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  carouselWrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  carouselInner: {
    display: 'flex',
    transition: 'transform 0.4s ease-in-out',
    gap: '20px',
  },
  card: {
    minWidth: 'calc(33.333% - 14px)', // 3 cards por vez em ecrãs grandes
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '1px solid #eaeaea'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '220px',
    backgroundColor: '#f4f4f4',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // A imagem não será cortada
    display: 'block',
  },
  badge: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#8C1717',
    color: '#ffffff',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
    margin: '0 0 15px 0',
    lineHeight: '1.4',
  },
  cardDescription: {
    fontSize: '14px',
    color: '#666666',
    lineHeight: '1.6',
    marginBottom: '20px',
    flexGrow: 1,
  },
  readMoreBtn: {
    backgroundColor: '#4a0b0b',
    color: '#ffffff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 'auto',
    transition: 'background-color 0.2s',
  }
};

export default function CardGlobal({ titulo, dadosCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!dadosCards || dadosCards.length === 0) return null;

  const cardsToShow = 3; 
  const maxIndex = Math.max(0, dadosCards.length - cardsToShow);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={styles.sectionContainer}>
      <div style={styles.header}>
        <h2 style={styles.title}>{titulo}</h2>
        
        {dadosCards.length > cardsToShow && (
          <div style={styles.navButtonsContainer}>
            <button 
              style={{...styles.navButton, ...(currentIndex === 0 ? styles.navButtonDisabled : {})}} 
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              ←
            </button>
            <button 
              style={{...styles.navButton, ...(currentIndex >= maxIndex ? styles.navButtonDisabled : {})}} 
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
            >
              →
            </button>
          </div>
        )}
      </div>

      <div style={styles.carouselWrapper}>
        <div style={{
          ...styles.carouselInner,
          transform: `translateX(calc(-${currentIndex * (100 / cardsToShow)}% - ${currentIndex * (20 / cardsToShow)}px))`
        }}>
          {dadosCards.map((card, index) => (
            <div key={card.id || index} style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={card.image} alt={card.title} style={styles.cardImage} />
                {card.badge && <div style={styles.badge}>{card.badge}</div>}
              </div>
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDescription}>{card.description}</p>
                <button style={styles.readMoreBtn}>{card.buttonText || 'Leia mais →'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}