'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './SideBarAdmin.module.css';
import {
  ClipboardCheck,
  Clock,
  FileText,
  Users,
  FolderKanban,
  Image,
  FileDown,
  UserCog,
  UsersRound,
  FileCog,
} from 'lucide-react';
import LogoutForm from './LogoutForm';

export default function SideBarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Fechar menu administrativo' : 'Abrir menu administrativo'}
        aria-expanded={isOpen}
      >
        {isOpen ? '‹' : '☰'}
      </button>
      {isOpen && <button type="button" className={styles.overlay} onClick={() => setIsOpen(false)} aria-label="Fechar menu" />}
      <div className={`${styles.sideBar} ${isOpen ? styles.sideBarOpen : ''}`}>
      <h2 className={styles.titulo}>Painel ACAJU</h2>
      <nav className={styles.nav}>

        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/admin/pendencias" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <ClipboardCheck size={20} className={styles.icon} />
                <span>Pendências</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/horarioFuncionamento" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <Clock size={20} className={styles.icon} />
                <span>Horário de funcionamento</span>
              </div>
            </Link>
          </li>
        </ul>

        <h4 className={styles.h4}>PUBLICAÇÕES</h4>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/admin/noticias" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <FileText size={20} className={styles.icon} />
                <span>Notícias</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/multiroes" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <Users size={20} className={styles.icon} />
                <span>Mutirões</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/projetos" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <FolderKanban size={20} className={styles.icon} />
                <span>Projetos</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/memoriasCaicaras" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <Image size={20} className={styles.icon} />
                <span>Memórias Caiçaras</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/miniMuseu" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <Image size={20} className={styles.icon} />
                <span>Mini-Museu</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/documentos" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <FileDown size={20} className={styles.icon} />
                <span>Documentos</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/gerenciarPublicacoes" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <FileCog size={20} className={styles.icon} />
                <span>Gerenciar Publicações</span>
              </div>
            </Link>
          </li>
        </ul>

        <h4 className={styles.h4}>GERENCIAMENTO</h4>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="/admin/meuPerfil" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <UserCog size={20} className={styles.icon} />
                <span>Meu Perfil</span>
              </div>
            </Link>
          </li>
          <li className={styles.li}>
            <Link href="/admin/gerenciarEquipe" className={styles.link} onClick={() => setIsOpen(false)}>
              <div className={styles.linkContent}>
                <UsersRound size={20} className={styles.icon} />
                <span>Gerenciar Equipe</span>
              </div>
            </Link>
          </li>
        </ul>

        <ul className={styles.logoutUl}>
          <li className={styles.li}>
            <LogoutForm />
          </li>
        </ul>

      </nav>
      </div>
    </>
  );
}