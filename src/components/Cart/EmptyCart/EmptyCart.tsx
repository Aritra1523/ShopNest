import { Link } from "react-router-dom";
import { CartIcon } from "../../Common/Icons";

const EmptyCart = () => (
  <div className="empty-cart">
    <div className="empty-cart-icon">
      <CartIcon width={44} height={44} />
    </div>
    <h2>Your cart is empty</h2>
    <p>Looks like you haven't added anything yet.</p>
    <Link to="/" className="btn btn-primary btn-lg">
      Start Shopping
    </Link>
  </div>
);

export default EmptyCart;
