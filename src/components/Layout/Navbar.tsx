import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          ShopNest
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/cart" className="cart-link">
            Cart
            <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
