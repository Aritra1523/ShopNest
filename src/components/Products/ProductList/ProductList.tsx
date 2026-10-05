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
    return (
      <div className="product-grid" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="product-card skeleton-card">
            <div className="skeleton skeleton-img" />
            <div className="product-content">
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line short" />
              <div className="skeleton skeleton-btn" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error-message">
        <h3>Oops!</h3>
        <p>{error}</p>
        {onRetry && (
          <button className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="status-message">
        <h3>No products found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
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
