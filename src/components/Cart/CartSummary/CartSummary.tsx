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
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Items ({totalItems})</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span className="free">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <button className="btn btn-accent btn-lg btn-block">Proceed to Checkout</button>

      <Link to="/" className="btn btn-outline btn-block">
        Continue Shopping
      </Link>

      <button className="clear-cart-btn" onClick={onClear}>
        Clear Cart
      </button>
    </aside>
  );
};

export default CartSummary;
