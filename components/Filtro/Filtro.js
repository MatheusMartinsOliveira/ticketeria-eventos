import styles from "./Filtro.module.css";

export default function Filtro({ categorias, selecionada, aoMudar }) {
  return (
    <div className={styles.filtro}>
      <button
        type="button"
        className={selecionada === 0 ? styles.ativo : styles.opcao}
        onClick={() => aoMudar(0)}
      >
        Todas
      </button>
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          type="button"
          className={selecionada === categoria.id ? styles.ativo : styles.opcao}
          onClick={() => aoMudar(categoria.id)}
        >
          {categoria.nome}
        </button>
      ))}
    </div>
  );
}
