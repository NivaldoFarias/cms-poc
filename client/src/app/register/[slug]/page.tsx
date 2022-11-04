import styles from "./../styles/page.module.scss";

interface Params {
  params: {
    slug: "supplier" | "provisions" | "cook";
  };
}

export default function Page({ params: { slug } }: Params) {
  const groups = {
    provisions: "Suprimentos",
    supplier: "Fornecedor",
    cook: "Cozinheiro",
  };

  return (
    <>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>{groups[slug]}</span>
      </p>
      <p>{groups[slug]}</p>
    </>
  );
}
