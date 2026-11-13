'use client';

import Link from 'next/link';
import { useState } from 'react';
import PasswordRequirements from './PasswordRequirements';
import { isStrongPassword } from '@/schemas/authSchema';

export default function RegisterForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3300/auth/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, pass })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert(data.message || "Cadastro realizado com sucesso!");

      } else {
        console.error('Erro no Cadastro', data);
        alert(data.error || data.message || "Ocorreu um erro ao fazer Cadastro.");

      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor.");

    }
  }

  return (
    <div style={styles.card}>

      <div style={styles.header}>
        <h2 style={styles.title}>Criar Conta</h2>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor='name'>Nome Completo</label>
          <input
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor='email'>E-mail</label>
          <input
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="exemplo@email.com"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor='pass'>Senha</label>
          <input
            type="password"
            id='pass'
            name='pass'
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            placeholder="Mínimo 8 caracteres"
            style={styles.input}
          />
          <PasswordRequirements password={pass} />
        </div>

        <button type="submit" disabled={!isStrongPassword(pass)} style={styles.button}>Solicitar Acesso</button>
      </form>

      <div style={styles.footer}>
        <Link href="/admin/login" style={styles.link}>Voltar ao Login</Link>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "440px",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(4, 89, 80, 0.25)",
    boxSizing: "border-box",
    fontFamily: "sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    color: "#244d28",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    fontSize: "15px",
    color: "#1e293b",
    boxSizing: "border-box",
    outline: "none",
  },
  button: {
    backgroundColor: "#023b36",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
  },
  link: {
    color: "#64748b",
    fontSize: "14px",
    textDecoration: "none",
  },
};