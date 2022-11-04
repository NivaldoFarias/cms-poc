import styles from "./../styles/page.module.scss";

interface Params {
  params: {
    slug: "supplier" | "provisions" | "cook";
  };
  searchParams: {
    groups_left: string;
  };
}

export default function Page({ params: { slug }, searchParams: { groups_left } }: Params) {
  const groups = {
    provisions: "Suprimentos",
    supplier: "Fornecedor",
    cook: "Cozinheiro",
  };

  console.log(groups_left);

  return (
    <>
      <p className={styles.title_card}>
        Cadastro de Usuário - <span>{groups[slug]}</span>
      </p>
      <p>{groups[slug]}</p>
    </>
  );
}
