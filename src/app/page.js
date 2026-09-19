import Link from "next/link";
import Footer from "../components/Footer";
import NavbarACAJU from "../components/Navbar";

export default function Home() {
  return (
    
    <div style={styles.page}>
      <NavbarACAJU />
       <Footer />
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",             
    height: "100vh",           
    display: "flex",            
    justifyContent: "center",   
    alignItems: "center",       
    margin: 0,
    padding: "20px",
    boxSizing: "border-box",
  },
    primaryLink: {
    color: "#2e5c31",
    fontSize: "14px",
    fontWeight: "Bold",
    textDecoration: "none",
  },
};