"use client";

import { useRouter } from "next/navigation";
import FormEvento from "@/components/FormEvento/FormEvento";
import { categorias } from "@/dados/exemplo";

export default function NovoEvento() {
  const router = useRouter();

  const salvar = async (dados) => {
    console.log("Salvar:", dados);
    router.push("/");
  };

  return (
    <>
      <h1>Novo evento</h1>
      <FormEvento categorias={categorias} aoSalvar={salvar} />
    </>
  );
}
