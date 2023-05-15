import ProductCard from "./ProductCard/ProductCard";
import styles from "./cardList.module.css";

export default function CardList({ products }) {
  const productCards = products.map((product, key) => (
    <ProductCard key={key} product={product} />
  ));

  return <div className={styles.container}>{productCards}</div>;
}
