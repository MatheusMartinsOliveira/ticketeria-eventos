import Link from "next/link";
import styles from "./CardEvento.module.css";
import Botao from "@/components/Botao/Botao";
export default function CardEvento({ evento }) {
  return (
    <li>
      <Link href={`/eventos/${evento.id}`} className={styles.card}>
        <span className={styles.categoria}>{evento.categoria}</span>
        <h2 className={styles.titulo}>{evento.nome}</h2>
        <p className={styles.info}>
          {evento.local} · {evento.data_hora}
        </p>
        <Botao variante="principal" type="button">
          Ver detalhes
        </Botao>
      </Link>
    </li>
  );
}
