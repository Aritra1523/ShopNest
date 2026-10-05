import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../context/CartProvider";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
