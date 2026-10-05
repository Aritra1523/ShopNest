const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {currentYear} ShopNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
