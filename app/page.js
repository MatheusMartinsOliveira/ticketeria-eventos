"use client";

import { useEffect, useState } from "react";
import CardEvento from "@/components/CardEvento/CardEvento";
import Carregando from "@/components/Carregando/Carregando";
import Filtro from "@/components/Filtro/Filtro";
import Mensagem from "@/components/Mensagem/Mensagem";
import { listarCategorias, listarEventos } from "@/lib/banco";
import styles from "./page.module.css";

export default function PaginaInicial() {
  const [eventos, setEventos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(0); // 0 = todas
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([listarEventos(), listarCategorias()])
      .then(([listaEventos, listaCategorias]) => {
        setEventos(listaEventos);
        setCategorias(listaCategorias);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <Carregando />;
  if (erro) return <Mensagem tipo="erro">{erro}</Mensagem>;

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
