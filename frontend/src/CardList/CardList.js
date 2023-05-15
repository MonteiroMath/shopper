import ProductCard from "./ProductCard/ProductCard";

export default function CardList({ products }) {
  const productCards = products.map((product, key) => (
    <ProductCard key={key} product={product} />
  ));

  return <div>{productCards}</div>;
}
