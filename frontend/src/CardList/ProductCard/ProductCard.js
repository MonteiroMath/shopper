export default function ProductCard({ product }) {
  const errors = product.validation_errors.map((error, key) => {
    return <div key={`error-${key}`}>{error}</div>;
  });

  return (
    <div>
      <div>{product.id}</div>
      <div>{product.name}</div>
      <div>{product.current_price}</div>
      <div>{product.new_price}</div>
      <div>{errors}</div>
    </div>
  );
}
