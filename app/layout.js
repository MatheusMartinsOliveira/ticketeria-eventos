import { Suspense } from "react";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import Carregando from "@/components/Carregando/Carregando";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Suspense fallback={<Carregando />}>
          <Cabecalho />
          <main className="conteudo">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
