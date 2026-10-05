import Swal from "sweetalert2";
import type { Product } from "../../../../types/product/product";
import { useCart } from "../../../hooks/useCart";
import QuantityControl from "../../Common/QuantityControl";
import { formatPrice } from "../../../../utils/formatPrice";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    dispatch({ type: "addToCart", payload: product });

    Swal.fire({
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-image" />

      <div className="product-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <button className="details-btn" onClick={() => onViewDetails(product)}>
          View Details
        </button>

        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>

          {cartItem ? (
            <QuantityControl
              quantity={cartItem.quantity}
              max={product.stock}
              onIncrement={() => dispatch({ type: "increment", payload: product.id })}
              onDecrement={() => dispatch({ type: "decrement", payload: product.id })}
            />
          ) : (
            <button onClick={handleAddToCart} disabled={outOfStock}>
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
