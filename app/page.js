"use client";

import { useState } from "react";
import CardEvento from "@/components/CardEvento/CardEvento";
import Filtro from "@/components/Filtro/Filtro";
import Mensagem from "@/components/Mensagem/Mensagem";
import { eventos, categorias } from "@/dados/exemplo";
import styles from "./page.module.css";
import Cabecalho from "@/components/Cabecalho/Cabecalho";

export default function PaginaInicial() {
  const [categoria, setCategoria] = useState(0);
  const visiveis =
    categoria === 0
      ? eventos
      : eventos.filter((e) => e.categoria_id === categoria);

  return (
    <>
      <h1>Eventos</h1>
      <Filtro
        categorias={categorias}
        selecionada={categoria}
        aoMudar={setCategoria}
      />
      {visiveis.length === 0 && (
        <Mensagem>Nenhum evento nesta categoria.</Mensagem>
      )}
      <ul className={styles.grade}>
        {visiveis.map((evento) => (
          <CardEvento key={evento.id} evento={evento} />
        ))}
      </ul>
    </>
  );
}
