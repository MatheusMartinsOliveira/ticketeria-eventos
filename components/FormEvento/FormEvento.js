"use client";

import { useState } from "react";
import Campo from "@/components/Campo/Campo";
import Botao from "@/components/Botao/Botao";
import Mensagem from "@/components/Mensagem/Mensagem";
import styles from "./FormEvento.module.css";

const VAZIO = {
  nome: "",
  data_hora: "",
  local: "",
  preco: "",
  local: "",
  categoria_id: "",
};

export default function FormEvento({
  categorias,
  eventoInicial = VAZIO,
  aoSalvar,
}) {
  const [dados, setDados] = useState(eventoInicial);
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  const mudar = (event) => {
    const { name, value } = event.target;
    setDados({ ...dados, [name]: value });
  };

  const validar = () => {
    const novos = {};
    if (dados.nome.trim().length < 5)
      novos.nome = "O nome do evento precisa de pelo menos 5 letras.";
    if (Number(dados.tempo) <= 0)
      novos.data_hora = "Informe a data e hora em data (dia/mes/ano) e hora.";
    if (dados.categoria_id === "")
      novos.categoria_id = "Escolha uma categoria.";
    if (dados.local === "") novos.local = "Informe o local do evento.";
    if (dados.capacidade.trim() === 0)
      novos.capacidade = "Informe a capacidade do evento";
    return novos;
  };

  const enviar = async (event) => {
    event.preventDefault();
    const novos = validar();
    setErros(novos);
    if (Object.keys(novos).length > 0) return;

    setSalvando(true);
    setMensagem("");
    try {
      await aoSalvar(dados);
    } catch (erro) {
      setMensagem(erro.message);
      setSalvando(false);
    }
  };

  return (
    <form className={styles.formulario} onSubmit={enviar} noValidate>
      <Mensagem tipo="erro">{mensagem}</Mensagem>
      <Campo
        rotulo="Nome"
        id="nome"
        name="nome"
        value={dados.nome}
        onChange={mudar}
        erro={erros.nome}
      />
      <div className={styles.linha}>
        <Campo
          rotulo="Data e Hora"
          id="data_hora"
          name="data_hora"
          type="datetime-local23"
          value={dados.data_hora}
          onChange={mudar}
          erro={erros.data_hora}
        />
        <Campo
          rotulo="Local"
          id="local"
          name="local"
          type="text"
          value={dados.local}
          onChange={mudar}
        />
      </div>
      <Campo
        rotulo="Preco"
        id="preco"
        name="preco"
        type="number"
        value={dados.preco}
        onChange={mudar}
      ></Campo>
      <Campo
        rotulo="Capacidade"
        id="capacidade"
        name="capacidade"
        type="number"
        value={dados.capacidade}
        onChange={mudar}
        erro={erros.capacidade}
      ></Campo>
      <Campo
        rotulo="Categoria"
        id="categoria_id"
        name="categoria_id"
        value={dados.categoria_id}
        onChange={mudar}
        erro={erros.categoria_id}
      >
        <option value="">Escolha...</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </Campo>
      <Botao type="submit" disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </Botao>
    </form>
  );
}
