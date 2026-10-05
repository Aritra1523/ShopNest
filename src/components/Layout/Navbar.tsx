import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { CartIcon, MoonIcon, SunIcon } from "../Common/Icons";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="topbar">
        Free delivery on all orders · Easy 30-day returns
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            <span className="logo-mark">S</span>
            Shop<span>Nest</span>
          </Link>

          <div className="nav-links">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>

            <NavLink to="/cart" className="nav-link cart-link">
              <CartIcon />
              <span>Cart</span>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
