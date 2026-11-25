"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Cabecalho.module.css";

const LINKS = [
  { href: "/", texto: "Eventos" },
  { href: "/eventos/novo", texto: "Novo evento" },
];

export default function Cabecalho() {
  const caminho = usePathname();
  const router = useRouter();

  return (
    <header className={styles.cabecalho}>
      <Link href="/" className={styles.marca}>
        Lista de Eventos
      </Link>
      <nav className={styles.menu}>
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={caminho === link.href ? styles.ativo : styles.link}
          >
            {link.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}
