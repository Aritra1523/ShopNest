import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils/formatPrice";

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  onClear: () => void;
}

const CartSummary = ({ totalItems, subtotal, onClear }: CartSummaryProps) => {
  // Shipping is free, so total price equals subtotal
  const shipping = 0;
  const totalPrice = subtotal + shipping;

  return (
    <aside className="cart-summary">
      <h2>Cart Summary</h2>

      <div className="summary-row">
        <span>Total Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total Price</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <button className="clear-cart-btn" onClick={onClear}>
        Clear Cart
      </button>

      <Link to="/" className="btn-link btn-outline">
        Continue Shopping
      </Link>
    </aside>
  );
};

export default CartSummary;
