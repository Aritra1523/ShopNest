import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <Link to="/" className="logo">
          <span className="logo-mark">S</span>
          Shop<span>Nest</span>
        </Link>
        <p>Your one-stop destination for quality products at honest prices.</p>
      </div>

      <div className="footer-col">
        <h4>Shop</h4>
        <Link to="/">All Products</Link>
        <Link to="/cart">Your Cart</Link>
      </div>

      <div className="footer-col">
        <h4>Support</h4>
        <span>Help Center</span>
        <span>Shipping Info</span>
        <span>Returns &amp; Refunds</span>
      </div>

      <div className="footer-col">
        <h4>Company</h4>
        <span>About Us</span>
        <span>Careers</span>
        <span>Privacy Policy</span>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© {currentYear} ShopNest. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
