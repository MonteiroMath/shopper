import Card from "react-bootstrap/Card";

export default function ProductCard({ product }) {
  const errors = product.validation_errors.map((error, key) => {
    return (
      <Card.Text key={`error-${key}`}>
        <span className="text-danger">{error}</span>
      </Card.Text>
    );
  });

  return (
    <Card>
      <Card.Header>
        <span className="fw-bold">
          {product.name || "Produto Não Encontrado"}
        </span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <span className="fw-bold">Código:</span> {product.id}
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Preço atual: </span>
          {product.current_price || "~"}
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Preço atual: </span>
          {product.new_price || "~"}
        </Card.Text>
      </Card.Body>
      {errors.length > 0 && <Card.Footer>{errors}</Card.Footer>}
    </Card>
  );
}
