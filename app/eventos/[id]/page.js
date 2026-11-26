"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Botao from "@/components/Botao/Botao";
import Carregando from "@/components/Carregando/Carregando";
import Mensagem from "@/components/Mensagem/Mensagem";
import ModalConfirmacao from "@/components/ModalConfirmacao/ModalConfirmacao";
import { buscarEvento, excluirEvento } from "@/lib/banco";
import { useSessao } from "@/lib/sessao";
import styles from "./detalhe.module.css";

export default function DetalheEvento() {
  const { id } = useParams();
  const router = useRouter();
  const { usuario } = useSessao();
  const [evento, setEvento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    buscarEvento(id)
      .then((encontrado) => setEvento(encontrado))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  const excluir = async () => {
    setConfirmando(false);
    try {
      await excluirEvento(id);
      router.push("/");
    } catch (e) {
      setErro(e.message);
    }
  };

  if (carregando) return <Carregando />;
  if (!evento) {
    return (
      <>
        <Mensagem tipo="erro">{erro}</Mensagem>
        <Link href="/">Voltar para a lista de eventos</Link>
      </>
    );
  }

  return (
    <article className={styles.detalhe}>
      <Mensagem tipo="erro">{erro}</Mensagem>
      <span className={styles.categoria}>{evento.categoria}</span>
      <h1>{evento.nome}</h1>
      <p className={styles.info}>
        {evento.data_hora} · {evento.local}
      </p>
      <p>{evento.preco}</p>
      <p>{evento.capacidade}</p>

      <div className={styles.acoes}>
        <Botao
          variante="secundario"
          type="button"
          onClick={() => router.back()}
        >
          ← Voltar
        </Botao>
        {usuario && (
          <>
            <Link
              href={`/eventos/${evento.id}/editar`}
              className={styles.editar}
            >
              Editar
            </Link>
            <Botao
              variante="perigo"
              type="button"
              onClick={() => setConfirmando(true)}
            >
              Excluir
            </Botao>
          </>
        )}
      </div>

      <ModalConfirmacao
        aberto={confirmando}
        titulo="Excluir evento?"
        aoConfirmar={excluir}
        aoCancelar={() => setConfirmando(false)}
      >
        <p>{evento.nome} vai ser apagada. Não dá para desfazer.</p>
      </ModalConfirmacao>
    </article>
  );
}
