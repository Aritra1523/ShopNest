import type { Product } from "../../../../types/product/product";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
  onViewDetails: (product: Product) => void;
}

const ProductList = ({
  products,
  loading,
  error,
  onRetry,
  onViewDetails,
}: ProductListProps) => {
  if (loading) {
    return <div className="status-message">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="status-message error-message">
        <p>{error}</p>
        {onRetry && <button onClick={onRetry}>Try Again</button>}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="status-message">No products found.</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default ProductList;
