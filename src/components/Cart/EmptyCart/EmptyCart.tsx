import { Link } from "react-router-dom";

const EmptyCart = () => (
  <div className="empty-cart">
    <h2>Your cart is empty</h2>
    <p>Add some products to your cart.</p>
    <Link to="/" className="btn-link">
      Continue Shopping
    </Link>
  </div>
);

export default EmptyCart;
