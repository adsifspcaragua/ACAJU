"use client"; 

import React, { useState, useEffect } from "react";

export default function Carrossel({ title, images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [images]);

  return (
    <div style={styles.container}>
      {images.map((imgSrc, index) => (
        <div
          key={index}
          style={{
            ...styles.background,
            backgroundImage: `url(${imgSrc})`,
            opacity: index === currentIndex ? 1 : 0, 
          }}
        />
      ))}

      <div style={styles.overlay} />

      <div style={styles.titleBox}>
        <h1 style={styles.title}>{title}</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "400px", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: "70px", 
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "opacity 0.8s ease-in-out", 
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
    zIndex: 2,
  },
  titleBox: {
    position: "relative",
    zIndex: 3,
    backgroundColor: "#740405",
    padding: "16px 48px",
    display: "inline-block",
  },
  title: {
    color: "#ffffff",
    fontSize: "36px",
    fontWeight: "bold",
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: "1px",
  }
};